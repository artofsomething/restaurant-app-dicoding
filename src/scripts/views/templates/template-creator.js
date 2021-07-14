import CONFIG from '../../globals/config';

function createCategoryList(categories) {
  let container = '';
  categories.forEach((item) => {
    container += `<span tabIndex="0" class='category'>${item.name}</span>`;
  });
  return container;
}
const createCustomerReviewItem = (review) => `<div tabIndex="0" class="review_item">
                    <h5 tabIndex="0">${review.name}</h5>
                    <p tabIndex="0">${review.review}</p>
                    <span tabIndex="0">${review.date}</span></div>`;

function createFoodList(foods) {
  let container = `<div class="foods">
                  <h4 tabIndex="0">Foods</h4>
                  <ul> `;
  foods.forEach((item) => {
    container += `<li tabIndex="0">${item.name}</li>`;
  });
  container += '</ul></div>';
  return container;
}
function createDrinkList(drinks) {
  let container = `<div class="drinks">
                  <h4 tabIndex="0">Drinks</h4>
                  <ul> `;
  drinks.forEach((item) => {
    container += `<li tabIndex="0">${item.name}</li>`;
  });
  container += '</ul></div>';
  return container;
}
function createCustomerReviewList(reviews) {
  let container = '<div class="review_list" id="review_list">';
  reviews.forEach((item) => {
    container += createCustomerReviewItem(item);
  });
  container += '</div>';
  return container;
}
const createReviewForm = () => `<div class='review_form' id='review_form'>
                    <div id="loading_submit" style='width:100%;text-align:center'><img src='/images/loading1.gif' width='150px' height='150px'/></div>
                    <div tabIndex="0" class="error" id="error_review">
                      <h3 tabIndex="0">Failed to submit!</h3>
                      <p tabIndex="0">We are unable to save your review, please try again!, Thank you for the cooperation</p>
                    </div>
                    <label tabIndex="0" for='reviewerName' >Name</label>
                      <input type ='text' id='reviewerName' style='margin:10px 0px 10px 0px'/>
                    <label tabIndex="0" for='reviewContent'>Review</label>
                      <textarea id='reviewContent' style='margin:10px 0px 10px 0px' > </textarea>
                    <button tabIndex="0" id='btnSubmit' class='button-submit'>Submit</button>
                  </div>`;
function createRestaurantDetailTemplate(restaurant) {
  let info = `<div class='restaurant__info'>
                  <h3 class='title' tabIndex="0">Information</h3>
                  <div class='detail_info'>
                    <h4 tabIndex="0">Categories</h4>`;
  info += createCategoryList(restaurant.categories);
  info += `<h4 tabIndex="0">Rating : ${restaurant.rating}</h4>
          <h4 tabIndex="0">City : ${restaurant.city}</h4>
          <h4 tabIndex="0">Address : </h4>
          <p tabIndex="0">${restaurant.address}</p>
          </div></div>`;
  const overview = `<div class="restaurant__overview">
                  <h3 tabIndex="0" class='title'>Description</h3>
                  <p tabIndex="0">${restaurant.description}</p>
                  </div>`;
  let menus = `<div class='restaurant__menus'>
              <h3 tabIndex="0" class='title'>Our Menus</h3>
              <div class='menus'>`;
  menus += createFoodList(restaurant.menus.foods);
  menus += createDrinkList(restaurant.menus.drinks);
  menus += '</div></div>';

  let reviews = `<div class="restaurant__reviews" id="restaurant_reviews">
                <h3 tabIndex="0" class='title'>Customer Review</h3>`;
  reviews += createReviewForm();
  reviews += createCustomerReviewList(restaurant.customerReviews);
  let template = `<div class='restaurant_view'>${overview}${info}</div>`;
  // template += overview;
  template += menus;
  template += reviews;
  return template;
}

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
        <img class="restaurant-item__header__poster lozad" alt="${restaurant.name}"
        src="/images/loading.gif"
          data-src="${restaurant.pictureId?CONFIG.BASE_IMAGE_SMALL_URL+restaurant.pictureId:'https://picsum.photos/id/666/800/450?grayscale'}"
         />
        <div class="restaurant-item__header__rating">
            <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
        </div>
    </div>
    <div class="restaurant-item__content">
        <h3><a class="restaurant_name" href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a></h3>
        <h4><p>Kota : ${restaurant.city}</p></h4>
        <p tabIndex='0'>${restaurant.description}</p>
    </div>
  </div>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createCustomerReviewList,
};
