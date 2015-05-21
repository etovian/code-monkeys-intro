angular
	.module("app")
	.factory("notificationService", NotificationService);

function NotificationService($timeout) {
	
	var activeNotifications = [];
	var inactiveNotifications = [];
	
	return {
		NOTIFICATION_TYPES: {
			INFO: "info",
			SUCCESS: "success",
			WARNING: "warning",
			DANGER: "danger"
		},
		add: function(notification) {
			var me = this;
			activeNotifications.push(notification);
			if(!notification.pinned) {
				var displaySeconds = (notification.displaySeconds || 5) * 1000;
				$timeout(function() {
					me.remove(notification);
				}, displaySeconds);	
			}
		},
		remove: function(notification) {
			activeNotifications = _.without(activeNotifications, notification);
			inactiveNotifications.push(notification);
		},
		addError: function(text) {
			this.add({
				title: "Error",
				text: text,
				type: "DANGER",
				pinned: true
			});
		},
		getActiveNotifications: function() {
			return activeNotifications;
		},
		getInactiveNotifications: function() {
			return inactiveNotifications;
		}
	};
}