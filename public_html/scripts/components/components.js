import {
    notNull,
    verifyClass, 
    verifyType, 
    TYPES
} from "../util/paramVerify.js";


class Component{
    constructor(id){
        verifyType(id, TYPES.string);
        
        if(id.startsWith("#")){
            //only want the hash in the selection
            id = id.replace("#", "");
        }
        this.id = id;
        
        let selection = this.select();
        if(selection.length === 0){
            let newEle = $(`<div id=\"${id}\"></div>`); // need to use non-shift '~' key to allow this
            $("body").append(newEle);
            selection = this.select();
        }
        //selection.addClass("w-100 h-100");
        
        this.element = document.getElementById(id);
        //console.log(this.element);
    }
    
    setColor(colStr){
        verifyType(colStr, TYPES.string);
        this.select().css("background-color", colStr);
    }
    
    setSize(w, h){
        verifyType(w, TYPES.number);
        verifyType(h, TYPES.number);
        this.select().width(w + "px").height(h + "px");
    }
    
    /*
     * returns a JQuery selection of this
     */
    select(){
        return $("#" + this.id);
    }
    
    toString(){
        return `Component#${this.id}`;
    }
};

class Container extends Component{
    constructor(id, rows, cols){
        super(id);
        verifyType(rows, TYPES.number);
        verifyType(cols, TYPES.number);
        if(rows <= 0){
            throw new Error("row count must be larger than 0");
        }
        if(cols <= 0){
            throw new Error("col count must be larger than 0");
        }
        
        this.rows = rows;
        this.cols = cols;
        this.children = [];
        
        //create the new grid
        let currRow;
        let curCell;
        for(let row = 0; row < rows; row++){
            currRow = $(`<div id=\"${this.id + "-row-" + row}\" class=\"row\"></div>`);
            //currRow.addClass("w-100 h-100");
            this.select().append(currRow);
            for(let col = 0; col < cols; col++){
                curCell = $(`<div id=\"${this.id + "-" + row + "-" + col}\" class=\"col\"></div>`);
                //curCell.addClass("w-100 h-100");
                currRow.append(curCell);
            }
        }
    }
    
    selectCell(row, col){
        if(row < 0 || row >= this.rows){
            throw new Error(`Invalid row: ${row}. Must be between 0 and ${this.rows - 1}`);
        }
        if(col < 0 || col >= this.cols){
            throw new Error(`Invalid col: ${col}. Must be between 0 and ${this.cols - 1}`);
        }
        let selection = $(`#${this.id}-${row}-${col}`);
        if(selection.length === 0){
            throw new Error(`Cell ${row}, ${col} does not exist.`);
        }
        return selection;
    }
    
    addChild(component){
        verifyClass(component, Component);
        let childCount = this.children.length;
        if(childCount + 1 > this.rows * this.cols){
            throw new Error("Cannot add " + component + ": grid is full");
        }
        
        let row = Number.parseInt(childCount / this.cols);
        let col = childCount % this.cols;
        this.children.push(component);
        
        this.selectCell(row, col).append(component.select());
    }
};

function test(){
    let main = new Container("body", 2, 4);
    main.setColor("blue");
    //main.setSize(100, 100);
    
    let c = new Component("#noexist");
    c.setColor("green");
    c.setSize(50, 50);
    
    verifyClass(c, "Component");
    verifyClass(c, "Object");
    verifyClass(c, Component);
    //verifyClass(c, "no exist");

    //let c2 = new Component(100);
    
    main.addChild(c);
    
    for(let i = 0; i < 7; i++){
        c = new Component(`dummy-${i}`);
        c.setColor(`rgb(0, 0, ${10 * i})`);
        c.setSize(50, 50);
        main.addChild(c);
    }
}

export {
    Component,
    Container,
    test
}