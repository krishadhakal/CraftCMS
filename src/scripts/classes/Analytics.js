var Analytics = function () {

};

Analytics.prototype.init = function () {

	var self = this;

	if (typeof Attributor !== 'undefined') {
		
		self.attributor = new Attributor({
			cookieDomain: window.location.hostname,
			fieldMap: {
				cookies: {
					_ga: 'ga_client_id',
					_gcl_aw: 'gclid'
				}
			}
		});

		self.attributorData = self.attributor.grab();

		$(`.fui-form`).each(function() {

			let $form = $(this);
			let $attributorField = $form.find(`input[name="fields[attributorData]"]`);

			if (!$attributorField.length)
				return;

			$form.on('onAfterFormieValidate', function(e) {
				$attributorField.val(JSON.stringify(self.attributorData));
			});

		});

	}

};

export default Analytics;