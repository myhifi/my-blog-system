import { useState } from "react";
import axios from "axios";
// import { Card, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ArticleForm = ({fetchArticles})=>{
    // Local state — tracks what the user is typing in each field
    const [form, setForm] = useState({
        title: "",
        content: "",
        author: ""
    });

    // Determine the Backend API URL based on the environment (Vercel vs Local)
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    /** Handles the form submission.
      * Prevents page reload, validates required fields, sends a POST request 
      * to the API, refreshes the article list, and resets the form.
      */
    const handleSubmit = async (e)=>{
        if (e) e.preventDefault();
        // Basic guard: don't submit if title or content is empty
        if(!form.title || !form.content) return;

        try{
            // Send the article data to the database
            await axios.post(`${API_URL}/api/articles`, form);
            fetchArticles();   //Refresh the list in Home
            setForm({ title: "", content: "", author: "" }); // Clear the form
        }catch(error){
            console.error("Error creating article:", error);
        }
    }

    /** Updates the form state dynamically.
      * Uses the 'name' attribute of the input field to determine which 
      * property in the state object to update.
      */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return(
        <Card className="p-3 mb-4 shadow">
            <h4 className="text-center mb-3">Add Article</h4>
            <Form onSubmit={handleSubmit}> 
                <Form.Control 
                    className="mb-2"
                    id="article-title"
                    name="title"   // Matches the key in useState
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange} 
                    required
                />
                <Form.Control 
                    as="textarea"
                    rows={3} 
                    className="mb-2"
                    id="article-content"
                    name="content"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange} 
                    required
                />
                <Form.Control 
                    className="mb-3"
                    id="article-author"
                    name="author"
                    placeholder="Author (optional)"
                    value={form.author}
                    onChange={handleChange} 
                />
                <Button className="w-100" type="submit">
                    Add Article
                </Button>
            </Form>
        </Card>
    );
};

export default ArticleForm;
