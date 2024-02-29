import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAxiosFetch(initialUrl = '', initialOptions = {}) {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    if (!url) return;
    const token = localStorage.getItem('token');
    const axiosOptions = {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    };
    axios(url, axiosOptions)
      .then((res) => setData(res.data))
      .catch((error) => console.error(error));
  }, [url, options]);

  return { data, setUrl, setOptions };
}