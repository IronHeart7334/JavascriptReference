// The Sprite Class
function Sprite(map, colors) {
	this.map = map;
	this.colors = ["rgb(0, 0, 0)"];
	this.colors = this.colors.concat(colors);
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
