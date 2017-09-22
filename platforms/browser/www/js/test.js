/**
 * global ajax error handling
 */
$(document).ajaxError(function(event, request, settings, error) {
  var httpStatusCode = request.getResponseHeader("status"); // It is worth noting that browsers report a status of 0 in case of XMLHttpRequest errors too. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
  var clientMsg = "Got error " + error + "\n on " + settings.type + " " + settings.url + "\n from app " + event.currentTarget.URL + " \n " + request.status + " " + request.statusText + " (" + httpStatusCode + ")";
  alert(clientMsg); //FIXME: remove, log
  console.log(clientMsg);
//$( "div div:jqmData(role=footer)" ).append( "<li><font color='red'>" + clientMsg + "</font></li>" );
});

/**
 * Respond to back/forward navigation
 */
$(window).on("navigate", function(event, data) {
  if (data.state.direction == "back") {
    // Make use of the directional information
    console.log("back to page=" + data.state.pageUrl);
    if (data.state.pageUrl == "add_mykid_page") {
      // back from "choose school" to "choose city": reset school
      client.chosenSchool = null;
      client.chosenSchoolId = null;
      client.chosenCity = null;
      client.chosenCityId = null;
      client.loadingSchools = null;
      client.loadingCities = false;
    }
  }
// reset state
});

/**
 * page navigation completed, on show page
 */
$(document).on('pageshow', 'div:jqmData(role="page")', function(event) {
  if (this.id == "add_mykid_page") {
    client.prepareMyKidPage();
  }
});

/* 
--------------------------- 
--- country_page --- 
--------------------------- 
*/

client.preparePage("country", "city", function(event) {
  client.saveEntity("country", "city", event.target.text);
  client.chosenCountry = event.target.text;
},
  function(event) {
    var added = $("#country_page div:jqmData(role=content) form table input").val();
    client.addEntity("country", "city", added);
    client.chosenCountry = event.target.text;
  }
);


/* 
--------------------------- 
--- city_page --- 
--------------------------- 
*/
//TODO: delete page, is inlined into add_mykid_page
client.preparePage("city", "school", function(event) {
  client.saveEntity("city", "school", event.target.text);
  client.chosenCity = event.target.text;
},
  function(event) {
    var added = $("#city_page div:jqmData(role=content) form table input").val();
    client.addEntity("city", "school", added);
    client.chosenCity = added;
  }
);


/* 
-------------------------- 
--- school_page --- 
-------------------------- 
*/

client.preparePage("school", "class", function(event) {
  client.saveEntity("school", "class", event.target.text);
  client.chosenSchool = event.target.text;
  client.chosenSchoolId = event.target.id;
},
  function(event) {
    var added = $("#school_page div:jqmData(role=content) form table input").val();
    client.addEntity("school", "class", added);
    client.chosenSchool = added;
    client.chosenSchoolId = event.target.id;
  }
);

/* 
-------------------------- 
--- class_page --- 
-------------------------- 
*/
client.preparePage("class", "member", function(event) {
  client.saveEntity("class", "member", event.target.text);
  client.chosenClass = event.target.text;
  // set title of subsequent pages (for next page, it has been set already in preparePage)
  $("#teacher_page div:jqmData(role=header) h1").text("Teachers of " + client.chosenClass);
  $("#student_page div:jqmData(role=header) h1").text("Students of " + client.chosenClass);
  $("#parent_page div:jqmData(role=header) h1").text("Parents of " + client.chosenClass);
},
  function(event) {
    var added = $("#member_page div:jqmData(role=content) form table input").val();
    client.addEntity("class", "member", added);
    client.chosenClass = added;
  //$("#member_page div:jqmData(role=header) h1").text(client.chosenClass); 
  }
);


/* 
--------------------------------
--- member_page (class home) --- 
-------------------------------- 
*/

$(document).on("pagecreate", "#member_page", function() {
  // clean and re-populate the list (TODO: connect again?)
  $("#member_page div:jqmData(role=content) ul").remove();
  $("#member_page div:jqmData(role=content) table").remove();
  var member_list = server.loadMembers();
  $("#member_page div:jqmData(role=content)").append(member_list);
  $("#member_page").trigger("create");

  $(".ui-icon-carat-r").click(function(event) {
    client.saveEntity("member", "profile_detail", event.target.text); //FIXME
    client.chosenRole = event.target.text; // for teacher|student|parent only

    if (client.isAddingClass) {
      // TODO: dropdown my role

    }
  });

});


