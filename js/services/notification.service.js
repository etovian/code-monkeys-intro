angular
	.module("app")
	.factory("notificationService", NotificationService);

function NotificationService($timeout) {
	
	var activeNotifications = [];
	var inactiveNotifications = [];
	
	return {
		NOTIFICATION_TYPES: {
			INFO: "INFO",
			SUCCESS: "SUCCESS",
			WARNING: "WARNING",
			DANGER: "DANGER"
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
		},
		getNotificationClass: function(notification) {
			var cssClass = "";
			if(notification) {
				switch(notification.type) {
					case this.NOTIFICATION_TYPES.INFO:
						cssClass = "alert-info";
						break;
					case this.NOTIFICATION_TYPES.SUCCESS:
						cssClass = "alert-success";
						break;
					case this.NOTIFICATION_TYPES.WARNING:
						cssClass = "alert-warning";
						break;
					case this.NOTIFICATION_TYPES.DANGER:
						cssClass = "alert-danger";
						break;
					default:
						cssClass = "alert-info";
						break;
				}				
			}
			
			return cssClass;
		}
	};
}