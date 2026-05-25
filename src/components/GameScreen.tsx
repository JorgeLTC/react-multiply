type Question = {
    a: number;
    b: number;
    answer: number;
};

type GameScreenProps = {
    question: Question;

    options: number[];

    score: number;

    total: number;

    timeLeft: number;

    selectedAnswer: number | null;

    onAnswer: (option: number) => void;

    streak: number;

    bestStreak: number;

    feedback: "correct" | "wrong" | null;
};

export default function GameScreen({
    question,
    options,
    score,
    total,
    timeLeft,
    selectedAnswer,
    onAnswer,
    streak,
    bestStreak,
    feedback,
}: GameScreenProps) {
    return (
        <div className='w-full max-w-md bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800'>

            {/* Top bar */}
            <div className='grid grid-cols-2 gap-4 mb-8'>

                <div className='bg-zinc-800 rounded-2xl p-4'>
                    <p className="text-zinc-400 text-sm">
                        Score:
                    </p>
                    
                    <p className='text-green-400 text-2xl font-bold'>
                        {score}
                    </p>
                </div>

                <div className='bg-zinc-800 rounded-2xl p-4'>
                    <p className="text-zinc-400 text-sm">
                        Time:
                    </p>
                    
                    <p className='text-red-400 text-2xl font-bold'>
                        {timeLeft}
                    </p>
                </div>

                <div className='bg-zinc-800 rounded-2xl p-4'>
                    <p className="text-zinc-400 text-sm">
                        Streak:
                    </p>
                    
                    <p className='text-yellow-400 text-2xl font-bold'>
                        {streak}

                        {streak >= 5 && " 🔥"}
                    </p>
                </div>

                <div className='bg-zinc-800 rounded-2xl p-4'>
                    <p className="text-zinc-400 text-sm">
                        Best:
                    </p>
                    
                    <p className='text-purple-400 text-2xl font-bold'>
                        {bestStreak}
                    </p>
                </div>

                <div className='text-zinc-400'>
                    Total:
                    <span className='text-yellow-400 font-bold ml-2'>
                        {total}
                    </span>
                </div>
            </div>

            {/* Question */}
            <div
                className={`
                        text-center
                        mb-8
                        transition-all
                        duration-300

                        ${
                            feedback === "correct"
                                ? "scale-105"
                    
                                : feedback === "wrong"
                                ? "animate-shake"
                        
                                : ""
                        }
                    `}
            
            >

                <p className='text-zinc-400 mb-2'>
                    Cuanto es?
                </p>
                <div className='text-6xl font-bold'>
                    {question.a} x {question.b}
                </div>
            </div>

            {/* Answers */}
            <div className='grid grid-cols-2 gap-4'>
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onAnswer(option)}

                        className={`
                            rounded-2xl
                            py-6
                            text-3xl
                            font-bold
                            transition

                            ${
                                selectedAnswer === null
                                ? "bg-zinc-800 hover:bg-yellow-400 hover:text-black"
                        
                                : option === question.answer
                                ? "bg-green-500 text-white"
                                : option === selectedAnswer
                                ? "bg-red-500 text-white"

                                : "bg-zinc-800 opacity-50"
                            }
                        `}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Timer Bar */}
            <div className="mt-8">
                <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className={`
                            h-full
                            transition-all
                            duration-1000
                            ease-linear
                        
                            ${
                                timeLeft > 20
                                ? "bg-green-500"
                                : timeLeft > 10
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }
                        `}

                        style={{
                            width: `${(timeLeft / 60) * 100}%`,
                        }}
                    />
                </div>
            </div>

        </div>
    );
}