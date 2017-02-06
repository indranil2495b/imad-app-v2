//counter code

var button = document.getElementById('counter');
var counter = 0;



button.onclick = function()
{
    //make a request to the counter and capture the response
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
}