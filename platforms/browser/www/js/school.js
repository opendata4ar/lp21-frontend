

var schoolPage = {

  addSchool: function() {
    console.log("Schule hinzufügen");
  },
  
  name:function() {
    return "school";
  },
  
  nextPage: function() {
    return "class";  
  },
  
  addFormId: function() {
    return "add_school";  
  },
  
  onInit: function() {
    console.log("init " + this.name());
    // register action listeners
    $("#" + this.nextPage() + "_btn");
  },
  
  preparePage: function() {
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
    
    $(document).on("click", "#add_school_btn", function(event) {
      // "add school" button clicked
      var searched = $("#" + schoolPage.name() + "_page #choose_school").val();
      console.log("add school, search=" + searched);
      $("#add_school_name").val(searched);
      
      $("#add_school_div").show();
      $("#save_school_btn").show();
      $("#add_school_btn").hide();
      $("#choose_school_search").hide();
      $("#add_school_form").hide();
      $("#add_school_div").trigger("create");
    });
    
    $(document).on("click", "#save_school_btn", function(event) {
      var name = $("#add_school_name").val();
      console.log("save school =" + name);        
    });
  },
  
  
  formatSchoolName : function(schoolName) {
    //TODO: delete me, not in use
    var shorthand = schoolName.replace("Schulhaus ", "");
    shorthand = shorthand.replace("Volksschule ", "");
    shorthand = shorthand.replace("Schulzentrum ", "");
    shorthand = shorthand.replace("Schulhäuser ", "");

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

  applySchools : function(schoolsAsJson) {
    var end = Date.now();
    console.log(new Date().toISOString() + "... loaded " + schoolsAsJson.length + " schools in " + (end - client.loadingSchools) + " ms");
    //var schoolsRaw = JSON.stringify(schoolsAsJson);
    //console.debug(schoolsRaw);
    // convert to <li> (here because is also required by local db)
    // from [{"id":5475,"label":"Schule Heiligenschwendi","kind":"Total Schule","city_id":927,"kanton_id":2,"validTo":null},{"id":5476,"label":"Schule Heiligenschwendi","kind":"Vorschulstufe","city_id":927,"kanton_id":2,"validTo":null},{"id":5477,"label":"Schule Heiligenschwendi","kind":"Primarstufe","city_id":927,"kanton_id":2,"validTo":null}]
    // to   <li><a href=#class_page>Primarschule Dorf<span class=ui-li-count> 2</span></a></li>

    var schoolListView = "<ul id=choose_school_list data-role=listview data-filter=true data-inset=true data-autodividers=true data-input=#choose_school>";
    var prevSchoolName = "";
    for (var i = 0, len = schoolsAsJson.length; i < len; i++) {
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
      contentContainer.append(schoolListView).trigger("create");
    }
    client.loadingSchools = false;
  //??? $('#add_mykid_name').next(".lade").remove();
  }

};