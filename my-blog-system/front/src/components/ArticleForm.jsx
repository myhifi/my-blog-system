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

    const handleSubmit = async ()=>{
        // Basic guard: don't submit if title or content is empty
        if(!form.title || !form.content) return;

        try{
            await axios.post("http://localhost:5000/api/articles", form);
            fetchArticles();   //Refresh the list in Home
            setForm({ title: "", content: "", author: "" }); // Clear the form
        }catch(error){
            console.error("Error creating article:", error);
        }
    }

    return(
        <Card className="p-3 mb-4 shadow">
            <h4 className="text-center mb-3">Add Article</h4>
            <Form>
                <Form.Control className="mb-2" placeholder="Title"
                value={form.title}
                    onChange={(e)=> setForm({...form, title: e.target.value})} />
                <Form.Control as="textarea"
                    rows={3} className="mb-2" placeholder="Content"
                    value={form.content}
                    onChange={(e)=> setForm({...form, content: e.target.value})} />
                <Form.Control className="mb-3" placeholder="Author (optional)"
                    value={form.author}
                    onChange={(e)=> setForm({...form, author: e.target.value})} />
                <Button className="w-100" onClick={handleSubmit}>
                    Add Article
                </Button>
            </Form>
        </Card>
    );
};

export default ArticleForm;