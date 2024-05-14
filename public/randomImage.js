function displayImages(){
 const imageBox = document.getElementById("foodImage")
 const health = document.createElement('img')
 const health2 = document.createElement('img')
 const health3 = document.createElement('img')
 const health4 = document.createElement('img')
 const health5 = document.createElement('img')
 health.src = 'https://i.etsystatic.com/15433923/r/il/97656a/1304482649/il_fullxfull.1304482649_evqg.jpg'
 health.height = '800'
 health.width = '500'
 imageBox.appendChild(health)
 health2.src = 'https://content.health.harvard.edu/wp-content/uploads/2023/09/d26a84e6-1146-48cf-92dd-d2fc8532b756.jpg'
 health2.height = '800'
 health2.width = '500'
 imageBox.appendChild(health2)
 health3.src = 'https://www.foodiesfeed.com/wp-content/uploads/2023/07/healthy-foods-selection.jpg'
 health3.height = '800'
 health3.width = '500'
 imageBox.appendChild(health3)
 health4.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Healthy_food.jpg/1024px-Healthy_food.jpg'
 health4.height = '800'
 health4.width = '500'
 imageBox.appendChild(health4)
 health5.src = 'https://cdn-prod.medicalnewstoday.com/content/images/articles/269/269143/popular-healthy-foods-laid-out-on-white-background.jpg'
 health5.height = '800'
 health.width = '500'
 imageBox5.appendChild(health5)
 simpleslider.getSlider({
    container: document.getElementById("foodImage")
    
  });

}
window.onload = displayImages();