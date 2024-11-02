export default function QuestionToken({questionData}) {
    return (
        <div className="h-auto w-4/5 text-md text-center bg-accent/20 p-3 rounded-lg border-2  border-accent my-3">
            <a href="">{questionData["Title"]}</a>
        </div>
    );
}