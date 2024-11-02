import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CodeEditor = () => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Start coding here\n');

  useEffect(() => {
    // Load Monaco Editor from CDN
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js";
    script.async = true;
    script.onload = () => initMonaco();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMonaco = () => {
    // @ts-ignore
    window.require.config({
      paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }
    });

    // @ts-ignore
    window.require(['vs/editor/editor.main'], function (monaco) {
      monacoRef.current = monaco;
      
      if (editorRef.current) {
        const editor = monaco.editor.create(editorRef.current, {
          value: code,
          language: language,
          theme: 'vs-dark',
          automaticLayout: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
          },
          readOnly: false,
          cursorStyle: 'line',
        });

        // Update code state when content changes
        editor.onDidChangeModelContent(() => {
          setCode(editor.getValue());
        });
      }
    });
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (monacoRef.current && editorRef.current) {
      monacoRef.current.editor.setModelLanguage(
        monacoRef.current.editor.getModels()[0],
        newLanguage
      );
    }
  };

  const handleRunCode = () => {
    // Basic code execution - you might want to implement this differently
    // This is just a simple example using eval for JavaScript
    try {
      if (language === 'javascript') {
        // eslint-disable-next-line no-eval
        const result = eval(code);
        console.log('Output:', result);
        alert('Check console for output');
      } else {
        alert('Code execution is only implemented for JavaScript in this demo');
      }
    } catch (error) {
      console.error('Error executing code:', error);
      alert('Error executing code: ' + error.message);
    }
  };

  return (
    <Card className="w-full max-w-4xl p-4">
      <div className="flex gap-4 mb-4">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleRunCode}>Run Code</Button>
      </div>
      <div 
        ref={editorRef} 
        className="h-96 w-full border rounded-md overflow-hidden"
      />
    </Card>
  );
};

export default CodeEditor;