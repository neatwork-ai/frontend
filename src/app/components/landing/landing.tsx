import FlyingDonut from "./donut";

function AITextComponent() {
    return (
        <div style={{ color: 'white', fontSize: '36px', fontFamily: 'Exo, sans-serif' }}>
            Turn your IDE into an AI Software Engineer
        </div>
    );
}

export function CombinedComponent() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AITextComponent />
            <FlyingDonut />
        </div>
    );
}