import ListRestaurant from '../views/pages/list';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': ListRestaurant,
  '/list': ListRestaurant, // default page
  '/favorites': Favorite,
  '/detail/:id': Detail,
};

export default routes;
