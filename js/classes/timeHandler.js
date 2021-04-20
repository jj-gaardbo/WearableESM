class TimeHandler {
	
	constructor(){
		this.days = 0;
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		this.startTimestamp = new Date();
		this.endTimestamp = null;
	}
	
	calculateDuration(){
		// get total seconds between the times
		var delta = Math.abs(this.endTimestamp - this.startTimestamp) / 1000;

		// calculate (and subtract) whole days
		var days = Math.floor(delta / 86400);
		delta -= days * 86400;

		// calculate (and subtract) whole hours
		var hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;

		// calculate (and subtract) whole minutes
		var minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;

		// what's left is seconds
		var seconds = Math.floor(delta % 60);  // in theory the modulus is not required
		
		this.days = days;
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
		
	}
	
	stop(){
		this.endTimestamp = new Date();
		this.calculateDuration();
	}
	
	getDurationString(){
		return this.minutes+":"+this.seconds;
	}
	
	show(){
		$('.time').html(this.getDurationString());
	}
}