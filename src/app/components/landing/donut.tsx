import React from 'react';

interface MyWindow extends Window {
    anim1?: () => void;
    anim2?: () => void;
}

declare let window: MyWindow;

function FlyingDonut() {
    let tmr1: number | undefined = undefined;
    let tmr2: number | undefined = undefined;

    React.useEffect(() => {
        
        // All your animation logic goes here
        const pretag = document.getElementById('d') as HTMLPreElement;
        const canvastag = document.getElementById('canvasdonut') as HTMLCanvasElement;

        let A = 1, B = 1;

        const asciiframe = function() {
            const b: string[] = [];
            const z: number[] = [];
            A += 0.07;
            B += 0.03;
            const cA = Math.cos(A), sA = Math.sin(A),
                  cB = Math.cos(B), sB = Math.sin(B);
            for(let k = 0; k < 1760; k++) {
                b[k] = k % 80 === 79 ? "\n" : " ";
                z[k] = 0;
            }
            for(let j = 0; j < 6.28; j += 0.07) {
                const ct = Math.cos(j), st = Math.sin(j);
                for(let i = 0; i < 6.28; i += 0.02) {
                    const sp = Math.sin(i), cp = Math.cos(i),
                          h = ct + 2,
                          D = 1 / (sp * h * sA + st * cA + 5),
                          t = sp * h * cA - st * sA;
    
                    const x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
                          y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
                          o = x + 80 * y,
                          N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
                    if(y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                        z[o] = D;
                        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                    }
                }
            }
            pretag.innerHTML = b.join("");
        };

        window.anim1 = function() {
            if(tmr1 === undefined) {
                tmr1 = setInterval(asciiframe, 50) as unknown as number;
            } else {
                clearInterval(tmr1);
                tmr1 = undefined;
            }
        };

        asciiframe();
        window.anim1();

        // Cleanup function to clear intervals when component is unmounted
        return () => {
            if (tmr1) clearInterval(tmr1);
            if (tmr2) clearInterval(tmr2);
        };

    }, []); // Empty dependency array ensures this effect runs only once when component mounts

    return (
        <>
            <pre id="d" style={{ color: 'white', padding: '10px', fontSize: '10px' }}></pre>
        </>
    );
}

export default FlyingDonut;