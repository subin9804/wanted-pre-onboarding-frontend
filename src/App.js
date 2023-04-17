import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from 'react';
import Signup from './component/signUp';
import SignIn from './component/signIn';
import Todo from './component/todo';
import './App.css';
import AuthProvider from './component/AuthProvider';
import AuthContext from './component/AuthContext';
import AuthRequired from './component/AuthRequired';

function Index() {
  const {user} = useContext(AuthContext);
  if(!user) {
    return <Navigate to="/signin" replace={true}/>
  } else {
    return <Navigate to="/todo" replace={true}/>
  }
}

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/signin" element={<SignIn />} /> 

            <Route path='/todo' element={<AuthRequired><Todo /></AuthRequired>} />

          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
