function tryFetch(url){
    fetch(url)
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
            tryFetch($("#url")[0].value);
        }
    );