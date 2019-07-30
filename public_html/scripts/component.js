
export class Component{
    constructor(id){
        if(id === null || id === undefined){
            throw new Error("id is null");
        }
        id = id.toString();
        if(!id.startsWith("#")){
            throw new Error("id must start with a '#'");
        }
        
        let selection = $(id);
        if(selection.length === 0){
            //let newEle = $("<div id=\"${id}\"></div>"); // template literals not working
            let newEle = $("<div id=\"" + id + "\"></div>");
            $("body").append(newEle);
            selection = $(id);
        }
        
        console.log(selection.first());
    }
}

new Component("#noexist");