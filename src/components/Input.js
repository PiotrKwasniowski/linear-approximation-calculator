import { useState } from 'react';
import '../App.css';
import InputForm from './InputForm';

function Input(props) {
    const [inputAmount, setInputAmount] = useState(3);
    const [inputsData, setInputsData] = useState([]); 

    // Handle saving input data from child component
    const handleSave = (index, data) => {
        setInputsData((prev) => {
            const updatedData = [...prev];
            updatedData[index] = data;
            return updatedData;
        });
    };

    const Calculate = async () => {
        console.log("Calculate", inputsData);

        const requestData = {
            points: inputsData.map((input) => ({
                x: parseFloat(input.x),
                y: parseFloat(input.y),
                uncertainty: parseFloat(input.u)
            }))
        };

        try {
            
            const response = await fetch('https://lina.mslnk.dev/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            console.log(response);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Error during fetch:', error);
        }
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
