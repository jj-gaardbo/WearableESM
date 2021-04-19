class ColorManager{
	constructor(){
		this.currentTextColorClass = "five--text colormanager";
		this.currentBGColorClass = "five--bg colormanager";
	}
	
	getTextColorClass(val){
		var colorClass = "";
		switch(val){
			case 0:
				colorClass = "zero--text colormanager";
				break;
			case 1:
				colorClass = "one--text colormanager";
				break;
			case 2:
				colorClass = "two--text colormanager";
				break;
			case 3:
				colorClass = "three--text colormanager";
				break;
			case 4:
				colorClass = "four--text colormanager";
				break;
			case 5:
				colorClass = "five--text colormanager";
				break;
			case 6:
				colorClass = "six--text colormanager";
				break;
			case 7:
				colorClass = "seven--text colormanager";
				break;
			case 8:
				colorClass = "eight--text colormanager";
				break;
			case 9:
				colorClass = "nine--text colormanager";
				break;
			case 10:
				colorClass = "ten--text colormanager";
				break;
		}
		
		return colorClass;
	}
	
	getBGColorClass(val){
		var colorClass = "";
		switch(val){
			case 0:
				colorClass = "zero--bg colormanager";
				break;
			case 1:
				colorClass = "one--bg colormanager";
				break;
			case 2:
				colorClass = "two--bg colormanager";
				break;
			case 3:
				colorClass = "three--bg colormanager";
				break;
			case 4:
				colorClass = "four--bg colormanager";
				break;
			case 5:
				colorClass = "five--bg colormanager";
				break;
			case 6:
				colorClass = "six--bg colormanager";
				break;
			case 7:
				colorClass = "seven--bg colormanager";
				break;
			case 8:
				colorClass = "eight--bg colormanager";
				break;
			case 9:
				colorClass = "nine--bg colormanager";
				break;
			case 10:
				colorClass = "ten--bg colormanager";
				break;
		}
		
		return colorClass;
	}
	
	clearColorClasses(element){
		if(element.length > 0){
			element.removeClass("zero--text one--text two--text three--text four--text five--text six--text seven--text eight--text nine--text ten--text zero--bg one--bg two--bg three--bg four--bg five--bg six--bg seven--bg eight--bg nine--bg ten--bg");
		}
	}
	
	updateColor(element, val, type){
		this.clearColorClasses(element);
        if(type === 'text'){
        	element.addClass(this.getTextColorClass(val));
        } else if(type === 'background'){
        	element.addClass(this.getBGColorClass(val));
        }
	}
}