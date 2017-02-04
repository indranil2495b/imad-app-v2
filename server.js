var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles= {
    
'articleOne': {
    
    title: 'Article one',
    heading: 'Article one bro',
    date:'sep 5 2016',
    
    content:  
    
    `<p>
                This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.
            </p>
            <p>
                This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.
            </p>`
},
'articleTwo': {
     title: 'Article two',
    heading: 'Article two bro',
    date:'sep 56 2016',
    
    content:  
    
    `<p>
                This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.
            </p>
            <p>
                This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.
            </p>`
},
 'articleThree': {
     title: 'Article three',
    heading: 'Article three bro',
    date:'sep 25 2016',
    
    content:  
    
    `<p>
                This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.
            </p>
            <p>
                This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.This is the content am gonna write soon for my first article.
            </p>`
            }
};

function createTemplate(data)
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
    
    <meta name="viewport" contents="width=device-width, initial-sclae=1">
    
    <link href="/ui/style.css" rel="stylesheet" />
    
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>
    
    
    
    
</html>

`;
return htmlTemplate;
}

app.get('/', function (req, res) {
    
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function(req, res)
{
    
     var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});





app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
