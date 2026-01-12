import {CoreEmotion} from "@/features/emotion-wheel/types/core-emotion.ts";

export const CORE_EMOTIONS: CoreEmotion[] = [
    {
        id: "anger",
        label: "Anger",
        color: "#c084fc",
        startAngle: -30,
        endAngle: 30,
    },
    {
        id: "sadness",
        label: "Sadness",
        color: "#93c5fd",
        startAngle: 30,
        endAngle: 90,
    },
    {
        id: "surprise",
        label: "Surprise",
        color: "#6ee7b7",
        startAngle: 90,
        endAngle: 150,
    },
    {
        id: "joy",
        label: "Joy",
        color: "#86efac",
        startAngle: 150,
        endAngle: 210,
    },
    {
        id: "love",
        label: "Love",
        color: "#fde047",
        startAngle: 210,
        endAngle: 270,
    },
    {
        id: "fear",
        label: "Fear",
        color: "#fca5a5",
        startAngle: 270,
        endAngle: 330,
    },
]