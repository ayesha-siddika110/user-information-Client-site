
import { Route, Routes } from 'react-router';
import MainLayout from '../Layouts/Mainlayout/MainLayout';
import Register from '../Pages/register/Register';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
};

export default Router;