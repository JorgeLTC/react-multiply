import type { Difficulty } from "../types";
import type { LucideIcon } from "lucide-react";

type DifficultyCardProps = {
    difficulty: Difficulty;
    currentDifficulty: Difficulty;
    title: string;
    description: string;
    icon: LucideIcon;
    onSelect: (difficulty: Difficulty) => void;
}

const difficultyStyles = {
    easy: "border-green-400 bg-green-400/10 shadow-green-500/20",
    normal: "border-yellow-400 bg-yellow-400/10 shadow-yellow-500/20",
    hard: "border-red-400 bg-red-400/10 shadow-red-500/20",
};
const iconColors = {
    easy: "text-green-400",
    normal: "text-yellow-400",
    hard: "text-red-400",
}

export default function DifficultyCard({difficulty, currentDifficulty, title, description, icon, onSelect}: DifficultyCardProps) {
    const Icon = icon;
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
                
            <div className="flex items-center gap-2 text-lg font-bold">
                <Icon className={`
                        ${
                            difficulty === currentDifficulty
                            ? `${iconColors[difficulty]}`
                            : "text-zinc-400"
                        }
                    `} />
                <span>
                    {title}
                </span>
            </div>

            <div className="text-sm text-zinc-400">
                {description} 
            </div>
        </button>
    );
}