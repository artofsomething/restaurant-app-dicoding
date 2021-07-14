/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDBSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT).then((error) => {
      if (!error.ok) {
        throw Error(error.statusText);
      }
      return error;
    }).catch((error) => undefined);

    // console.log('Responses : ', response.status);
    if (response === undefined) {
      console.log('Response : Testing');
      return undefined;
    }
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async searchRestaurant(query) {
    const response = await fetch(API_ENDPOINT.SEARCH_RESTAURANT(query));
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id)).then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    }).catch((error) => undefined);
    if (response === undefined) {
      return undefined;
    }
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async addNewReview(id, name, review) {
    const bodies = `{"id":"${id}","name":"${name}", "review":"${review}" }`;
    console.log('Json Body : ', JSON.parse(bodies));
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      body: bodies,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // eslint-disable-next-line no-dupe-keys
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
    }).then((res) => {
      console.log('Response : ', JSON.stringify(res));
      if (!res.ok) throw Error(res.statusText);
      return res;
    }).catch((error) => {
      console.log('Error : ', error);
      return undefined;
    });

    if (response === undefined) {
      return undefined;
    }
    const responseJson = await response.json();
    return responseJson.customerReviews;
  }
}

export default RestaurantDBSource;
