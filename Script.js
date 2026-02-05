document.getElementById("search-btn").addEventListener("click", getMealList);

function getMealList() {
  const searchInput = document.getElementById("search-input").value.trim();
  const mealList = document.getElementById("meal-list");

  if (searchInput === "") {
    mealList.innerHTML = "<h2>Please enter an ingredient 🍅</h2>";
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(res => res.json())
    .then(data => {
      let html = "";

      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
              <button class="view-btn"
                onclick="window.open('https://www.themealdb.com/meal/${meal.idMeal}', '_blank')">
                View Recipe
              </button>
            </div>
          `;
        });
      } else {
        html = "<h2>No meals found 😔</h2>";
      }

      mealList.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      mealList.innerHTML = "<h2>Error fetching data ❌</h2>";
    });
}
