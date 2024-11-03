import { useState, useEffect } from "react";

export default function MultipleChoice({ questionData }) {
    const [choices, setChoices] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        // Convert answer choices to an array if they are a string
        let parsedChoices = questionData["answer-choice"];
        if (typeof parsedChoices === 'string') {
            try {
                parsedChoices = JSON.parse(parsedChoices); // Try JSON parsing if it's a JSON-like array string
            } catch {
                parsedChoices = parsedChoices.substring(2, parsedChoices.length-2).split('", "').map(choice => choice.trim()); // Otherwise, split by commas
            }
        }
        setChoices(parsedChoices || []);
    }, [questionData]);

    const handleSelect = (choice) => {
        setSelectedAnswer(choice);
    };

    const handleSubmit = () => {
        const correctAnswer = questionData.answer.substring(2,questionData.answer.length-2)
        if (selectedAnswer === correctAnswer){
            setIsSubmitted(true);
            setIsCorrect(true);
        } else {
            setIsSubmitted(true);
            setIsCorrect(false);
        }
        
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2">
                {choices.map((choice, index) => (
                    <label
                    key={index}
                    className={`flex items-center p-2 rounded-lg border cursor-pointer ${
                        selectedAnswer === choice ? 'bg-primary/20' : 'bg-primary-100'
                    } hover:bg-secondary`}
                >
                    <input
                        type="radio"
                        name="choices"
                        value={choice}
                        onChange={() => handleSelect(choice)}
                        checked={selectedAnswer === choice}
                        className="mr-2"
                    />
                    <span>{choice}</span>
                </label>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                disabled={!selectedAnswer}
            >
                Submit
            </button>
            {isSubmitted && (
                <div className="mt-4 text-lg">
                    {isCorrect ? (
                        <p className="text-green-500">Correct!</p>
                    ) : (
                        <p className="text-red-500">Incorrect. Try again!</p>
                    )}
                </div>
            )}
        </div>
    );
}
