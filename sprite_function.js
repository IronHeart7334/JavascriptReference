// clean up this mess!
// document better
var doc;
var p;
var pixels = [];
var w;
var h;

// The Sprite Class
function Sprite(map, colors) {
	this.map = map;
	//this.colors = ["rgb(0, 0, 0)"];
	//this.colors = this.colors.concat(colors);
	this.colors = colors;
}

Sprite.construct = function(){
    doc = document.body;
    w = parseInt(prompt("How many columns do you want your sprite to have?"));
    h = parseInt(prompt("What about rows?"));
    
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
    
    var genSprite = document.createElement("div");
    genSprite.style.position = "absolute";
    genSprite.style.left = "90%";
    genSprite.style.top = "0px";
    genSprite.style.height = "50px";
    genSprite.style.width = "10%";
    genSprite.style.backgroundColor = "red";
    genSprite.innerHTML = "Generate Sprite";
    genSprite.onclick = p.generateCode.bind(p);
    doc.appendChild(genSprite);
    
    var pix;
    for (var column = 0; column < w; column ++){
        for (var row = 0; row < h; row ++){
            pix = new Pixel(column, row);
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
    },
    generateCode:function(){
        var map = new Array(h);
        
        for(var i2 = 0; i2 < h; i2++){
            var row = new Array(w);
            for(var i = 0; i < w; i++){
                row[i] = 0;  
            }
            map[i2] = row;
        }
        
        var curPix;
        for(var i = 0; i < pixels.length; i++){
            curPix = pixels[i];
            map[curPix.y][curPix.x] = curPix.colorNum;
        }
        
        var n = new Sprite(map, this.colors);
        n.draw(0, 600, 10);
    }
}

function Pixel(baseX, baseY){
    this.x = baseX;
    this.y = baseY;
    this.colorNum = 1;
    pixels.push(this);
    this.createDiv();
}
Pixel.prototype = {
    createDiv:function(){
        div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = this.x * 50 + "px";
        div.style.top = this.y * 50 + 50 + "px";
        div.style.height = "50px";
        div.style.width = "50px";
        div.style.backgroundColor = p.colors[this.colorNum];
        div.id = this.x + " " + this.y;
        div.onclick = this.changeColor.bind(this);
        doc.appendChild(div);
    },
    changeColor:function(){
        this.colorNum += 1;
        if(this.colorNum == p.colors.length){
            this.colorNum = 0;
        }
        var div = document.getElementById(this.x + " " + this.y);
        div.style.backgroundColor = p.colors[this.colorNum];
    }
}