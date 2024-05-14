var host = window.location.origin;
console.log(host)
const ID = "d87eb441"
const KEY = '6343bb2aa6042fa83f23e2c95a7931c7'
async function fetchmacronutrition(){

    const headers = {
        'Content-Type': 'application/json',
        'x-app-id': 'd87eb441',
        'x-app-key': '6343bb2aa6042fa83f23e2c95a7931c7',
    };
    const body = JSON.stringify({
        query: "grape"
    });
    const temple = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: 'POST',
            headers: headers,
            body: body
    });

    const nutrients = await temple.json();
    console.log(nutrients);

}
async function createAnalysis(){
    await fetch(`${host}/trackers`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)

    })

}
async function createUser(){
    await fetch(`${host}/trackers`,{
        method:"POST",
        body: JSON.stringify({
            "first_name": `${document.getElementById('firstName').value}`, 
            "last_name": `${document.getElementById("lastName").value}`, 
            "goal_calories":`${document.getElementById('calories').value}`,
            "goal_fats":`${document.getElementById('fats').value}`,
            "goal_carbs":`${document.getElementById('carbs').value}`,
            "goal_protein":`${document.getElementById('protein').value}`,

        }),
        headers: {
            "Content-type": "application/json"
        }
        
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res.body)
    }) 
    
   
}
window.onload = fetchmacronutrition()
window.onload = createAnalysis();