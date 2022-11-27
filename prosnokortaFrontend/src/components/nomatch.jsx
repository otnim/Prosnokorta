import React, { useState, useEffect } from 'react';

const NoMatch = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
        console.log("printed");
    });

    return (
        <div>
            <h1>Page Not Found</h1>

            <h2>This page is temporarily used is playground</h2>

            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
        </div>
    );
};

export default NoMatch;