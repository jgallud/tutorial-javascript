

var fs=require("fs");
var qs = require("querystring");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()

//app.use(app.router);
app.use('/',exp.static(__dirname)); //+ "/formContactoMongo"));

var contactoCol;



app.get("/",function(request,response){
	var contenido=fs.readFileSync("./ajax30.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});


app.post("/peticion",function(request,response){
	var datos='';
	
	request.on('data', function(chunk) {
		datos+=chunk; 
    });
    
    request.on('end', function() {
      var cont=qs.parse(datos);

      contactoCol.insert(cont,function(error){
            if(error){
              console.log("Hubo un error");
            }
            else{
              console.log("Elemento insertado");
            }
          });
      console.log(cont);
      response.end();
    });
    
});

console.log("servidor iniciado...");
app.listen(port,host);

var mongo=require("mongodb");
var hostDB="127.0.0.1";
var portDB=mongo.Connection.DEFAULT_PORT;
var db=new mongo.Db("contactosDB",new mongo.Server(hostDB,portDB,{}));


db.open(function(error){
  console.log("Conectado a la base de datos "+host+" "+port);

  db.collection("contactos",function(error,col){
    console.log("Tenemos la colección");
    contactoCol=col;
  });
});