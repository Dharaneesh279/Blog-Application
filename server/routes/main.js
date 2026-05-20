const express = require('express');
const router = express.Router();
const Post  = require('../models/Post');

router.get('/',async(req,res) =>{
    try {
        const locals = {
        title: "Blog API",
        description: "A simple Blog API built with Node.js and Express.js"
        }
        let perPage =3;
        let page = parseInt(req.query.page) || 1;

        const data = await Post.aggregate([{ $sort: {createdAt: -1}}])
        .skip(perPage * (page - 1))
        .limit(perPage)
        .exec()

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const previousPage = parseInt(page) - 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);


        res.render('index',{
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            previousPage: previousPage >= 1 ? previousPage : null
        });
    } catch (error) {
        console.log(error);
    }

});

// get and post 

router.get('/post/:id', async(req,res) =>{
    try {   
        let slug =req.params.id;
        const data = await Post.findById({_id: slug});
        const locals = {
            title: data.title,
            description: "A simple Blog API built with Node.js and Express.js"
        }
        res.render('post',{locals,data});
    } catch (error) {
        console.log(error);
    }
});


//POST

router.post('/search',async(req,res) => {
    try {
         const locals = {
        title: "Search",
        description: "Simple Blog created with NodeJs, Express and MongoDB"
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        
        const data = await Post.find({
            $or: [
                {title : {$regex : new RegExp(searchNoSpecialChar, "i")}},
                {body : {$regex : new RegExp(searchNoSpecialChar, "i")}}
            ]
        });
        res.render("search", { locals, data });
    } catch (error) {
        console.log(error);
    }
});







router.get('/about',(req,res) =>{
    res.render('about');
});


module.exports = router;
























// function insertPostData(){
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body: "This is the body text for the first blog post."
//         },
//         {
//             title: "Learning NodeJS",
//             body: "NodeJS helps developers build backend applications using JavaScript."
//         },
//         {
//             title: "Introduction to Express",
//             body: "Express makes routing and server creation easier in NodeJS."
//         },
//         {
//             title: "Getting Started with MongoDB",
//             body: "MongoDB stores data in flexible JSON-like documents."
//         },
//         {
//             title: "Understanding EJS Templates",
//             body: "EJS allows dynamic HTML rendering using JavaScript."
//         },
//         {
//             title: "Why Use Mongoose",
//             body: "Mongoose provides schema-based modeling for MongoDB."
//         }
//     ])
// }
// insertPostData();
