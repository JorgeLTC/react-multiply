type MenuScreenProps = {
    onStart: () => void;
};

export default function MenuScreen({onStart,}: MenuScreenProps) {
    return (
        <div className="text-center">

            <h1 className="text-6xl font-bold text-yellow-400 mb-6">
                Tablas Rapidas
            </h1>

            <p className="text-zinc-400 mb-8">
                Responde tantas preguntas como puedas
                en 60 segundos
            </p>

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