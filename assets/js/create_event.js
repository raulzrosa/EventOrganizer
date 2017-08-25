jQuery (function(){
	jQuery ('#date_timepicker_start').datetimepicker ({
		format:'d/m/Y H:i',
		onShow:function ( ct ){
			this.setOptions ({
				maxDate:jQuery ('#date_timepicker_end').val ()?jQuery ('#date_timepicker_end').val ():false
			})
		},
	});
	jQuery ('#date_timepicker_end').datetimepicker ({
		format:'d/m/Y H:i',
		onShow:function ( ct ){
			this.setOptions({
				minDate:jQuery ('#date_timepicker_start').val ()?jQuery ('#date_timepicker_start').val ():false
			})
		},
	});
});	