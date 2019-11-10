export function formatString(s){
	/* 
	@param s : a string, the string to format
	@return an array of strings, made by 
	removing quote marks from the original string, replacing them with [ and ],
	then splitting on commas
	
	Example:
		formatString("a, b, c, 'd, e'");
		-> ["a", "b", "c", ["d", "e"]]
	*/
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