import React, { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import StatsDisplay from "../components/conversion/StatsDisplay";
import PremiumFeaturesBanner from "../components/conversion/PremiumFeaturesBanner";
import PremiumHighlightsDisplay from "../components/conversion/PremiumHighlightsDisplay";
import ProcessStepsDisplay from "../components/conversion/ProcessStepsDisplay";

const SUPPORTED_FORMATS = ["pdf", "png", "svg", "wmf", "ps", "tiff", "jpg"];

const CDRConverter = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState("pdf");
    const [accessKeyToken, setAccessKeyToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setDownloadUrl(null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setDownloadUrl(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleUploadConvert = async () => {
        if (!file) return alert("⚠️ Please select a CDR file!");
        if (!SUPPORTED_FORMATS.includes(format)) return alert("⚠️ Unsupported output format!");
        if (!accessKeyToken) return alert("⚠️ Please enter your Access Key Token!");
        console.log("accessKeyToken", accessKeyToken);
        setLoading(true);
        setDownloadUrl(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("output_format", format);
            formData.append("access_key_token", accessKeyToken);
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            );

            if (res?.data?.success && res?.data?.downloadUrl) {
                setDownloadUrl(res?.data?.downloadUrl);
            } else {
                alert("❌ Conversion failed: " + (res?.data?.message || "Unknown error"));
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + (err?.response?.data?.error || err?.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center px-4 py-16">
            <div className="max-w-5xl w-full bg-[#121826] text-white rounded-2xl shadow-xl p-6">

                {/* Top stats */}
                <PremiumFeaturesBanner />
                <StatsDisplay />

                {/* Steps */}
                <ProcessStepsDisplay />

                {/* Upload area with Drag & Drop */}
                <div
                    className={`border-2 border-dashed rounded-lg p-10 text-center mb-6 transition 
                        ${dragActive ? "border-blue-400 bg-blue-900/20" : "border-gray-600"}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {!file ? (
                        <>
                            <Upload className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                            <p className="mb-3 text-xl font-bold">Drag and drop your files here</p>
                            <p className="mb-8 text-gray-500">or</p>
                            <label className="cursor-pointer">
                                <span className="bg-blue-600 px-4 py-2 rounded-md">Browse Files</span>
                                <input
                                    type="file"
                                    accept=".cdr"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <p className="text-xs mt-7 text-gray-400">
                                Supported format: CDR only (Max 500MB)
                            </p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center space-y-3">
                            {/* File name badge */}
                            <div className="px-4 py-2 bg-blue-900 text-blue-200 font-semibold rounded-lg shadow">
                                📂 {file.name}
                            </div>
                            {/* Remove button */}
                            <button
                                onClick={() => setFile(null)}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
                            >
                                ❌ Remove File
                            </button>
                        </div>
                    )}
                </div>

                {/* Output Format */}
                <div className="mb-5">
                    <div className="mb-6 max-w-96">
                        <label className="block mb-2 text-gray-300">Output Format</label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                        >
                            {SUPPORTED_FORMATS.map((f) => (
                                <option key={f} value={f}>{f.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={(e) => setAccessKeyToken(e.target.value)}
                            value={accessKeyToken}
                            placeholder="Input Access Key Token"
                            className="h-20 w-full px-4 bg-gray-800 rounded-lg outline-none text-left text-xs text-gray-100 placeholder-gray-500 border border-gray-700 focus:ring-2 focus:ring-blue-500 align-top"
                        />
                    </div>
                </div>

                {/* Convert button */}
                <button
                    onClick={handleUploadConvert}
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "⏳ Processing..." : "Convert Files"}
                </button>

                {/* Download link */}
                {downloadUrl && (
                    <div className="mt-4 text-center">
                        <a
                            href={downloadUrl}
                            download
                            className="inline-block px-6 py-2 bg-green-600 rounded hover:bg-green-700"
                        >
                            ⬇ Download {format.toUpperCase()} File
                        </a>
                    </div>
                )}

                {/* Info cards */}
                <PremiumHighlightsDisplay />
            </div>
        </div>
    );
};

export default CDRConverter;
