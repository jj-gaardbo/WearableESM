(function($){
	
	var SCROLL_STEP = 50;
	var counter = 0;
	var colorManager = new ColorManager();
	var tutorialInterval = null;
	var tutorialTimeout = null;
	var timer = null;
	var responses = new ResponseHandler();
	var hrHandler = new HRHandler();
	var itemIndex = 0;
	var feedbackTimeout = null;
	var feedbackTimeout = 3000;
	
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
			$('div.hr').html('<p><svg version="1.1" x="0px" y="0px" width="30px" height="25.148px" viewBox="0 0 30 25.148" enable-background="new 0 0 30 25.148" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#FF0000" d="M14.991,25.148c2.114-1.776,4.175-3.477,6.196-5.22 c1.243-1.077,2.454-2.198,3.641-3.342c1.512-1.46,2.93-3.006,3.95-4.869c1.059-1.935,1.506-4.001,1.036-6.173 c-1.081-5.004-6.892-7.195-11.111-4.151c-1.108,0.799-1.999,1.904-2.98,2.879c-0.253,0.251-0.467,0.542-0.728,0.847 c-0.265-0.311-0.473-0.585-0.712-0.832c-0.855-0.882-1.646-1.847-2.598-2.612C9.641,0.03,7.291-0.407,4.784,0.396 C1.3,1.513-0.577,5.01,0.158,8.829c0.418,2.17,1.498,4.001,2.973,5.57c1.671,1.777,3.422,3.49,5.236,5.124 C10.505,21.447,12.746,23.252,14.991,25.148z"/></g></svg> '+heartRate + ' <svg version="1.1" x="0px" y="0px" width="30px" height="25.148px" viewBox="0 0 30 25.148" enable-background="new 0 0 30 25.148" xml:space="preserve"><g><g><path fill="#FF0000" d="M0,25.123V0.003h6.682c1.68,0,2.901,0.226,3.663,0.677c0.761,0.451,1.371,1.253,1.829,2.407 s0.687,2.474,0.687,3.958c0,1.884-0.347,3.441-1.041,4.669c-0.693,1.228-1.73,2.002-3.11,2.321c0.687,0.641,1.253,1.343,1.7,2.108 s1.05,2.125,1.808,4.078l1.92,4.9H10.34l-2.295-5.466c-0.815-1.953-1.373-3.185-1.673-3.692c-0.3-0.508-0.618-0.857-0.955-1.045 c-0.336-0.188-0.869-0.283-1.598-0.283H3.175v10.487H0z M3.175,10.627h2.349c1.523,0,2.474-0.103,2.853-0.308 c0.379-0.206,0.676-0.559,0.89-1.063c0.214-0.503,0.322-1.131,0.322-1.885c0-0.845-0.141-1.528-0.424-2.047 C8.882,4.804,8.484,4.476,7.969,4.338c-0.257-0.057-1.03-0.085-2.317-0.085H3.175V10.627z"/> <path fill="#FF0000" d="M15.863,25.123V0.003h6.682c1.682,0,2.902,0.226,3.663,0.677c0.762,0.451,1.371,1.253,1.828,2.407 c0.459,1.154,0.687,2.474,0.687,3.958c0,1.884-0.346,3.441-1.04,4.669c-0.693,1.228-1.729,2.002-3.111,2.321 c0.687,0.641,1.253,1.343,1.701,2.108c0.446,0.765,1.05,2.125,1.807,4.078l1.92,4.9h-3.797l-2.296-5.466 c-0.814-1.953-1.372-3.185-1.673-3.692c-0.3-0.508-0.618-0.857-0.954-1.045c-0.335-0.188-0.869-0.283-1.599-0.283h-0.644v10.487 H15.863z M19.038,10.627h2.349c1.523,0,2.476-0.103,2.854-0.308c0.38-0.206,0.676-0.559,0.891-1.063 c0.214-0.503,0.321-1.131,0.321-1.885c0-0.845-0.142-1.528-0.423-2.047c-0.283-0.521-0.682-0.849-1.196-0.986 c-0.258-0.057-1.03-0.085-2.317-0.085h-2.478V10.627z"/></g></g></svg> ' + rrInterval+'</p>');
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
		var currPage = $('.ui-page-active');
		
		if(!currPage.hasClass('scroll-page')){
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
        
		}
    };
    
	function initScroll(e){
        var page = e.target;
        elScroller = page.querySelector(".ui-scroller");

        // rotary event handler
        rotaryEventHandlerScroll = function(e) {
           if (e.detail.direction === "CW") { // Right direction
              elScroller.scrollTop += SCROLL_STEP;
           } else if (e.detail.direction === "CCW") { // Left direction
              elScroller.scrollTop -= SCROLL_STEP;
           }
        };

        // register rotary event
        document.addEventListener("rotarydetent", rotaryEventHandlerScroll, false);

        // unregister rotary event
        page.addEventListener("pagebeforehide", function pageHideHanlder() {
           page.removeEventListener("pagebeforehide", pageHideHanlder, false);
           document.removeEventListener("rotarydetent", rotaryEventHandlerScroll, false);
        }, false);

    }
		
	var startPage = document.getElementById("start-page");
	var submitPage = document.getElementById("submit-page");
	startPage.addEventListener("pagebeforeshow", initScroll, false);
	submitPage.addEventListener("pagebeforeshow", initScroll, false);
	
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
					  $('.feedback').removeClass('hidden');
					  feedbackTimer = setTimeout(function(){
						  $('.feedback').addClass('hidden');  
						  clearTimeout(feedbackTimer);
						  resetApp();
						  try {
							  tizen.application.getCurrentApplication().exit();
						  } catch (ignore) {
							  console.log("Exit error");
						  }
					  }, feedbackTimeout);
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