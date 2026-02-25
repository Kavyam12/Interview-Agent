import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState } from "react"
import Stepper from "../components/interview/Stepper"
import FileUpload from "../components/interview/FileUpload"
import { Button } from "../components/ui/Button"
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import * as pdfjsLib from 'pdfjs-dist';

function ScreeningForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 text-left">
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Background & Experience</h4>

                <div className="space-y-2">
                    <label htmlFor="q1" className="text-sm font-medium text-gray-700">
                        1. Background–Role Fit: How does your previous experience directly relate to this role?
                    </label>
                    <textarea
                        id="q1"
                        name="q1"
                        required
                        className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        placeholder="Describe your relevant background..."
                        value={formData.q1}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="q2" className="text-sm font-medium text-gray-700">
                        2. Project Evidence: Describe a specific project where you demonstrated skills relevant to this position.
                    </label>
                    <textarea
                        id="q2"
                        name="q2"
                        required
                        className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        placeholder="Detail a key project..."
                        value={formData.q2}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Motivation</h4>

                <div className="space-y-2">
                    <label htmlFor="q3" className="text-sm font-medium text-gray-700">
                        3. Why this role? What specifically attracts you to this opportunity?
                    </label>
                    <textarea
                        id="q3"
                        name="q3"
                        required
                        className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        placeholder="Share your motivation..."
                        value={formData.q3}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="q4" className="text-sm font-medium text-gray-700">
                        4. Learning Drive: Describe a time you went above and beyond to learn something new for a project.
                    </label>
                    <textarea
                        id="q4"
                        name="q4"
                        required
                        className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        placeholder="Give an example of your learning drive..."
                        value={formData.q4}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Communication</h4>

                <div className="space-y-2">
                    <label htmlFor="q5" className="text-sm font-medium text-gray-700">
                        5. Explain a complex technical concept simply (as if to a non-technical person).
                    </label>
                    <textarea
                        id="q5"
                        name="q5"
                        required
                        className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        placeholder="Explain a concept..."
                        value={formData.q5}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-base mt-6">
                Submit & Proceed to Technical Round
            </Button>
        </form>
    );
}

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function Screening() {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [status, setStatus] = useState("idle") // idle, analyzing, success, rejected, error
    const [analysisResult, setAnalysisResult] = useState(null)

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile)
        setStatus("idle")
        setAnalysisResult(null)
    }

    const handleRemoveFile = () => {
        setFile(null)
        setStatus("idle")
        setAnalysisResult(null)
    }

    const extractTextFromPDF = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }
        return fullText;
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setStatus("analyzing");

        try {
            const text = await extractTextFromPDF(file);

            const prompt = `
You are an AI resume screening system.

Analyze the following resume text.

Return ONLY valid JSON in the exact structure below.
No markdown. No explanations. No extra text.

{
  "ats_score": number (0-100),
  "skills": string[],
  "experience_summary": string,
  "projects_summary": string,
  "strengths": string[],
  "weaknesses": string[],
  "eligibility": "PASS" | "FAIL"
}

Resume text:
${text}
            `;

            const API_KEY = import.meta.env.VITE_GROQ_API_KEY?.trim();

            if (!API_KEY) {
                console.warn("Missing Groq API Key - Using Mock Analysis for Demo");
                const mockResult = {
                    "ats_score": 85,
                    "skills": ["React", "Node.js", "Java", "Spring Boot"],
                    "experience_summary": "Demonstrated expertise in modern web technologies and backend architecture.",
                    "projects_summary": "Successfully led multiple high-impact technical projects.",
                    "strengths": ["Full-stack proficiency", "Scalable design patterns"],
                    "weaknesses": ["Could improve documentation habits"],
                    "eligibility": "PASS"
                };
                setTimeout(() => {
                    setAnalysisResult(mockResult);
                    setStatus("success");
                }, 1500);
                return;
            }

            const url = "https://api.groq.com/openai/v1/chat/completions";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    model: "llama-3.3-70b-versatile",
                    response_format: { type: "json_object" }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Groq API Error details:", response.status, errorText);
                throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            const messageContent = data.choices?.[0]?.message?.content;

            if (!messageContent) throw new Error("No response content from Groq");

            const result = JSON.parse(messageContent);

            setAnalysisResult(result);
            console.log("Full Analysis Result:", result);

            if (result.eligibility === "PASS") {
                setStatus("success");
            } else {
                setStatus("rejected");
            }

        } catch (error) {
            console.error("Analysis failed:", error);
            setStatus("error");
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-12">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            {/* Top Navigation / Header could go here */}
            <div className="max-w-5xl mx-auto pt-16 px-6 relative z-10">
                {/* Stepper */}
                <div className="mb-16">
                    <Stepper currentStep={1} />
                </div>

                {/* Main Content Card */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Screening Round</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">Upload your resume to begin the AI-powered evaluation process. We're looking for patterns that match our high standards.</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100/50 p-8 md:p-12 max-w-3xl mx-auto border border-white/60 min-h-[400px] flex flex-col justify-center transition-all hover:shadow-indigo-500/5">

                    {status === "analyzing" ? (
                        <div className="flex flex-col items-center animate-in fade-in duration-500">
                            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing your resume...</h3>
                            <p className="text-sm text-gray-500">Our AI is evaluating your qualifications and experience</p>
                        </div>
                    ) : status === "success" ? (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500 w-full">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Analyzed Successfully</h3>
                            <p className="text-sm text-gray-500 mb-6">You are eligible for the Technical Round. Please answer the following questions to proceed.</p>

                            {analysisResult && (
                                <div className="mb-8 bg-green-50 p-4 rounded-lg text-left w-full max-w-2xl">
                                    <p className="font-medium text-green-800">ATS Score: {analysisResult.ats_score}/100</p>
                                    <p className="text-sm text-green-700 mt-1">{analysisResult.experience_summary}</p>
                                </div>
                            )}

                            <ScreeningForm onSubmit={async (data) => {
                                try {
                                    const token = localStorage.getItem("token");
                                    const payload = {
                                        resumeAnalysis: analysisResult,
                                        answers: data
                                    };

                                    console.log("Sending data to backend:", payload);

                                    await axios.post("http://localhost:8080/screening", payload, {
                                        headers: token ? { Authorization: `Bearer ${token}` } : {}
                                    });

                                    navigate('/technical');
                                } catch (error) {
                                    console.error("Backend submission failed:", error);
                                    alert("Backend submission failed (check console). Proceeding to next round for demo.");
                                    navigate('/technical');
                                }
                            }} />
                        </div>
                    ) : status === "rejected" ? (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Update</h3>
                            <p className="text-sm text-gray-500 mb-6">Unfortunately, your profile does not meet our current requirements.</p>
                            {analysisResult && (
                                <div className="mb-6 bg-red-50 p-4 rounded-lg text-left w-full">
                                    <p className="font-medium text-red-800">ATS Score: {analysisResult.ats_score}/100</p>
                                    <h4 className="font-semibold text-red-700 mt-2 text-sm">Feedback:</h4>
                                    <ul className="list-disc list-inside text-sm text-red-600 mt-1">
                                        {(analysisResult.weaknesses || []).slice(0, 3).map((w, i) => (
                                            <li key={i}>{w}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <Button onClick={handleRemoveFile} variant="outline" className="mt-2">
                                Upload Different Resume
                            </Button>
                        </div>
                    ) : status === "error" ? (
                        <div className="flex flex-col items-center animate-in fade-in duration-500">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Failed</h3>
                            <p className="text-sm text-gray-500 mb-6">There was an error processing your resume. Please try again.</p>
                            <Button onClick={() => setStatus("idle")} variant="outline">
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <FileUpload
                                selectedFile={file}
                                onFileSelect={handleFileSelect}
                                onRemoveFile={handleRemoveFile}
                            />

                            {file && (
                                <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
                                    <Button
                                        onClick={handleAnalyze}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-base shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 hover:translate-y-[-1px]"
                                    >
                                        Analyze Resume
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
