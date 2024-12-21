import { useState, useEffect } from 'react';
import '../App.css';

function InputForm({ id, onSave, onDelete, initialData }) {
    const [inputX, setInputX] = useState(initialData.x || '');
    const [inputY, setInputY] = useState(initialData.y || ''); 
    const [inputU, setInputU] = useState(initialData.u || ''); 
    const [edit, setEdit] = useState(false);

    const handleSave = () => {
        onSave(id, { x: inputX, y: inputY, u: inputU });
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
                        value={inputY}
                        onChange={(e) => setInputY(e.target.value)}
                        onFocus={() => handleFocus(setInputY)} 
                        onBlur={() => handleBlur(inputY, setInputY, 'Input Y')} 
                    />
                    <input
                        className='InputValue'
                        type="number"
                        step="any"
                        value={inputU}
                        onChange={(e) => setInputU(e.target.value)}
                        onFocus={() => handleFocus(setInputU)}
                        onBlur={() => handleBlur(inputU, setInputU, 'Input U')}
                    />
                    <button className='save' onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className="view">
                    <p>X: {inputX}</p>
                    <p>Y: {inputY}</p>
                    <p>U: {inputU}</p>
                    <button className='edit save' onClick={() => setEdit(true)}>Edit</button>
                    <div className="delete" onClick={() => onDelete(id)}>X</div>
                </div>
            )}
        </div>
    );
}

export default InputForm;
