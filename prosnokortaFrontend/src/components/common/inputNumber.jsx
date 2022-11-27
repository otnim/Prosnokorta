// it should be deleted

import React from 'react';

function InputNumber({name, label, data, ...rest}) {
    return (
        <div className="form-group mb-3">
            <label className="form-label">{label}</label>
            <input
                {...rest}
                name={name}
                value={data}
                // onChange={handleChange}
                min="1" max="500"
                className="form-control"
            />
        </div>
    );
}

export default InputNumber;