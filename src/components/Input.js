import { useState } from 'react';
import '../App.css';
import InputForm from './InputForm';

function Input({ onCalculate }) {
    const [inputsContainer, setInputsContainer] = useState([
        { id: 1, x: '', y: '', u: '' },
        { id: 2, x: '', y: '', u: '' },
        { id: 3, x: '', y: '', u: '' }
    ]);

    const handleSave = (id, data) => {
        setInputsContainer((prev) =>
            prev.map((input) => (input.id === id ? { id, ...data } : input))
        );
    };

    const handleDelete = (id) => {
        setInputsContainer((prev) => prev.filter((input) => input.id !== id));
    };

    const Calculate = () => {
        const requestData = {
            points: inputsContainer.map((input) => ({
                x: parseFloat(input.x),
                uncertaintyX: parseFloat(input.ux),
                y: parseFloat(input.y),
                uncertaintyY: parseFloat(input.uy),
            })),
        };

        console.log("Calculated Data:", requestData);

        onCalculate(requestData.points);
    };

    return (
        <div className="Input">
            <div className="Inputs">
                {inputsContainer.map((inputData) => (
                    <InputForm
                        key={inputData.id}
                        id={inputData.id}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        initialData={inputData}
                    />
                ))}
            </div>
            <button
                className="addNew"
                onClick={() => {
                    const newId = Date.now();
                    setInputsContainer((prev) => [
                        ...prev,
                        { id: newId, x: '', ux: '',y: '', uy: '' }
                    ]);
                }}
            >
                Add Input
            </button>
            <button className="save calculate" onClick={Calculate}>
                Calculate
            </button>
        </div>
    );
}

export default Input;
