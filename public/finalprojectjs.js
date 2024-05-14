var host = window.location.origin;
console.log(host)
const ID = "d87eb441"
const KEY = '6343bb2aa6042fa83f23e2c95a7931c7'
async function fetchmacronutrition(){
   
        const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
        const headers = {
            'Content-Type': 'application/json',
            'x-app-id': 'YOUR_APP_ID',
            'x-app-key': 'YOUR_APP_KEY',
        };
        const body = JSON.stringify({
            query: "grape"
        });
    
        
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });
    
            const data = await response.json();
            console.log(data);


}
async function createAnalysis(){
    await fetch(`${host}/trackers`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res[res.length-1].first_name)

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
   
    let food_list = document.getElementById("foodList").value
    var total_calories = 0;
    var total_carbs = 0;
    var total_protein = 0;
    var total_fats = 0;
    var fix_food = food_list.split(',').map(item=> item.trim())
    console.log(fix_food)
    for (let x = 0; x < fix_food.length; x++){
        console.log(fix_food[x])
    }
    console.log(fix_food)
    for (let x = 0; x < fix_food.length; x++){
        console.log(fix_food[x])
    }
  
}
window.onload = fetchmacronutrition()
window.onload = createAnalysis();