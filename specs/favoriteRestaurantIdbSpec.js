import { itActsAsFavoriteRestaurantModel } from "./contract/favoriteRestaurantIdb";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-db";

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
            await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
        });
    });
    itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});