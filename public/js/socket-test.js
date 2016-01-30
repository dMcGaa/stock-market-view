$(document).ready(function() {
  var socket = io();
  
  $("#testButton").on("click", function(){
    alert("test");
    socket.emit("chat message", "hello server");
  });
  
  $("#sendBtn").on("click", function(e){
    e.preventDefault();
    alert("test");
    socket.emit("chat message", "hello server");
  });
})