import { useState } from 'react';
import '../App.css';

function InputForm({ onSave }) {
    const [inputX, setInputX] = useState(0);
    const [inputY, setInputY] = useState(0);
    const [inputU, setInputU] = useState(0);

    const handleSave = () => {
        // Send parsed float data to the parent component
        onSave({
            x: parseFloat(inputX),
            y: parseFloat(inputY),
            u: parseFloat(inputU),
        });
    };

    return (
        <div className="InputForm">
            <input
                type="number"
                step="any"
                placeholder="Enter X"
                value={inputX}
                onChange={(e) => setInputX(e.target.value)}
            />
            <input
                type="number"
                step="any"
                placeholder="Enter Y"
                value={inputY}
                onChange={(e) => setInputY(e.target.value)}
            />
            <input
                type="number"
                step="any"
                placeholder="Enter U"
                value={inputU}
                onChange={(e) => setInputU(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default InputForm;
