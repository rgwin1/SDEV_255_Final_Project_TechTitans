import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Credits</th>
            {role === "teacher" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.credits}</td>
              {role === "teacher" && course.createdBy === userId && (
                <td>
                  <Link to={`/editcourse/:courseId`}>
                    <button>Edit</button>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
console.log("roles from localstorage:", role);
console.log("UID from LS", userId);
console.log("Course data: ", courses);


export default CourseList;
