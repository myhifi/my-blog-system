import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"
import { useState } from "react";

const ArticleList = ({articles, deleteArticle, editArticle, setEditArticle, updateArticle})=>{
    // Local state — tracks the edited field values inside the edit form
    const [editForm, setEditForm] = useState({
        title: "", content: "", author: ""
    })

    // Called when Edit button is clicked — populates the form with current values
    const handleEditClick = (article)=>{
        setEditArticle(article);
        setEditForm({
            title: article.title,
            content: article.content,
            author: article.author
        });
    };

    // Called when Save button is clicked inside edit mode
    const handleSave = (id)=>{
        if(!editForm.title || !editForm.content) return;
        updateArticle(id, editForm);
    }

    // If no articles exist yet, show a friendly message
    if(articles.length === 0){
        return <p className="text-center text-muted">No articles yet. Add one above!</p>;
    }
    return(
        <Row>
            {articles.map((article)=>(
                <Col md={4} className="mb-3" key={article._id}>

                    {/* If this article is being edited — show edit form */}
                    {editArticle && editArticle._id === article._id ? (
                        <Card className="h-100 shadow-sm border-warning">
                            <Card.Body>
                                <Form.Control
                                    className="mb-2"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                />
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    className="mb-2"
                                    value={editForm.content}
                                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                />
                                <Form.Control
                                    className="mb-3"
                                    value={editForm.author}
                                    onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                                />
                            </Card.Body>
                            <Card.Footer className="d-flex gap-2">
                                <Button
                                    variant="success"
                                    size="sm"
                                    className="w-50"
                                    onClick={() => handleSave(article._id)}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-50"
                                    onClick={() => setEditArticle(null)}
                                >
                                    Cancel
                                </Button>
                            </Card.Footer>
                        </Card>

                    ) : (

                        /* Otherwise — show the normal article card */
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Text>{article.content}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">{article.author}</small>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleEditClick(article)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteArticle(article._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    )}

                </Col>
            ))}
        </Row>
    );
};

export default ArticleList;