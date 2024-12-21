import { useState } from 'react';
import '../App.css';
import InputForm from './InputForm';

function Input(props) {
    const [inputsContainer, setInputsContainer] = useState([
        { id: 1, x: '', y: '', u: '' },
        { id: 2, x: '', y: '', u: '' },
        { id: 3, x: '', y: '', u: '' }
    ]);

    const handleSave = (id, data) => {
        setInputsContainer((prev) => {
            return prev.map((input) => 
                input.id === id ? { id, ...data } : input
            );
        });
    };

    const handleDelete = (id) => {
        setInputsContainer((prev) => prev.filter((input) => input.id !== id));
    };

    const Calculate = async () => {
        console.log("Calculate", inputsContainer);

        const requestData = {
            points: inputsContainer.map((input) => ({
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

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error during fetch:', error);
        }
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
            <button className='addNew' onClick={() => {
                const newId = Date.now();
                setInputsContainer((prev) => [...prev, { id: newId, x: '', y: '', u: '' }]);
            }}>Add Input</button>
            <button className='save calculate' onClick={Calculate}>Calculate</button>
        </div>
    );
}

export default Input;
