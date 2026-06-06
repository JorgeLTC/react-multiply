import type { Achievement } from "../types";

type AchievementToastProps = {
    achievement: Achievement;
};

export default function AchievementToast({
    achievement,
}: AchievementToastProps) {
    return (
        <div
            className="
            fixed
            top-6
            left-1/2
            -translate-x-1/2
            z-50
            bg-zinc-800
            border
            border-yellow-400
            rounded-xl
            px-6
            py-4
            shadow-xl
            animate-slide-in
        ">
            <p className="text-yellow-400 font-bold">
                🏆 Achievement Unlocked!
            </p>

            <p className="text-white font-semibold">
                {achievement.title}
            </p>
            
            <p className="text-zinc-400 text-sm">
                {achievement.description}
            </p>
        </div>
    );
}