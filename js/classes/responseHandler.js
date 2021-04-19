class ResponseHandler {
	
	constructor(){
		this.responses = [];
	}
	
	setResponse(index, value){
		this.responses[index] = {index: value};
	}
	
	getResponse(index){
		if(typeof this.responses[index] !== 'undefined'){
			return this.responses[index].index;
		} else {
			return null;
		}
	}
	
	getAllResponses(){
		return this.responses;
	}

}