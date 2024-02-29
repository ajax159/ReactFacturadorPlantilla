import './App.css';
import { useAuthStore } from './auth/LoginAuth.js';
import { Navigate, Outlet } from 'react-router-dom';



function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div>
      {isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />}
    </div>
  );
}

export default App;
