import { Brain } from "lucide-react"
import { Link } from "react-router-dom"

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="text-center mb-8 relative">
                <div className="bg-indigo-600/10 backdrop-blur-md border border-indigo-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20 transform hover:scale-110 transition-transform duration-300">
                    <Brain className="text-indigo-600 w-9 h-9" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">GateMind</span>
                </h1>
                <p className="text-gray-500 font-medium tracking-wide">AI-Driven Interview System</p>
            </div>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-white/50 relative z-10 transition-all hover:shadow-indigo-500/10 hover:border-indigo-100">
                <div className="p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-500 max-w-sm mx-auto leading-relaxed font-medium">
                By continuing, you agree to our <a href="#" className="text-indigo-600 hover:text-indigo-500 hover:underline transition-colors">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500 hover:underline transition-colors">Privacy Policy</a>
            </div>
        </div>
    )
}
