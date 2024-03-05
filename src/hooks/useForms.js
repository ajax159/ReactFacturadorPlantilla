import { useState } from 'react';

export function useForms(initialState) {
    const [values, setValues] = useState(initialState);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setValues(initialState);
    };

    return [values, handleChange, resetForm];
}

