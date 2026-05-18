//import React from 'react'
import { useState } from 'react'

type Question = {
    a: number;
    b: number;
    answer: number;
};

function generateQuestion(): Question{
    // * Random number between 1 and 10
    const a = Math.floor(Math.random() * 10) + 1;
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
    /*
        * React state that stores the CURRENT question.

        * Initial value:
        * generate a random question immediately
    */
    const [question, setQuestion] = useState<Question>(
        generateQuestion()
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
        const q = generateQuestion();
        // * Update react state
        setQuestion(q);
        // * Generate answer options for new qquestion
        setOptions(generateOptions(q.answer));
    }
    // * Runs when player clicks an answer button.
    function handleAnswer(option: number) {
        // * Check if selected answer is correct
        if (option === question.answer) {
            alert("Correct!");
        } else {
            alert(`Wrong! The answer was ${question.answer}`);
        }
        // * Load next question afterward
        nextQuestion();
    }
    /*
        * JSX UI returned by the component.

        * Think of this as:
        * "what should React draw on screen?"
    */
    return (
        // * Main fullscreen container
        <div className='min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6'>

            {/* Main game card */}
            <div className='w-full max-w-md bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-b-zinc-800'>

                {/* Game title*/}
                <h1 className='text-4xl font-bold text-yellow-400 text-center mb-8'>
                    Tablas Rapidas
                </h1>

                {/* Question section */}
                <div className='text-center mb-8'>

                    {/* Small helper text */}
                    <p className='text-zinc-400 mb-2-'>
                        Cuanto es?
                    </p>

                    {/* Large multiplication question */}
                    <div className='text-6xl font-bold'>
                        {question.a} x {question.b}
                    </div>
                </div>

                {/* Answer buttons grid */}
                <div className='grid grid-cols-2 gap-4'>

                    {/* Loop through all answer options */}
                    {options.map((option) => (
                        <button
                            /*
                                React needs a unique key
                                when rendering lists
                            */
                            key={option}

                            /*
                                When clicked,
                                send selected option
                                into handleAnswer()
                            */
                            onClick={() => handleAnswer(option)}

                            /*
                                Tailwind styling classes
                            */
                            className='bg-zinc-800 hover:bg-yellow-400 hover:text-black transition rounded-2xl py-6 text-3xl font-bold'
                        >
                            {/* Button text */}
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