/* 
-------------------------- 
--- parent_page --- 
-------------------------- 
*/
client.preparePage("parent", "profile_detail", function(event) {
  client.saveEntity("parent", "profile_detail", event.target.text);
  client.chosenPerson = event.target.text;
  setHeader(client.chosenPerson);
},
  function(event) {
    var added = $("#member_page div:jqmData(role=content) form table input").val();
    client.addEntity("parent", "add_member", added);
    client.chosenPerson = added; // TODO: invite person (send code by email/sms)
    setHeader(client.chosenPerson);
  }
);




/* 
-------------------------- 
--- teacher_page --- 
-------------------------- 
*/
client.preparePage("teacher", "profile_detail", function(event) {
  client.saveEntity("teacher", "profile_detail", event.target.text);
  client.chosenPerson = event.target.text;
  setHeader(client.chosenPerson);
},
  function(event) {
    var added = $("#member_page div:jqmData(role=content) form table input").val();
    client.addEntity("teacher", "add_member", added);
    client.chosenPerson = added;
    setHeader(client.chosenPerson);
  }
);


/* 
-------------------------- 
--- student_page --- 
-------------------------- 
*/
client.preparePage("student", "profile_detail", function(event) {
  client.saveEntity("student", "profile_detail", event.target.text);
  client.chosenPerson = event.target.text;
  setHeader(client.chosenPerson);
},
  function(event) {
    var added = $("#member_page div:jqmData(role=content) form table input").val();
    client.addEntity("student", "add_member", added);
    client.chosenPerson = added;
    setHeader(client.chosenPerson);
  }
);


/* 
-------------------------- 
--- add_member_page --- 
-------------------------- 
*/

$(document).on("pagecreate", "#add_member_page", function() {
  // clean and re-populate the list?
  $("#add_member_page div:jqmData(role=content) ul").remove();
  $("#add_member_page div:jqmData(role=content) table").remove();
  if (gap.isReady) {
    gap.findContacts();
  } else {
    alert("No access to contacts");
    var pageName = "add_member"; // + client.chosenRole;
    var addForm = client.loadFormAddEntityKeyValue(pageName, "profile_detail", "given name", "family name");
    $("#add_member_page div:jqmData(role=content)").append(addForm).trigger("create");
  }
  $(".ui-icon-carat-r").click(function(event) {
    client.saveEntity("member", "profile_detail", event.target.text);
    client.chosenPerson = event.target.text;
    client.chosenContactId = event.target.id;
    $("#profile_detail_page div:jqmData(role=header) h1").text(client.chosenPerson);
  //invite(client.chosenPerson, event.target.id);
  });
  $(".ui-icon-plus").click(function(event) {
    //var added = $("#add_" + pageName + "_form table input").val();
    //client.addEntity("member","profile_detail",added);
    //$("#profile_detail_page div:jqmData(role=header) h1").text(client.chosenPerson);
    //invite(client.chosenPerson, -1);
    client.chosenPerson = $("#add_" + pageName + "_key").val() + " " + $("#add_" + pageName + "_text").val();
    $("#profile_detail_page div:jqmData(role=header) h1").text(client.chosenPerson);
    if (!client.accessCode) {
      // user not yet authenticated
      $("#profile_detail_page div:jqmData(role=header) a").text = "That's me!";
    }
  });
});




/* 
--------------------------- 
--- add_mykid_page --- 
--------------------------- 
*/

client.prepareMyKidPage();

$(document).on("pagecreate", "#add_mykid_page", function() {

  //register validation for name
  $("#add_mykid_name").focus(function() {
    $('#add_mykid_name').next(".red").remove();
    $('#add_mykid_name').val("");
  });
  $("#add_mykid_name").blur(function() {
    var name = $('#add_mykid_name').val();
    if (name == undefined || name.replace(" ", "").length < 1) {
      //$('#add_mykid_name').color("Bitte hier den Namen eingeben");
      $('#add_mykid_name').after('<div class="red"><font color="red"> Bitte Name des Schülers eingeben</font></div>');
      $("#add_mykid_page #choose_add_mykid_city").hide();
    } else {
      $('#add_mykid_name').next(".red").remove();
      if (!client.loadingCities) {
        $('#add_mykid_name').next(".lade").remove();
        $("#add_mykid_page #choose_add_mykid_city").show();
      } else {
        $('#add_mykid_name').after('<div class="lade"><font color="lightblue">lade Orte ...</font></div>');
      }
      return true;
    }
  });
});




