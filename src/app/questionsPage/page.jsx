'use client';

import { useSearchParams } from "next/navigation";
import FRQuestion from "../components/FRQuestion";
import MultipleChoice from "../components/MultipleChoice";
import MultiSelect from "../components/MultiSelect";
import FillInTheBlanks from "../components/FillInTheBlanks";
import { useState, useEffect } from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const questionId = searchParams.get('id'); // Assuming you pass the question ID as a query parameter

    const QUESTION_COMPONENTS = {
        "free-response": FRQuestion,
        "multiple-choice": MultipleChoice,
        "multi-select": MultiSelect,
        "fill-in-the-blanks": FillInTheBlanks,
    };

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [QuestionComponent, setQuestionComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the JSON data in useEffect
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                console.log('Fetching questions.json from /data/questions.json');
                const response = await fetch('/public/questions.json');
                console.log('Fetch response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setQuestions(data);

                if (questionId) {
                    const selectedQuestion = data.find(q => q.id === questionId);
                    if (selectedQuestion) {
                        setCurrentQuestion(selectedQuestion);
                        if (selectedQuestion.type) {
                            const component = QUESTION_COMPONENTS[selectedQuestion.type.toLowerCase()];
                            if (component) {
                                setQuestionComponent(() => component);
                            } else {
                                setError(`Unknown question type: ${selectedQuestion.type}`);
                            }
                        }
                    } else {
                        setError(`Question with id "${questionId}" not found.`);
                    }
                } else {
                    setError('No question ID provided in the URL.');
                }
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Failed to load questions data.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [questionId]);

    // Loading state
    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    // Error state
    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    // Render the question
    return (
        <div className="p-4">
            <h2 className="text-xl">{currentQuestion.title}</h2>
            <p className="w-3/4 my-10">{currentQuestion.question}</p>
            {QuestionComponent ? (
                <QuestionComponent questionData={currentQuestion} />
            ) : (
                <div className="text-red-500">No component found for this question type.</div>
            )}
        </div>
    );
}
