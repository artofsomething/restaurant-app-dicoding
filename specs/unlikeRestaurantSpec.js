import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-db";

const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
}

describe('Unliking A Restaurant', () => {
    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
        let rest = await FavoriteRestaurantIdb.getRestaurant(1);
        console.log("Unlike Before Each :", rest);
    });
    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    it('should display unlike widget when the restaurant has been liked first', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
        let button = document.querySelector('#likeButton');
        console.log("Print : ", button);
        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
    });
    it('should not display like widget when the restaurant has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({
            id: 1
        });
        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
    });
    it('should be able to remove liked restaurant from the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({
            id: 1
        });
        let button = document.getElementById('likeButton');
        console.log("Should Be able", button);
        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
    
});