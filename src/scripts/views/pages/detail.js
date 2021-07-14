import UrlParser from '../../routes/url-parser';
import RestaurantDBSource from '../../data/restaurantdb';
import {
  createRestaurantDetailTemplate,
  createCustomerReviewList,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import CONFIG from '../../globals/config';

const Detail = {
  async render() {
    return `
          <div id="error" class="error">
            <h2> Error: Connection Problem </h2>
            <p> Failed to fetch data from server, please make sure your internet connection is working </p>
          </div>
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const loading = document.querySelector('#loading');
    loading.style.display = 'flex';
    const error = document.querySelector('#error');
    error.style.display = 'none';
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDBSource.detailRestaurant(url.id);
    if (restaurant === undefined) {
      error.style.display = 'block';
    } else {
      const restaurantContainer = document.querySelector('#restaurant');
      const imageText = document.querySelector('#image-text');
      imageText.innerHTML = restaurant.name;
      const heroImage = document.querySelector('#hero_image');
      heroImage.style.backgroundImage = `url('${CONFIG.BASE_IMAGE_LARGE_URL + restaurant.pictureId}')`;
      const picture = document.querySelector('#picsrcset');
      console.log("Picture : ", picture);
      picture.srcset = `${CONFIG.BASE_IMAGE_SMALL_URL + restaurant.pictureId}`;
      const picimg = document.querySelector('#picimg');
      picimg.src = `${CONFIG.BASE_IMAGE_LARGE_URL+restaurant.pictureId}`;
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      const buttonSubmitReview = document.querySelector('#btnSubmit');
      const loadingSubmit = document.querySelector('#loading_submit');
      const errorSubmit = document.querySelector('#error_review');
      errorSubmit.style.display = 'none';
      loadingSubmit.style.display = 'none';
      buttonSubmitReview.addEventListener('click', async () => {
        const form = document.querySelector('#review_form');
        form.style.display = 'none';
        loadingSubmit.style.display = 'block';
        const name = document.querySelector('#reviewerName');
        const review = document.querySelector('#reviewContent');
        const response = await RestaurantDBSource.addNewReview(
          restaurant.id, name.value, review.value,
        );
        form.style.display = 'block';
        loadingSubmit.style.display = 'none';
        if (response !== undefined) {
          errorSubmit.style.display = 'none';
          const reviewContainer = document.querySelector('#restaurant_reviews');
          reviewContainer.removeChild(document.querySelector('#review_list'));
          reviewContainer.insertAdjacentHTML('beforeend', createCustomerReviewList(response));
        } else {
          name.classList.add('error');
          review.classList.add('error');
          errorSubmit.style.display = 'block';
        }
      });
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          city: restaurant.city,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          address: restaurant.address,
          categories: restaurant.categories,
          menus: restaurant.menus,
          customerReviews: restaurant.customerReviews,
        },
      });
    }
    loading.style.display = 'none';
  },
};

export default Detail;
