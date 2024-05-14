function displayImages(){
    var counter = 0

    fetch("https://foodish-api.com/images/rice")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)

    })


}
window.onload = displayImages();