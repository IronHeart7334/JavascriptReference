/*
Sample Node.js code to convert child processes into a Promise
*/

const http = require("http");
const child_process = require("child_process");
const util = require("util");

const config = {
    hostName: "localhost",
    port: 3000
};

const server = http.createServer((request, response)=>{
    console.log(`Serving request ${request.method} ${request.url}`);

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    if(request.url === "/"){
        Promise.all(longPromises()).then((r)=>{
            console.log("all done");
            response.end("message");
        });
    } else { // GET favicon.ico, for example
        response.end("message");
    }    
});

function longPromises(){
    let promises = [];
    for(let i = 5; i > 0; --i){
        promises.push(runCmd(`Test#${i}`, i));
    }
    return promises;
}

function runCmd(msg, sec){
    return new Promise((resolve, reject)=>{
        console.time(`runCmd(${msg}, ${sec})`);
        let child = child_process.execFile(`sleep`, [sec]);
        child.stdout.on("data", (data)=>console.log(data));
        child.stderr.on("data", (data)=>console.error(data));
        child.on("close", (code)=>{
            console.log(`${msg}: ${code}`);
            console.timeEnd(`runCmd(${msg}, ${sec})`);
            resolve();
        });
    });
}

server.listen(config.port, config.hostName, ()=>{
    console.log(`Server started at http://${config.hostName}:${config.port}/`);
});