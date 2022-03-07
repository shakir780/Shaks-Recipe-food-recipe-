const searcBtn=document.querySelector('.search-button');
const mealList=document.querySelector('.meal');
const mealDetailsContent=document.querySelector('.meal-details-content');
const recipeCloseBtn=document.querySelector('.btn-recipe-close-btn');

mealList.addEventListener('click',getmealRecipe)

recipeCloseBtn.addEventListener('click',closeThatthin)

function closeThatthin(){
    mealDetailsContent.parentElement.classList.remove('showRecipe');
}

//event listeners
searcBtn.addEventListener('click',getmealList);

function getmealList(){
//this is get the value of the search input
let SearchInputTXt=document.querySelector('.search-input').value.trim();
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${SearchInputTXt}`)
.then(response => response.json())
.then(data =>{
   let html ="";
   if(data.meals){
       data.meals.forEach(meal => {
           html+=` <div class="meal-item" data-id=${meal.idMeal}>
                        
           <div class="meal-img">
               <img src="${meal.strMealThumb}" alt="food">
               
               <div class="meal-name"><h3>${meal.strMeal}</h3>
                   <a href="#" class="recipe-btn">Get Recipe</a>
               
               </div>

           </div>
  
      
   </div>`
           
       });
   }
   mealList.innerHTML=html;
})
}
function getmealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data=>getRecipeModal(data.meals))
    }
   
}
function getRecipeModal(meal){
   meal=meal[0];
console.log(meal);
   let html= `
   <h2 class="recipe-title">${meal.strMeal}</h2>
   <p class="recipe-category">${meal.strCategory}</p>
   <div class="recipe-ing">
       <h3>Ingredients:</h3>
       <ul>
           <li>${meal.strIngredient1}</li>
           <li>${meal.strIngredient2}</li>
           <li>${meal.strIngredient3}</li>
           <li>${meal.strIngredient4}</li>
           <li>${meal.strIngredient6}</li>
           <li>${meal.strIngredient7}</li>
           <li>${meal.strIngredient8}</li>
           <li>${meal.strIngredient9}</li>
           <li>${meal.strIngredient10}</li>
           <li>${meal.strIngredient12}</li>
           <li>${meal.strIngredient13}</li>
           <li>${meal.strIngredient14}</li>
           <li>${meal.strIngredient15}</li>
           <li>${meal.strIngredient16}</li>
           <li>${meal.strIngredient17}</li>
           <li>${meal.strIngredient18}</li>
           <li>${meal.strIngredient19}</li>
           <li>${meal.strIngredient20}</li>
       </ul>
      
       
       
   </div>
   <div class="instructions">
       <h3>Instructions:</h3>
       <p>${meal.strInstructions}</p>
       
   </div>
   <div class="recipe-meal-img">
       <img src="${meal.strMealThumb}" alt="">
   </div>
   <div class="recipe-link">
       <a href="${meal.strYoutube}" target="_blank">Watch video</a>
   </div>
   
   `
   mealDetailsContent.innerHTML=html
   mealDetailsContent.parentElement.classList.add('showRecipe');
   mealDetailsContent.parentElement.classList.add('');
}