import PubSub from "underpub-js";

var Form = function (options) {
	this.options = {
		$el: false,
		baseClass: 'el-Form',
	};

	$.extend(true, this.options, options);
};

Form.prototype.init = function () {
	const self = this;

	self.$form = self.options.$el.find(`.${self.options.baseClass}__form`);
	self.$defaultSubmitButton = self.$form.find('.fui-submit');
	self.$customSubmitButton = self.options.$el.find(
		`.${self.options.baseClass}__form__submit`,
	);

	self.options.$el.find('.fui-i').removeClass('fui-i');

	self.handleSubmitButtonSwap();
	self.initSelectDropdowns();
};

Form.prototype.handleSubmitButtonSwap = function () {
	const self = this;

	if (!self.$customSubmitButton.length && !self.$defaultSubmitButton.length)
		return;

	let submitButtonText = self.$defaultSubmitButton.html();
	self.$customSubmitButton.find(`.atom-ButtonPrimary__text`).html(submitButtonText);

	self.$defaultSubmitButton.hide();
	self.$customSubmitButton.show().insertAfter(self.$defaultSubmitButton);

	self.$form.find(self.$customSubmitButton).on('click', (e) => {
		self.$defaultSubmitButton.click();
	});
};

Form.prototype.initSelectDropdowns = function(){

	const self = this;

    self.options.$el.find('select').on('change', function() {

        $(this).removeClass('value-selected');

        if ($(this).val() != '')
        {
            $(this).addClass('value-selected');
        }

    });

};

export default Form;