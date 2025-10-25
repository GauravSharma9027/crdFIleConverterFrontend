import React, { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import StatsDisplay from "../components/conversion/StatsDisplay";
import PremiumFeaturesBanner from "../components/conversion/PremiumFeaturesBanner";
import PremiumHighlightsDisplay from "../components/conversion/PremiumHighlightsDisplay";
import ProcessStepsDisplay from "../components/conversion/ProcessStepsDisplay";
import { Helmet } from "react-helmet";

const SUPPORTED_FORMATS = ["pdf", "png", "svg", "ps", "tiff", "jpg"];

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
                setFile("");
                setFormat("");
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
        <div className="min-h-screen bg-[#0a0f1c] flex flex-col items-center justify-center px-4 py-16">
            <div className="max-w-5xl w-full bg-[#121826] text-gray-200 rounded-2xl shadow-xl p-6">

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

            <div className="max-w-5xl w-full bg-[#121826] text-gray-200 rounded-2xl mt-8">
                {/* ✅ SEO Optimization */}
                <Helmet>
                    <title>
                        Online CDR Converter - Convert CDR to PDF, AI, JPG & More Free
                    </title>
                    <meta
                        name="description"
                        content="Free Online CDR Converter. Quickly convert CorelDRAW (.cdr) files to PDF, AI, PNG, JPG, EPS, and SVG formats in seconds. Fast, secure, and easy to use."
                    />
                </Helmet>

                {/* ✅ Hero Section */}
                <section className=" py-16 px-6 text-center ">
                    <h1 className="text-4xl md:text-6xl font-extrabold  mb-4">
                        Fast and Free Online CDR <br /> Converter
                    </h1>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed mt-10">
                        Welcome to the ultimate solution for your CorelDRAW® file conversion
                        needs. Our online CDR Converter allows you to transform your .cdr
                        files into universally supported formats like PDF, AI, JPG, PNG, and
                        more — all for free!
                    </p>

                    <div className="max-w-2xl mx-auto mt-6 text-gray-500 leading-relaxed">
                        <p>
                            Whether you need to share a vector graphic with a client who doesn’t
                            have CorelDRAW, or import a design into Adobe Illustrator, our tool
                            ensures a seamless, high-quality conversion every time.
                        </p>
                    </div>
                    {/* ✅ CTA Button */}
                    {/* <div className="mt-10">
                        <button className="bg-blue-600 hover:bg-blue-700 text-gray-200 font-semibold px-8 py-3 rounded-full shadow-md transition">
                            Upload File / Start Converting
                        </button>
                    </div> */}
                </section>
            </div>

            {/* ✅ Key Benefits */}
            <section className="mt-8 py-10 px-6 max-w-5xl w-full bg-[#121826] text-gray-200 rounded-2xl">
                <div className="text-left mx-auto">
                    <h2 className="text-3xl font-semibold mb-3">
                        Key Benefits:
                    </h2>
                    <ul className="list-disc pl-6 mt-4 text-gray-500 space-y-2">
                        <li>💰 100% Free & Online — No software installation or sign-up required.</li>
                        <li>🎨 High-Quality Vector Output — Preserve the clarity and accuracy of your designs.</li>
                        <li>🔒 Maximum Security — Files are encrypted and auto-deleted after conversion.</li>
                        <li>⚡ Bulk Conversion — Convert multiple CorelDRAW files at once to save time.</li>
                    </ul>
                </div>
            </section>
            {/* ✅ Supported Formats Section */}
            <section className="mt-8 py-10 px-6 max-w-5xl w-full bg-[#121826] text-gray-200 rounded-2xl">
                <h2 className="text-3xl font-bold mb-8">
                    CDR Conversion Made Easy: Supported Formats
                </h2>
                <div className="max-w-5xl mx-auto overflow-x-auto">
                    <table className="min-w-full border text-left">
                        <thead className="bg-[#152341]">
                            <tr>
                                <th className="p-3 border-b">Target Format</th>
                                <th className="p-3 border-b">Best Use Case</th>
                                <th className="p-3 border-b">SEO Keywords</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b text-gray-500">
                                <td className="p-3 font-medium">CDR to AI</td>
                                <td className="p-3">
                                    For editing in Adobe Illustrator and professional vector
                                    workflows.
                                </td>
                                <td className="p-3">CDR to AI converter, CorelDRAW to Illustrator</td>
                            </tr>
                            <tr className="border-b text-gray-500">
                                <td className="p-3 font-medium">CDR to PDF</td>
                                <td className="p-3">
                                    For easy sharing, printing, and universal document viewing.
                                </td>
                                <td className="p-3">CDR to PDF free, vector PDF conversion</td>
                            </tr>
                            <tr className="border-b text-gray-500">
                                <td className="p-3 font-medium">CDR to JPG</td>
                                <td className="p-3">
                                    For web use, social media, and low-resolution previews.
                                </td>
                                <td className="p-3">CDR to JPG online, CorelDRAW to image</td>
                            </tr>
                            <tr className="border-b text-gray-500">
                                <td className="p-3 font-medium">CDR to PNG</td>
                                <td className="p-3">
                                    For graphics with transparent backgrounds.
                                </td>
                                <td className="p-3">CDR to PNG converter, transparent background</td>
                            </tr>
                            <tr className="border-b text-gray-500">
                                <td className="p-3 font-medium">CDR to SVG</td>
                                <td className="p-3">
                                    For web-friendly, scalable vector graphics.
                                </td>
                                <td className="p-3">
                                    CDR to SVG online, CorelDRAW vector converter
                                </td>
                            </tr>
                            <tr className="text-gray-500">
                                <td className="p-3 font-medium">CDR to EPS</td>
                                <td className="p-3">
                                    For use in print production and other graphic design software.
                                </td>
                                <td className="p-3">CDR to EPS conversion</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            {/* ✅ How It Works Section */}
            <section className="mt-8 py-10 px-6 max-w-5xl w-full bg-[#121826] text-gray-200 rounded-2xl">
                <h2 className="text-3xl font-bold text-gray-200 mb-8">
                    Convert Your .CDR File in 3 Simple Steps
                </h2>
                <div className=" space-y-6 text-gray-500 text-lg">
                    <p>
                        <strong className="text-gray-200">1. Upload File:</strong> Drag and drop your .cdr file into
                        the upload area or click the upload button.
                    </p>
                    <p>
                        <strong className="text-gray-200">2. Select Format:</strong> Choose your desired output format
                        (e.g., AI, PDF, or JPG).
                    </p>
                    <p>
                        <strong className="text-gray-200">3. Download:</strong> Wait a few seconds for the conversion
                        to complete, and then download your new file!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default CDRConverter;
