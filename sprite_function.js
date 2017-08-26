// clean up this mess!
// document better

function construct(){
    var w = parseInt(prompt("How many columns do you want your sprite to have?"));
    var h = parseInt(prompt("What about rows?"));
    
    var p = new ProtoSprite(w, h);
    document.getElementById("addColor").onclick = p.addColor.bind(p);
    // implement removeColor later
    document.getElementById("genSprite").onclick = p.generateCode.bind(p);
    
    var pix;
    for (var column = 0; column < w; column ++){
        for (var row = 0; row < h; row ++){
            pix = new Pixel(column, row, p);
        }
    }
}

// The Sprite Class
function Sprite(map, colors) {
	this.map = map;
	this.colors = ["rgb(0, 0, 0)"];
	this.colors = this.colors.concat(colors);
}
Sprite.prototype = {
	draw:function(x, y, size){
		var canvas = document.getElementById("canvas").getContext("2d");
        for (var row = 0; row < this.map.length; row++) {
            for (var column = 0; column < this.map[row].length; column++){
            	if (this.map[row][column] != 0){
            		canvas.fillStyle = this.colors[this.map[row][column]];
            		canvas.fillRect(x + column * size, y + row * size, size, size);
            	}
            }	
        }
    }	
}

function ProtoSprite(width, height){
    this.colors = ["rgba(255, 255, 255, 0.0)", "rgb(0, 0, 0)"];
    this.w = width;
    this.h = height;
    this.pixels = [];
}
ProtoSprite.prototype = {
    addColor:function(){
        var r = parseInt(prompt("How much red?"));
        var g = parseInt(prompt("How much green?"));
        var b = parseInt(prompt("How much blue?"));
        this.colors.push("rgb(" + r + ", " + g + ", " + b + ")");
    },
    generateCode:function(){
        var map = new Array(this.h);
        
        for(var i2 = 0; i2 < this.h; i2++){
            var row = new Array(this.w);
            map[i2] = row;
        }
        
        var curPix;
        for(var i = 0; i < this.pixels.length; i++){
            curPix = this.pixels[i];
            map[curPix.y][curPix.x] = curPix.colorNum;
        }
        this.colors.shift();
        var n = new Sprite(map, this.colors);
        n.draw(200, 600, 100);
        for(var pixel = 1; pixel < this.pixels.length; pixel++){
        	this.pixels[pixel].deleteDiv();
        }
    }
}

function Pixel(baseX, baseY, assignTo){
    this.x = baseX;
    this.y = baseY;
    this.colorNum = 1;
    this.assignedTo = assignTo;
    assignTo.pixels.push(this);
    this.createDiv();
}
Pixel.prototype = {
    createDiv:function(){
    	var c = document.getElementById("canvas");
    	var cw = parseInt(c.style.width.slice(0, -1)) / 100 * window.innerWidth;
    	var ch = parseInt(c.style.height.slice(0, -1)) / 100 * window.innerHeight
    	var w = cw / this.assignedTo.w;
    	var h = ch / this.assignedTo.h;
        div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = this.x * w + "px";
        div.style.top = this.y * h + ch / 10 + "px";
        div.style.width = w + "px";
        div.style.height = h + "px";
        div.style.backgroundColor = this.assignedTo.colors[this.colorNum];
        div.id = this.x + " " + this.y;
        div.onclick = this.changeColor.bind(this);
        document.body.appendChild(div);
    },
    changeColor:function(){
        this.colorNum += 1;
        if(this.colorNum == this.assignedTo.colors.length){
            this.colorNum = 0;
        }
        var div = document.getElementById(this.x + " " + this.y);
        div.style.backgroundColor = this.assignedTo.colors[this.colorNum];
    },
    deleteDiv:function(){
    	var div = document.getElementById(this.x + " " + this.y);
    	div.parentNode.removeChild(div);
    }
}