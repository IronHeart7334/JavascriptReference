import {isInstanceOf, isType, TYPES} from "../util/paramVerify.js";


export class Component{
    constructor(id){
        isType(id, TYPES.string);
        /*
        if(id === null || id === undefined){
            throw new Error("id is null");
        }*/
        id = id.toString();
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
isInstanceOf(c, "Component");
isInstanceOf(c, "Object");
//isInstanceOf(c, "no exist");

//let c2 = new Component(100);