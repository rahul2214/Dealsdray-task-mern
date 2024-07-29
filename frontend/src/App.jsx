import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/Authcontext';
import CreateEmployee from './pages/createEmployee/createEmployee';
import EmployeeList from './pages/listEmployees.jsx/ListEmployees';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div >
      
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"}/>} />
        <Route path='/createEmployee' element={authUser ? <CreateEmployee /> : <Navigate to={"/login"} />} />
        <Route path='/employeeList' element={authUser ? <EmployeeList /> : <Navigate to={"/login"} />} />


        <Route path='/login' element={authUser ? < Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={ authUser ? < Navigate to='/'/> : <SignUp />} />
        </Routes>
        <Toaster />
      
    </div>
  );
}

export default App;
