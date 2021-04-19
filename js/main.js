(function($){	
	
	var responses = new ResponseHandler();
	
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
			pathColor: null,
			rangeColor: null,
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
				if(itemIndex === 10){
					var val = e.value, label;
				    if (val < 1) label = "I'm alone";
				    else if (val < 2) label = "1 person";
				    else if (val < 3) label = "2 people";
				    else if (val < 4) label = "3 people";
				    else if (val < 5) label = "4 people";
				    else if (val < 6) label = "5 people";
				    else if (val < 7) label = "6 people";
				    else if (val < 8) label = "7 people";
				    else if (val < 9) label = "8 people";
				    else if (val < 10) label = "9 people";
				    else label = "10 people<br />or more";
				    return "<button class='back hidden'></button><span>" + label + "</span>"+nextBtn;
				} else {
					var val = e.value, label;
				    if (val < 1) label = "Not at all";
				    else if (val < 2) label = "Very mildly";
				    else if (val < 4) label = "Mildly";
				    else if (val < 7) label = "Moderately";
				    else if (val < 9) label = "Severely";
				    else if (val < 10) label = "Very severely";
				    else if (val > 9) label = "Completely";
				    else label = "BLANK";
				    return "<button class='back hidden'></button>" + val + "<span>" + label + "</span>"+nextBtn;
				}
			}
	};
	
	var progressOptions = {
			// min / max value
			min: 0,
			max: 10,

			// custom step
			step: 1,

			// initial value
			value: 0,

			// customize the slider
			radius: 170,
			width: 6,
		    handleSize: 0,
			startAngle: 315,
			endAngle: "+85",

			// enable animation
			animation: false,

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
			borderWidth: 1,
			borderColor: null,
			pathColor: null,
			rangeColor: null,
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
			tooltipFormat: null
	};
	
	var slider = null;
	var progress = null;
	
	var sliderElement = null;
	
	$(document).ready(function(){
		
		slider = $("#handle1").roundSlider(roundSliderOptions);
		progress = $("#progress").roundSlider(progressOptions);
		
		rotaryEventHandler = function(e) {
            if (e.detail.direction === 'CW') {
                /* Right direction */
				var prevVal = slider.roundSlider("getValue");
				slider.roundSlider("setValue" , (prevVal+1));
            } else if (e.detail.direction === 'CCW') {
                /* Left direction */
				var prevVal = slider.roundSlider("getValue");
				slider.roundSlider("setValue" , (prevVal-1));
            }
            
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
            
            responses.setResponse(itemIndex, slider.roundSlider("getValue"));
        };
		
        document.addEventListener('rotarydetent', rotaryEventHandler, false);
        
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
        	
        	if(responses.getResponse(itemIndex) !== null){
        		slider.roundSlider("setValue", responses.getResponse(itemIndex));
        	} else if(itemIndex === 10){
        		slider.roundSlider("setValue" , 0);
        	} else {
        		slider.roundSlider("setValue" , 5);	
        	}
    	});
        
        $(document).on('click', '.rs-tooltip button.back', function(){
        	itemIndex--;        	
        	progress.roundSlider("setValue" , itemIndex);

        	if(itemIndex <= 0){
        		itemIndex = 0;
        	}
        	
        	$('.rs-tooltip button.continue').addClass('hidden');
        	$('.rs-tooltip button.back').addClass('hidden');
        	
        	itemString.html("<p>"+itemData(itemIndex).string+"</p>");
        	
        	if(responses.getResponse(itemIndex) !== null){
        		slider.roundSlider("setValue", responses.getResponse(itemIndex));
        	} else if(itemIndex === 10){
        		slider.roundSlider("setValue" , 0);
        	} else {
        		slider.roundSlider("setValue" , 5);	
        	}
    	});
	});	
	
})(jQuery);