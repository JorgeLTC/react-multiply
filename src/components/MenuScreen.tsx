type MenuScreenProps = {
    onStart: () => void;
    selectedTables: number[];
    onToggleTable: (table: number) => void;
};

export default function MenuScreen({onStart, selectedTables, onToggleTable}: MenuScreenProps) {
    return (
        <div className="text-center">

            <h1 className="text-6xl font-bold text-yellow-400 mb-6">
                Tablas Rapidas
            </h1>

            <p className="text-zinc-400 mb-8">
                Responde tantas preguntas como puedas
                en 60 segundos
            </p>

            <div className="mb-8">

                <p className="text-zinc-400 mb-4">
                    Selecciona las tablas
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
                        <button
                            key={table}

                            onClick={() => onToggleTable(table)}

                            className={`
                                w-14
                                h-14
                                rounded-2xl
                                font-bold
                                text-xl
                                transition

                                ${
                                    selectedTables.includes(table)
                                    ? "bg-yellow-400 text-black"
                                    : "bg-zinc-800 text-zinc-400"
                                }
                            `}
                        >
                            {table}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={onStart}
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
                Empezar
            </button>
        </div>
    );
}