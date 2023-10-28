//the backend for the GitHub profile viewer
//Debashish Buragohain

const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();

app.use(express.json());
//setting CORS to false
app.use(helmet({ crossOriginResourcePolicy: false }))

//enabling all origins requests for the server
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', false); //no cookies needed
  next(); //pass to the next layer of middleware
});

//allowing to make requests to other URLS
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["*"],
      imgSrc: ["*"]
    }
  }
}));

app.use('/static', express.static(path.join(__dirname, '/public')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
})

app.listen(8080, () => console.log("GitHub profile app server running at port 8080"));