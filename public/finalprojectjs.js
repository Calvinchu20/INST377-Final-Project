var host = window.location.origin;
console.log(host)
const ID = "d87eb441"
const KEY = '6343bb2aa6042fa83f23e2c95a7931c7'
let graph = null
async function fetchmacronutrition(){
    let food_list = document.getElementById("foodList").value
    var total_calories = 0;
    var total_carbs = 0;
    var total_protein = 0;
    var total_fats = 0;
    var fix_food = food_list.split(',').map(item=> item.trim())
    console.log(fix_food)
    for (let x = 0; x < fix_food.length; x++){
        
        const headers = {
            'Content-Type': 'application/json',
            'x-app-id': 'd87eb441',
            'x-app-key': '6343bb2aa6042fa83f23e2c95a7931c7',
        };
        const body = JSON.stringify({
            query: fix_food[x]
        });
    
        
        const nutrients = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: 'POST',
            headers: headers,
            body: body
        });
    
        const data = await nutrients.json();
        console.log(data);
        console.log(data.foods[0])
        total_calories += data.foods[0].nf_calories
        total_fats += data.foods[0].nf_total_fat
        total_carbs+= data.foods[0].nf_total_carbohydrate
        total_protein += data.foods[0].nf_protein

    }
    return {
        total_calories,
        total_fats,
        total_carbs,
        total_protein
    };


  
  


}
async function createAnalysis(){
    await fetch(`${host}/trackers`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res[res.length-1].first_name)
        fetchmacronutrition()
        .then(foodCalculate =>{
            console.log(foodCalculate.total_calories)
            bar = document.getElementById('progress').getContext('2d')
            label_x = ['total_calories','goal_calories','total_fats','goal_fats',"total_carbs","goal_carbs","total_protein","goal_protein"]
            info = [
                foodCalculate.total_calories,res.goal_calories,foodCalculate.total_fats,res.goal_fats,foodCalculate.total_carbs,res.goal_carbs,foodCalculate.total_protein,res.goal_protein
            ]
            console.log("x ", label_x)
            console.log("y ",info)
            if(graph){
                graph.data.labels = label_x
                graph.data.datasets[0].data = info
                graph.update();
            }else{
                graph = new Chart(bar, {
                    type: 'bar',
                    data: {
                        labels: label_x,
                        datasets: [{
                        label: 'Stock Price',
                        data: info,
                        borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                        y: {
                            beginAtZero: true
                             }
                            }
                                }
                    });
                    
            }
            document.getElementById("progress").style.display = "block"
        })

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
    await createAnalysis()

}

window.onload = createAnalysis();