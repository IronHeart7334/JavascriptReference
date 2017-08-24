var doc;
var p;

// The Sprite Class
function Sprite(map, colors) {
	this.map = map;
	this.colors = ["rgb(0, 0, 0)"];
	this.colors = this.colors.concat(colors);
}

// clean up later
Sprite.construct = function(){
    doc = document.body;
    var numColumns = parseInt(prompt("How many columns do you want your sprite to have?"));
    var numRows = parseInt(prompt("What about rows?"));
    
    p = new ProtoSprite();
    
    var addColor = document.createElement("div");
    addColor.style.position = "absolute";
    addColor.style.left = "0px";
    addColor.style.top = "0px";
    addColor.style.height = "50px";
    addColor.style.width = "100px";
    addColor.style.backgroundColor = "yellow";
    addColor.innerHTML = "Add a color";
    addColor.onclick = p.addColor.bind(p);
    doc.appendChild(addColor);
    
    // implement removeColor later
    
    var div;
    var pix;
    
    for (var column = 0; column < numColumns; column ++){
        for (var row = 0; row < numRows; row ++){
            pix = new Pixel(column * 50, row * 50 + 50);
        }
    }
}

Sprite.prototype = {
	draw:function(x, y, size){
		var canvas = document.getElementById("canvas");
		var canvas = canvas.getContext("2d");
        for (var row = 0; row < this.map.length; row++) {
            for (var column = 0; column < this.map[row].length; column++){
            	if (this.map[row][column] == 0){
            		continue;
            	}
            		canvas.fillStyle = this.colors[this.map[column][row]];
            		canvas.fillRect(x + row * size, y + column * size, size, size);
            }	
        }
    }	
}

function ProtoSprite(){
    this.colors = ["rgba(255, 255, 255, 0.0)", "rgb(0, 0, 0)"];
}
ProtoSprite.prototype = {
    addColor:function(){
        var r = parseInt(prompt("How much red?"));
        var g = parseInt(prompt("How much green?"));
        var b = parseInt(prompt("How much blue?"));
        this.colors.push("rgb(" + r + ", " + g + ", " + b + ")");
        console.log(this.colors);
    }
}

function Pixel(x, y){
    this.x = x;
    this.y = y;
    this.colorNum = 1;
    this.createDiv();
}
Pixel.prototype = {
    createDiv:function(){
        div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        div.style.height = "50px";
        div.style.width = "50px";
        div.style.backgroundColor = p.colors[this.colorNum];
        div.id = this.x + " " + this.y;
        div.onclick = this.changeColor.bind(this);
        doc.appendChild(div);
    },
    changeColor:function(){
        this.colorNum += 1;
        console.log(this.colorNum);
        if(this.colorNum == p.colors.length){
            this.colorNum = 0;
        }
        var div = document.getElementById(this.x + " " + this.y);
        div.backgroundColor = p.colors[this.colorNum];
        console.log(div);
    }
}