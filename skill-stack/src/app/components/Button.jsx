export default function Button({ name, fill, onClick }) {
    return (
        <button
            className={`min-w-28 h-12 px-3 rounded-lg text-base ${
                fill ? 'bg-primary text-background' : 'bg-background text-primary border-primary border-4'
            }`}
            onClick={onClick}
        >
            {name}
        </button>
    );
}
