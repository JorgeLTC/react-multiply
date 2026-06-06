import type { Achievement } from "../types";

type ResultScreenProps = {
    score: number;
    onRestart: () => void;
    highScore: number;
    achievements: Achievement[];
};

export default function ResultScreen({score,onRestart, highScore, achievements,}: ResultScreenProps) {
    return (
        <div className="text-center">

        <h1 className="text-5xl font-bold text-yellow-400 mb-6">
            Tiempo terminado
        </h1>

        <div className="text-7xl font-bold text-green-400 mb-4">
            {score}
        </div>

        <p className="text-zinc-400 text-xl mb-8">
            respuestas correctas
        </p>
            
        <div className="mb-8">
            <p className="text-zinc-400">
                 High Score:   
            </p>
                
            <p className="text-yellow-400 text-3xl font-bold">
                  {highScore}  
            </p> 

            <p className="text-zinc-400">
                Logros Desbloqueados:    
            </p>
                
            <p className="text-purple-400 text-3xl font-bold">
                {achievements.length}    
            </p>    
        </div>

        <button
            onClick={onRestart}
            className="
            bg-yellow-400
            hover:bg-yellow-300
            text-black
            font-bold
            text-2xl
            px-10
            py-4
            rounded-2xl
            transition
            "
        >
            Jugar otra vez
        </button>
        </div>
    );
}