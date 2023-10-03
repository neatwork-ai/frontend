import { globals } from './globals';

// This should run if the screen is resized, not when scrolling occurs
export const setMaxShift = (
    navBarRef: React.MutableRefObject<HTMLElement | null>,
    sloganRef: React.MutableRefObject<HTMLParagraphElement | null>,
    override: Boolean,
) => {
    if (sloganRef.current && navBarRef.current) {
        if (!globals.maxAbsoluteShift || override) {
            const sloganBounds = sloganRef.current.getBoundingClientRect();
            const navBarBounds = navBarRef.current.getBoundingClientRect();

            // Example: -(163 - 104) => -59
            // represents the height between the slogan and the navbar in negative terms
            if (globals.currentSloganPosition != undefined) {
                globals.maxAbsoluteShift =  - (sloganBounds.top - globals.currentSloganPosition - navBarBounds.bottom);
            } else {
                globals.maxAbsoluteShift =  - (sloganBounds.top - navBarBounds.bottom);
            }
        }

        // TODO: This is adding a bug on the phase transition 0 -> 1
        // Compute buffer based on window width. This is a simple linear adjustment.
        // You can adjust the multipliers or use more complex logic if needed.
        // let buffer: number;

        // if (window.innerWidth < 1000 && window.innerWidth > 800) {
        //     buffer = 10;
        // } else if (window.innerWidth < 800 && window.innerWidth > 600) {
        //     buffer = 20;
        // } else if (window.innerWidth < 600 && window.innerWidth > 400) {
        //     buffer = 30;
        // } else {
        //     buffer = 0;
        // }

        // globals.maxAbsoluteShift += buffer;

        return globals.maxAbsoluteShift;
    }
}