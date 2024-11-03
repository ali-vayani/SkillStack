'use client'
import { useState, useEffect } from 'react';
import QuestionToken from './QuestionToken';

export default function ChapterDropDown({chapterName, chapterId}) {
    const [questions, setQuestions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        const options = {
            method: 'GET', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        fetch(`https://skillstack-production.up.railway.app/questions`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                setQuestions(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
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

    function getChatperNum(str) {
        const match = str.match(/\d+/); 
        return match ? parseInt(match[0], 10) : null; 
    }

    return (
        <div className="h-auto">
            <div className="w-full text-2xl text-centerp-3 my-3 font-medium">
                <button onClick={() => setIsExpanded(!isExpanded)} className="underline decoration-2">{chapterName}</button>
            </div>
            {isExpanded && (
                <div className="flex flex-col items-start">
                    {displayTokens(getChatperNum(chapterName) +'')}
                </div>
            )}
        </div>
    );
}