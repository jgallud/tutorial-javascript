

var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()

//app.use(app.router);
app.use('/',exp.static(__dirname + "/formContacto"));


app.get("/",function(request,response){
	var contenido=fs.readFileSync("./formContacto/ajax30.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});


app.post("/peticion",function(request,response){
	var body='';
	//console.log("petición post recibida");
	request.on('data', function(chunk) {
		body+=chunk;//chunk.toString();      
    //console.log(body);
    });
    
    request.on('end', function() {
      // empty 200 OK response for now
      var resultado=JSON.parse(body);
      console.log(resultado);
      response.writeHead(200, "OK", {'Content-Type': 'text/html'});     
      response.end();
    });
});

console.log("servidor iniciado...");
app.listen(port,host);
