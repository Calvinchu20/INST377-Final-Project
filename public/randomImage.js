function displayImages(){
  const imageBox = document.getElementById("foodImage");
  const images = [
      'https://i.etsystatic.com/15433923/r/il/97656a/1304482649/il_fullxfull.1304482649_evqg.jpg',
      'https://content.health.harvard.edu/wp-content/uploads/2023/09/d26a84e6-1146-48cf-92dd-d2fc8532b756.jpg',
      'https://www.foodiesfeed.com/wp-content/uploads/2023/07/healthy-foods-selection.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Healthy_food.jpg/1024px-Healthy_food.jpg',
      'https://cdn-prod.medicalnewstoday.com/content/images/articles/269/269143/popular-healthy-foods-laid-out-on-white-background.jpg'
  ];

  images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Healthy food";
      img.style.height = "400";
      img.style.width = "300"; 
      imageBox.appendChild(img);
  });

  simpleslider.getSlider({
    container: document.getElementById("foodImage")
    
  });
}

window.onload = displayImages();

document.addEventListener('DOMContentLoaded', displayImages);
