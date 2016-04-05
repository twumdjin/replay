$(function() {
	$(document)
	.on('click', '.form.json button[type="submit"]', function(e) {
		var $form = $(this).closest('.form'),
			url = $form.attr('action') || window.location.href,
			method = $form.attr('method') || 'POST',
			data;
		if ($(this).hasClass('delete')) {
			if (!window.confirm('Are you sure you want to delete this endpoint?')) {
				return;
			}
			method = 'DELETE';
		} else {
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
		}
		$.ajax({
			type: method,
			url: url,
			data: data ? JSON.stringify(data) : undefined,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: $.proxy(function(data) {
				window.location.reload();
			}, this),
			error: $.proxy(function() {
				window.alert('An error occurred posting data.\nPlease try again.\nReport this if it persists');
			}, this)
		});
	});
});