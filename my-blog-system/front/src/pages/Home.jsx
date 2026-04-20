import { useEffect, useState } from "react";
import axios from "axios";
import ArticleForm from "../components/ArticleForm";
import ArticleList from "../components/ArticleList";
import Container from "react-bootstrap/Container"

const Home = ()=>{
    // This state holds the array of articles from the database
    const [articles, setArticles] = useState([]);

    const [editArticle, setEditArticle] = useState(null); //means "no article is being edited"

    // The URL changes automatically based on Vercel settings
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    
    // This function talks to your backend and gets all articles
    const fetchArticles = async ()=>{
        try{
            const res = await axios.get(`${API_URL}/api/articles`);
            setArticles(res.data); //res.data is the array MongoDB returned
        }catch(error){
            console.error("Error fetching articles:", error);
        }
    };

    // DELETE — sends DELETE request with the article's id
    const deleteArticle = async (id)=>{
        try{
            await axios.delete(`${API_URL}/api/articles/${id}`);
            fetchArticles(); //refresh the list after deletion
        }catch(error){
            console.error("Error deleting article:", error);
        }
    };

    // UPDATE — sends PUT request with the id and new data
    const updateArticle = async (id, updatedData)=>{
        try{
            await axios.put(`${API_URL}/api/articles/${id}`, updatedData);
            setEditArticle(null);  //exit edit mode
            fetchArticles();    // refresh the list
        }catch(error){
            console.error("Error updating article:", error);
        }
    }

    // Run fetchArticles once when the page first loads
    useEffect(()=>{
        fetchArticles();
    }, []);

    return(
        <Container className="mt-4">
            <ArticleForm fetchArticles = {fetchArticles} />
            <ArticleList
                articles = {articles}
                deleteArticle = {deleteArticle} //Called when user clicks Delete on a card
                editArticle = {editArticle}  //The article currently being edited (or null)
                setEditArticle = {setEditArticle} //Called when user clicks Edit — sets which article to edit
                updateArticle = {updateArticle}  //Called when user saves the edit form
            />
        </Container>
    );
}

export default Home;
