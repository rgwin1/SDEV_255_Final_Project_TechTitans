import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddCourse = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        subject: "",
        credits: "",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseData = { ...formData, createdBy: userId };

        try {
            const response = await fetch(`${API_URL}/api/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(courseData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error adding course.");
            }

            alert("Course added successfully.");
            navigate("/courselist");

        } catch (error) {
            console.error("Error adding course:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Add Course</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                <input type="number" name="credits" value={formData.credits} onChange={handleChange} required />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
