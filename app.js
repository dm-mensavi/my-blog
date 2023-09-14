//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Welcome to My_Blog! This is a space where I share daily reflections, thoughts, and insights on a wide range of topics. My aim is to create a platform for open conversation, learning, and mutual growth. I'm passionate about [mention your interests or focus areas], and I started this blog as a way to [mention the reason why you started the blog]. Through My_Blog, I hope to inspire, educate, and connect with you. Thank you for being a part of this journey!\n Feel free to insert your specific interests and goals into the provided placeholders.";
const contactContent = "We'd love to hear from you! Whether you have questions, suggestions, or just want to say hello, feel free to reach out to us. You can contact us via at mensavidavid@gmail.com. We value your feedback and look forward to connecting with you. Thank you for being a part of our community!";

var title = "";
var content = "";

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get('/', (req, res) => {

  res.render('home', {homeStartingContent, posts});
} );

app.get('/about', (req, res) => {
  res.render('about', {aboutContent});
} );

app.get('/contact', (req, res) => {
  res.render('contact', {contactContent});
} );

app.get('/compose', (req, res) => {
  
  res.render('compose');
} );


app.get('/posts/:postName', (req, res) => {

  var postName = _.lowerCase(req.params.postName);
  posts.forEach(post => {
    
    if(postName === _.lowerCase(post.title)){
      
      title = post.title;
      content = post.content;
      noMatch = false;
    
      res.render('post', {title, content});
      
    }
    
  });
  

});


app.post('/compose', (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content
  }
  posts.push(post);
 
  res.redirect('/');
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
