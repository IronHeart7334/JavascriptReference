import {
    notNull,
    verifyClass, 
    verifyType, 
    TYPES
} from "../util/paramVerify.js";


export class Component{
    constructor(id){
        verifyType(id, TYPES.string);
        
        if(!id.startsWith("#")){
            throw new Error("id must start with a '#'");
        }
        
        let selection = $(id);
        if(selection.length === 0){
            let newEle = $(`<div id=\"${id}\"></div>`); // need to use non-shift '~' key to allow this
            //let newEle = $("<div id=\"" + id + "\"></div>");
            $("body").append(newEle);
            selection = $(id);
        }
        
        
        this.element = document.getElementById(id);
        this.id = id;
        console.log(this.element);
    }
}

let c = new Component("#noexist");
verifyClass(c, "Component");
verifyClass(c, "Object");
verifyClass(c, Component);
//verifyClass(c, "no exist");

//let c2 = new Component(100);