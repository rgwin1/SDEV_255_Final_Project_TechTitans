import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("https://glitch.com/edit/#!/innovative-selective-power?path=README.md%3A1%3A0")
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
          </tr>
        </thead>
        <tbody>
          {courses.map((courses) => (
            <tr key={courses._id}>
              <td>{courses.name}</td>
              <td>{courses.description}</td>
              <td>{courses.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
