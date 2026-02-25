export const mockInterviews = [
    {
        id: 1,
        title: "Frontend Developer",
        description: "React.js & Modern CSS",
        status: "screening", // screening, technical, behavioral, completed
        date: "2024-03-15",
        score: null,
    },
    {
        id: 2,
        title: "Backend Engineer",
        description: "Node.js & Microservices",
        status: "completed",
        date: "2024-02-20",
        score: 85,
    },
    {
        id: 3,
        title: "Full Stack Engineer",
        description: "MERN Stack",
        status: "technical",
        date: "2024-03-10",
        score: null,
    }
];

export const mockUser = {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    role: "candidate",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    skills: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    experience: "3 years"
};

export const mockQuestions = [
    {
        id: "q1",
        question: "What is the difference between specificty and inheritance in CSS?",
        type: "technical",
    },
    {
        id: "q2",
        question: "Explain the concept of closures in JavaScript. Provide an example.",
        type: "technical",
    },
    {
        id: "q3",
        question: "What are React Hooks? Name three common hooks and their purposes.",
        type: "technical",
    },
    {
        id: "q4",
        question: "Describe the difference between '==' and '===' operators in JavaScript.",
        type: "technical",
    },
    {
        id: "q5",
        question: "What is the purpose of the 'useEffect' hook in React?",
        type: "technical",
    },
    {
        id: "q6",
        question: "Explain the difference between SQL and NoSQL databases.",
        type: "technical",
    },
    {
        id: "q7",
        question: "What is RESTful API? What are the standard HTTP methods used?",
        type: "technical",
    },
    {
        id: "q8",
        question: "What is the difference between 'null' and 'undefined' in JavaScript?",
        type: "technical",
    },
    {
        id: "q9",
        question: "Explain the concept of Promises and Async/Await in JavaScript.",
        type: "technical",
    },
    {
        id: "q10",
        question: "What is the Virtual DOM and how does it work in React?",
        type: "technical",
    }
];
