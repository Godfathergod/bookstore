const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const commentFilePath = 'data/comments.txt';
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const comments = getComments();
  const time = getCurrentTime();
  res.render('index', {comments, time});
});

app.post('/', (req, res) => {
  const formData = req.body;
  const username = formData.username;
  const comment = formData.comment;

  console.log(username + " " + comment);

  saveComment(username, comment);

  res.send({success: true, time: getCurrentTime()})
});

app.listen(process.env.PORT || 5000, () => {
  console.log("App is running http://localhost:8080");
});

function saveComment(username, comment) {
  const newComment = {author: username, text: comment, time: getCurrentTime()};
  const comments = getComments();

  comments.push(newComment);
  try {
    fs.writeFileSync(commentFilePath, JSON.stringify(comments), 'utf-8');
  } catch (error) {
    console.error('File writing error:', error);
  }
}

function getComments() {
  try {
    const commentsString = fs.readFileSync(commentFilePath, 'utf-8');
    if (commentsString) return JSON.parse(commentsString)
    else return [];
  } catch (error) {
    console.log(error, "Error with reading comment file:", error);
  }
}

function getCurrentTime() {
  let currentTime = new Date();
  return currentTime.getDate() + "/"
    + (currentTime.getMonth() + 1) + "/"
    + currentTime.getFullYear() + " | "
    + currentTime.getHours() + ":"
    + (currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes()) + ':'
    + (currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds());
}