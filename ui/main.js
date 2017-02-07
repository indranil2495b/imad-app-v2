//counter code

var button = document.getElementById('counter');



button.onclick = function()
{
   
    
   var httpRequest = new XMLHttpRequest();
   
   
httpRequest.onreadystatechange = function ()
{
    if(httpRequest.readyState === XMLHttpRequest.DONE)
    {
        if(request.status === 200)
        {
            var counter = request.responseText;
             var span = document.getElementById('count');
             span.innerHTML = counter.toString();
            
        }
    }
};


httpRequest.open('GET','http://indranil2495b.imad.hasura-app.io/counter', true);
httpRequest.send(null);


};