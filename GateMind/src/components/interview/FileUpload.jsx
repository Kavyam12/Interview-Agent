import { useRef, useState } from "react"
import { Upload, FileText, X, AlertCircle } from "lucide-react"
import { Button } from "../ui/Button"

export default function FileUpload({ onFileSelect, selectedFile, onRemoveFile }) {
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null)

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (file) => {
        // Validate file type (PDF)
        if (file.type !== "application/pdf") {
            alert("Only PDF files are allowed")
            return
        }
        // Validate size (10MB = 10 * 1024 * 1024)
        if (file.size > 10 * 1024 * 1024) {
            alert("File size must be less than 10MB")
            return
        }
        onFileSelect(file)
    }

    const onButtonClick = () => {
        inputRef.current.click()
    }

    if (selectedFile) {
        return (
            <div className="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-center justify-between animate-in fade-in zoom-in duration-300">
                <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <button
                    onClick={onRemoveFile}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>
        )
    }

    return (
        <div
            className={`
        relative w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out flex flex-col items-center justify-center p-8 text-center cursor-pointer group
        ${dragActive
                    ? "border-indigo-500 bg-indigo-50/50 scale-[1.01] shadow-xl shadow-indigo-200/50"
                    : "border-gray-300/60 bg-white/50 hover:border-indigo-400 hover:bg-white/80 hover:shadow-lg hover:shadow-indigo-100/50"}
      `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
        >
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                multiple={false}
                accept=".pdf"
                onChange={handleChange}
            />

            <div className={`
                w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                ${dragActive ? 'bg-indigo-100' : 'bg-gradient-to-br from-indigo-50 to-white border border-indigo-100'}
            `}>
                <Upload className={`w-10 h-10 transition-colors ${dragActive ? 'text-indigo-600' : 'text-indigo-400 group-hover:text-indigo-600'}`} />
            </div>

            <div className="space-y-3 max-w-sm">
                <p className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                    Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Upload your resume in PDF format to get started with the AI screening process.
                </p>
                <div className="pt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                        PDF only • Max 10MB
                    </span>
                </div>
            </div>
        </div>
    )
}
