import CONFIG from '../globals/config';
import NotificationHelper from './notification-helper';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this.onMessageHandler;
  },
  onMessageHandler(message) {
    // eslint-disable-next-line no-console
    console.log(message.data);
    const movie = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      title: `${movie.title} is on cinema!`,
      options: {
        body: movie.overview,
        image: `${CONFIG.BASE_IMAGE_URL + movie.poster_path}`,
      },
    });
  },

};
export default WebSocketInitiator;
