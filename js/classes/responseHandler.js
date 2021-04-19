class ResponseHandler {
	
	constructor(){
		this.responses = [];
		this.startTimestamp = null;
		this.endTimestamp = null;
		this.durationstring = "";
	}
	
	getEndUnixTimestamp(){
		return this.endTimestamp.getTime();
	}
	
	getStartUnixTimestamp(){
		return this.startTimestamp.getTime();
	}
	
	setResponse(i, val){
		var obj = {item: i, value : val};
		this.responses[i] = obj;
	}
	
	getResponse(i){
		if(typeof this.responses[i] !== 'undefined'){
			return this.responses[i].value;
		} else {
			return null;
		}
	}
	
	getAllResponses(){
		return this.responses;
	}

	setStartTime(startTime){
		this.startTimestamp = startTime;
	}
	
	setEndTime(endTime){
		this.endTimestamp = endTime;
	}
	
	setDuration(duration){
		this.durationString = duration;
	}
	
	getDuration(){
		return this.durationString;
	}
}