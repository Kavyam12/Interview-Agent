import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Loader2, Send, AlertCircle, Save } from "lucide-react"
import { Button } from "../components/ui/Button"
import Stepper from "../components/interview/Stepper" // Assuming we want the stepper here too? Maybe step 3? Let's assume step 3 for now or just generic header.

export default function Problems() {
    const navigate = useNavigate()
    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(true)
    const [answers, setAnswers] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProblems()
    }, [])

    const fetchProblems = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:8080/problems", {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            })
            // Assuming response.data is an array of problems
            setProblems(response.data || [])
            setLoading(false)
        } catch (err) {
            console.error("Failed to fetch problems:", err)
            setError("Failed to load problems. Please try again later.")
            setLoading(false)
        }
    }

    const handleAnswerChange = (problemId, value) => {
        setAnswers(prev => ({
            ...prev,
            [problemId]: value
        }))
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const token = localStorage.getItem("token")
            await axios.post("http://localhost:8080/problems/submit", { answers }, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            })
            alert("Solutions submitted successfully!")
            // navigate('/dashboard') or somewhere?
        } catch (err) {
            console.error("Submission failed:", err)
            alert("Failed to submit answers.")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading challenges...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-12 bg-gray-50/50">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-6xl mx-auto pt-10 px-6 relative z-10">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Coding Challenges</h1>
                        <p className="text-gray-500 mt-2">Solve the following problems to demonstrate your skills.</p>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit All Solutions
                                <Send className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>

                {error ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                        <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Problems</h3>
                        <p className="text-red-600 mb-6">{error}</p>
                        <Button onClick={fetchProblems} variant="outline" className="bg-white">
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-8 pb-10">
                        {problems.length === 0 ? (
                            <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/60">
                                <p className="text-gray-500 text-lg">No problems available at the moment.</p>
                            </div>
                        ) : (
                            problems.map((problem) => (
                                <div key={problem.id} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-indigo-100/40 border border-white/60 overflow-hidden transition-all hover:shadow-indigo-200/50">
                                    <div className="p-6 md:p-8 border-b border-gray-100/50">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-gray-900">{problem.title || `Problem ${problem.id}`}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${problem.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {problem.difficulty || 'Medium'}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            {problem.description || "No description provided."}
                                        </p>
                                    </div>
                                    <div className="p-6 md:p-8 bg-gray-50/30">
                                        <label htmlFor={`answer-${problem.id}`} className="block text-sm font-medium text-gray-700 mb-3">
                                            Your Solution / Code
                                        </label>
                                        <textarea
                                            id={`answer-${problem.id}`}
                                            className="w-full min-h-[150px] p-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm transition-all resize-y shadow-sm"
                                            placeholder="// Write your solution here..."
                                            value={answers[problem.id] || ""}
                                            onChange={(e) => handleAnswerChange(problem.id, e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}