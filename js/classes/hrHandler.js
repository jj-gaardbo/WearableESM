class HRHandler {
	
	constructor(){
		this.hr = [];
		this.rr = [];
	}
	
	addHR(val){
		this.hr.push(val);
	}
	
	addRR(val){
		this.rr.push(val);
	}
	
	getHR(){
		return this.hr;
	}
	
	getRR(){
		return this.rr;
	}
	
}
