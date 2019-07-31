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
    }
    
    addChild(component){
        verifyClass(component, Component);
        console.log(this.select().length);
        this.select().append(component.select());
    }
};

function test(){
    let main = new Container("body");
    main.setColor("blue");
    main.setSize(100, 100);
    
    let c = new Component("#noexist");
    c.setColor("green");
    c.setSize(50, 50);
    
    verifyClass(c, "Component");
    verifyClass(c, "Object");
    verifyClass(c, Component);
    //verifyClass(c, "no exist");

    //let c2 = new Component(100);
    
    main.addChild(c);
}

export {
    Component,
    Container,
    test
}