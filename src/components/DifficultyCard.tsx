import type { Difficulty } from "../types";

type DifficultyCardProps = {
    difficulty: Difficulty;
    currentDifficulty: Difficulty;
    title: string;
    description: string;
    icon: string;
    onSelect: (difficulty: Difficulty) => void;
}

const difficultyStyles = {
    easy: "border-green-400 bg-green-400/10 shadow-green-500/20",
    normal: "border-yellow-400 bg-yellow-400/10 shadow-yellow-500/20",
    hard: "border-red-400 bg-red-400/10 shadow-red-500/20",
};

export default function DifficultyCard({difficulty, currentDifficulty, title, description, icon, onSelect}: DifficultyCardProps) {
    return (
        <button
            className={`
                    w-full
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-200
                    ${
                        difficulty === currentDifficulty
                            ? `${difficultyStyles[difficulty]} scale-[1.02] shadow-lg`
                            : "border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
                    }
                `
            }
            onClick={() => onSelect(difficulty)}
            >
                
            <div className="text-lg font-bold">
                {title} {icon}
            </div>

            <div className="text-sm text-zinc-400">
                {description} 
            </div>
        </button>
    );
}