import logo from './logo.svg';
import './App.css';
import RegistrationPage from './componetns/RegistrationPage';
import { Route, Routes, Link } from 'react-router-dom';
import LoginPage from './componetns/LoginPage';
import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';
import TaskPage from './componetns/TaskPage';


function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path='/' element={
                        <RequireAuth>
                            <TaskPage />
                        </RequireAuth>
                    } />
                    <Route path='/register' element={<RegistrationPage />} />
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
