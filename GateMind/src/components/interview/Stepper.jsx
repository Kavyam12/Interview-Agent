import { Check, Circle, CircleDot } from "lucide-react"

const steps = [
    { id: 1, name: 'Screening', status: 'current' }, // status: current, complete, upcoming
    { id: 2, name: 'Technical', status: 'upcoming' },
    { id: 3, name: 'Problem Solving', status: 'upcoming' },
]

export default function Stepper({ currentStep = 1 }) {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-center space-x-4">
                {steps.map((step, index) => {
                    const isActive = step.id === currentStep
                    const isCompleted = step.id < currentStep
                    const isLast = index === steps.length - 1

                    return (
                        <div key={step.name} className="flex items-center relative z-10">
                            <div className="flex flex-col items-center relative group">
                                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${isActive ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-300 transform scale-110' : ''}
                  ${isCompleted ? 'border-green-500 bg-green-500 text-white shadow-md shadow-green-200' : ''}
                  ${!isActive && !isCompleted ? 'border-gray-200 bg-white/50 text-gray-400 backdrop-blur-sm' : ''}
                  transition-all duration-500 ease-out
                `}>
                                    {isCompleted ? (
                                        <Check className="w-5 h-5 animate-in zoom-in duration-300" />
                                    ) : isActive ? (
                                        <CircleDot className="w-5 h-5 animate-pulse" />
                                    ) : (
                                        <Circle className="w-5 h-5" />
                                    )}
                                </div>
                                <div className="absolute top-12 w-32 text-center pointer-events-none transition-all duration-300">
                                    <p className={`text-xs font-bold tracking-wide ${isActive ? 'text-indigo-700 scale-105' : isCompleted ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'}`}>
                                        {step.name}
                                    </p>
                                    <p className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`}>
                                        {isActive ? 'In Progress' : isCompleted ? 'Completed' : 'Pending'}
                                    </p>
                                </div>
                            </div>

                            {!isLast && (
                                <div className={`w-20 h-0.5 mx-2 transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