/* 
-------------------------- 
--- profile_detail_page --- 
-------------------------- 
*/
client.preparePage("profile_detail", "profile_detail", function(event) {
  client.saveEntity("profile_detail", "profile_detail", event.target.text);
}, function(event) {
  addProfileDetail(event);
});


function addProfileDetail(event) {
  var added = $("#profile_detail_page div:jqmData(role=content) form table input").val();
  client.addEntity("profile_detail", "profile_detail", added);
  $("#profile_detail_page div:jqmData(role=content) ul li:last").after("<li>" + added + "</li>");
  //$("#profile_detail_page div:jqmData(role=content) ul").refresh();
  // Force re-layouting. Tried refresh() on listview, 
  var searchBox = "#profile_detail_page div:jqmData(role=content) div form div input";
  $(searchBox).change();
  var addButton = $("#profile_detail_page div:jqmData(role=content) form div table input");
  addButton.val("");
}

$(document).on("pagecreate", "#profile_detail_page", function() {
  $("#invite_form").on("click", function() {
    invite();
  });
});

function invite() {
  var email = null;
  if (!client.chosenContactId) {
    //get email from profile_detail
    email = $("#profile_detail_email").text();
  // TODO: ask only if person has an email or phone in details but no code yet (=not identified)
  } else if (device.contacts[client.chosenContactId].emails) {
    email = device.contacts[client.chosenContactId].emails[0].value;
  }
  if (email) {
    var popup = $("#confirm_invite");
    if (client.getMyAccessCode() != null) {
      var question = "Invite " + client.chosenPerson + " to " + client.chosenRole + " into class " + client.chosenClass + "?";
    } else {
      var question = "To verify your email, send an access code to fam.reich@hotmail.com?";
    }
    popup.children("p").text(question);
    popup.show();
    popup.popup("open");
    $("#confirm_invite_yes").on("click", function() {
      alert("TODO: serverside genCode and send email to " + email + " on behalf of this user (me)");
      server.invite(client.chosenPerson, email, client.chosenRole, client.chosenClass);
    });

  }
}

function setHeader(person) {
  $("#profile_detail_page div:jqmData(role=header) h1").text(person);
  if (client.getMyAccessCode() == null) {
    $("#profile_detail_page div:jqmData(role=header) a").text("That's me!");
  }
}

/* 
-------------------------- 
--- homework_page --- 
-------------------------- 
*/
client.preparePage("homework", "homework_detail", function(event) {}, function(event) {});

/* 
-------------------------- 
--- homework_detail_page --- 
-------------------------- 
*/
client.preparePage("homework_detail", "homework_detail", function(event) {}, function(event) {});


/* 
-------------------------- 
--- help_page --- 
-------------------------- 
*/
client.preparePage("help", "help", function(event) {}, function(event) {});


/* 
-------------------------- 
--- home_page teacher  --- 
-------------------------- 
*/
client.preparePage("home", "member", function(event) {
  client.chosenClass = event.target.text;
  client.isAddingClass = false;
  // set title of subsequent pages (for next page, it has been set already in preparePage)
  $("#teacher_page div:jqmData(role=header) h1").text("Teachers of " + client.chosenClass);
  $("#student_page div:jqmData(role=header) h1").text("Students of " + client.chosenClass);
  $("#parent_page div:jqmData(role=header) h1").text("Parents of " + client.chosenClass);
},
  function(event) {
    client.isAddingClass = true;
  }
);

$(document).on("click", "#home_goto_me", function(event) {
  if (client.getMyAccessCode() == null) {
    //TODO: profile might not yet exist or is not known
  }
});


$(document).on("click", "#home_set_code_submit", function(event) {
  // access code entered
  if (client.getMyAccessCode() != null) {
    $("#home_set_code_div").hide();
    return;
  }
  var code1 = $("#home_set_code").val();

  var email = server.getEmailOfAccessCode(code1);
  if (email == "?") {
    alert("Sorry, try again. If you need help, contact us at opendata4ar@gmail.com");
    $("#home_set_code").val("");
  } else {
    client.setMe(email, code1); // authentication successful
    var content = server.loadMyClasses(code1);
    var main = client.fillContents("home");
    main.trigger("create");
    $("#home_set_code_div").hide();
    $("#home_goto_me").show();
  }
});



/* 
-------------------------- 
--- home_page parents  --- 
-------------------------- 
*/
client.prepareHomePageParents();






// Wait for device API libraries to load
gap.initialize();