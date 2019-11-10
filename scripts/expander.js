/*
  Taken from an old version of Wayfinding's NodeDB
 */
export function insert(data){
    /*
    @param data : an array with length equal to this.headers.length, the data to insert into the table
    each element in data can be any type; the program automatically deals with arrays and objects
    INSERT INTO this VALUES (data)

    expands the data so that none of its columns are arrays
    */
    "use strict";
    try{
        if(!Array.isArray(data)){
            data = [data];
        }
        if(data.length !== this.headers.length){
            throw new RangeError("Invalid column count, must contain columns " + this.headerString);
        }
        //first, convert every column to an array
        data = data.map(function(col){
            return (Array.isArray(col) ? col : [col]);
        });

        var newData = [];
        var rows = 1;
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

        //iterate through each column...
        var period = 1; //how many times the current pattern will repeat
        var spaceInPeriod; //how many elements are in the current period
        var times; //how many times each element in the current column will appear in each period

        /*
        OK, so this is a little bit complicated.
        If we were given an array with arrays in it,
        we would want to 'expand' it so that there are no arrays in it.
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

        now, whenever we get multiple elements in one 'column' from the data we are given,
        that splits the resulting rows into pieces equal to the number of items in that column.
        In the above example, column 0 contains 2 elements, so the result is split evenly into 2 pieces:
        the first piece contains rows that all begin with 'a', whereas the second each begin with 'b'.
        This split means that we have to make the pattern of future columns repeat; 
        for example, column 2 contains 3 values: d, e, and f. Since the 0th column was split in 2,
        it results in the pattern d, e, f, d, e, f instead of d, d, e, e, f, f

        */

        for(var col = 0; col < data.length; col++){
            spaceInPeriod = rows / period;
            times = spaceInPeriod / data[col].length;

            for(var row = 0; row < rows; row++){
                //                            how many times we have repeated
                //                                                     prevents it from going outside the array
                newData[row][col] = data[col][parseInt((row / times) % data[col].length)];
                //oh great, now I've forgotten why this works
            }
            period *= data[col].length;
        }

        //lastly, copy the new data over to this' data
        var db = this;

        if(newData.length > 1){
            console.log("still one to many: ");
            console.log(newData);
        }

        newData.forEach(function(row){
            db.rows.push(row);
        });
    } catch(e){
        console.log(e.stack);
    }
}