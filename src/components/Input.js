import { useState } from 'react';
import '../App.css';
import InputForm from './InputForm';

function Input(props) {
    const [inputAmount, setInputAmount] = useState(3);
    const [inputsData, setInputsData] = useState([]); 

    const handleSave = (index, data) => {
        setInputsData((prev) => {
            const updatedData = [...prev];
            updatedData[index] = data;
            return updatedData;
        });
    };

    const Calculate = () => {
        console.log("Calculate", inputsData);
    };

    return (
        <div className="Input">
            <div className="Inputs">
                {[...Array(inputAmount)].map((_, i) => (
                    <InputForm key={i} onSave={(data) => handleSave(i, data)} />
                ))}
            </div>
            <button onClick={() => setInputAmount(inputAmount + 1)}>Add Input</button>
            <button onClick={Calculate}>Calculate</button>
        </div>
    );
}

export default Input;
