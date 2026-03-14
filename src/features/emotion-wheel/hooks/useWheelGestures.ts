import { useState, useRef } from 'react';
import { DOUBLE_TAP_MS, MAX_ZOOM, MIN_ZOOM, VIEWBOX_SIZE } from '@/features/emotion-wheel/constants/radii.ts';

const S = VIEWBOX_SIZE;

function clampPan(x: number, y: number, zoom: number) {
  const maxPan = S * (1 - 1 / zoom);
  return {
    x: Math.max(-maxPan, Math.min(maxPan, x)),
    y: Math.max(-maxPan, Math.min(maxPan, y)),
  };
}

export function useWheelGestures() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const gestureRef = useRef<{
    type: 'none' | 'pan' | 'pinch';
    lastDistance: number;
    lastTouch: { x: number; y: number };
  }>({ type: 'none', lastDistance: 0, lastTouch: { x: 0, y: 0 } });

  const lastTapRef = useRef<number>(0);

  const viewBox = {
    x: pan.x - S / zoom,
    y: pan.y - S / zoom,
    width: (2 * S) / zoom,
    height: (2 * S) / zoom,
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      gestureRef.current = {
        type: 'pinch',
        lastDistance: Math.sqrt(dx * dx + dy * dy),
        lastTouch: { x: 0, y: 0 },
      };
    } else if (e.touches.length === 1) {
      const now = Date.now();
      const t = e.touches[0];
      if (now - lastTapRef.current < DOUBLE_TAP_MS) {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        gestureRef.current = { type: 'none', lastDistance: 0, lastTouch: { x: 0, y: 0 } };
        return;
      }
      lastTapRef.current = now;
      gestureRef.current = {
        type: 'pan',
        lastDistance: 0,
        lastTouch: { x: t.clientX, y: t.clientY },
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    if (e.touches.length === 2 && gestureRef.current.type === 'pinch') {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const dx = t1.clientX - t0.clientX;
      const dy = t1.clientY - t0.clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      const ratio = newDistance / gestureRef.current.lastDistance;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * ratio));

      const centerScreenX = (t0.clientX + t1.clientX) / 2;
      const centerScreenY = (t0.clientY + t1.clientY) / 2;
      const pivotX = viewBox.x + ((centerScreenX - rect.left) / rect.width) * viewBox.width;
      const pivotY = viewBox.y + ((centerScreenY - rect.top) / rect.height) * viewBox.height;

      const rawPanX = pivotX + (pan.x - pivotX) * (zoom / newZoom);
      const rawPanY = pivotY + (pan.y - pivotY) * (zoom / newZoom);
      const clamped = clampPan(rawPanX, rawPanY, newZoom);

      setZoom(newZoom);
      setPan(clamped);
      gestureRef.current.lastDistance = newDistance;
    } else if (e.touches.length === 1 && gestureRef.current.type === 'pan' && zoom > 1) {
      const t = e.touches[0];
      const dxScreen = t.clientX - gestureRef.current.lastTouch.x;
      const dyScreen = t.clientY - gestureRef.current.lastTouch.y;
      const svgDx = -(dxScreen / rect.width) * viewBox.width;
      const svgDy = -(dyScreen / rect.height) * viewBox.height;
      const clamped = clampPan(pan.x + svgDx, pan.y + svgDy, zoom);

      setPan(clamped);
      gestureRef.current.lastTouch = { x: t.clientX, y: t.clientY };
    }
  };

  const handleTouchEnd = () => {
    if (zoom <= 1) setPan({ x: 0, y: 0 });
    gestureRef.current = { type: 'none', lastDistance: 0, lastTouch: { x: 0, y: 0 } };
  };

  return {
    viewBox,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
