import { useRouter } from "next/navigation";
import Image from "next/image";

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
            className="h-auto text-md text-secondary p-3 my-2 hover:cursor-pointer flex justify-end items-end relative"
        >
            <div className="absolute left-0 top-2">
                <Image
                    src="/directory.png"
                    width={20}
                    height={20}
                    alt="directory image"
                />
            </div>

            <span className="ml-1">/{questionData["title"]}</span>
        </div>
    );
}