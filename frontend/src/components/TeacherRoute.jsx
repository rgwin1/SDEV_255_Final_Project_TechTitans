import { Navigate, Outlet } from 'react-router-dom';

const TeacherRoute = () => {
    const role = localStorage.getItem('role');
    console.log("User role:", role);  // Check the value in console

    return role === 'teacher' ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default TeacherRoute;
