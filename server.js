var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
  
  user: 'indranil2495b',
  database: 'indranil2495b',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = 
{
    'article-one': 
{
    title:'Article one | indranil bhattacharji',
    heading:'Article one welcomes you all',
    date: 'feb 8 2017',
    
    content: `<p>
    
    This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....
    
    
    </p>`
},

'article-two': 
{
    title:'Article Two | indranil bhattacharji',
    heading:'Article Two welcomes you all',
    date: 'feb 15 2017',
    
    content: `<p>
    
    This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....This is my first web app.....
    
    
    </p>`
}

};

function createTemplate (data)
{

var title = data.title;
var date = data.date;
var heading = data.heading;
var content = data.content;

var htmlTemplate = `


<html>
    <head>
    <title>
        ${title}
    </title>
    <meta name= "viewport" contents="width=device-width, initial-scale=1"/>
    
    <link href="/ui/style.css" rel="stylesheet"/>
    
</head>
<body>
    <div class="container">
        <div>
            <a href="/">HOME</a>
        </div>
        <hr/>
        <h3>
           ${heading}
        </h3>
        <hr/>
        <h3>
           ${date}
        </h3>
        <hr/>
        <p>
            ${content}
        </p>
    </div>
</body>
</html>

`;
return htmlTemplate;
}
        
        
        
    
    
    
        
app.get('/', function (req, res) {
    
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    
    var articleName = req.params.articleName;
    
  res.send(createTemplate(articles[articleName]));
});






var counter = 0;
app.get('/counter',function(req, res)
{
    counter = counter + 1;
    res.send(counter.toString());
});

var pool = new Pool(config)
app.get('/test-db',function(req,res)
{
    //make select-request
    //return a response
    
    pool.query('select * FROM test',function(err, result)
    {
        if(err)
        {
            res.status(500).send(err.tostring());
        }
        else
        {
            res.send(JSON.stringfy(result.rows));
        }
    
    });
    
});


//........................................................................





app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



var names = [];
app.get('/submit-name',  function(req, res)
{
    
   var name = req.query.name;
   
   names.push(name);
   
   res.send(JSON.stringify(names));
});





var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
