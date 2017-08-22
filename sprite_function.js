// The Sprite Class
function Sprite(map, colors) {
	this.map = map;
	this.colors = ["rgb(0, 0, 0)"];
	this.colors = this.colors.concat(colors);
}
Sprite.construct = function(){
    var doc = document.body;
    var numColumns = parseInt(prompt("How many columns do you want your sprite to have?"));
    var numRows = parseInt(prompt("What about rows?"));
    
    var div;
    
    for (var column = 0; column < numColumns; column ++){
        for (var row = 0; row < numRows; row ++){
            div = document.createElement("div");
            div.style.position = "absolute";
            div.style.left = column * 50 + "px";
            div.style.top = row * 50 + "px";
            div.style.height = "50px";
            div.style.width = "50px";
            div.style.backgroundColor = "green";
            doc.appendChild(div);
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
