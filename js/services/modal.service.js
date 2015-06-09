(function() {

	angular
		.module("app")
		.factory("modalService", ModalService);

	function ModalService($log) {

		var flags = {
			addCondition: false,
			addNPC: false,
			addPC: false,
			addTemplateNPC: false,
			inactiveNotification: false
		};
		
		return {
			show: function(name) {
				this.hideAll();
				flags[name] = true;
			},
			hide: function(name) {
				flags[name] = false;
			},
			hideAll: function() {
				for(var key in flags) {
					flags[key] = false;
				}
			},
			isVisible: function(name) {
				var visible = flags[name];
				if(visible === undefined) {
					$log.info("flag " + name + "is undefined");
				}
				return visible;
			}
		};
	}

})();	