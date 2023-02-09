//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require('lodash');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const posts=[]



app.get("/",function(req,res){
  res.render("home",{getposts:posts})
})

app.get("/about",function(req,res){
  res.render("about")
})

app.get("/contact",function(req,res){
    res.render("contact")
})

app.get("/compose",function(req,res){
  res.render("compose") 
})


app.post("/compose",function(req,res){

  const post={
    postTitle:req.body.title,
    postContent:req.body.para
  }
  posts.push(post)
  res.redirect("/")
})

app.get("/posts/:days",function(req,res){
  // console.log(req.params.days)
  const path=lodash.lowerCase(req.params.days)
  posts.forEach(function(ele){
    const arrayele= lodash.lowerCase(ele.postTitle)
    if (arrayele===path){
      res.render("post",{title:(ele.postTitle),content:(ele.postContent)})
    }
  })
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
