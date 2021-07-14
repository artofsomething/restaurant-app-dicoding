import FavoriteRestaurantIdb from '../../data/favorite-restaurant-db';
import {
  createRestaurantItemTemplate,
} from '../templates/template-creator';

const Like = {
  async render() {
    return `
            <div class="content">
                <h2 class="content__heading">Your Favorite Restaurant</h2>
                <div id="restaurants" class="restaurants">
                </div>
            </div>
            `;
  },
  async afterRender() {
    const loading = document.querySelector('#loading');
    loading.style.display = 'flex';
    const imageText = document.querySelector('#image-text');
    imageText.innerHTML = 'Your Favorites Restaurant';
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantsContainer.innerHTML += "<div class='empty'><p>No Favorites Restaurant Yet!</p></div>";
    }
    loading.style.display = 'none';
  },
};
export default Like;
