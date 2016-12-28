var tex;/*
var Mascota = function(n,v){
	this.nombre = n;
	this.voz = v;
}
Mascota.prototype.hablar = function(){
	alert(this.voz);
}
var gato = {
	nombre: "Gatuno",
	voz: "miau",
	hablar: function(){
		alert(this.voz);
	}
}
function inicio(){
	var perro = new Mascota("perruncho","guau!");
	perro.hablar();
	gato.hablar();	
}
*/
var palabras = ["tamarindo", "platzi",
				"programacion", "python",
				"laptop", "tecnologia"];
var res;
var espacio;
var l,b;
var hombre;
var ind = aleatorio(0,5);
var palabra = palabras[ind].toUpperCase();
var palabraLong = palabra.length;
espacio = new Array(palabraLong);
var letra;
function aleatorio(min,max){
	var mul;
	if(max<10){
		mul=10;
	}
	else if(max<100){
		mul=100;
	}
	var res=-1;
	while(res<min || res>max){
		res = Math.floor(Math.random()*mul);
	}
	return res;
}
var ahorcado = function (con) {
	this.contexto = con;
	this.MaxIntentos = 5;
	this.intentos = 0;
	this.vivo = true;
	this.dibujar();
}
ahorcado.prototype.dibujar = function(){
	this.contexto.beginPath();
	this.contexto.strokeStyle = "#00F";
	this.contexto.moveTo(100,100);
	this.contexto.lineTo(100,50);
	this.contexto.lineTo(300,50);
	this.contexto.lineTo(300,350);
	this.contexto.lineWidth = 10;
	this.contexto.stroke();
	this.contexto.closePath();
	switch(this.intentos) {
    case 1:
        this.dibujarCabeza();
        break;
    case 2:
        this.dibujarTorso();
        break;
    case 3:
        this.dibujarBrazos();
        break;
    case 4:
        this.dibujarPiernas();
        break;
    case 5:
        this.dibujarMuerto();
        break;
	}
}
ahorcado.prototype.trazar = function (){
	this.intentos++;
	if (this.intentos>=this.MaxIntentos) {
		this.vivo = false;
		alert("estas muerto");
		espacio = palabra;
		mostrarPista();
	}
	this.dibujar();
}
ahorcado.prototype.dibujarCabeza = function(){
	this.contexto.beginPath();
    this.contexto.strokeStyle = "black";
    this.contexto.arc(100,125,25,Math.PI*2,false);
    this.contexto.lineWidth = 5;
    this.contexto.stroke();
    this.contexto.closePath();
}
ahorcado.prototype.dibujarTorso = function(){
	this.contexto.beginPath();
	this.contexto.strokeStyle = "black";
	this.contexto.moveTo(100,150);
	this.contexto.lineTo(100,250);
	this.contexto.lineWidth = 5;
	this.contexto.stroke();
	this.contexto.closePath();
}
ahorcado.prototype.dibujarBrazos = function(){
	this.contexto.beginPath();
	this.contexto.strokeStyle = "black";
	this.contexto.moveTo(100,175);
	this.contexto.lineTo(150,225);
	this.contexto.lineTo(100,175);
	this.contexto.lineTo(50,225);
	this.contexto.lineWidth = 5;
	this.contexto.stroke();
	this.contexto.closePath();
}
ahorcado.prototype.dibujarPiernas = function(){
	this.contexto.beginPath();
	this.contexto.strokeStyle = "black";
	this.contexto.moveTo(100,250);
	this.contexto.lineTo(150,300);
	this.contexto.lineTo(100,250);
	this.contexto.lineTo(50,300);
	this.contexto.lineWidth = 5;
	this.contexto.stroke();
	this.contexto.closePath();
}
ahorcado.prototype.dibujarMuerto = function(){
	//Ojo Derecho
	this.contexto.beginPath();
	this.contexto.strokeStyle = "grey";
	this.contexto.moveTo(110,120);
	this.contexto.lineTo(115,125);
	this.contexto.lineTo(105,115);
	this.contexto.lineTo(110,120);
	this.contexto.lineTo(115,115);
	this.contexto.lineTo(105,125);
	this.contexto.lineWidth = 1;
	this.contexto.stroke();
	this.contexto.closePath();

	//Ojo Izquierdo
	this.contexto.beginPath();
	this.contexto.strokeStyle = "grey";
	this.contexto.moveTo(90,120);
	this.contexto.lineTo(95,125);
	this.contexto.lineTo(85,115);
	this.contexto.lineTo(90,120);
	this.contexto.lineTo(95,115);
	this.contexto.lineTo(85,125);
	this.contexto.lineWidth = 1;
	this.contexto.stroke();
	this.contexto.closePath();
}
function buscarLetra(letra){
	var encuentra = false;
	for(var i = 0;i<palabraLong;i++){
		if(palabra[i] == letra){
			encuentra = true;
		}
	}
	return encuentra;
}
function inicio(){
	var canvas = document.getElementById("c");
	canvas.width = 500;
	canvas.height = 400;
	var contexto = canvas.getContext("2d");
	hombre = new ahorcado(contexto);
	l = document.getElementById("letra");
	b = document.getElementById("boton");
	b.addEventListener("click",getLetra);
	mostrarPista();
}
function getLetra(){
	if(hombre.vivo){
		letra = l.value;
		letra = letra.toUpperCase();
		letra = letra[0];
		res = buscarLetra(letra);
		if (!res) {
			hombre.trazar();
		}
		else{
			for(var p in palabra){
				if (palabra[p] == letra){
					espacio[p] = letra;
				}
			}
			mostrarPista();
		}
		l.value = "";
		l.focus();
	}
	else{
		alert("No tienes mas intentos");
	}
	
}
function mostrarPista(){
	var pista = document.getElementById("pista");
	var texto = "";
	for (var i = 0; i < palabraLong; i++) {
		if (espacio[i] == undefined) {
			texto += "_ ";
		}
		else{
			texto += espacio[i];
		}

	}
	pista.innerText = texto;
}