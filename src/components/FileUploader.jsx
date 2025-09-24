import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState("pdf"); // default output format
    const [downloadUrl, setDownloadUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const formats = ["pdf", "png", "jpg", "svg", "eps", "tiff"];

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        setLoading(true);
        setDownloadUrl("");

        try {
            // Step 1: Create Job
            console.log("Frontend: Step 1 - Creating job with format:", format);
            const jobRes = await axios.post("http://localhost:5000/api/convert/job", {
                output_format: format,
            });
            console.log("Frontend: Job created:", jobRes.data.data.id);

            const uploadTask = jobRes.data.data.tasks.find(
                (t) => t.operation === "import/upload"
            );
            const { url, parameters } = uploadTask.result.form;

            // Step 2: Upload File
            console.log("Frontend: Step 2 - Uploading file:", file.name);
            const formData = new FormData();
            for (let key in parameters) {
                console.log(`Frontend: Adding param ${key}:`, parameters[key]);
                formData.append(key, parameters[key]);
            }
            formData.append("file", file);

            await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Frontend: File uploaded successfully");

            // Step 3: Get converted file URL (polling)
            const exportTask = jobRes.data.data.tasks.find(
                (t) => t.operation === "export/url"
            );
            let fileUrl = null;
            console.log("Frontend: Step 3 - Polling task:", exportTask.id);

            while (!fileUrl) {
                const statusRes = await axios.get(
                    `http://localhost:5000/api/convert/task/${exportTask.id}`
                );
                if (statusRes.data.success) {
                    fileUrl = statusRes.data.fileUrl;
                    console.log("Frontend: Conversion finished. File URL:", fileUrl);
                } else {
                    console.log("Frontend: Still processing... retrying in 2s");
                    await new Promise((r) => setTimeout(r, 2000));
                }
            }

            setDownloadUrl(fileUrl);

            // Auto-download once ready
            console.log("Frontend: Auto-downloading file...");
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = `converted.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Frontend Error:", err);
            alert("Conversion failed. Check backend logs.");
        } finally {
            setLoading(false); // loader end after everything
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 shadow rounded">
            <h2 className="text-xl font-bold mb-4">CDR → Format Converter</h2>

            <input
                type="file"
                accept=".cdr"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4"
            />

            <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="mb-4 border p-2 text-black rounded w-full"
            >
                {formats.map((f) => (
                    <option key={f} value={f}>
                        {f.toUpperCase()}
                    </option>
                ))}
            </select>

            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
                {loading ? "Processing... Please wait" : "Upload & Convert"}
            </button>

            {downloadUrl && !loading && (
                <div className="mt-4">
                    <a
                        href={downloadUrl}
                        download={`converted.${format}`}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Download Again
                    </a>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
