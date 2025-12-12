import axios from "axios";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import PremiumFeaturesBanner from "../components/conversion/PremiumFeaturesBanner";
import PremiumHighlightsDisplay from "../components/conversion/PremiumHighlightsDisplay";
import ProcessStepsDisplay from "../components/conversion/ProcessStepsDisplay";
import StatsDisplay from "../components/conversion/StatsDisplay";
import { toast } from "react-toastify";

const SUPPORTED_FORMATS = ["pdf", "png", "svg", "ps", "tiff", "jpg"];

const CDRConverter = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState("pdf");
    const [loading, setLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

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

    // Smooth progress simulation for conversion
    const simulateProgress = () => {
        let current = 0;
        const interval = setInterval(() => {
            if (current < 95) {
                current += Math.random() * 2 + 0.5;
                if (current > 95) current = 95;
                setProgress(Math.floor(current));
            } else {
                clearInterval(interval);
            }
        }, 150);
        return interval;
    };

    const handleUploadConvert = async () => {
        if (!file) return toast.warning("Please select a CDR file!");
        if (!SUPPORTED_FORMATS.includes(format)) return toast.warning("output format!");

        setLoading(true);
        setProgress(0);
        setDownloadUrl(null);

        const progressInterval = simulateProgress();

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("output_format", format);

            const res = await axios.post(import.meta.env.VITE_BACKEND_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            clearInterval(progressInterval);
            setProgress(100);

            if (res?.data?.success && res?.data?.downloadUrl) {
                setDownloadUrl(res.data.downloadUrl);
            } else {
                toast.error("Conversion failed: " + (res?.data?.message || "Unknown error"));
            }

            setFile(null);
        } catch (err) {
            clearInterval(progressInterval);
            setProgress(0);
            toast.error("Error: " + (err?.response?.data?.error || err?.message));
        } finally {
            setLoading(false);
        }
    };

    // Real-time download with progress
    const handleDownload = async () => {
        if (!downloadUrl) return;
        setDownloading(true);
        setDownloadProgress(0);

        try {
            const res = await axios.get(downloadUrl, {
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {
                    const total = progressEvent.total;
                    if (total) {
                        const percent = Math.floor((progressEvent.loaded / total) * 100);
                        setDownloadProgress(percent);
                    }
                },
            });

            // Create a blob and download
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `converted.${format}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error("Download failed: " + (err?.message || "Unknown error"));
        } finally {
            setDownloading(false);
            setDownloadProgress(0);
            setFormat("pdf");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c] flex flex-col items-center justify-center px-4 py-16 text-gray-200">
            <div className="max-w-5xl w-full bg-gradient-to-b from-[#121826] to-[#0e1629] rounded-2xl shadow-2xl p-8">
                {/* Top Stats */}
                <PremiumFeaturesBanner />
                <StatsDisplay />
                <ProcessStepsDisplay />

                {/* Upload Area */}
                <div
                    className={`border-2 border-dashed rounded-xl p-10 text-center mb-8 transition-all duration-300
                    ${dragActive ? "border-blue-400 bg-blue-900/20 scale-[1.02]" : "border-gray-600 hover:border-blue-500 hover:bg-[#1a2237]"}`
                    }
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {!file ? (
                        <>
                            <Upload className="w-16 h-16 text-blue-400 mx-auto mb-6 animate-pulse" />
                            <p className="mb-2 text-2xl font-semibold">Drag & Drop your .CDR file here</p>
                            <p className="text-gray-500 mb-6">or</p>
                            <label className="cursor-pointer">
                                <span className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-lg font-semibold transition-all shadow-md">
                                    Browse Files
                                </span>
                                <input type="file" accept=".cdr" className="hidden" onChange={handleFileChange} />
                            </label>
                            <p className="text-xs mt-6 text-gray-400 italic">
                                Supported format: CDR only (Max 500MB)
                            </p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center space-y-3">
                            <div className="px-5 py-2 bg-blue-900/40 border border-blue-500/40 text-blue-200 font-medium rounded-lg">
                                📂 {file.name}
                            </div>
                            <button
                                onClick={() => setFile(null)}
                                className="px-4 py-1 text-sm bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
                            >
                                ❌ Remove File
                            </button>
                        </div>
                    )}
                </div>

                {/* Output Format + Convert Button */}
                <div className="mb-8 grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2 text-gray-300 font-medium">Output Format</label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="w-full p-3 h-14 border-2 border-gray-500 rounded-lg overflow-hidden text-white font-semibold bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            {SUPPORTED_FORMATS.map((f) => (
                                <option key={f} value={f}>{f.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    {/* Convert Button with Progress */}
                    <div className="flex items-end">
                        <button
                            onClick={handleUploadConvert}
                            disabled={loading}
                            className="relative w-full h-14 border-2 border-gray-500 rounded-lg overflow-hidden text-white font-semibold"
                        >
                            {loading && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-150"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            )}
                            <span className="relative z-10 flex items-center justify-center w-full h-full">
                                {loading ? `${progress}%` : "🚀 Convert Files"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Download Button with Real Progress */}
                {downloadUrl && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="relative inline-block w-full md:w-1/2 h-14 border-2 border-gray-500 rounded-lg overflow-hidden text-white font-semibold px-6"
                        >
                            {downloading && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-150"
                                    style={{ width: `${downloadProgress}%` }}
                                ></div>
                            )}
                            <span className="relative z-10 flex items-center justify-center w-full h-full">
                                {downloading ? `${downloadProgress}%` : `⬇ Download ${format.toUpperCase()} File`}
                            </span>
                        </button>
                    </div>
                )}

                <PremiumHighlightsDisplay />
            </div>

            {/* SEO & Content Sections */}
            <Helmet>
                <title>Online CDR Converter - Convert CDR to PDF, AI, JPG & More Free</title>
                <meta
                    name="description"
                    content="Free Online CDR Converter. Quickly convert CorelDRAW (.cdr) files to PDF, AI, PNG, JPG, EPS, and SVG formats in seconds. Fast, secure, and easy to use."
                />
            </Helmet>

            {/* Hero Section */}
            <div className="max-w-5xl w-full mt-10 bg-gradient-to-b from-[#121826] to-[#0e1629] rounded-2xl shadow-2xl p-10 text-center">
                <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Fast and Free Online CDR Converter
                </h1>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Welcome to the ultimate solution for your CorelDRAW® file conversion needs. Our online
                    CDR Converter allows you to transform your .cdr files into universally supported formats
                    like PDF, AI, JPG, PNG, and more — all for free!
                </p>
                <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Whether you need to share a vector graphic with a client who doesn’t have CorelDRAW, or
                    import a design into Adobe Illustrator, our tool ensures a seamless, high-quality conversion every time.
                </p>
            </div>

            {/* Key Benefits */}
            <section className="mt-8 py-10 px-6 max-w-5xl w-full bg-gradient-to-b from-[#121826] to-[#0f1423] text-gray-200 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-semibold mb-4 text-blue-300">Key Benefits</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-400">
                    <li>💰 100% Free & Online — No software installation or sign-up required.</li>
                    <li>🎨 High-Quality Vector Output — Preserve the clarity and accuracy of your designs.</li>
                    <li>🔒 Maximum Security — Files are encrypted and auto-deleted after conversion.</li>
                    <li>⚡ Bulk Conversion — Convert multiple CorelDRAW files at once to save time.</li>
                </ul>
            </section>

            {/* Supported Formats */}
            <section className="mt-8 py-10 px-6 max-w-5xl w-full bg-gradient-to-b from-[#121826] to-[#0f1423] text-gray-200 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">CDR Conversion Made Easy: Supported Formats</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-700 rounded-lg text-left">
                        <thead className="bg-[#1b2743] text-gray-300">
                            <tr>
                                <th className="p-3 border-b border-gray-700 text-nowrap">Target Format</th>
                                <th className="p-3 border-b border-gray-700 ">Best Use Case</th>
                                <th className="p-3 border-b border-gray-700">SEO Keywords</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[["CDR to AI", "For editing in Adobe Illustrator and professional vector workflows.", "CDR to AI converter, CorelDRAW to Illustrator"],
                            ["CDR to PDF", "For easy sharing, printing, and universal document viewing.", "CDR to PDF free, vector PDF conversion"],
                            ["CDR to JPG", "For web use, social media, and low-resolution previews.", "CDR to JPG online, CorelDRAW to image"],
                            ["CDR to PNG", "For graphics with transparent backgrounds.", "CDR to PNG converter, transparent background"],
                            ["CDR to SVG", "For web-friendly, scalable vector graphics.", "CDR to SVG online, CorelDRAW vector converter"],
                            ["CDR to EPS", "For use in print production and other graphic design software.", "CDR to EPS conversion"]].map(([f, use, seo], i) => (
                                <tr key={i} className="border-b border-gray-700 hover:bg-[#1b2743]/40 transition">
                                    <td className="p-3 font-semibold">{f}</td>
                                    <td className="p-3 text-gray-400">{use}</td>
                                    <td className="p-3 text-gray-500">{seo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* How It Works */}
            <section className="mt-8 py-10 px-6 max-w-5xl w-full bg-gradient-to-b from-[#121826] to-[#0f1423] text-gray-200 rounded-2xl shadow-2xl mb-10">
                <h2 className="text-3xl font-bold mb-8 text-blue-300">Convert Your .CDR File in 3 Simple Steps</h2>
                <div className="space-y-6 text-gray-400 text-lg">
                    <p><strong className="text-gray-100">1. Upload File:</strong> Drag and drop your .cdr file into the upload area or click the upload button.</p>
                    <p><strong className="text-gray-100">2. Select Format:</strong> Choose your desired output format (e.g., AI, PDF, or JPG).</p>
                    <p><strong className="text-gray-100">3. Download:</strong> Wait a few seconds for conversion, then download your new file!</p>
                </div>
            </section>
        </div>
    );


};

export default CDRConverter;
