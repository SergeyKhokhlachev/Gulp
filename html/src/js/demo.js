(function() {
	
	/*
	====
		demo script - needs to modify, when integrating with the backend 
	====
	*/

	// auth modal
	$('.modal-auth .tab-btn').on('click', function(){
	  var tab = $(this).data('tab');
	  $(tab).tab('show');
	});

	$('#authModal').on('hidden.bs.modal', function (e) {
	  $('#modal-login-tab').tab('show');
	})



	//show info modal 
	$('#appInfoModal').modal('show')

	// hide map panel
	$('.fade-close').on('click', function(){
		$(this).closest('.fade-block').removeClass('active');
	})


	// map chec-legend 
	$('.chec-legend__prime').on('change', function(){
		if ($(this).is(':checked')) {
		   $(this).closest('.map-legend__block').find('.chec-legend__sub').prop('checked', true);
		} else {
			$(this).closest('.map-legend__block').find('.chec-legend__sub').prop('checked', false);
		}
	})

	// redact table record
	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [day, month, year].join('.');
	}

	$('.record-redact').on('click', function() {
		var ell = $(this).closest('tr');
		if(ell.hasClass('redact-active')) {
			ell.removeClass('redact-active');
		} else {
			$('.filter-table tbody tr').removeClass('redact-active');
			ell.addClass('redact-active');
		}
	});

	$('.redact-view .fild-date').on('dp.hide', function (e) {
		$(this).closest('.redact-view').removeClass('fix-view');
	  	$(this).closest('td').find('.end-date')
	  		.removeClass('text-light')
	  		.text(formatDate(e.date._d));
	});

	$('.redact-view .fild-date').on('dp.show', function (e) {
	  	$(this).closest('.redact-view').addClass('fix-view');
	});

	


	$('.redact-view .chosen-select').on('change', function (e) {
		var val = $(this).val(),
			status = $(this).closest('td').find('.status');	
		if(val == 'process') {
			status.html('<i class="icon-load-c"></i>В работе');
		} else if (val == 'done') {
			status.html('<i class="icon-check-c"></i>Исполнена');
		} else {
			status.html('<i class="icon-close-c"></i>Закрыта');
		}
	});

	$('.redact-view .chosen-select').on('chosen:showing_dropdown', function (e) {
		$(this).closest('.redact-view').addClass('fix-view');
	});

	$('.redact-view .chosen-select').on('chosen:hiding_dropdown', function (e) {
		$(this).closest('.redact-view').removeClass('fix-view');
	});

	

})();	