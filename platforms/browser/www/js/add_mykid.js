/**
 * start page for parents
 */



var addMyKid = {

  addCity: function() {
    console.log("alle Schulgemeinden anzeigen");
  },
  
  name:function() {
    return "add_mykid";
  },
  
  nextPage: function() {
    return "school";  
  },
  
  addFormId: function() {
    return "add_city";  
  },
  
  onInit: function() {
    console.log("init " + this.name());
    // register action listeners
    $("#" + this.nextPage() + "_btn");
  },
  
  applyCities : function(citiesAsJson) {
    console.log("... loaded " + citiesAsJson.length + " cities");
    //var citiesRaw = JSON.stringify(citiesAsJson);
    //console.debug(citiesRaw);
    // convert to <li> (here because is also required by local db)
    // from [{"id":2761,"label":"Aesch (BL)","kanton_id":13},{"id":2769,"label":"Münchenstein","kanton_id":13}]
    // to   <li><a href=#school_page>Burgdorf<span class=ui-li-count> 6</span></a></li>
    var citiesListView = "<ul id=choose_add_mykid_list data-role=listview data-filter=true data-inset=true data-autodividers=true data-input=#choose_add_mykid>";

    for (var i = 0, len = citiesAsJson.length; i < len; i++) {
      var cityName = citiesAsJson[i].label;
      var kt = kantone[citiesAsJson[i].kanton_id].toUpperCase();
      citiesListView += "<li data-filtertext='" + cityName + "'><a id=" + citiesAsJson[i].id + " href=#school_page><img src=./res/icon/kantone/" + kt + ".png  alt=" + kt + " class=ui-li-icon>" + cityName + "</a></li>";
    }
    citiesListView += "</ul>";

    var main = $("#city_page div:jqmData(role=content)");
    var contentContainer = $("#add_mykid_page div:jqmData(role=content) #choose_add_mykid_list").parent();
    var name = $('#add_mykid_name').val();
    if (name != undefined && name.replace(" ", "").length > 0) {
      $("#add_mykid_page #choose_add_mykid_city").show();
    }
    if (contentContainer == undefined || contentContainer.length == 0) {
      main.append(citiesListView).trigger("create");
    } else {
      contentContainer.empty(); // be careful not to delete search!
      contentContainer.append(citiesListView).trigger("create");
    }
    client.loadingCities = false;
    $('#add_mykid_name').next(".lade").remove();
  },

  
  prepareMyKidPage : function() {
    var page = "add_mykid";
    var next = "school";
    client.loadingCities = false;
    client.preparePage(page, next,
      function(event) {
        // drilldown into school

        // remember kid's name and city chosen
        client.chosenCity = event.target.text;
        client.chosenCityId = event.target.id;
        client.chosenKid = $("#add_mykid_name").val();
        client.saveEntity("mykid", "city", client.chosenKid);
        client.saveEntity("city", "school", event.target.text);
        $("#school_page div:jqmData(role=header) h1").text(client.chosenKid + "'s Schule");

      },
      function(event) {
        // addItemCallback show all cities
        client.loadingCities = true;
        client.fill("add_mykid", "city"); //show all cities
        $("#add_mykid_page #add_city_form").hide();
      });
  }
 
};