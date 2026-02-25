import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react"
import AuthLayout from "../components/layout/AuthLayout"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import axios from "axios"

export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
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
            await axios.post("http://localhost:8080/auth/register", formData)
            // On success, redirect to login
            navigate('/login')
        } catch (error) {
            console.error("Registration failed:", error)
            alert("Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Register to start your interview"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

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
                            Creating Account...
                        </>
                    ) : (
                        <>
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>

                <div className="text-center pt-2">
                    <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium hover:underline">
                        Already have an account? Sign In
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}
