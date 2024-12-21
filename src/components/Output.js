import '../App.css';
import { useState, useEffect } from 'react';

function Output({ Data }) {
    const [containerClass, setContainerClass] = useState('Output hide');
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (Data && Data.length > 0) {
            Calculate();
        }
    }, [Data]);

    const Calculate = async () => {
        console.log("Calculate triggered with Data:", Data);

        const requestData = {
            points: Data.map((input) => ({
                x: parseFloat(input.x),
                uncertaintyX: parseFloat(input.uncertaintyX),
                y: parseFloat(input.y),
                uncertaintyY: parseFloat(input.uncertaintyY),
            })),
        };

        try {
            const response = await fetch('https://lina.mslnk.dev/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('image/png')) {
                const imageBlob = await response.blob();
                const imageBlobUrl = URL.createObjectURL(imageBlob);
                setImageUrl(imageBlobUrl);
                setContainerClass('Output show');
            } else {
                console.error('Unexpected response type:', contentType);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <div className={containerClass}>
            {imageUrl ? (
                <img className='result' src={imageUrl} alt="Regression Plot" />
            ) : (
                <p>No image available</p>
            )}
        </div>
    );
}

export default Output;
