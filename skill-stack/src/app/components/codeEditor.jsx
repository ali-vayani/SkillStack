import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CodeEditor = ({ code, setCode }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [language, setLanguage] = useState('javascript');
  const [editorInstance, setEditorInstance] = useState(null);
  const [output, setOutput] = useState([]);
  const [currentCode, setCurrentCode] = useState(code);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js";
    script.async = true;
    script.onload = () => initMonaco();
    document.body.appendChild(script);

    return () => {
      if (editorInstance) {
        editorInstance.dispose();
      }
      document.body.removeChild(script);
    };
  }, []);

  const initMonaco = () => {
    window.require.config({
      paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }
    });

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
        });

        setEditorInstance(editor);

        editor.onDidChangeModelContent(() => {
          const newValue = editor.getValue();
          setCurrentCode(newValue);
          setCode(newValue);
        });
      }
    });
  };

  useEffect(() => {
    if (editorInstance && code !== editorInstance.getValue()) {
      setCurrentCode(code);
    }
  }, [code, editorInstance]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (monacoRef.current && editorInstance) {
      monacoRef.current.editor.setModelLanguage(editorInstance.getModel(), newLanguage);
    }
  };

  const handleRunCode = () => {
    if (!editorInstance) return;

    const codeToExecute = editorInstance.getValue();
    setOutput([]);

    if (language === 'javascript') {
      try {
        // Using Function constructor instead of eval
        const result = new Function(`return ${codeToExecute}`)();
        setOutput([`Output: ${result}`]);
      } catch (error) {
        setOutput([`Error: ${error.message}`]);
      }
    } else {
      setOutput([`Language '${language}' execution is not supported in this demo`]);
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
      <div ref={editorRef} className="h-96 w-full border rounded-md overflow-hidden" />
      {output.length > 0 && (
        <div className="mt-4 p-4 bg-gray-900 text-white rounded-md">
          <h3 className="text-sm font-medium mb-2">Output:</h3>
          <pre className="whitespace-pre-wrap">{output.join('\n')}</pre>
        </div>
      )}
    </Card>
  );
};

export default CodeEditor;
