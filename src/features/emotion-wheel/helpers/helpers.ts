export const toRad = (deg: number): number => (deg * Math.PI) / 180;

export const getMidAngle = (start: number, end: number): number => (start + end) / 2;

export const getTextRotation = (midAngle: number): number =>
  midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle;
