function init(){
    document.getElementById("example").onclick = ()=>{
        fetch("./resources/bad.csv").then((response)=>{
            return response.text();
        }).then((text)=>{
            document.getElementById("before").innerText = text;
            let formattedArray = badCsvTo2DArray(text);
            console.log(formattedArray);
            let expanded = [];
            formattedArray.forEach((row) => {
                expanded = expanded.concat(expand(row));
            });
            console.log(expanded);
            document.getElementById("after").innerText = expanded.map((row)=>row.join(",")).join("\n");
        });
    };
}

function badCsvTo2DArray(fileText){
    return fileText.split(/\r?\n|\r/).map((row)=>formatRow(row));
}
function formatRow(s){
	/*
	@param s : a string, the string to format
	@return an array of strings, made by
	removing quote marks from the original string, replacing them with [ and ],
	then splitting on commas

	Example:
		formatString("a, b, c, 'd, e'");
		-> ["a", "b", "c", ["d", "e"]]
	*/
    function removeQuotes(s){
        return Array.from(s).filter((c)=>{
            return c !== '"' && c !== "'";
        }).join("");
    }
	let ret = [];
	let inQuotes = false;
	let endQuotes = false; // the current index had a quote mark
	let arrayIndex = -1;
	let split = s.split(",");
	for(let i = 0; i < split.length; i++){
		split[i] = split[i].trim();
		endQuotes = false;
		if(split[i][0] === '"' || split[i][0] === "'"){
			// if the first character is a quote mark, start the array
			inQuotes = true;
			ret.push([]);
			arrayIndex = ret.length - 1;
			split[i] = removeQuotes(split[i]);
		} else if (split[i][split[i].length - 1] === '"' || split[i][split[i].length - 1] === "'"){
			// if quote mark at end, end the array
			inQuotes = false;
			endQuotes = true;
			split[i] = removeQuotes(split[i]);
		}

		//now, add to the array
		if(inQuotes || endQuotes){
			ret[arrayIndex].push(split[i]);
		} else {
			ret.push(split[i]);
		}
	}
	return ret;
}
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
	//first, declare variables
	let newData = [];
	let rows = 1; //the number of rows that will be returned
	let data = (Array.isArray(array) ? array : [array]); //doesn't need to be copy
	let period = 1; //how many times the current pattern will repeat
    let spaceInPeriod; //how many elements are in the current period
    let times; //how many times each element in the current column will appear in each period
	let timesThusFar; //how many times the pattern has occured so far
	let numInPattern; //what index of the repeated pattern are we on?

	data = data.map((col)=>{
        return (Array.isArray(col) ? col : [col]); //convert every column to an array
    });
	data.forEach((col)=>{
        rows *= col.length;
    });
	//populate newData so that we can access its indexes
    for(let i = 0; i < rows; i++){
        newData.push([]);
		for(let j = 0; j < data.length; j++){
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
	for(let col = 0; col < data.length; col++){
		spaceInPeriod = rows / period; //each period will store an equal amount of data, thus, the we need to divvy the spaces out evenly amongst them
		times = spaceInPeriod / data[col].length; //the current column's pattern will repeat until it fills the rows, so we need to find how many times it will repeat

		//next, go through each row of newData
		for(let row = 0; row < rows; row++){
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

export {
    init
};
