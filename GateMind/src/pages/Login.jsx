import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react"
import AuthLayout from "../components/layout/AuthLayout"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import axios from "axios"

export default function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:8080/auth/login", formData)
            const token = response.data.token; // adjust if your backend returns it differently

            if (token) {
                localStorage.setItem("token", token)
                navigate('/screening')
            } else {
                throw new Error("No token received")
            }
        } catch (error) {
            console.error("Login failed:", error)
            alert("Login failed. Please check your credentials.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Enter your credentials to continue"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 group transition-all" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        <>
                            Sign In
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>

                <div className="text-center pt-2">
                    <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium hover:underline">
                        Don't have an account? Register
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}
