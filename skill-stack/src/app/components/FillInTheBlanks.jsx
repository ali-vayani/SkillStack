import { useState, useEffect } from "react";

export default function FillInTheBlanks({ questionData }) {
    const [fillBlank, setFillBlank] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        if (questionData && questionData["answer-choice"]) {
            setFillBlank(questionData["answer-choice"]);
            setUserAnswers(Array(questionData["answer-choice"].length).fill(""));
            setFeedback(Array(questionData["answer-choice"].length).fill(false));
        }
    }, [questionData]);

    const handleInputChange = (value, index) => {
        const newAnswers = [...userAnswers];
        newAnswers[index] = value;
        setUserAnswers(newAnswers);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        const correctAnswers = questionData.answer.map(ans => ans.trim().toLowerCase());
        const userResponses = userAnswers.map(ans => ans.trim().toLowerCase());
        const feedbackArray = userResponses.map((ans, index) => ans === correctAnswers[index]);
        setFeedback(feedbackArray);
        console.log("User Answers:", userAnswers);
        console.log("Feedback (Correct/Incorrect for each blank):", feedbackArray);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                {fillBlank.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <label htmlFor={`blank-${index}`} className="font-medium">
                            {item}
                        </label>
                        <input
                            id={`blank-${index}`}
                            type="text"
                            value={userAnswers[index]}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                            className={`p-2 border rounded-lg ${
                                isSubmitted
                                    ? feedback[index]
                                        ? "border-green-500"
                                        : "border-red-500"
                                    : "border-gray-300"
                            }`}
                            disabled={isSubmitted && feedback[index]}
                            placeholder="Enter binary number"
                        />
                        {isSubmitted && (
                            <p className={`mt-1 ${feedback[index] ? "text-green-500" : "text-red-500"}`}>
                                {feedback[index] ? "Correct!" : "Incorrect, try again."}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className={`mt-4 px-4 py-2 rounded-lg ${
                    userAnswers.some(answer => answer.trim() === "")
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                }`}
                disabled={userAnswers.some(answer => answer.trim() === "") || isSubmitted}
            >
                Submit
            </button>
            {isSubmitted && feedback.includes(false) && (
                <p className="mt-4 text-red-500">Some answers are incorrect. Please review and try again.</p>
            )}
            {isSubmitted && feedback.every(Boolean) && (
                <p className="mt-4 text-green-500">All answers are correct! Well done.</p>
            )}
        </div>
    );
}
