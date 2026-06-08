export function playSound(path: string) {
    const audio = new Audio(path);

    audio.volume = 0.4;

    audio.play();
}