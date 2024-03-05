import { useState, useEffect } from 'react';
import axios from 'axios';


function useFetch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);
        axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setData(response.data);
            }).catch((err) => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
    }, [url]);
    return { data, loading, error, setUrl };
}

export default useFetch;