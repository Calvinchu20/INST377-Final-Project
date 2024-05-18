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
            const box = document.getElementById('analysis')
            const existContent = box.querySelectorAll('h2')
            existContent.forEach(function(element){
                element.remove()
            })

            const calories = document.createElement('h2')
            calories.innerText = 'Total calories is '+ foodCalculate.total_calories + ' and the goal calories is ' + res[res.length-1].goal_calories;
            const fats = document.createElement('h2')
            fats.innerText = 'Total fats is '+ foodCalculate.total_fats + ' and the goal fats is ' + res[res.length-1].goal_fats;
            const carbs = document.createElement('h2')
            carbs.innerText = 'Total carbs is '+ foodCalculate.total_carbs + ' and the goal carbs is ' + res[res.length-1].goal_carbs;
            const protein = document.createElement('h2')
            protein.innerText = 'Total protein is '+ foodCalculate.total_protein + ' and the goal protein is ' + res[res.length-1].goal_protein;
            const bar = document.getElementById('progress').getContext('2d')
            box.appendChild(calories)
            box.appendChild(fats)
            box.appendChild(carbs)
            box.appendChild(protein)
            const label_x = ['total_calories','goal_calories','total_fats','goal_fats',"total_carbs","goal_carbs","total_protein","goal_protein"]
            const info = [
                foodCalculate.total_calories,res[res.length-1].goal_calories,foodCalculate.total_fats,res[res.length-1].goal_fats,foodCalculate.total_carbs,res[res.length-1].goal_carbs,foodCalculate.total_protein,res[res.length-1].goal_protein
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
                        label: 'Daily intake vs goals',
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
            console.log(graph)
            document.getElementById("chartbox").style.display = "block"

            document.getElementById('analysis').style.display ="block"
        })

    })

  

}
async function createUser(){
    await fetch(`${host}/user`,{
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

function contactForm() {
    window.location.href = "finalprojecthome.html";
}

let nutritionChart;

document.addEventListener('DOMContentLoaded', function() {
    const nutrientForm = document.getElementById('nutrientForm');
    if (nutrientForm) {
        nutrientForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting traditionally
            const foodItem = document.getElementById('foodInput').value;
            displayNutrientBreakdown(foodItem); // Call the function to update the chart with the new food item
        });
    }

    // Functionality toggling 
    const macroTrackerButton = document.getElementById('toggleMacroTracker');
    const nutrientBreakdownButton = document.getElementById('toggleNutrientBreakdown');
    const macroTrackerForm = document.getElementById('macroTrackerForm');
    const nutrientBreakdownForm = document.getElementById('nutrientBreakdownForm');

    if(macroTrackerButton){
        macroTrackerButton.addEventListener('click', function() {
            macroTrackerForm.style.display = 'block';
            nutrientBreakdownForm.style.display = 'none';
        });
    
        nutrientBreakdownButton.addEventListener('click', function() {
            nutrientBreakdownForm.style.display = 'block';
            macroTrackerForm.style.display = 'none';
        });
    }

    // FAQ toggling 
    const faqButtons = document.querySelectorAll('.faq-question');
    if(faqButtons){
        faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling; // This should be the .faq-answer div related to the clicked button
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });
    }
});

async function fetchNutritionData(foodItem) {
    const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
    const headers = {
        'Content-Type': 'application/json',
        'x-app-id': ID,
        'x-app-key': KEY
    };
    const body = JSON.stringify({ query: foodItem });
    
    try {
        const response = await fetch(url, { method: 'POST', headers: headers, body: body });
        const data = await response.json();
        return data.foods[0];
    } catch (error) {
        console.error('Error fetching nutrient data:', error);
    }
}

async function displayNutrientBreakdown(foodItem) {
    try {
        const nutritionData = await fetchNutritionData(foodItem);
        if (nutritionData) {
            const nutrients = {
                'Protein': nutritionData.nf_protein,
                'Fat': nutritionData.nf_total_fat,
                'Carbohydrates': nutritionData.nf_total_carbohydrate,
                'Fiber': nutritionData.nf_dietary_fiber,
                'Sugars': nutritionData.nf_sugars
            };
            updateChart(nutrients);
        } else {
            console.error('No nutrition data available for the specified item.');
        }
    } catch (error) {
        console.error('Error in displayNutrientBreakdown:', error);
    }
}


function updateChart(nutrients) {
    const ctx = document.getElementById('nutrientChart').getContext('2d');
    console.log('Chart context:', ctx);
    console.log('Chart instance:', window.nutrientChart);
    console.log('Nutrient labels: ', Object.keys(nutrients));
    if (nutritionChart) {
        nutritionChart.data.labels = Object.keys(nutrients);
        nutritionChart.data.datasets.forEach((dataset) => {
            dataset.data = Object.values(nutrients);
        });
        nutritionChart.update();
    } else {
        nutritionChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(nutrients),
                datasets: [{
                    label: 'Nutrient Breakdown',
                    data: Object.values(nutrients),
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
                    ],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            }
        });
    }
}