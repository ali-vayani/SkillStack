'use client'
import Papa from 'papaparse';
import { useState, useEffect } from 'react';
import QuestionToken from './QuestionToken';

export default function ChapterDropDown({chapterName, chapterId}) {
    const [questions, setQuestions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        fetch('/SkillStack.csv')
            .then(response => response.text())
            .then(data => {
                // console.log("Raw CSV data:", data); // Log the raw CSV content
    
                Papa.parse(data, {
                    header: true, // Set this to `false` if there are no headers
                    skipEmptyLines: true,
                    complete: (results) => {
                        console.log("Parsed CSV data:", results.data); // Log parsed data
                        setQuestions(results.data);
                    },
                });
            })
            .catch(error => console.error('Error fetching CSV:', error));
    },[]);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
        // for(let i = 0; i < questions.length; i++) {
        //     if(questions[i]["ID"].charAt(0) === '1')
        //         console.log(questions[i]["ID"]);
        // }
    }
    
    const displayTokens = (id) => {
        return questions
            .filter(question => question["ID"].charAt(0) === id)
            .map((question, index) => (
                <QuestionToken 
                key={question.ID} 
                questionData={question}
                />
        ));
    }

    return (
        <div className="h-auto w-4/5">
            <div className="w-full text-2xl text-center bg-secondary/20 p-3 rounded-lg border-2  border-secondary">
                <button onClick={() => setIsExpanded(!isExpanded)}>{chapterName}</button>
            </div>
            {isExpanded && (
                <div className="mt-2 space-y-2">
                {displayTokens('1')}
                </div>
            )}
        </div>
    );
}