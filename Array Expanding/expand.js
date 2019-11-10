function expand(array){
	/*
    @param array : an array that we want to expand
	@return an array : each of the rows resulting from array expansion
	
    each element in data can be any type; the program automatically deals with arrays and objects   
    expands the data so that none of its columns are arrays
	
	EXPANDING EXAMPLE:
        this is a row
        [
           [a, b],
		    c,
           [d, e, f]
        ]

        would get changed to:
        this is 6 rows
        [
            [a, c, d],
            [a, c, e],
            [a, c, f],
            [b, c, d],
            [b, c, e],
            [b, c, f]
        ]
    */
    "use strict";
	//first, declare variables
	var newData = [];
	var rows = 1; //the number of rows that will be returned
	var data = (Array.isArray(array) ? array : [array]); //doesn't need to be copy
	var period = 1; //how many times the current pattern will repeat
    var spaceInPeriod; //how many elements are in the current period
    var times; //how many times each element in the current column will appear in each period
	var timesThusFar; //how many times the pattern has occured so far
	var numInPattern; //what index of the repeated pattern are we on?
	
	data = data.map(function(col){
        return (Array.isArray(col) ? col : [col]); //convert every column to an array
    });
	data.forEach(function(col){
        rows *= col.length;
    });
	//populate newData so that we can access its indexes
    for(var i = 0; i < rows; i++){
        newData.push([]);
		for(var j = 0; j < data.length; j++){
			newData[i].push(0);
		}
	}

	/*
	OK, so this is a little bit complicated.

	now, whenever we get multiple elements in one 'column' from the data we are given,
	that splits the resulting rows into pieces equal to the number of items in that column.
	In the above example, column 0 contains 2 elements, so the result is split evenly into 2 pieces:
	the first piece contains rows that all begin with 'a', whereas the second each begin with 'b'.
	This split means that we have to make the pattern of future columns repeat; 
	for example, column 2 contains 3 values: d, e, and f. Since the 0th column was split in 2,
	it results in the pattern d, e, f, d, e, f instead of d, d, e, e, f, f
	*/
	
	//iterate through each column of data
	//since data represents one row of data, each index is a column
	//somewhat counterintuitive, I know
	for(var col = 0; col < data.length; col++){
		spaceInPeriod = rows / period; //each period will store an equal amount of data, thus, the we need to divvy the spaces out evenly amongst them
		times = spaceInPeriod / data[col].length; //the current column's pattern will repeat until it fills the rows, so we need to find how many times it will repeat
		
		//next, go through each row of newData
		for(var row = 0; row < rows; row++){
			timesThusFar = parseInt(row / times); //how many of 'times' are in 'row'? that is how many times we've gone through a pattern
			numInPattern = timesThusFar % data[col].length; //what index of the current column in data we are on
			newData[row][col] = data[col][numInPattern];
		}
		period *= data[col].length;
	}
    
	//lastly, return the data
	
	if(newData.length > 1){
		console.log(array);
	}
	
    return newData;
}