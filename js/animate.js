// JavaScript Document

//----bla bla bla, some globals---
var oldhour = 0;
var oldminute = 0;
var oldseconds = 0;
var serverdate = 0;

//---------------------Function Imagechanger --------------------------
function Changebacknumber(time,part,direction){
	if(time.length === 1){//Einstellige Zeitangabe(0-9)
	    if(direction === "Lower"){
		    $("#"+part+"LowerLeftBack").attr("src","Down/Left/0.png");
		    $("#"+part+"LowerRightBack").attr("src","Down/Right/"+time+".png");
	    } else {
		    $("#"+part+"UpperLeftBack").attr("src","Up/Left/0.png");
		    $("#"+part+"UpperRightBack").attr("src","Up/Right/"+time+".png");
	    }
	} else if (time.length === 2){ //Zweistellige Zeitangabe(10-59)
	    if(direction === "Lower"){
		    $("#"+part+"LowerLeftBack").attr("src","Down/Left/"+time.charAt(0)+".png");
		    $("#"+part+"LowerRightBack").attr("src","Down/Right/"+time.charAt(1)+".png");
		} else {
		    $("#"+part+"UpperLeftBack").attr("src","Up/Left/"+time.charAt(0)+".png");
			$("#"+part+"UpperRightBack").attr("src","Up/Right/"+time.charAt(1)+".png");	  
	    }
	} else {
		return false;
	}
} //endfunc

function Changefrontnumber(time,part,direction){
	//background set Image
	if(time.length === 1){//Einstellige Zeitangabe(0-9)
		if(direction === "Lower"){
			$("#"+part+"LowerLeft").attr("src","Down/Left/0.png");
			$("#"+part+"LowerRight").attr("src","Down/Right/"+time+".png");
		} else {
			$("#"+part+"UpperLeft").attr("src","Up/Left/0.png");
			$("#"+part+"UpperRight").attr("src","Up/Right/"+time+".png");
		}
	} else if (time.length === 2){ //Zweistellige Zeitangabe(10-59)
		if(direction === "Lower"){
			$("#"+part+"LowerLeft").attr("src","Down/Left/"+time.charAt(0)+".png");
			$("#"+part+"LowerRight").attr("src","Down/Right/"+time.charAt(1)+".png");
		} else {
			$("#"+part+"UpperLeft").attr("src","Up/Left/"+time.charAt(0)+".png");
			$("#"+part+"UpperRight").attr("src","Up/Right/"+time.charAt(1)+".png");	 
		}
	} else {
		return false;
	}
} //endfunc
//------------------End Function Imagechanger--------------------------


//-----------------Animate Function -----------------------------------
function Animateclock(time,part){
	$("#"+part+"UpperLeft,#"+part+"UpperRight","#"+part+"UpperLeft,#"+part+"UpperRight").stop(true,true);
	Changebacknumber(time,part,"Upper");
	$("#"+part+"LowerLeft,#"+part+"LowerRight").css('height','0%');
	$("#"+part+"UpperLeft,#"+part+"UpperRight").animate({
		height: '0%'
	}, 200, function(){
		Changefrontnumber(time,part,"Lower");
		$("#"+part+"LowerLeft,#"+part+"LowerRight").animate({
			height: '100%'
		}, 150, function(){
			Changebacknumber(time,part,"Lower");
			Changefrontnumber(time,part,"Upper");
			$("#"+part+"UpperLeft,#"+part+"UpperRight").css('height','100%');
			$("#"+part+"LowerLeft,#"+part+"LowerRight").css('height','0%');
		})	;										
	}); //endanimation
} //endfunc
//-------------End-Animate Function -----------------------------------

//------------------Init Display Stuff here!---------------------------
function displaytime(){
	serverdate = new Date();
	var hour = serverdate.getHours().toString();
	var minute = serverdate.getMinutes().toString();
	var seconds = serverdate.getSeconds().toString();

	//--time changed check--
	if(oldseconds !== seconds){
		Animateclock(seconds,"Second");
		if (oldminute !== minute){
			Animateclock(minute,"Minute");
			if (oldhour !== hour){
				Animateclock(hour,"Hour");
			}
		}
	}
	oldhour = hour;
	oldminute = minute;
	oldseconds = seconds;
}//endfunc
//--------------End-Init Display Stuff here!---------------------------

$(document).ready(function(){
	displaytime();
	$timer = setInterval("displaytime()", 250); // refresh every 100ms
});

$(document).click(function(){
	window.location.reload();
});

$(window).unload(function() {
	clearTimeout($timer);
	$("div:animated").stop(true,true); 
	$("#"+part+"LowerLeft,#"+part+"LowerRight").css('height','0%');
	$("#"+part+"UpperLeft,#"+part+"UpperRight").css('height','0%');
});
