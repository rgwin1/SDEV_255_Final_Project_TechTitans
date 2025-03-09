import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const EditCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        subject: "",
        credits: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`${API_URL}/api/courses/${courseId}`)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch course.");
                return response.json();
            })
            .then((data) => {
                setFormData({
                    name: data.name || "",
                    description: data.description || "",
                    subject: data.subject || "",
                    credits: data.credits?.toString() || "",
                });
            })
            .catch((error) => console.error("Error fetching course:", error));
    }, [courseId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/courses/${courseId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error updating course.");
            }

            alert("Course updated successfully.");
            navigate("/courselist");

        } catch (error) {
            console.error("Error updating course:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Edit Course</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                <input type="number" name="credits" value={formData.credits} onChange={handleChange} required />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCourse;
