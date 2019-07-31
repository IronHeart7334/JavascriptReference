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
};

class Container extends Component{
    constructor(id){
        super(id);
        //this.setGrid(1, 1);
        this.rows = 1;
        this.cols = 1;
        this.children = [];
    }
    
    setGrid(rows, cols){
        //todo: make this callable after adding components
        verifyType(rows, TYPES.number);
        verifyType(cols, TYPES.number);
        
        this.rows = rows;
        this.cols = cols;
        
        let currRow;
        let curCell;
        for(let row = 0; row < rows; row++){
            currRow = $(`<div id=\"${this.id + "-row-" + row}\" class=\"row\"></div>`);
            this.select().append(currRow);
            for(let col = 0; col < cols; col++){
                curCell = $(`<div id=\"${this.id + "-" + row + "-" + col}\" class=\"col\"></div>`);
                currRow.append(curCell);
            }
        }
    }
    
    selectCell(row, col){
        //todo add checking
        return $(`#${this.id}-${row}-${col}`);
    }
    
    addChild(component){
        verifyClass(component, Component);
        let childCount = this.children.length;
        let row = Number.parseInt(childCount / this.cols);
        let col = childCount % this.cols;
        this.children.push(component);
        //console.log(row, col);
        this.selectCell(row, col).append(component.select());
    }
};

function test(){
    let main = new Container("body");
    main.setColor("blue");
    //main.setSize(100, 100);
    main.setGrid(2, 4);
    
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