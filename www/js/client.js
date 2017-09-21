/*
    device independent client side logic.
    Copyright by opendata4ar
 */
const kantone = new Array('?','zh','be','lu','ur','sz','ow','nw','gl','zg','fr','so','bs','bl','sh','ar','ai','sg','gr','ag','tg','ti','vd','vs','ne','ge','ju'); 

var client = {
 
    saveEntity: function(entity,next,selected) {
	  // alert("TODO: save user selection " + event.target.text);
	  var footer = $("#" + entity + "_page div:jqmData(role=footer)").text();
	  if (footer == null) { footer = "";}
	  $("#" + next + "_page div:jqmData(role=footer)").text(footer + " " + selected + " |");
	},
	
	
	addEntity: function(entity,next,selected) {
	  // alert("TODO: save insertion " + selected);
	  this.saveEntity(entity,next,selected);
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
	},
	
	
    loadFormAddEntityNoInput: function(entity, gotoPage, entityLabel) {
	  var form = ""; // add_mykid_page => add_city form
	  form += "<form id=add_" + entity + "_form method=post action=#URL# style='display: '><div class=ui-field-contain>";
	  form +=   "<table style=width:100%><tr><td>";
	  form +=     "<label for=add_" + entity + "_button>" + entityLabel + " hinzufügen</label>";
	  form +=   "</td><td align=right><a href=#" + gotoPage + "_page>";
	  form +=     "<input id=add_" + entity + "_button type=submit data-icon=plus data-iconpos=notext value=Submit/>"
	  form += "</a></td></table></div></form>";
	  return form;
	},
	
	loadFormAddEntitySingleInput: function(entity, gotoPage) {
	  var form = "";
	  form += "<form id='add_" + entity + "_form' method=post action=#URL#><div class=ui-field-contain>";
	  form +=   "<table style=width:100%><tr><td>";
	  form +=     "<input id='add_" + entity + "_text' type=text placeholder='" + entity + " hinzufügen'>";
	  form +=   "</td><td align=right><a href=#" + gotoPage + "_page>";
	  form +=     "<input type=submit data-icon=plus data-iconpos=notext value=Submit/>"
	  form += "</a></td></table></div></form>";
	  return form;
	},
	
	loadFormAddEntityKeyValue: function(entity, gotoPage, keyPlaceholder, valuePlaceholder) {
	  var form = "";
	  form += "<form id=add_" + entity + "_form method=post action=#URL#><div class=ui-field-contain>";
	  form +=   "<table style=width:100%><tr><td>";
	  form +=     "<input id='add_" + entity + "_key' type=text placeholder='add another " + keyPlaceholder + " here'></td><td>";
	  form +=     "<input id='add_" + entity + "_text' type=text placeholder='add another " + valuePlaceholder + " here'>";
	  form +=   "</td><td align=right><a href=#" + gotoPage + "_page>";
	  form +=     "<input type=submit data-icon=plus data-iconpos=notext value=Submit/>"
	  form += "</a></td></table></div></form>";
	  return form;
	},	
	
	addDeletePopup: function(page) {
	  var popup_html = "";
	  popup_html += "<div id=confirm_" + page + "_delete class=ui-content data-role=popup>";
      popup_html += "<p id=delete_" + page + "_question>Are you sure you want to delete?</p>";
      popup_html +=   "<div class=ui-grid-a><div class=ui-block-a>";
      popup_html +=       "<a id=confirm_" + page + "_delete_yes class='ui-btn ui-corner-all ui-mini ui-btn-a' data-rel=back>Yes</a>";
      popup_html +=     "</div><div class=ui-block-b>";
      popup_html +=       "<a id=confirm_" + page + "_delete_cancel class='ui-btn ui-corner-all ui-mini ui-btn-a' data-rel=back>Cancel</a>";
      popup_html +=     "</div>";
      popup_html +=   "</div>";
      popup_html += "</div>";
	  return popup_html;
	},
	
	fillContents: function(page) {
      if (page == "school") {
	    var content = server.load(page, client.chosenCityId);
      } else {
        var content = server.load(page, client.getMyAccessCode());
      }
		var main = $("#" + page + "_page div:jqmData(role=content)");
		var contentContainer = $("#" + page + "_page div:jqmData(role=content) #choose_" + page + "_list");
		if (contentContainer == undefined || contentContainer.length == 0) {
		  main.append(content).trigger("create");
		} else {
		  contentContainer.empty();
		  contentContainer.append (content).trigger("create");
		}
		return main;
	},
	
	fill: function(page, entity) {
		var content = server.load(entity, client.getMyAccessCode());
		var main = $("#" + page + "_page div:jqmData(role=content)");
		$("#add_mykid_page #add_city_form").hide();
		return main;
	},
	
	applyCities: function( citiesAsJson ) {
		console.log( "... loaded " + citiesAsJson.length + " cities");
		//var citiesRaw = JSON.stringify(citiesAsJson);
        //console.debug(citiesRaw);
      	// convert to <li> (here because is also required by local db)
      	// from [{"id":2761,"label":"Aesch (BL)","kanton_id":13},{"id":2769,"label":"Münchenstein","kanton_id":13}]
      	// to   <li><a href=#school_page>Burgdorf<span class=ui-li-count> 6</span></a></li>
      	var citiesListView = "<ul id=choose_add_mykid_list data-role=listview data-filter=true data-inset=true data-autodividers=true data-input=#choose_add_mykid>";
      	
      	for (var i=0,  len=citiesAsJson.length; i < len; i++) {
      	  var cityName = citiesAsJson[i].label;
      	  var kt = kantone[citiesAsJson[i].kanton_id].toUpperCase();
      	  citiesListView += "<li data-filtertext='" + cityName + "'><a id=" + citiesAsJson[i].id + " href=#school_page><img src=./res/icon/kantone/" + kt + ".png  alt=" + kt + " class=ui-li-icon>" + cityName + "</a></li>";
      	}
      	citiesListView += "</ul>";

      	var main = $("#city_page div:jqmData(role=content)");
  		var contentContainer = $("#add_mykid_page div:jqmData(role=content) #choose_add_mykid_list").parent();
        $("#add_mykid_page #choose_add_mykid_city").show();
  		if (contentContainer == undefined || contentContainer.length == 0) {
  		  main.append(citiesListView).trigger("create");
  		} else {
  		  contentContainer.empty(); // be careful not to delete search!
  		  contentContainer.append (citiesListView).trigger("create");
  		}
        client.loadingCities = false;
        $('#add_mykid_name').next(".lade").remove();
    },
    
    formatSchoolName: function (schoolName) {
      //TODO: delete me, not in use
      shorthand = schoolName.replace("Schulhaus ","");
      shorthand = shorthand.replace("Volksschule ","");
      shorthand = shorthand.replace("Schulzentrum ","");
      shorthand = shorthand.replace("Schulhäuser ","");
      
      if (shorthand.startsWith("Kindergarten ")) {
        shorthand = shorthand.substring(13) + " (Kindergarten)";
      }
      if (shorthand.startsWith("Primarschule ")) {
        shorthand = shorthand.substring(13) + " (Primar)";
      }
      if (shorthand.startsWith("Sekundarschule ")) {
        shorthand = shorthand.substring(15) + " (Sek.)";
      }
      if (shorthand.startsWith("Sekundarstufe ")) {
        shorthand = shorthand.substring(14) + " (Sek.)";        
      }
      if (shorthand.startsWith("Oberstufenschule ")) {
        shorthand = shorthand.substring(17) + " (Oberstufe)";                
      }
      if (shorthand.startsWith("Oberstufenzentrum ")) {
        shorthand = shorthand.substring(18) + " (Oberstufe)";                        
      }
      if (shorthand.startsWith("Schule ")) {
        shorthand = shorthand.substring(7);
      }
      return shorthand;
    },
      
    applySchools: function( schoolsAsJson ) {
      var end = Date.now();
      console.log(new Date().toISOString() + "... loaded " + schoolsAsJson.length + " schools in " + (end - client.loadingSchools) + " ms");
      //var schoolsRaw = JSON.stringify(schoolsAsJson);
      //console.debug(schoolsRaw);
      // convert to <li> (here because is also required by local db)
      // from [{"id":5475,"label":"Schule Heiligenschwendi","kind":"Total Schule","city_id":927,"kanton_id":2,"validTo":null},{"id":5476,"label":"Schule Heiligenschwendi","kind":"Vorschulstufe","city_id":927,"kanton_id":2,"validTo":null},{"id":5477,"label":"Schule Heiligenschwendi","kind":"Primarstufe","city_id":927,"kanton_id":2,"validTo":null}]
      // to   <li><a href=#class_page>Primarschule Dorf<span class=ui-li-count> 2</span></a></li>
   
      var schoolListView = "<ul id=choose_school_list data-role=listview data-filter=true data-inset=true data-autodividers=true data-input=#choose_school>";
      var prevSchoolName = "";
      for (var i=0,  len=schoolsAsJson.length; i < len; i++) {
        var schoolName = schoolsAsJson[i].label;
        if (prevSchoolName != schoolName) {
          // hide "duplicates"
          var schoolId = schoolsAsJson[i].id;
          var kt = kantone[schoolsAsJson[i].kanton_id].toUpperCase();
          //var schoolNameShort = client.formatSchoolName(schoolName);
          schoolListView += "<li data-filtertext='" + schoolName + "'>";
          schoolListView += "<a id=" + schoolId + " href=#class_page><img src=./res/icon/kantone/" + kt + ".png alt=" + kt + " class=ui-li-icon>"
          schoolListView += schoolName + "</a></li>";
          prevSchoolName = schoolName;
        }
      }
      schoolListView += "</ul>";

      var main = $("#school_page div:jqmData(role=content)");
      var contentContainer = $("#school_page div:jqmData(role=content) #choose_school_list").parent();
      //??? $("#add_mykid_page #choose_add_mykid_city").show();
      if (contentContainer == undefined || contentContainer.length == 0) {
        main.append(schoolListView).trigger("create");
      } else {
        contentContainer.empty(); // be careful not to delete search!
        contentContainer.append (schoolListView).trigger("create");
      }
      client.loadingSchools = false;
      //??? $('#add_mykid_name').next(".lade").remove();
  },
    
	
	
	preparePage: function(page, next, drilldownCallback, addItemCallback) {
	  $( document ).on( "pagecreate", "#" + page + "_page", function() {
	    
	    if (page == "school") {
          client.loadingSchools = Date.now(); //FIXME move elsewhere
	    }
		var main = client.fillContents(page);
		
		var addForm = $("#" + page + "_page div:jqmData(role=content) #add_" + page + "_form");
		addForm.remove();
		// TODO: refactor
	    if (page == "startp") {
		  var addForm = client.loadFormAddEntityNoInput("mykid", "add_mykid", "Schüler");
	    } else if (page == "home") {
	      var addForm = client.loadFormAddEntityNoInput("home", "country", "class");
	    } else if (page == "add_mykid") {
			var addForm = client.loadFormAddEntityNoInput("city", "add_mykid", "Schulgemeinde");
			if (client.getMyEmail() == undefined) {
				addForm = addForm.replace("style='display: '", "style='display: none'"); // hide, all cities are shown anyway
			}
		} else if (page == "profile_detail") {
		  var addForm = client.loadFormAddEntityKeyValue(page, next, "detail", "value");
		} else if (page == "student" || page == "teacher" || page == "parent") {
		  var addForm = client.loadFormAddEntityNoInput(page, "add_member", page);
		} else if (page == "member" || page == "help" || page == "homework_detail") {
		  var addForm = "<div/>";
		} else {
		  var addForm = client.loadFormAddEntitySingleInput(page, next);
		}
	    
	    main.append(addForm).trigger( "create" );
	 
	    // drill down
	    if (next != null) {
	      $.fn.ignore = function(sel){
		    	  return this.clone().find(sel||">*").remove().end();
		    	};
		  $( document ).on("click","#" + page + "_page .ui-icon-carat-r",function(event) {
			drilldownCallback(event);
			// Set title of next page
		    $("#" + next + "_page div:jqmData(role=header) h1").ignore("span").text(event.target.text); 
		    
	      });
		}
		// add
		$(".ui-icon-plus").click(function(event) {
		  $("#" + next + "_page div:jqmData(role=header) h1").ignore("span").text(event.target.text); 
		  addItemCallback(event);
	    });
		
		
		// Swipe to remove list item
		//var html = client.addDeletePopup(page);
		//$("#" + page + "_page div:jqmData(role=content)").after(html);
		//$("#" + page + "_page div:jqmData(role=popup)").hide();
		$( document ).on( "swipeleft", "#" + page + "_page li", function( event ) {
            if (page == "student" || page == "teacher" || page == "parent" || page == "profile_detail" || page == "homework") {
			  //var transition = $.support.cssTransform3d ? "left" : false;
		      var li = $( this ); 
		      client.confirmAndDelete(page, li, false );
			}
        });
		  
		
		if (page == "home") {
		  if (client.getMyAccessCode() != null) {
		    // hide access code form
			$("#home_set_code_div").hide();
		  }

		}
	  });
	},
	
	prepareHomePageParents: function() {
	  var page ="startp";
	  var next = "add_mykid";
	  client.preparePage(page, next,
		function(event) {
			//TODO set title of subsequent pages (for next page, it has been set already in preparePage)		
		  }, 
		  function(event) {}
		);
		
		$( document ).on ("click","#reset", function(event) {
		    // "reset" button clicked (dev only)
			alert("You loose all your data when clicking OK! Contact us at opendata4ar@gmail.com");
			client.reset();
		    $("#startp_set_code").val("");
			var main = client.fillContents("startp");
			$("#startp_set_code_div").show();
			$("#add_mykid_page #add_city_form").hide();
			$("#startp_search").hide(); // leer = keine suche
			main.trigger( "create" );
		});
		
		$( document ).on ("click","#startp_set_code_submit", function(event) {
		  // access code entered
		  if (client.getMyAccessCode() != null) {
		    $("#startp_set_code_div").hide();
			$("#startp_search").show(); // suche anzeigen
			return;
		  }
		  var code1 = $("#startp_set_code").val();	
		  var email = server.getEmailOfAccessCode(code1);
		  if (email == "?") {
			alert("Sorry, try again. If you need help, contact us at opendata4ar@gmail.com");
			$("#startp_set_code").val("");
		  } else {
			client.setMe(email, code1); // authentication successful
			var content = server.loadMyKids(code1);
			var main = client.fillContents("startp");
			main.trigger( "create" );
			$("#startp_set_code_div").hide();
			$("#add_mykid_page #add_city_form").show();
			$("#startp_search").show(); // suche anzeigen
		  }
		});
	},
	
	prepareMyKidPage: function() {
	    var page ="add_mykid";
	    var next = "school";
        client.loadingCities = false;
	    client.preparePage(page, next,
	    function(event) {
		  // drilldown into school

	      // remember kid's name and city chosen
		  client.chosenCity = event.target.text;
          client.chosenCityId = event.target.id;
		  client.chosenKid = $("#add_mykid_name").val();
	      client.saveEntity("mykid","city", client.chosenKid);
	      client.saveEntity("city","school", event.target.text);
	      $("#school_page div:jqmData(role=header) h1").text(client.chosenKid + "'s Schule");
	      
	    },
		function(event) {
		  // addItemCallback show all cities
	      client.loadingCities = true;
	      client.fill("add_mykid", "city"); //show all cities
		  $("#add_mykid_page #add_city_form").hide();		  
	    });
	},
	
	confirmAndDelete: function(page, listitem, transition ) {
        // Highlight the list item that will be removed
        listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
		var popup = $("#confirm_" + page + "_delete");
        // Inject li text in confirmation popup after removing any previous injected content
		$("#delete_" + page + "_question").empty();
		$("#delete_" + page + "_question").html("<p> Remove " + listitem.text() + " from " + page + "?</p>");
		popup.show();
		popup.popup( "open" );
        // Proceed when the user confirms
        $("#confirm_" + page + "_delete_yes").on( "click", function() {
            // Remove with a transition
            if ( transition ) {
                listitem
                    // Add the class for the transition direction
                    .addClass( transition )
                    // When the transition is done...
                    .on( "webkitTransitionEnd transitionend otransitionend", function() {
                        // ...the list item will be removed
						var list = listitem.parent();
                        listitem.remove();
                        // ...the list will be refreshed and the temporary class for border styling removed
                        list.listview( "refresh" ).find( ".border-bottom" ).removeClass( "border-bottom" );
                    })
                    // During the transition the previous button gets bottom border
                    .prev( "li" ).children( "a" ).addClass( "border-bottom" )
                    // Remove the highlight
                    .end().end().children( ".ui-btn" ).removeClass( "ui-btn-active" );
            }
            // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
            else {
                var list = listitem.parent();
				// TODO save user deletion
				listitem.remove();
                list.listview( "refresh" ); //FIXME
				var searchBox = $("#" + page + "_page div:jqmData(role=content) div form div input");
			    searchBox.change();
            }
        });
        // Remove active state and unbind when the cancel button is clicked
        $("#confirm_home_delete_cancel" ).on( "click", function() {
            listitem.children( ".ui-btn" ).removeClass( "ui-btn-active" );
            $("#" + page + "_page div:jqmData(role=popup) #yes" ).off();
        });
		
    },
	
	setMe: function(myEmail, accessCode) {
	  window.localStorage.setItem("email",myEmail);
	  window.localStorage.setItem("accessCode",accessCode);
	},
	
	getMyEmail: function() {
	  return window.localStorage.getItem("email");
	},
	
	getMyAccessCode: function() {
	  return window.localStorage.getItem("accessCode");
	}, 
	
	reset: function() {
	  window.localStorage.clear();
	}
};
