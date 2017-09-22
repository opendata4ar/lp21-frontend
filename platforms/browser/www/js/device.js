/*
    potentially device specific client side logic.
    Copyright by opendata4ar
 */
var gap = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
	
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
    // deviceready Event Handler
    //
    onDeviceReady: function() {
        gap.receivedEvent('deviceready');
    },
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		if (navigator.contacts == null) {
		  console.log("no access to device(" + navigator + ")");
		}
        console.log('Received Event: ' + id);
		gap.isReady = true;
		html5sql.openDatabase("myclass.opendata4ar@gmail.com", "MyClass", 100000); //FIXME: update populate and remove test data	    
		html5sql.process(ddl, function() { console.log("populate: success");},function(error) { alert("populate failed " + error); });
    },
	
	// Called when a photo is successfully retrieved
    //
    onCameraSuccess: function(imageURI) {
	  var forImgTagId = "profilePic1";
	  // alert("imageURI="+imageURI+" forImgTagId="+forImgTagId);
      // Get image handle, unhide <img>, set src=
      var img = document.getElementById(forImgTagId);
      img.style.display = 'block';
      img.src = imageURI;
    },
	
	// Use camera to take a snapshot
    //
    capturePhoto: function() {
	  alert("use landscape for camera");
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(this.onCameraSuccess, this.onCameraError, { quality: 20,
        destinationType: navigator.camera.DestinationType.FILE_URI  });
    },

    // Use Photo library to get a picture
    //
    getPhoto: function(forImgTagId) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(this.onCameraSuccess, this.onCameraError, { quality: 20,
      destinationType: navigator.camera.DestinationType.FILE_URI ,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
    },

    // Called if camera does not return an image (e.g. user cancels).
    //
    onCameraError: function(message) {
	  /*
	  iOS Quirks
      Including a JavaScript alert() in either of the callback functions can cause problems. Wrap the alert within a setTimeout() to allow the iOS image picker or popover to fully close before the alert displays:
      */
	  setTimeout(function() {
        alert("Failed to insert picture (" + message + "). If you think this is shouldn't have happened, please contact us at opendata4ar@gmail.com. Thank you.");
      }, 0);
    },
	// removes profilePic1
	//
	removePhoto: function() {
	  var forImgTagId = "profilePic1";
	  var img2del = document.getElementById(forImgTagId);
	  img2del.style.display = 'none';
      img2del.src = null;
	},
	// search in contacts
	//
	findContacts: function() {
		alert("TODO: OK to access contacts? " + navigator.contacts);
	
		var options = new ContactFindOptions();
        options.filter = "Hub"; //FIXME
		options.multiple=true;
        var fields = ["displayName", "emails", "phoneNumbers", "name"];
        navigator.contacts.find(fields, this.onContactSuccess, this.onContactError, options);
	},
    // Failed to get the contacts
	//
    onContactError: function(message) {
        alert("Failed to read contacts (" + message + "). If you think this is shouldn't have happened, please contact us at opendata4ar@gmail.com. Thank you.");
		//TODO: init empty <ul> & add button as in successful case
    },       
    // Called when contacts are accessible
	//
    onContactSuccess: function(contacts) {
	  alert("got " + contacts.length + " contacts matching Hub"); //FIXME
	  device.contacts = contacts;
	  var contact_list = "";
      contact_list += "<ul data-role=listview data-filter=true data-filter-reveal=false data-inset=true data-autodividers=true data-input=#choose_invite>";
      
	  for (var i = 0; i < contacts.length; i++) {
		var contactVal = client.getContactLabel(contacts[i]);
		if (contactVal != null) {
		  contact_list += "<li id=contact_+" + i + "><a id=contact__+" + i + " href=#profile_detail_page>" + contactVal + "</a></li>";
		}		
	  }
	  
      contact_list += "</ul>";
      $("#add_member_page div:jqmData(role=content)").append (contact_list);
	  
	  var add_non_contact = client.loadFormAddEntitySingleValue("add_member","profile_detail","email");
	  $("#add_member_page div:jqmData(role=content)").append (add_non_contact).trigger( "create" );
	},
	// 
	//
	getContactLabel: function(contact) {
	        // ! checks for undefined: if(typeof variable_here === 'undefined')
			if (!contact) { return null; }
			if (!contact.displayName) {
			  // no displayName
			  if (!contact.name) {
			    // no name
				  if (contact.emails) {
				    // no email
				      if (contact.phoneNumbers) {
				        // no phoneNumbers
					    // skip contact
						return null;
				      } else {
					    // fallback to phoneNo
					    return contact.phoneNumbers[0].value;
				      }					  
				  } else {
				  // fallback to email
				  return contact.emails[0].value;
				} 
			  } else {
			    if (!contact.name.formatted) {
				  // fallback to given name and family name
				  var val = null;
				  if (contact.name.givenName) {
				    val = contact.name.givenName + " ";
				  }
				  if (contact.name.familyName) {
				    val += contact.name.familyName;
				  } 
				  return val;
				} else {
				  // fallback to name.formatted
				  return contact.name.formatted;
				}
			  } 
			} else {
			  return contact.displayName;
			}
	}
};
