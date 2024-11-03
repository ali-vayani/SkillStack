import { useState, useEffect } from "react";

export default function MultiSelect({ questionData }) {
    const [choices, setChoices] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    useEffect(() => {
        // Parse choices
        let parsedChoices = questionData["answer-choice"];
        if (typeof parsedChoices === 'string') {
            try {
                parsedChoices = JSON.parse(parsedChoices);
            } catch {
                parsedChoices = parsedChoices
                    .substring(2, parsedChoices.length - 2)
                    .split('", "')
                    .map(choice => choice.trim());
            }
        }
        setChoices(parsedChoices || []);
        
        // Parse correct answers
        let parsedAnswers = questionData.answer;
        if (typeof parsedAnswers === 'string') {
            try {
                parsedAnswers = JSON.parse(parsedAnswers); // Try to parse as JSON
            } catch {
                parsedAnswers = parsedAnswers
                    .substring(2, parsedAnswers.length - 2)
                    .split('", "')
                    .map(answer => answer.trim());
            }
        }
        setCorrectAnswers(parsedAnswers || []);
        console.log("Parsed Choices:", parsedChoices); // Debugging line
        console.log("Parsed Correct Answers:", parsedAnswers);
    }, [questionData]);

    const handleSelect = (choice) => {
        setSelectedAnswers((prevSelected) => {
            if (prevSelected.includes(choice)) {
                // Deselect if already selected
                return prevSelected.filter(answer => answer !== choice);
            } else {
                // Add to selected answers
                return [...prevSelected, choice];
            }
        });
    };

    const handleSubmit = () => {
        console.log("Submitting answers:", selectedAnswers);
        console.log("Correct answers:", correctAnswers);

        // Check if selected answers match the correct answers
        const isAnswerCorrect = correctAnswers.length === selectedAnswers.length &&
            correctAnswers.every(answer => selectedAnswers.includes(answer));

        setIsCorrect(isAnswerCorrect);
        setIsSubmitted(true);
        console.log(isAnswerCorrect ? "All answers are correct!" : "Some answers are incorrect.");
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2">
                {choices.map((choice, index) => (
                    <label
                        key={index}
                        className={`flex items-center p-2 rounded-lg border cursor-pointer ${
                            selectedAnswers.includes(choice) ? 'bg-primary/20' : 'bg-primary-100'
                        } hover:bg-secondary`}
                    >
                        <input
                            type="checkbox"
                            name="choices"
                            value={choice}
                            onChange={() => handleSelect(choice)}
                            checked={selectedAnswers.includes(choice)}
                            className="mr-2"
                        />
                        <span>{choice}</span>
                    </label>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                disabled={selectedAnswers.length === 0}
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
