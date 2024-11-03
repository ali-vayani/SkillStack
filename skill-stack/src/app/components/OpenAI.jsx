import OpenAI from "openai";
import { useState, useEffect } from "react";

export default function OpenAIComponent({ prompt }) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
        organization: "org-2MbGT6ap2SgUov1kTz7A5RLp"
    });

    const [response, setResponse] = useState("");

    // Fetch response from OpenAI API on component load
    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "system",
                            content: "You should be rather casual in your responses, and unless it's warranted, your answers should be rather short. Feel free to have opinions, and contribute to outside-the-box thinking. When asked for code, write in Java unless stated otherwise. You will mainly be asked questions about programming and Java, so make sure to answer as clear and concise as possible without sacrificing the quality of response. Don't act as if you've been asked a question, instead just explain the solution to the question that's been given to you."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    max_tokens: 100 // Adjust max tokens based on response length you expect
                });
                setResponse(completion.choices[0].message.content);
            } catch (error) {
                console.error("Error fetching completion:", error);
                setResponse("Failed to fetch response.");
            }
        };

        if (prompt) {
            fetchResponse();
        }
    }, [prompt]);

    return (
        <div className="text-primary">
            {response ? (
                <div>
                    <p className="text-primary">{response}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
