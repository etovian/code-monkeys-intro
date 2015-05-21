(function() {

	angular
		.module("app")
		.controller("MainController", MainController);
	
	function MainController(notificationService, modalService) {

		var vm = this;
		angular.extend(vm, {
			inactiveNotificationPopup: {
				isVisible: function() {
					return modalService.isVisible("inactiveNotification");
				},
				show: function() {
					modalService.show("inactiveNotification");
				},
				hide: function() {
					modalService.hide("inactiveNotification");
				},
			},
			addNotification: function(notification) {
				notificationService.add(notification);
			},
			removeNotification: function(notification) {
				notificationService.remove(notification);
			},
			getActiveNotifications: function() {
				return notificationService.getActiveNotifications();
			},
			getInactiveNotifications: function() {
				return notificationService.getInactiveNotifications();
			},
			getNotificationClass: function(notification) {
				return notificationService.getNotificationClass(notification);
			}
		});

		notificationService.add({
			title: "Welcome, Code Monkeys!",
			text: "Two men enter!  One man leaves!  Oh, wait.  That's the Thunderdome.",
			type: notificationService.NOTIFICATION_TYPES.INFO,
			pinned: true
		});
	}
	
})();