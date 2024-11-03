export default function MultiSelext({questionData}){
    const [choice, setChoices] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        // Convert answer choices to an array if they are a string
        let parsedChoices = questionData["answer-choice"];
        if (typeof parsedChoices === 'string') {
            try {
                parsedChoices = JSON.parse(parsedChoices); // Try JSON parsing if it's a JSON-like array string
            } catch {
                parsedChoices = parsedChoices.substring(2, parsedChoices.length-2).split('", "').map(choice => choice.trim()); // Otherwise, split by commas
            }
        }
        setChoices(parsedChoices || []);
    }, [questionData]);

    const handleSelect = (choice) => {
        setSelectedAnswer(choice);
    };

    const handleSubmit = () => {
        const correctAnswers = questionData.answer.substring(2, questionData.answer.length-2);
        if (selectedAnswer =)
    }
}