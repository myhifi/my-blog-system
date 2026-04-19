const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// ***** CREATE — POST /api/articles *****
router.post("/", async(req, res)=>{
    try{
        const article = new Article(req.body);
        const saved = await article.save();
        res.json(saved);
    }catch(error){
        res.status(500).json({error: error.message });
    }
});

// ***** READ — GET /api/articles *****
router.get("/", async(req, res)=>{
    try{
        const articles = await Article.find().sort({createdAt: -1});
        res.json(articles);
    }catch(error){
        res.status(500).json({error: error.message});
    }
})

// ***** DELETE — DELETE /api/articles/:id *****
router.delete("/:id", async(req, res)=>{
    try{
        await Article.findByIdAndDelete(req.params.id);
        res.json({message: "Article deleted successfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
})

// ***** UPDATE — PUT /api/articles/:id *****
router.put("/:id", async(req,res)=>{
    try{
        const updated = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            // {new: true}
            { returnDocument: 'after' } // Fixes the Mongoose warning
        );
        res.json(updated);
    }catch(error){
        res.status(500).json({error: error.message});
    }
})

module.exports = router;