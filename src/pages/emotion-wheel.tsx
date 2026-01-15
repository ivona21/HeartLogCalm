import { arc, Arc } from "d3-shape"
import {CORE_EMOTIONS} from "@/features/emotion-wheel/constants/core-emotions.ts";
import {useState} from "react";
import {SECONDARY_INNER_RADIUS, SECONDARY_OUTER_RADIUS} from "@/features/emotion-wheel/constants/radii.ts";

export default function EmotionWheelPage() {

    const toRad = (deg: number): number => (deg * Math.PI) / 180

    const [selected, setSelected] = useState<string[]>([])

    const toggleEmotion = (id: string) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                return prev.filter(e => e !== id)
            }

            if (prev.length >= 3) {
                return prev
            }

            return [...prev, id]
        })
    }

    const arcGen = arc()
        .innerRadius(0)
        .outerRadius(120)

    return (
        <svg viewBox="-200 -200 400 400" width="400" height="400">
            {CORE_EMOTIONS.map(emotion => {
                const isSelected = selected.includes(emotion.id)

                const path = arcGen({
                    innerRadius: 0,
                    outerRadius: 120,
                    startAngle: toRad(emotion.startAngle),
                    endAngle: toRad(emotion.endAngle),
                })

                // d3 arc() can return null in edge cases → TS safety
                if (!path) return null

                return (
                    <path
                        key={emotion.id}
                        d={path}
                        fill={emotion.color}
                        stroke="rgba(0,0,0,0.6)"
                        strokeWidth={0.6}
                        vectorEffect="non-scaling-stroke"
                        opacity={isSelected ? 1 : 0.6}
                        onClick={() => toggleEmotion(emotion.id)}
                        style={{
                            cursor: "pointer",
                            transition: "opacity 150ms ease",
                        }}
                        aria-label={emotion.label}
                        role="button"
                    />
                )
            })}
            {selected.map(coreId => {
                const emotion = CORE_EMOTIONS.find(e => e.id === coreId)

                if (!emotion || !emotion.secondary) return null

                const sliceAngle =
                    (emotion.endAngle - emotion.startAngle) / emotion.secondary.length

                return emotion.secondary.map((sec, index) => {
                        const start = emotion.startAngle + index * sliceAngle
                        const end = start + sliceAngle

                        const path = arcGen({
                            innerRadius: SECONDARY_INNER_RADIUS,
                            outerRadius: SECONDARY_OUTER_RADIUS,
                            startAngle: toRad(start),
                            endAngle: toRad(end),
                        })

                        if (!path) return null

                        return (
                            <path
                                key={`${emotion.id}-${sec.id}`}
                                d={path}
                                fill={emotion.color}
                                opacity={0.4}
                                stroke="rgba(0,0,0,0.4)"
                                strokeWidth={0.5}
                                vectorEffect="non-scaling-stroke"
                            />
                        )
                    })
            })}
        </svg>
    )
}