/**
 * start page for parents
 */



var startp = {

  addMyKid: function() {
    console.log("Schüler hinzufügen");
  },
  
  name:function() {
    return "startp";
  },
  
  nextPage: function() {
    return "add_mykid";  
  },
  
  addFormId: function() {
    return "add_mykid";  
  },
  
  onInit: function() {
    console.log("init " + this.name());
    // register action listeners
    $("#" + this.nextPage() + "_btn");
  },

  
  prepareHomePageParents : function() {
    var page = "startp";
    var next = "add_mykid";
    client.preparePage(page, next,
      function(event) {
        //TODO set title of subsequent pages (for next page, it has been set already in preparePage)    
      },
      function(event) {}
    );

    $(document).on("click", "#reset", function(event) {
      // "reset" button clicked (dev only)
      alert("You loose all your data when clicking OK! Contact us at opendata4ar@gmail.com");
      client.reset();
      $("#startp_set_code").val("");
      var main = client.fillContents("startp");
      $("#startp_set_code_div").show();
      $("#add_mykid_page #add_city_form").hide();
      $("#startp_search").hide(); // leer = keine suche
      main.trigger("create");
    });

    $(document).on("click", "#startp_set_code_submit", function(event) {
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
        main.trigger("create");
        $("#startp_set_code_div").hide();
        $("#add_mykid_page #add_city_form").show();
        $("#startp_search").show(); // suche anzeigen
      }
    });
  }
 
};