// hooks/touch.ts
import { DELTA_THRESHOLD, globals } from '../globals';
import { setMaxShift } from '../utils';

const useTouchMove = (
    touchStartRef: React.MutableRefObject<number>,
    touchEndRef: React.MutableRefObject<number>,
    scrollPhase: number,
    setScrollPhase: React.Dispatch<React.SetStateAction<number>>,
    setTargetY: React.Dispatch<React.SetStateAction<number>>,
    lastY: React.MutableRefObject<number>,
    navBarRef: React.MutableRefObject<HTMLElement | null>,
    sloganRef: React.MutableRefObject<HTMLParagraphElement | null>,
) => {
  const handleTouchMove = (e: TouchEvent) => {
    touchEndRef.current = e.touches[0].clientY;
    let deltaY = touchStartRef.current - touchEndRef.current;
    // The first step is to understand in which phase we are in
    // as well as the direction of the wheel

    // To determine the direction of the wheel scroll, we examine the
    // deltaY property of the WheelEvent object in the event handler:
    let isForward = deltaY > 0 // is true if wheel was scrolled downwards and false if upwards

    switch (scrollPhase) {
        case 0: {
            console.log("DELTA: " + deltaY);
            // == Action Handling ==
            let MAX_SHIFT = setMaxShift(navBarRef, sloganRef, false)!; // False signals that we do not recalculate this

            let newTarget = lastY.current - deltaY * 1.2; // 1.2 is the sensitivity
        
            newTarget = Math.max(MAX_SHIFT, newTarget); // To prevent overflowing
            newTarget = Math.min(0, newTarget); // To prevent underflowing

            setTargetY(newTarget);
            globals.currentSloganPosition = newTarget;
            lastY.current = newTarget;

            // == State Transition ==

                if (newTarget === MAX_SHIFT) {
                    console.log("scroll phase BEFORE: " + scrollPhase);
                    console.log("Phase 0 -> 1");
                    setScrollPhase(1);
                    console.log("scroll phase AFTER: " + scrollPhase);

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
                    if (deltaY > globals.deltaTMinusOne) {
                        globals.transitionCounter += 1;
                    }

                    // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                    // scrolling phase
                    if (globals.transitionCounter >= DELTA_THRESHOLD) {
                        console.log("Phase 1 -> 2");
                        setScrollPhase(2);

                        // Reset transition counter
                        globals.transitionCounter = 0;
                    }
                } else {
                    if (-deltaY > -globals.deltaTMinusOne) {
                        globals.transitionCounter += 1;
                    }

                    // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                    // scrolling phase
                    if (globals.transitionCounter >= DELTA_THRESHOLD) {
                        console.log("Phase 1 -> 0");
                        setScrollPhase(0);
                        console.log("scroll phase AFTER: " + scrollPhase);

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
                    if (deltaY > globals.deltaTMinusOne) {
                        globals.transitionCounter += 1;
                    }

                    // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                    // scrolling phase
                    if (globals.transitionCounter >= DELTA_THRESHOLD) {
                        console.log("Phase 2 -> 3");
                        setScrollPhase(3);
                        // Reset transition counter
                        globals.transitionCounter = 0;
                    }
                } else {
                    if (-deltaY > -globals.deltaTMinusOne) {
                        globals.transitionCounter += 1;
                    }

                    // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                    // scrolling phase
                    if (globals.transitionCounter >= DELTA_THRESHOLD) {
                        console.log("Phase 2 -> 1");
                        setScrollPhase(1);

                        // Reset transition counter
                        globals.transitionCounter = 0;
                    }
                }

                break;
            }
            case 3: {
                if (!isForward) {
                    if (-deltaY > -globals.deltaTMinusOne) {
                        globals.transitionCounter += 1;
                    }

                    // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                    // scrolling phase
                    if (globals.transitionCounter >= DELTA_THRESHOLD) {
                        console.log("Phase 2 -> 3");
                        setScrollPhase(2);

                        // Reset transition counter
                        globals.transitionCounter = 0;
                    }
                }
                break;
            }
        }

        globals.deltaTMinusOne = deltaY;
  };

  return handleTouchMove;
};

export default useTouchMove;
