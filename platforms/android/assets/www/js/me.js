/*
	client side state logic about user and his/her kids.
    Copyright by opendata4ar
 */
 
var me = {	
	
	authenticate: function(page, codeEntered) {			
	  var email = server.getEmailOfAccessCode(codeEntered);
	  if (email == "?") {
	    alert("Sorry, try again. If you need help, contact us at opendata4ar@gmail.com");
		$("#home_set_code").val("");
		$("#profile_detail_set_code").val("");
		return false;
	  } else { 
	    // authentication successful
        if (client.chosenRole != "Students") {
	      // Me
		  me.setMe(client.chosenPersonId, email, codeEntered);
	    } else {
		  me.addMyKid(email, codeEntered);    
	    }
        if (page == "home") {
		  // reload content
		  var main = client.loadContentFromServer("home", me.getMyId());
		  main.trigger( "create" );
		}
		$("#home_set_code_div").hide();
		$("#profile_detail_set_code_div").hide();
		$("#home_goto_me").show();
	  }
	},
	
	isAuth: function() {
	  return me.getMyAccessCode() != null;
	},
	
	isMeOrMyKids: function(email) {
	  if (me.getMyEmail() == email) {
	    return true;
	  }
	  // is email in list of kids emails?
	  var list = me.getMyKidsEmail();
	  if (list == null) {
	    return false;
	  }
	  list = list.replace(email, "");
	  return me.getMyKidsEmail() != list;
	},
	
	setMe: function(personId, myEmail, accessCode) {
	  window.localStorage.setItem("myId", personId);
	  window.localStorage.setItem("myEmail", myEmail);
	  window.localStorage.setItem("myAccessCode", accessCode);
	},
	
	// FIXME might be null if set from home page: Fix by lookup id
	getMyId: function() {
	  return window.localStorage.getItem("myId");
	},
	
	getMyEmail: function() {
	  return window.localStorage.getItem("myEmail");
	},
	
	getMyAccessCode: function() {
	  return window.localStorage.getItem("myAccessCode");
	}, 
	
	getMyKidsAccessCode: function() {
	  return window.localStorage.getItem("myKidsAccessCode");
	}, 
	
	getMyKidsEmail: function() {
	  return window.localStorage.getItem("myKidsEmail");
	}, 
	
	addMyKid: function(myKidsEmail, myKidsAccessCode) {
	  //TODO: handle update of email properly
	  var emails = me.getMyKidsEmail();
	  if (emails != null) {
	    emails = emails + " " + myKidsEmail;
	  } else {
	    emails = myKidsEmail;
	  }
	  var codes = me.getMyKidsAccessCode();
      if (codes != null) {
       codes = codes + " " + myKidsAccessCode;
	  } else {
	    codes = myKidsAccessCode;
	  }
	  window.localStorage.setItem("myKidsEmail", emails);
	  window.localStorage.setItem("myKidsAccessCode",codes);
	},
	
	reset: function() {
	  window.localStorage.clear();
	}
	
};
