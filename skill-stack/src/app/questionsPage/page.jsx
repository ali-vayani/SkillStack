'use client'
import { useSearchParams } from "next/navigation";
import FRQuestion from "../components/FRQuestion";
import MultipleChoice from "../components/MultipleChoice";
import { useState, useEffect } from "react";
import MultiSelect from "../components/MultiSelect";
import FillInTheBlanks from "../components/FillInTheBlanks";

export default function Page() {
    const searchParams = useSearchParams();
    const encodedData = searchParams.get('data');
    
    const QUESTION_COMPONENTS = {
        "free-response": FRQuestion,
        "multiple-choice": MultipleChoice,
        "multi-select": MultiSelect,
        "fill-in-the-blanks": FillInTheBlanks,
    };

    const [questionData, setQuestionData] = useState(null);
    const [QuestionComponent, setQuestionComponent] = useState(null);

    // Parse the data in useEffect
    useEffect(() => {
        if (encodedData) {
        try {
            const parsedData = JSON.parse(decodeURIComponent(encodedData));
            setQuestionData(parsedData);
            // Set component right after parsing data
            if (parsedData?.type) {
            setQuestionComponent(() => QUESTION_COMPONENTS[parsedData.type.toLowerCase()]);
            }
        } catch (error) {
            console.error('Error parsing question data:', error);
        }
        }
    }, [encodedData]);

    // Loading state
    if (!questionData || !QuestionComponent) {
        return <div className="p-4">Loading...</div>;
    }

    // Error state for unknown question type
    if (!QUESTION_COMPONENTS[questionData.type?.toLowerCase()]) {
        return <div className="p-4">Unknown question type: {questionData.type}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl">{questionData.title}</h2>
            <p className="w-3/4 my-10">{questionData["question"]}</p>
            <QuestionComponent questionData={questionData} />
        </div>
    );
}