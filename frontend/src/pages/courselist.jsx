import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const role = localStorage.getItem("role"); 
    const userId = localStorage.getItem("userId") || ""; 

    useEffect(() => {
        fetch(`${API_URL}/api/courses`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Courses Retrieved:", data);
                setCourses(data);
            })
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div>
            <h1>Available Courses</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Description</th>
                        <th>Credits</th>
                        {role === "teacher" && <th>Actions</th>} 
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => {
                        const createdById = String(course.createdBy || ""); // Ensure it's a string
                        const currentUserId = String(userId);

                        return (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.credits}</td>
                                {role === "teacher" && createdById === currentUserId && (
                                    <td>
                                        <Link to={`/editcourse/${course.id}`}>
                                            <button>Edit</button>
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;
