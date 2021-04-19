(function($){
	
	var counter = 0;
	var colorManager = new ColorManager();
	var tutorialInterval = null;
	var tutorialTimeout = null;
	var timer = null;
	var responses = new ResponseHandler();
	var hrHandler = new HRHandler();
	var itemIndex = 0;
	
	var roundSliderOptions = {
			// min / max value
			min: 0,
			max: 10,

			// custom step
			step: 1,

			// initial value
			value: 5,

			// customize the slider
			radius: 180,
			width: 9,
		    handleSize: 0,
			startAngle: 315,
			endAngle: "+85",

			// enable animation
			animation: false,

			// enable tooltip
			show: false,
			editableTooltip: false,

			// read-only mode
			readOnly: false,

			// disabled mode
			disabled: false,

			// allow for keyboard interaction
			keyboardAction: false,

			// enable mousel scroll action
			mouse: false,

			// square, or round
			lineCap: "butt",

			// default, min-range or range
			sliderType: "min-range",

			// full, quarter-top-left, quarter-top-right, quarter-bottom-right, 
			// quarter-bottom-left, half-top, half-bottom, half-left, half-right, 
			// pie, custom-half, custom-quarter
			circleShape: "pie",

			// round, dot, or square
			handleShape: "dot",

			// the 'startValue' property decides at which point the slider should start.
			// otherwise, by default the slider starts with min value. this is mainly used
			// for min-range slider, where you can customize the min-range start position.
			startValue: null,

			// SVG related properties
			svgMode: false,
			borderWidth: 1,
			borderColor: null,
			pathColor: "#7f8000",
			rangeColor:  "#7f8000",
			tooltipColor: null,

			// events
			beforeCreate: null,
			create: null,
			start: null,
			beforeValueChange: null,
			drag: null,
			change: null,
			up: null,
			valueChange: null,
			stop: null,
			tooltipFormat: function (e) {
				var nextBtn = "<button class='continue hidden'></button>";
				if(itemIndex >= items.length-1){
					nextBtn = "<a href='#submit-page'><button class='finish hidden'><svg x='0px' y='0px' width='40px' height='40px' viewBox='-4.447 -6.75 40 40' enable-background='new -4.447 -6.75 40 40' xml:space='preserve'><g><path fill='#FFFFFF' d='M34.458-6.75c-9.762,5.796-18.1,14.316-24.254,24.69l-9.7-9.482l-4.951,4.638l17.623,20.011 c4.147-14.63,12.063-27.292,22.432-36.488L34.458-6.75z'/></g></svg></button></a>";
				}
				if(itemIndex === 11){
					var val = e.value, label;
				    if (val < 1){label = "I'm alone";}
				    else if (val < 2) {label = "1 person";}
				    else if (val < 3) {label = "2 people";}
				    else if (val < 4) {label = "3 people";}
				    else if (val < 5) {label = "4 people";}
				    else if (val < 6) {label = "5 people";}
				    else if (val < 7) {label = "6 people";}
				    else if (val < 8) {label = "7 people";}
				    else if (val < 9) {label = "8 people";}
				    else if (val < 10) {label = "9 people";}
				    else {label = "10 people<br />or more";}
				    return "<button class='back hidden'></button><span class='indicator'>" + label + "</span>"+nextBtn;
				} else {
					var val = e.value, label;
				    if (val < 1){label = "Not at all";}
				    else if (val < 2) {label = "Very mildly";}
				    else if (val < 4) {label = "Mildly";}
				    else if (val < 7) {label = "Moderately";}
				    else if (val < 9) {label = "Severely";}
				    else if (val < 10) {label = "Very severely";}
				    else if (val > 9) {label = "Completely";}
				    return "<button class='back hidden'></button><span class='indicator'><strong>" + val + "</strong><br />" + label + "</span>"+nextBtn;
				}
			}
	};
	
	var progressOptions = {
			// min / max value
			min: 0,
			max: 11,

			// custom step
			step: 1,

			// initial value
			value: 0,

			// customize the slider
			radius: 170,
			width: 5,
		    handleSize: 0,
			startAngle: 315,
			endAngle: "+85",

			// enable animation
			animation: true,

			// enable tooltip
			show: false,
			editableTooltip: false,

			// read-only mode
			readOnly: true,

			// disabled mode
			disabled: false,

			// allow for keyboard interaction
			keyboardAction: false,

			// enable mousel scroll action
			mouse: false,

			// square, or round
			lineCap: "butt",

			// default, min-range or range
			sliderType: "min-range",

			// full, quarter-top-left, quarter-top-right, quarter-bottom-right, 
			// quarter-bottom-left, half-top, half-bottom, half-left, half-right, 
			// pie, custom-half, custom-quarter
			circleShape: "pie",

			// round, dot, or square
			handleShape: "dot",

			// the 'startValue' property decides at which point the slider should start.
			// otherwise, by default the slider starts with min value. this is mainly used
			// for min-range slider, where you can customize the min-range start position.
			startValue: null,

			// SVG related properties
			svgMode: false,
			borderWidth: 0,
			borderColor: null,
			pathColor: null,
			rangeColor: null,
			tooltipColor: null,

			// events
			beforeCreate: null,
			create: null,
			start: null,
			beforeValueChange: function (e) {
				var progressIndicator = $(document).find('#progress .rs-range-color');
				progressIndicator.addClass('hidden-progress');
			},
			drag: null,
			change: null,
			up: null,
			valueChange: function(e){
				var progressIndicator = $(document).find('#progress .rs-range-color');
				progressIndicator.removeClass('hidden-progress');
				var timer = setTimeout(function(){
					progressIndicator.addClass('hidden-progress');
					clearInterval(timer);
				}, 1000);
			
			},
			stop: null,
			tooltipFormat: null
	};
	
	var slider = null;
	var progress = null;
	
	function resetApp(){
		responses = null;
		hrHandler = null;
		tutorialInterval = null;
		tutorialTimeout = null;
		timer = null;
		responses = new ResponseHandler();
		hrHandler = new HRHandler();
		itemIndex = 0;
		counter = 0;
		
		$(document).find('.ui-page').removeClass('ui-page-active');
		$(document).find('#start-page').addClass('ui-page-active');
		
		$("#handle1").roundSlider("destroy");
		$("#progress").roundSlider("destroy");
		slider = null;
		progress = null;
		
		$(document).off('click', '#submit');
		$(document).off('click', '.rs-tooltip button.continue');
		$(document).off('click', '.rs-tooltip button.back');
		$('.start').off('click');
		$(document).off('click', '.finish');
		$(document).off('click', '.tutorial');
		
		runApp();
	}
	
	function onchangedCB(hrmInfo) {
		var heartRate = hrmInfo.heartRate;
		var rrInterval = hrmInfo.rRInterval;
		if(heartRate > 0){
			$('div.hr').html("<p>"+heartRate + " " + rrInterval+"</p>");
			hrHandler.addHR(heartRate);
			
			if(rrInterval > 0){
				hrHandler.addRR(rrInterval);	
			}
		}
	    counter++;
	    if (counter > 500) {
	        tizen.humanactivitymonitor.stop('HRM');//Stop the sensor after detecting a few changes
	    }
    }
	
	function rotaryEventHandler(e) {
		var prevVal;

		// Remove tutorial as rotary bezel has been used
		$('.tutorial').addClass('hidden');
		clearInterval(tutorialInterval);
		clearTimeout(tutorialTimeout);
		
		// Detect rotary bezel direction
        if (e.detail.direction === 'CW') {
			prevVal = slider.roundSlider("getValue");
			slider.roundSlider("setValue" , (prevVal+1));
        } else if (e.detail.direction === 'CCW') {
			prevVal = slider.roundSlider("getValue");
			slider.roundSlider("setValue" , (prevVal-1));
        }
        
        // Hide back button on first item but show next button,
        if(itemIndex <= 0){
        	$('.rs-tooltip button.back').addClass('hidden');
        	$('.rs-tooltip button.continue').removeClass('hidden');
        } 

        else if(itemIndex >= items.length -1){
        	$('.rs-tooltip button.continue').addClass('hidden');
        	$('.rs-tooltip button.back').removeClass('hidden');
        	$('.rs-tooltip button.finish').removeClass('hidden');
       
        } else {
        	$('.rs-tooltip button.continue').removeClass('hidden');
        	$('.rs-tooltip button.back').removeClass('hidden');
        }
        
        //Change indicator color depending on value chosen
    	colorManager.updateColor($(document).find('.indicator'), slider.roundSlider("getValue"), 'text');
    	colorManager.updateColor($(document).find('.rs-range-color'), slider.roundSlider("getValue"), 'background');
    	
        responses.setResponse(parseInt(itemIndex), slider.roundSlider("getValue"));
    };
	
	function runApp(){
		
		$(document).on('click', '#submit', function(){
			
			var dataObj = {
				'self':	responses.getAllResponses(),
				'hr': hrHandler.getHR(),
				'rr':hrHandler.getRR(),
				'duration':responses.getDuration(),
				'start':responses.getStartUnixTimestamp(),
				'end':responses.getEndUnixTimestamp(),
			};
			var data = {
				'data' : dataObj
			};
			
			$.ajax({
				  type: "POST",
				  url: "https://gaardbodigital.dk/dbwrite.php",
				  data: JSON.stringify(data),
				  success: function(resp){
					  console.log("SUCCESS");
					  console.log(resp);
					  resetApp();
				  }
				});

		});
		
		slider = $("#handle1").roundSlider(roundSliderOptions);
		progress = $("#progress").roundSlider(progressOptions);
		
		
		// Change indicator color depending on value chosen
    	colorManager.updateColor($(document).find('.indicator'), slider.roundSlider("getValue"), 'text');    	
    	colorManager.updateColor($(document).find('.rs-range-color'), slider.roundSlider("getValue"), 'background');
    	
        var itemString = $('.item'); 
        itemString.html("<p>"+itemData(itemIndex).string+"</p>");
        
        $(document).on('click', '.rs-tooltip button.continue', function(){
        	itemIndex++;
        	progress.roundSlider("setValue" , itemIndex);
        	
        	if(itemIndex >= items.length-1){
        		itemIndex = items.length-1;
        	}
        	
        	itemString.html("<p>"+itemData(itemIndex).string+"</p>");
        	$('.rs-tooltip button.continue').addClass('hidden');
        	$('.rs-tooltip button.back').addClass('hidden');
        	
        	var responseVal = responses.getResponse(parseInt(itemIndex));
        	if(responseVal !== null){
        		slider.roundSlider("setValue", responseVal);
        	} else if(parseInt(itemIndex) === 11){
        		slider.roundSlider("setValue" , 0);
        	} else {
        		slider.roundSlider("setValue" , 5);	
        	}
        	
        	// Change indicator color depending on value chosen
        	colorManager.updateColor($(document).find('.indicator'), slider.roundSlider("getValue"), 'text');
        	colorManager.updateColor($(document).find('.rs-range-color'), slider.roundSlider("getValue"), 'background');    	});
        
        $(document).on('click', '.rs-tooltip button.back', function(){
        	itemIndex--;        	
        	progress.roundSlider("setValue" , itemIndex);

        	if(itemIndex <= 0){
        		itemIndex = 0;
        	}
        	
        	$('.rs-tooltip button.continue').addClass('hidden');
        	$('.rs-tooltip button.back').addClass('hidden');
        	
        	itemString.html("<p>"+itemData(itemIndex).string+"</p>");
        	
        	var responseVal = responses.getResponse(parseInt(itemIndex));
        	if(responseVal !== null){
        		slider.roundSlider("setValue", responseVal);
        	} else if(parseInt(itemIndex) === 11){
        		slider.roundSlider("setValue" , 0);
        	} else {
        		slider.roundSlider("setValue" , 5);	
        	}
        	
        	// Change indicator color depending on value chosen
        	colorManager.updateColor($(document).find('.indicator'), slider.roundSlider("getValue"), 'text');
        	colorManager.updateColor($(document).find('.rs-range-color'), slider.roundSlider("getValue"), 'background');    	});
        
		
		$('.start').on('click', function(){
        	timer = new TimeHandler();
        	tizen.humanactivitymonitor.start('HRM', onchangedCB);
    	});
		
		$(document).on('click', '.finish', function(){
			timer.stop();
			responses.setStartTime(timer.startTimestamp);
			responses.setEndTime(timer.endTimestamp);
			responses.setDuration(timer.getDurationString());
			timer.show();
			tizen.humanactivitymonitor.stop('HRM');
    	});
		
		var currentPage = $('.ui-page');
		tutorialInterval = setInterval(function(){
			if(currentPage.hasClass('data-page') && tutorialTimeout === null){
				tutorialTimeout = setTimeout(function(){
					$(document).find('.tutorial').removeClass('hidden');
					clearInterval(tutorialInterval);
					tutorialInterval = null;
				}, 5000);
			}
		}, 500);
		
		$(document).on('click', '.tutorial', function(){
			$(this).addClass('hidden');
			clearInterval(tutorialInterval);
			clearTimeout(tutorialTimeout);
			tutorialInterval = null;
			tutorialTimeout = null;
		});
	}
	
	function onErrorPermission(){
		alert("Permissions not accepted!");
	}
	
	function onsuccessPermission(){
		runApp();
	}
	
	$(document).ready(function(){
		
		
	    function init(){
	    	var privileges = ["http://tizen.org/privilege/healthinfo", "http://tizen.org/privilege/location"];
	    	document.addEventListener('rotarydetent', rotaryEventHandler, false);
	    	tizen.ppm.requestPermissions(privileges, onsuccessPermission, onErrorPermission);
	    }
	    
	    init();
		
		
	});	
	
})(jQuery);