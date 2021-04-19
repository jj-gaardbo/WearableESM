(function($){	
	$(document).ready(function(){
		var pageRegister = new Pages();
		
		if( typeof itemData.items !== "undefined"){
			for(var i = 0; i < itemData.items.length; i++){
				var itemPage = new PageBuilder(i);
				itemPage.createItem(itemData.items[i]);
				pageRegister.add(itemPage);
				$('#root').append(itemPage.getHtml());
				itemPage.init();
			}
		}
		
		console.log("num pages ", pageRegister.pages.length);
		
		$(window).on('pagebeforechange', function(){
			var currentPageID = parseInt($('.ui-page-active').data('index'));
			var nextPage = currentPageID+1;
			pageRegister.pages[nextPage].refresh();
		});
		
		$('.ui-page-active').change('.rotaryslider', function(){
			var index = $(this).data('index');
			if($(this).attr('id') === "slider-"+index){
				console.log(index);
	    		var value = $(this).val();
				$(".output-"+index).html(value);
			}
			return false;
	    });
	});
	
})(jQuery);