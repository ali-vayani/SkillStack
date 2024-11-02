import { useRouter } from "next/navigation";

export default function QuestionToken({questionData}) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        const queryString = encodeURIComponent(JSON.stringify(questionData));
        router.push(`/questionsPage?data=${queryString}`);
    };

    return (
        <div 
            onClick={handleClick}
            className="h-auto w-4/5 text-md text-center bg-accent/20 p-3 rounded-lg border-2 border-accent my-2 hover:cursor-pointer"
        >
            <span>{questionData["title"]}</span>
        </div>
    );
}