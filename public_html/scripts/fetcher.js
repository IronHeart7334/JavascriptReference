function tryFetch(url, opt={}){
    fetch(url, opt)
        .then((response)=>response.text()) //since text() returns a Promise, not a string
        .then((text)=>{
            $("#result").text(text);
        })
        .catch(
            (err)=>{
                $("#result").text(err);
            }
        );
}

$("#fetch")
    .click(
        ()=>{
            let options = {};
            let modeGroup = $('input[name=mode]:checked');
            if(modeGroup.length === 1){
                options.mode = modeGroup.val();
            }
            tryFetch($("#url")[0].value, options);
            console.log(options);
        }
    );