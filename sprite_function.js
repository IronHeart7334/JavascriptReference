// The Sprite Class
function Sprite(map, colors) {
	/* map: a two-dimensional array of integers, 
	ranging from 0 to the length of colors MINUS ONE.
	
	colors: an array of css colors surrounded by quote marks.
	
	EXAMPLE:
	var s = new Sprite([
	    [0, 1, 0],
	    [1, 1, 1],
	    [0, 1, 0]
	],
	    ["rgb(0, 255, 0)"]
	]);
	
	s.draw(0, 0, 10);
	
	
	will draw a green plus sign in the upper-left corner of
	an element with the id 'canvas'. Each corner of the plus
	will be completely transparent.
	*/
	this.map = map;
	// default color is transparent
	this.colors = ["rgba(255, 255, 255, 0)"];
	this.colors = this.colors.concat(colors);
}
Sprite.prototype = {
	/*
	You need to have a canvas element with the id 'canvas' in 
	order to draw Sprites on it.
	*/
	draw:function(x, y, size){
		var canvas = document.getElementById("canvas");
		canvas = canvas.getContext("2d");
        for (var row = 0; row < this.map.length; row++) {
            for (var column = 0; column < this.map[row].length; column++){
            	// Only draw if not transparent
            	if (this.map[row][column] != 0){
            		canvas.fillStyle = this.colors[this.map[row][column]];
            		canvas.fillRect(x + column * size, y + row * size, size, size);
            	}
            }	
        }
    },
    
    /*
    Log data sends the code used to generate a Sprite to the
    console as a string. To test it out, just copy what comes 
    up in the console, and type in the console as shown
    
    var x = PASTE
    
    hit enter, then:
    
    x.draw(XCOORD, YCOORD, PIXELSIZE);
    
    And you should see your sprite on the screen.
    */
    logData:function(){
    	var msg = "new Sprite([";
    	for(var line = 0; line < this.map.length; line++){
    		msg += "[";
    		msg += this.map[line];
    		msg += "], "
    	}
    	// chop off the last space and comma
    	msg = msg.slice(0, -2);
    	msg += "], [";
    	
    	/* starts at 1 so as to not log transparent, 
    	as it is automatically
    	added during initialization.
    	*/
    	for(var colorNum = 1; colorNum < this.colors.length; colorNum++){
    	    msg += '"';
    	    msg += this.colors[colorNum];
    	    msg += '", ';
    	}
    	msg = msg.slice(0, -2);
    	msg += "]);";
    	console.log(msg);
    	
    	alert("Your Sprite code is now ready! \n Copy it from the console.");
    }	
}