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
			}
		});
	}

})();
