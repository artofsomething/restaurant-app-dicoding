/* eslint-disable no-console */
const NotificationHelper = {
  sendNotification({
    title,
    options,
  }) {
    if (!this.checkAvailability()) {
      console.log('Notification not supported in this browser');
      return;
    }
    if (!this.checkPermission()) {
      console.log('User did not yet granted permission');
      this.requestPermission();
      return;
    }
    this.showNotification({
      title,
      options,
    });
  },
  checkAvailability() {
    return !!('Notification' in window);
  },
  checkPermission() {
    return Notification.permission === 'granted';
  },
  async requestPermission() {
    const status = await Notification.requestPermission();
    if (status === 'denied') {
      console.log('Notification Denied');
    }
    if (status === 'default') {
      console.log('Permission closed');
    }
  },
  async showNotification({
    title,
    options,
  }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  },
};
export default NotificationHelper;
