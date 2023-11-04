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

    const isBrowser = typeof window !== 'undefined';
    const isMac = isBrowser && navigator.userAgent.indexOf('Mac') !== -1;

    const handleWheelDefault = (e: WheelEvent) => {
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

    const handleWheelMac = (e: WheelEvent) => {
        // The first step is to understand in which phase we are in
        // as well as the direction of the wheel

        // To determine the direction of the wheel scroll, we examine the
        // deltaY property of the WheelEvent object in the event handler:
        let isForward = e.deltaY > 0 // is true if wheel was scrolled downwards and false if upwards

        switch (scrollPhase) {
            case 0: {
                // == Action Handling ==
                let MAX_SHIFT = setMaxShift(navBarRef, sloganRef, false)!; // False signals that we do not recalculate this

                let newTarget = lastY.current - e.deltaY * 1.2; // 1.2 is the sensitivity
            
                newTarget = Math.max(MAX_SHIFT, newTarget); // To prevent overflowing
                newTarget = Math.min(0, newTarget); // To prevent underflowing

                setTargetY(newTarget);
                globals.currentSloganPosition = newTarget;
                lastY.current = newTarget;

                // == State Transition ==
                    if (newTarget === MAX_SHIFT) {
                        setScrollPhase(1);

                        // Reset transition counter
                        globals.transitionCounter = 0;
                    }

                    break;
                }
                    
                case 1: {
                    if (isForward) {
                        // In order to move to the next phase we need to hit
                        // the following criteria:
                        // - Have 6 increasing deltas in a row, representing a new wheel action
                        
                        // Transition counter registers everytime the delta increases
                        if (e.deltaY > globals.deltaTMinusOne) {
                            globals.transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (globals.transitionCounter >= DELTA_THRESHOLD) {
                            setScrollPhase(2);

                            // Reset transition counter
                            globals.transitionCounter = 0;
                        }
                    } else {
                        if (-e.deltaY > -globals.deltaTMinusOne) {
                            globals.transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (globals.transitionCounter >= DELTA_THRESHOLD) {
                            setScrollPhase(0);

                            // Reset transition counter
                            globals.transitionCounter = 0;
                        }
                    }
                        
                    break;
                }
                case 2: {
                    if (isForward) {
                        // In order to move to the next phase we need to hit
                        // two criteria:
                        // - Have 6 increasing deltas in a row, representing a new wheel action
                        
                        // Transition counter registers everytime the delta increases
                        if (e.deltaY > globals.deltaTMinusOne) {
                            globals.transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (globals.transitionCounter >= DELTA_THRESHOLD) {
                            setScrollPhase(3);
                            // Reset transition counter
                            globals.transitionCounter = 0;
                        }
                    } else {
                        if (-e.deltaY > -globals.deltaTMinusOne) {
                            globals.transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (globals.transitionCounter >= DELTA_THRESHOLD) {
                            setScrollPhase(1);

                            // Reset transition counter
                            globals.transitionCounter = 0;
                        }
                    }

                    break;
                }
                case 3: {
                    if (!isForward) {
                        if (-e.deltaY > -globals.deltaTMinusOne) {
                            globals.transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (globals.transitionCounter >= DELTA_THRESHOLD) {
                            setScrollPhase(2);

                            // Reset transition counter
                            globals.transitionCounter = 0;
                        }
                    }
                    break;
                }
            }

        globals.deltaTMinusOne = e.deltaY;
    };

    return isMac ? handleWheelMac : handleWheelDefault;
};

export default useWheelScroll;