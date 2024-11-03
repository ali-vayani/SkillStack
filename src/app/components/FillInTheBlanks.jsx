import { useState, useEffect } from "react";

export default function FillInTheBlanks({ questionData }) {
    const [blanks, setBlanks] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        // Parse the blanks (correct answers)
        let parsedBlanks = questionData.answer;
        if (typeof parsedBlanks === 'string') {
            try {
                parsedBlanks = JSON.parse(parsedBlanks); // Try to parse as JSON
            } catch {
                parsedBlanks = parsedBlanks
                    .substring(2, parsedBlanks.length - 2)
                    .split('", "')
                    .map(answer => answer.trim());
            }
        }
        setBlanks(parsedBlanks || []);
        setUserAnswers(new Array(parsedBlanks.length).fill("")); // Initialize user answers with empty strings
        console.log("Parsed Blanks (Correct Answers):", parsedBlanks); // Debugging line
    }, [questionData]);

    const handleInputChange = (value, index) => {
        // Update the specific blank answer the user is typing in
        const newAnswers = [...userAnswers];
        newAnswers[index] = value;
        setUserAnswers(newAnswers);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        const feedbackArray = blanks.map((blank, index) => userAnswers[index].trim() === blank);
        setFeedback(feedbackArray);
        console.log("User Answers:", userAnswers);
        console.log("Feedback (Correct/Incorrect for each blank):", feedbackArray);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                {blanks.map((_, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <label>Blank {index + 1}:</label>
                        <input
                            type="text"
                            value={userAnswers[index]}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                            className="p-2 border rounded-lg"
                            disabled={isSubmitted && feedback[index]}
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
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                disabled={userAnswers.some(answer => answer.trim() === "") || isSubmitted}
            >
                Submit
            </button>
        </div>
    );
}
