export const TYPES = {
    boolean : "boolean",
    number : "number",
    string : "string",
    object : "object",
    symbol : "symbol",
    "function" : "function"
};

export function notNull(val){
    if(val === null || val === undefined){
        throw new Error("Value has not been initialized");
    }
    return true;
}
export function isType(val, type){
    notNull(val);
    notNull(type);
    
    if(!TYPES.hasOwnProperty(type)){
        throw new Error("Invalid type: " + type + ". Did you mean isInstanceOf(val, className)?");
    } else if(typeof val !== type){
        throw new Error(val + " must be of type " + type + ", not " + typeof val);
    }
    return true;
}
export function isInstanceOf(val, className){
    notNull(val);
    notNull(className);
    isType(className, TYPES.string);
    let proto = Object.getPrototypeOf(val);
    while(proto !== null){
        if(proto.constructor.name === className){
            break;
        }else{
            proto = Object.getPrototypeOf(proto);
        }
    }
    if(proto === null){
        throw new Error(val + " must be an instance of " + className);
    }
    
    return true;
}