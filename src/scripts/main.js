var arrayNames = [];
var success = true;

$(function() {
	$("#addSantaName").keyup(function(event){
		if(event.keyCode == 13){
			$("#btnAddSanta").click();
		}
	});	

	$("#btnAddSanta").click(function(){
		var santaToAdd = $("#addSantaName").val().trim();
				
		if(!validateEmail(santaToAdd)) {
			alert("Please enter a valid Santa Email Address");
			return;
		}
        
		var santaIndex = jQuery.inArray(santaToAdd, arrayNames);
		
		if(santaIndex > -1) {
			alert("Santa already added!");
			return;
		}
	
		$("#addSantaName").val("");
		
		arrayNames.push(santaToAdd);
		santaIndex = jQuery.inArray(santaToAdd, arrayNames);
		
		$("#tblSantas tbody")
			.append($('<tr>')
				.append($('<td>')
					.append($('<p>')
						.text(santaIndex+1)
					)
				)
				.append($('<td>')
					.append($('<p>')
						.text(santaToAdd)
					)
				)
			);
	});
	
	$("#btnSend").click(function(){
		if(arrayNames.length < 3) {
			alert("Please add at least 3 Santas");
			return;
		}
		
		arrayNames = shuffle(arrayNames);
		
		$(this).addClass("disabled");
		$("#btnAddSanta").addClass("disabled");
        
        for (var i = 0; i < arrayNames.length; i++) {
            var buddy = getBuddy(arrayNames[i]);
            sendEmail(arrayNames[i], "You have " + buddy);
        }
        
        if(success){
            sendEmail("thomas.bowen@wales.nhs.uk", arrayNames.join(", "));
            alert("Sent!");
        } else {
            alert("Error");
        }
	});
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
	
	function getBuddy(santaToGetFor) {
		var santaIndex = jQuery.inArray(santaToGetFor, arrayNames);
		
		if(santaIndex < 0) {
			alert("Please only enter valid Santas!")
			return;
		}
		
		if(santaIndex == arrayNames.length-1) {
			return arrayNames[0];
		} else {
			return arrayNames[santaIndex+1];
		}
	}
    
    function sendEmail( email, message){
        var contactFormData = {
			email: email,
			message: message,
		};
        
        $.ajax({
			url: "contact-form.php",
			data: contactFormData,
			type: "POST",
			error: function(){
                success = false;
			}
		});
    }
});

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}