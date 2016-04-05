$(function() {
	$(document)
	.on('click', '.form.json button[type="submit"]', function(e) {
		var $form = $(this).closest('.form'),
			url = $form.attr('action') || window.location.href,
			method = $form.attr('method') || 'POST',
			data = {};
		$form.find('input,textarea').each(function() {
			var $field = $(this),
				key = $field.attr('name'),
				value = $field.val().trim();
			data[key] = value;
		});
		if (!data.path || data.path.startsWith('/') || data.path.startsWith('api')) {
			window.alert('Path must be provided and may not start with / or api');
			return;
		}
		if ((data.method == 'POST' || data.method == 'PUT') &&
				!data.content) {
			window.alert('Must provide body for POST or PUT methods');
			return false;
		}
		if (data.method == 'DELETE' && data.content) {
			window.alert('Cannot have DELETE with content body!');
			return false;
		}
		$.ajax({
			type: method,
			url: url,
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: $.proxy(function(data) {
				console.log('%O', data);
//				window.location.reload();
			}, this),
			error: $.proxy(function() {
				window.alert('An error occurred posting data.\nPlease try again.\nReport this if it persists');
			}, this)
		});
	});
});