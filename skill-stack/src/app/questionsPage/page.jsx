'use client'

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import FRQuestion from "../components/FRQuestion";
import MultipleChoice from "../components/MultipleChoice";
import MultiSelect from "../components/MultiSelect";
import FillInTheBlanks from "../components/FillInTheBlanks";
import Button from "../components/Button";
import OpenAIComponent from "../components/OpenAI";

// Loading component
const LoadingComponent = () => {
  return <div className="p-4">Loading...</div>;
};

// Error component
const ErrorComponent = ({ message }) => {
  return (
    <div className="p-4 text-red-600">
      <h2 className="font-bold">Error</h2>
      <p>{message}</p>
    </div>
  );
};

// Question wrapper component that uses searchParams
const QuestionWrapper = () => {
    const searchParams = useSearchParams();
    const encodedData = searchParams.get('data');
  
    const QUESTION_COMPONENTS = {
        "free-response": FRQuestion,
        "multiple-choice": MultipleChoice,
        "multi-select": MultiSelect,
        "fill-in-the-blanks": FillInTheBlanks,
    };

    const [questionData, setQuestionData] = useState(null);
    const [error, setError] = useState(null);
    const [QuestionComponent, setQuestionComponent] = useState(null);
    const [explain, setExplain] = useState(false);

    useEffect(() => {
        if (!encodedData) {
        setError('No question data provided in URL');
        return;
        }

        try {
        const parsedData = JSON.parse(decodeURIComponent(encodedData));
        
        if (!parsedData || typeof parsedData !== 'object') {
            setError('Invalid question data format');
            return;
        }

        if (!parsedData.type) {
            setError('Question type is missing');
            return;
        }

        const componentType = parsedData.type.toLowerCase();
        if (!QUESTION_COMPONENTS[componentType]) {
            setError(`Unknown question type: ${parsedData.type}`);
            return;
        }

        setQuestionData(parsedData);
        setQuestionComponent(() => QUESTION_COMPONENTS[componentType]);
        setError(null);
        } catch (error) {
        console.error('Error parsing question data:', error);
        setError('Failed to parse question data');
        }
    }, [encodedData]);

    // Show error state if there's an error
    if (error) {
        return <ErrorComponent message={error} />;
    }

    // Show loading state if data is not ready
    if (!questionData || !QuestionComponent) {
        return <div className="p-4">Loading...</div>;
    }

    // Render the question
    return (
        <div className="p-4 w-full flex justify-center items-center flex-row">
            <div className="flex flex-col items-center max-w-[70%]">
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-3xl align-center w-full font-bold">{questionData.title}</h2>
                    <Button 
                        name="Explain" 
                        fill={false} 
                        onClick={() => setExplain((prev) => !prev)} // Toggle OpenAIComponent visibility
                    />
                </div>
                <div>
                    <p className="w-full my-10 font-medium text-lg">{questionData["question"]}</p>
                    <QuestionComponent questionData={questionData} /> 
                </div>
            </div>
            {explain && (
                <div className="p-4 ml-8 max-w-[30%] flex justify-end items-end">
                    <OpenAIComponent prompt={"Please help explain this question to me.\nQuestion: " + questionData["question"] + "\n Answers:" + questionData["answer-choice"] + "\nAnswer: " + questionData["answer"]}/>
                </div>
            )}
        </div>
    );
};

// Main page component
export default function Page() {
    return (
        <Suspense fallback={<LoadingComponent />}>
        <QuestionWrapper />
        </Suspense>
    );
}
