// hooks/wheel.ts
import { DELTA_THRESHOLD, globals } from '../globals';
import { setMaxShift } from '../utils';

const useWheelScroll = (
    scrollPhase: number,
    setScrollPhase: React.Dispatch<React.SetStateAction<number>>,
    setTargetY: React.Dispatch<React.SetStateAction<number>>,
    lastY: React.MutableRefObject<number>,
    navBarRef: React.MutableRefObject<HTMLElement | null>,
    sloganRef: React.MutableRefObject<HTMLParagraphElement | null>,
) => {
  const handleWheel = (e: WheelEvent) => {
    let isForward = e.deltaY > 0;

    switch (scrollPhase) {
      case 0:
        let MAX_SHIFT = setMaxShift(navBarRef, sloganRef, false)!;
        let newTarget = lastY.current - e.deltaY * 1.2;
        newTarget = Math.max(MAX_SHIFT, newTarget);
        newTarget = Math.min(0, newTarget);
        setTargetY(newTarget);
        globals.currentSloganPosition = newTarget;
        lastY.current = newTarget;
        if (newTarget === MAX_SHIFT) {
          setScrollPhase(1);
        }
        break;

      case 1:
        if (isForward) {
          setScrollPhase(2);
        } else {
          setScrollPhase(0);
        }
        break;

      case 2:
        if (isForward) {
          setScrollPhase(3);
        } else {
          setScrollPhase(1);
        }
        break;

      case 3:
        if (!isForward) {
          setScrollPhase(2);
        }
        break;

      default:
        break;
    }
  };

  return handleWheel;
};

export default useWheelScroll;