'use client'
import CodeEditor from "./codeEditor";
import { useState, useEffect } from "react";

export default function FRQuestion(questionData) {
    const [code, setCode] = useState('');
    useEffect(() => {
        //console.log(code);
    }, [code])
    return (
        <div className="w-3/4 my-10">
            <CodeEditor code={code} setCode={() => setCode()}/>
        </div>
    );
}