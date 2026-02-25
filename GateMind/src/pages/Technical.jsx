import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Stepper from "../components/interview/Stepper"
import { Button } from "../components/ui/Button"
import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react"
import { mockQuestions } from "../data/mockData"

export default function Technical() {
    const navigate = useNavigate()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState({})

    const currentQuestion = mockQuestions[currentQuestionIndex]
    const totalQuestions = mockQuestions.length
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1)
        }
    }

    const handleAnswerChange = (e) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/screening/technical/submit", { answers }, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            alert("Technical assessment answers submitted successfully!");
            navigate('/problems');
        } catch (error) {
            console.error("Technical submission failed:", error);
            alert("Failed to submit answers. Proceeding to problems round for demo.");
            navigate('/problems');
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-12 bg-gray-50/50">
            {/* Background Blobs - Consitent with other pages */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-5xl mx-auto pt-16 px-6 relative z-10">
                <div className="mb-16">
                    <Stepper currentStep={2} />
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Technical Assessment</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100/50 p-8 md:p-12 max-w-4xl mx-auto border border-white/60 min-h-[500px] flex flex-col transition-all">

                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {currentQuestion.question}
                        </h2>

                        <div className="mb-6">
                            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Answer
                            </label>
                            <textarea
                                id="answer"
                                rows={10}
                                className="w-full rounded-xl border-gray-200 bg-white/50 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm p-4 text-gray-800 placeholder-gray-400 resize-none font-mono"
                                placeholder="Type your answer here..."
                                value={answers[currentQuestion.id] || ""}
                                onChange={handleAnswerChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className="px-6"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>

                        {isLastQuestion ? (
                            <Button
                                onClick={handleSubmit}
                                className="px-8 bg-indigo-600 hover:bg-indigo-700"
                            >
                                Submit Assessment
                                <Send className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                className="px-8 bg-black text-white hover:bg-gray-800"
                            >
                                Next
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
