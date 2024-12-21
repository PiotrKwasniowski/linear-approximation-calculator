import { useState, useEffect } from 'react';
import '../App.css';

function InputForm({ id, onSave, onDelete, initialData }) {
    const [inputX, setInputX] = useState(initialData.x || '');
    const [inputY, setInputY] = useState(initialData.y || ''); 
    const [inputUX, setInputUX] = useState(initialData.ux || ''); 
    const [inputUY, setInputUY] = useState(initialData.uy || '')
    const [edit, setEdit] = useState(false);

    const handleSave = () => {
        onSave(id, { x: inputX, ux: inputUX, y: inputY, uy: inputUY });
        setEdit(false);
    };

    const handleFocus = (setter) => {
        setter('');
    };

    const handleBlur = (value, setter, placeholder) => {
        if (value === '') {
            setter(placeholder);
        }
    };

    return (
        <div className="InputForm">
            {edit ? (
                <div className="editView">
                    <input
                        className='InputValue'
                        type="number"
                        step="any"
                        value={inputX}
                        onChange={(e) => setInputX(e.target.value)}
                        onFocus={() => handleFocus(setInputX)}
                        onBlur={() => handleBlur(inputX, setInputX, 'Input X')}
                    />
                    <input
                        className='InputValue'
                        type="number"
                        step="any"
                        value={inputUX}
                        onChange={(e) => setInputUX(e.target.value)}
                        onFocus={() => handleFocus(setInputUX)}
                        onBlur={() => handleBlur(inputUX, setInputUX, 'Input UX')}
                    />
                    <input
                        className='InputValue'
                        type="number"
                        step="any"
                        value={inputY}
                        onChange={(e) => setInputY(e.target.value)}
                        onFocus={() => handleFocus(setInputY)} 
                        onBlur={() => handleBlur(inputY, setInputY, 'Input Y')} 
                    />
                    <input
                        className='InputValue'
                        type="number"
                        step="any"
                        value={inputUY}
                        onChange={(e) => setInputUY(e.target.value)}
                        onFocus={() => handleFocus(setInputUY)}
                        onBlur={() => handleBlur(inputUY, setInputUY, 'Input UY')}
                    />
                    
                    <button className='save' onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className="view">
                    <p>X: {inputX}</p>
                    <p>Ux: {inputUX}</p>
                    <p>Y: {inputY}</p>
                    <p>Uy: {inputUY}</p>
                    <button className='edit save' onClick={() => setEdit(true)}>Edit</button>
                    <div className="delete" onClick={() => onDelete(id)}>X</div>
                </div>
            )}
        </div>
    );
}

export default InputForm;
