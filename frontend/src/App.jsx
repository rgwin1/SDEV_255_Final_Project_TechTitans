import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/courselist';
import AddCourse from './pages/addcourse';
import EditCourse from './pages/editcoursepage';
import Unauthorized from './pages/unauthorized';
import TeacherRoute from './components/TeacherRoute';
import Navbar from './components/navbar';
import Signup from './pages/signup';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename="/SDEV_255_Final_Project_TechTitans">
                <Navbar />
                <Routes>
                    <Route path="/" element={<CourseList />} />
                    <Route path="/courselist" element={<CourseList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Teacher-only routes */}
                    <Route element={<TeacherRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/addcourse" element={<AddCourse />} />
                        <Route path="/editcourse/:courseId" element={<EditCourse />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
