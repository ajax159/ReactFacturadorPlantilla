import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAxiosFetch(initialUrl = '', initialOptions = {}) {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);

  const fetchData = (requestUrl, requestOptions) => {
    if (!requestUrl) return Promise.resolve();
    const token = localStorage.getItem('token');
    const axiosOptions = {
      ...requestOptions,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...requestOptions.headers,
      },
    };
    return axios(requestUrl, axiosOptions)
      .then((res) => {
        return res;
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, [url, options]);


  return { setUrl, setOptions, fetchData };
}