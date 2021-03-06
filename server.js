var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
  
  user: 'indranil2495b',
  database: 'indranil2495b',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());





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
           ${date.toDateString()}
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



app.get('/articles/:articleName', function (req, res) {
    
   pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName], function(err, result)
   {
      if(err)
      {
          res.status(500).send(err.toString());
      }
      else
      {
          if(result.rows.length === 0)
          {
              res.status(404).send("article not found");
          }
          else
          {
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));
          }
          
      }
   });
});


function hash(input, salt)
{
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512,'sha512');
    return ["pbkdf2","10000", salt, hashed.toString('hex')].join('$');
}









app.get('/hash/:input',function(req, res)
{
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    
    var salt = crypto.getRandomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user"(username, password) VALUES ($1, $2)',[username, dbString], function (err, result)
    {
       if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('user successfuly created' +username);
        }
    });
    
});






var counter = 0;
app.get('/counter',function(req, res)
{
    counter = counter + 1;
    res.send(counter.toString());
});



var pool = new Pool(config);
app.get('/testdb',function(req, res)
{
    //make select-request
    //return a response
    
    pool.query('select * FROM test',function(err, result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
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
