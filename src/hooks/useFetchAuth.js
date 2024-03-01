import { useState, useEffect } from "react";
import { useAuthStore } from '../auth/LoginAuth.js';
import { useNavigate } from 'react-router-dom';

export function useFetchAuth(initialUrl = '', initialOptions = {}) {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);

  const isAuthenticated = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!url) return;
    fetch(url, options)
      .then((res) => res.text())
      .then((token) => {
        localStorage.setItem('token', token);
        console.log('token:', token);
        isAuthenticated(token);
        navigate("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, options]);

  return { setUrl, setOptions };
}