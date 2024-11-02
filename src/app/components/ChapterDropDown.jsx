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
                Papa.parse(data, {
                    header: true, 
                    skipEmptyLines: true,
                    complete: (results) => {
                        setQuestions(results.data);
                    },
                });
            })
            .catch(error => console.error('Error fetching CSV:', error));
    },[]);

    const displayTokens = (id) => {
        return questions
            .filter(question => question["id"].charAt(0) === id)
            .map((question, index) => (
                <QuestionToken 
                key={question.id} 
                questionData={question}
                />
        ));
    }

    return (
        <div className="h-auto w-4/5 ">
            <div className="w-full text-2xl text-center bg-secondary/20 p-3 rounded-lg border-2 border-secondary my-3">
                <button onClick={() => setIsExpanded(!isExpanded)}>{chapterName}</button>
            </div>
            {isExpanded && (
                <div className="flex flex-col items-center">
                    {displayTokens('1')}
                </div>
            )}
        </div>
    );
}