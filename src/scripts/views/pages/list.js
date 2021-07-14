import RestaurantDBSource from '../../data/restaurantdb';
import lozad from 'lozad';

import {
  createRestaurantItemTemplate,
} from '../templates/template-creator';

const ListRestaurant = {
  async render() {
    return `
      <div id="error">
        <h2> Error: Connection Problem </h2>
        <p> Failed to fetch data from server, please make sure you internet connection is working </p>
      </div>

      <div class="content" id='content'>
        <h2 class="content__heading">Explore Restaurant</h2>
        <div id="restaurants" class="restaurants" style="width:100%">
 
        </div>
      </div>
    `;
  },

  async afterRender() {
    const loading = document.querySelector('#loading');
    const error = document.querySelector('#error');
    const content = document.querySelector('#content');
    const observer = lozad();
    observer.observe();
    error.style.display = 'none';
    loading.style.display = 'flex';
    const imageText = document.querySelector('#image-text');
    imageText.innerHTML = 'Explore Our Restaurant with specials menu for your hunger desire';
    const restaurantContainer = document.querySelector('#restaurants');
    const restaurants = await RestaurantDBSource.listRestaurant();
    if (restaurants === undefined) {
      error.style.display = 'block';
      content.style.display = 'none';
    } else {
      const heroImage = document.querySelector('#hero_image');
      heroImage.style.backgroundImage = 'url("/images/heros/hero-image_4.jpg")';
      const picture = document.querySelector('#picsrcset');

      console.log("Picture : ", picture);
      picture.srcset = "/images/heros/hero-image_4-small.jpg";
      const picimg = document.querySelector('#picimg');
      picimg.src = "/images/heros/hero-image_4.jpg";
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
    observer.observe();
    loading.style.display = 'none';
  },
};

export default ListRestaurant;
