import { useColorStore } from '@/features/svgs/stores/useColorStore.ts';

export default function HeartIcon() {
  const heartColor = useColorStore((state) => state.color);
  const setHeartColor = useColorStore((state) => state.setColor);

  const generateRandomHex = () => {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
  };

  const changeColor = () => {
    let newColor = heartColor;

    // keep generating until it’s different
    while (newColor === heartColor) {
      newColor = generateRandomHex();
    }

    setHeartColor(newColor);
  };

  return (
    <svg
      height="100"
      width="100"
      viewBox="0 0 100 100"
      style={{ cursor: 'pointer' }}
      onClick={changeColor}
    >
      <path
        d="M 25 25 L 50 50 L 75 25"
        strokeWidth="50"
        stroke={heartColor}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
