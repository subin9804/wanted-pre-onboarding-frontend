import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import Signup from './component/signUp';
import SignIn from './component/signIn';
import Todo from './component/todo';
import './App.css';
import AuthProvider from './component/AuthProvider';
import AuthRequired from './component/AuthRequired';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
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
