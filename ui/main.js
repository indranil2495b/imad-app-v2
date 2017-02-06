//counter code

var button = document.getElementById('counter');
var counter = 0;

//requset


button.onclick = function()
{
    //make a request to the counter and capture the response
    
   var request = new XMLHttpRequest();
   
   
request.onreadystatechange = function ()
{
    if(request.readyState === XMLHttpRequest.DONE)
    {
        if(request.status === 200)
        {
            var counter = request.responseText;
             var span = document.getElementById('count');
             span.innerHTML = counter.toString();
            
        }
    }
};
//make a request 

request.open('GET','http://indranil2495b@ssh.imad.hasura-app.io/counter',true);
request.send(null);


};