//import React from 'react'
import { useState, useEffect } from 'react'
import MenuScreen from "./components/MenuScreen";
import ResultScreen from "./components/ResultScreen";
import GameScreen from "./components/GameScreen";
import type { Achievement } from "./types";

type Question = {
    a: number;
    b: number;
    answer: number;
};


type Screen = "menu" | "game" | "results";

function generateQuestion(tables: number[]): Question{

    // * Random number between 1 and 10
    const a = tables[Math.floor(Math.random() * tables.length)];

    // * Random number between 1 and 10
    const b = Math.floor(Math.random() * 10) + 1;

    // * Return a properly shaped Question object
    return {
        a,
        b,
        answer: a * b,
    };
}

function generateOptions(correct: number): number[] {

     /*
        * Set automatically prevents duplicates.

        * Example:
        * adding 28 twice still results in only one 28
    */
    const options = new Set<number>();

    // * Add correct answer first
    options.add(correct);
    /*
        * Keep generating random answers
        * until we have 4 total options
    */
    while (options.size < 4) {
        /*
            * Generate nearby random numbers.

            * Example:
            * if correct is 28,
            * this may generate numbers from 23 to 33
        */
        const random = correct + Math.floor(Math.random() * 11) - 5;

        // * Prevent negative or 0 answers
        if (random > 0) {
            options.add(random);
        }
    }
    /*
        * Convert Set into array
        * and shuffle it randomly
    */
    return [...options].sort(() => Math.random() - 0.5);
}
/*
  * Main React component.

  * This is the entire game screen.
*/
export default function App() {

    const [score, setScore] = useState<number>(0);

    const [total, setTotal] = useState<number>(0);
    
    // * This stores the countdown timer
    const [timeLeft, setTimeLeft] = useState<number>(60);

    const [screen, setScreen] = useState<Screen>("menu");

    const [selectedTables, setSelectedTables] =
        useState<number[]>(() => {
            
            const savedTables = localStorage.getItem("selectedTables");

            if (savedTables) {
                return JSON.parse(savedTables);
            }
            return [1,2,3,4,5,6,7,8,9,10];
        });

    const [streak, setStreak] = useState<number>(0);

    const [bestStreak, setBestStreak] = useState<number>(0);

    const [highScore, setHighScore] = useState<number>(0);

    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

    const [showPoint, setShowPoint] = useState<boolean>(false);

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    
    useEffect(() => {

        // * Only run timer during gameplay
        if (screen !== "game") return;

        // * Stop when timer reaches 0
        if (timeLeft <= 0) return;

        // * Countdown timer
        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        // * Cleanup old timer
        return () => clearTimeout(timer);

    }, [screen, timeLeft]);

    useEffect(() => {

        // * Game over condition
        if (screen === "game" && timeLeft <= 0) {
            setScreen("results");
        }

    }, [screen, timeLeft]);

    useEffect(() => {
        
        const savedHighScore = localStorage.getItem("highScore");

        if (savedHighScore) {
            setHighScore(Number(savedHighScore));
        }

    }, []);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);

            localStorage.setItem(
                "highScore",
                String(score)
            );
        }
    }, [score, highScore]);

    useEffect(() => {

        localStorage.setItem(
            "selectedTables",
            JSON.stringify(selectedTables)
        );

    }, [selectedTables]);

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    /*
        * React state that stores the CURRENT question.

        * Initial value:
        * generate a random question immediately
    */
    const [question, setQuestion] = useState<Question>(
        generateQuestion(selectedTables)
    );
    /*
        * React state that stores answer choices.

        * Initial value:
        * generate options using the current question answer
    */
    const [options, setOptions] = useState<number[]>(
        generateOptions(question.answer)
    );

    /*
        * Generates a brand new question
        * and new answer choices.
    */
    function nextQuestion() {

        // * Create a new question object
        const q = generateQuestion(selectedTables);

        // * Update react state
        setQuestion(q);

        // * Generate answer options for new qquestion
        setOptions(generateOptions(q.answer));

        // * Reset selected answer
        setSelectedAnswer(null);

        // * Reset feedback
        setFeedback(null);
    }

    function startGame() {

        // * Reset game values
        setScore(0);

        setTotal(0);

        setTimeLeft(60);

        setStreak(0);

        setBestStreak(0);

        // * Generate first question
        const q = generateQuestion(selectedTables);

        setQuestion(q);

        setOptions(generateOptions(q.answer));

        setSelectedAnswer(null);
        
        // * Switch to gameplay screen
        setScreen("game");
    }

    // * Runs when player clicks an answer button.
    function handleAnswer(option: number) {

        // * Prevent multiple clicks
        if (selectedAnswer != null) return;

        // * Store selected answer
        setSelectedAnswer(option);

        // * Imcrease total questions answered
        setTotal((prev) => prev + 1);

        // * Correct answer
        if (option === question.answer) {
            // * Increase the score
            setScore((prev) => prev + 1);
            setShowPoint(true);
            setFeedback("correct");

            // unlocks first correct achievement
            if (score + 1 === 1) {
                unlockAchievement({
                    id: "first-correct",
                    title: "Primer Acierto",
                    description: "Responde correctamente por primera vez",
                });
            }

            setTimeout(() => {
                setShowPoint(false);
                }, 500);

            // * Increase the streak
            setStreak((prev) => {
                
                const newStreak = prev + 1;

                // unlock streak 10 achievement
                if (newStreak === 10) {
                    unlockAchievement({
                        id: "streak-10",
                        title: "Racha de Fuego",
                        description: "Consigue una racha de 10",
                    });
                }

                // * Update best streak if needed
                setBestStreak((best) => Math.max(best, newStreak));

                return newStreak;
            });

            

        } else {
            // * Wrong answer will reset the streak
            setStreak(0);

            setFeedback("wrong");
        }

        // * Wait a little before next question
        setTimeout(() => {
            nextQuestion();
        }, 700);
    }

    function toggleTable(table: number) {

        setSelectedTables((prev) => {

            // * Prevent removing all tables
            if (prev.includes(table) && prev.length === 1) {
                return prev;
            }
            // * Remove existing table
            if (prev.includes(table)) {
                return prev.filter((t) => t !== table);
            }
            // * Add a new table
            return [...prev, table].sort((a, b) => a - b);
        });
    }

    function unlockAchievement(achievement: Achievement) {
        setAchievements((prev) => {
            const alreadyUnlocked = prev.some(
                (a) => a.id === achievement.id
            );

            if (alreadyUnlocked) {
                return prev;
            }

            return [...prev, achievement];
        });
    }
    /*
        * JSX UI returned by the component.

        * Think of this as:
        * "what should React draw on screen?"
    */
    return (

        // * Main fullscreen container
        <div className='min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6'>

            {/* Game menu screen */}
            {screen === "menu" && (
               <MenuScreen onStart={startGame} selectedTables={selectedTables} onToggleTable={toggleTable}/>
            )}
            
            {/* Game Screen */}
            {screen === "game" && (
                <GameScreen
                    question={question}
                    options={options}
                    score={score}
                    total={total}
                    timeLeft={timeLeft}
                    selectedAnswer={selectedAnswer}
                    onAnswer={handleAnswer}
                    streak={streak}
                    bestStreak={bestStreak}
                    feedback={feedback}
                    showPoint={showPoint}
                />
            )}

            {/* Result Screen*/}
            {screen === "results" && (
                <ResultScreen score={score} onRestart={startGame} highScore={highScore} achievements={ achievements} />
            )}
            
        </div>
    );
}

