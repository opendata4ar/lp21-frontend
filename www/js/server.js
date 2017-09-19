/*
    to-be server side logic delivering DOM fragments, usually <ul>.
	Copyright by opendata4ar
 */
var server = {

    load: function(entity, accessCode) {
	  if (entity == "startp") {
	    return this.loadMyKids(accessCode);
	  } else if (entity == "home") {
		return this.loadMyClasses(accessCode);
	  } else if (entity == "country") {
	    return this.loadCountries();
	  } else if (entity == "city") {
	    return this.loadCities();
	  } else if (entity == "add_mykid") {
		return this.loadMyCities(accessCode);
	  } else if (entity == "school") {
	    return this.loadSchools();
	  } else if (entity == "class") {
	    return this.loadClasses();
	  } else if (entity == "member") {
	    return this.loadMembers();
	  } else if (entity == "teacher") {
	    return this.loadTeachers();
	  } else if (entity == "student") {
	    return this.loadStudents();
	  } else if (entity == "parent") {
	    return this.loadParents();
	  } else if (entity == "profile_detail") {
	    return this.loadProfile();
	  } else if (entity == "homework") {
	    return this.loadHomework();
	  } else if (entity == "homework_detail") {
	    return this.loadHomeworkDetail();
	  } else if (entity == "help") {
	    return this.loadHelp();
	  }
	},

  	loadCountries: function() {
	  var country_list = "";
      country_list += "<ul data-role=listview data-filter=true data-inset=true data-autodividers=true data-input=#choose_country>";
      country_list +=   "<li><a href=#city_page><img src=img/countries/Switzerland.png alt=CH class=ui-li-icon>Schweiz</a></li>";
      country_list +=   "<li><a href=#city_page><img src=img/countries/Switzerland.png alt=CH class=ui-li-icon>Suisse<span class=ui-li-count> 25</span></a></li>";
      country_list +=   "<li><a href=#city_page><img src=img/countries/Switzerland.png alt=CH class=ui-li-icon>Svizzera</a></li>";
      country_list +=   "<li><a href=#city_page><img src=img/countries/Switzerland.png alt=CH class=ui-li-icon>Switzerland</a></li>";
      country_list += "</ul>";
      return country_list;
	},
	
	
	loadCities: function() {
	  var city_list = "";
      city_list += "<ul data-role=listview data-filter=true data-inset=true data-autodividers=true data-input=#choose_city>";
      city_list +=   "<li><a href=#school_page>Bern</a></li>";
      city_list +=   "<li><a href=#school_page>Burgdorf<span class=ui-li-count> 6</span></a></li>";
      city_list +=   "<li><a href=#school_page>Jegenstorf</a></li>";
      city_list +=   "<li><a href=#school_page>Uster</a></li>";
      city_list +=   "<li><a href=#school_page>Dürnten</a></li>";
      city_list += "</ul>";
      return city_list;
	},
	
	
	loadSchools: function() {
	  var school_list = "";
      school_list += "<ul data-role=listview data-filter=true data-inset=true data-autodividers=true data-input=#choose_school>";
      school_list +=   "<li><a href=#class_page>Primarschule Breiti</a></li>";
      school_list +=   "<li><a href=#class_page>Primarschule Dorf<span class=ui-li-count> 2</span></a></li>";
      school_list +=   "<li><a href=#class_page>Kanti</a></li>";
      school_list += "</ul>";
      return school_list;
	},
	
	
	loadClasses: function() {
	  var class_list = "";
      class_list += "<ul data-role=listview data-filter=true data-filter-reveal=false data-inset=true data-autodividers=true data-input=#choose_class>";
      class_list +=   "<li><a href=#member_page>1a (Fr. Grütter)</a></li>";
      class_list +=   "<li><a href=#member_page>1b (Fr. Menzi)<span class=ui-li-count> 21</span></a></li>";
      class_list +=   "<li><a href=#member_page>2a (Hr. Ulrich)</a></li>";
      class_list +=   "<li><a href=#member_page>2b (Fr. Vanza)</a></li>";
	  class_list +=   "<li><a href=#member_page>3a</a></li>";
	  class_list +=   "<li><a href=#member_page>3b (Hr. Hof)</a></li>";
	  class_list +=   "<li><a href=#member_page>4a</a></li>";
      class_list +=   "<li><a href=#member_page>4b</a></li>";
	  class_list +=   "<li><a href=#member_page>5a</a></li>";
	  class_list +=   "<li><a href=#member_page>5b</a></li>";
	  class_list +=   "<li><a href=#member_page>6a</a></li>";
      class_list +=   "<li><a href=#member_page>6b</a></li>";
      class_list += "</ul>";
      return class_list;
	},
	
	
	loadMembers: function() {
	  var member_list = "";
      member_list += "<ul data-role=listview data-filter=true data-inset=true data-input=#choose_member>";
      member_list +=   "<li data-role=list-divider>People</li>";
	  member_list +=   "<li><a href=#teacher_page>Teachers</a></li>";
      member_list +=   "<li><a href=#student_page>Students</a></li>";
      member_list +=   "<li><a href=#parent_page>Parents</a></li>";  
	  member_list +=   "<li data-role=list-divider>Upcoming</li>";
	  member_list +=   "<li><a href=#homework_page>Homework</a></li>";
	  member_list +=   "<li><a href=#exam_page>Exams</a></li>";
	  member_list +=   "<li><a href=#event_page>Events</a></li>";
	  member_list +=   "<li data-role=list-divider>Info</li>";
	  member_list +=   "<li><a href=#schedule_page>School</a></li>";
	  member_list +=   "<li><a href=#schedule_page>Schedule</a></li>";
	  member_list +=   "<li><a href=#mark_page>Marks</a></li>";
      member_list +=   "<li data-role=list-divider>Community</li>";
      member_list +=   "<li><a href=#publication_page>Publications</a></li>";
      member_list +=   "<li><a href=#discuss_page>Discussions</a></li>";
      member_list +=   "<li><a href=#news_page>News</a></li>";
	  member_list += "</ul>";
      return member_list;
	},
	
	
	loadParents: function() {
	  var member_list = "";
      member_list += "<ul data-role=listview data-filter=true data-autodividers=true data-inset=true data-input=#choose_parent>";
	  member_list +=   "<li><a href=#profile_detail_page>Anna Gutweniger</a></li>";
	  member_list +=   "<li><a href=#profile_detail_page>Ueli Meier</a></li>";
	  member_list +=   "<li><a href=#profile_detail_page>Eva Wettstein</a></li>";
      member_list +=   "<li><a href=#profile_detail_page>Maria Graber</a></li>";
      member_list += "</ul>";
      return member_list;
	},
	
	
	
	loadTeachers: function() {
	  var member_list = "";
      member_list += "<ul data-role=listview data-filter=true data-autodividers=true data-inset=true data-input=#choose_teacher>";
	  member_list +=   "<li><a href=#profile_detail_page>Jürg Hof</a></li>";
      member_list +=   "<li><a href=#profile_detail_page>Thomas Berger</a></li>";
      member_list +=   "<li><a href=#profile_detail_page>Brigitta Merk</a></li>";
      member_list +=   "<li><a href=#profile_detail_page>Ueli Friedli</a></li>";
	  member_list +=   "<li><a href=#profile_detail_page>Erich Eichenberger</a></li>";
	  member_list +=   "<li><a href=#profile_detail_page>Maria Kufferath</a></li>";
      member_list += "</ul>";
      return member_list;
	},
	
	
	
	loadStudents: function() {
	  var member_list = "";
      member_list += "<ul data-role=listview data-filter=true data-autodividers=true data-inset=true data-input=#choose_student>";
	  member_list +=   "<li><a href=#profile_detail_page>Anuk Meier</a></li>";
	  member_list +=   "<li><a href=#profile_detail_page>Lara Gutweniger</a></li>";
	  member_list +=   "<li><a href=#profile_detail_page>Laurin Wettstein</a></li>";
      member_list +=   "<li><a href=#profile_detail_page>Melissa Graber</a></li>";
	  member_list +=   "<li><a href=#profile_detail_page>Remo Huber</a></li>";
      member_list += "</ul>";
      return member_list;
	},
	
	
	loadProfile: function() {
	  var profile_list = "";
      profile_list += "<ul data-role=listview data-filter=true data-inset=true data-input=#choose_profile>";
      profile_list +=   "<li data-role=list-divider>Identification</li>";
	  profile_list +=   "<li><form><fieldset data-role=controlgroup data-type=horizontal><input type=radio name=pic id=thatsme><label for=thatsme>Me</label><input type=radio id=thatsmykid name=pic><label for=thatsmykid>My kid</label><input type=radio id=someoneelse name=pic checked=checked><label for=someoneelse>unknown</label></fieldset></form></li>";
	  profile_list +=   "<li data-role=list-divider>Foto</li>";
	  profile_list +=   "<li><table width=100%><tr><td><img style='display:none;width=300px;height:200px' id='profilePic1' src='' /></td></tr><tr><td><table><tr><td><button onclick=gap.capturePhoto(); class='ui-btn ui-icon-camera ui-btn-icon-notext ui-corner-all'>take a snapshot</button></td><td><button onclick=gap.removePhoto(); class='ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all'>trash image</button></td></tr></table></td></tr></table></li>";
	  
	  profile_list +=   "<li data-role=list-divider>General</li>";
	  profile_list +=   "<li class='ui-btn ui-icon-edit ui-btn-icon-right'>Surname: Reich</li>";
      profile_list +=   "<li class='ui-btn ui-icon-edit ui-btn-icon-right'>Name: Katja</li>";
      profile_list +=   "<li class='ui-btn ui-icon-edit ui-btn-icon-right'>Rolle: Student</li>";
      profile_list +=   "<li><form><input type=checkbox data-role=flipswitch id=sex checked=checked data-on-text=boy data-off-text=girl></form></li>";
      profile_list +=   "<li class='ui-btn ui-icon-edit ui-btn-icon-right'>Birthday: 14.5.1999</li>";
	  
	  profile_list +=   "<li data-role=list-divider>Contact</li>";
	  profile_list +=   "<li class='ui-btn ui-icon-edit ui-btn-icon-right'><table><tr><td>Mobile: </td><td><a href=# class='ui-btn ui-icon-phone ui-btn-icon-notext ui-corner-all'>call</a></td><td>+1234567890</td></tr></table></li>";
	  profile_list +=   "<li class='ui-btn ui-icon-edit ui-btn-icon-right'><table><tr><td>Email: </td><td><a href=# class='ui-btn ui-icon-phone ui-btn-icon-notext ui-corner-all'>send</a></td><td id=profile_detail_email>fam.reich@hotmail.com</td></tr></table></li>";
	  profile_list +=   "<li class='ui-btn ui-icon-edit ui-btn-icon-right'>Address: Seestr. 200, 8610 Uster</li>";
	  profile_list +=   "<li class='ui-btn ui-icon-edit ui-btn-icon-right'>Mother tongue: deutsch</li>";
      profile_list +=   "<li data-role=list-divider>More</li>";
      profile_list += "</ul>";
	  return profile_list;
	},
	
	loadMyCities: function(accessCode) {
		  var my_cities = ""; // FIXME: search for kids having parent with email as member
		  var email = this.getEmailOfAccessCode(accessCode);
		  if (email != "?") {
			my_cities += "<ul id=choose_add_mykid_list data-role=listview data-filter=true data-inset=true data-input=#choose_add_mykid>";
			my_cities +=   "<li data-filtertext='Burgdorf'><a href=#city_page>Burgdorf<span class=ui-li-count>2</span></a></li>";
			my_cities += "</ul>"; //FIXME: keep this data local (or get earlier, e.g. loadMyClasses
		  } else {
			  var cities = server.loadCities();
			  cities = cities.replace("#choose_city", "#choose_add_mykid");
			  return cities;
		  }
		  return my_cities;
		},
		
		
	
	loadMyKids: function(accessCode) {
	  var my_kids = ""; // FIXME: search for kids having parent with email as member
	  var email = this.getEmailOfAccessCode(accessCode);
	  if (email != "?") {
		my_kids += "<ul id=choose_startp_list data-role=listview data-filter=true data-autodividers=true data-inset=true data-input=#choose_startp>";
		my_kids +=   "<li data-filtertext='Alex'><a href=#mykid_page>Alex<span class=ui-li-count>3</span></a></li>";
		my_kids +=   "<li data-filtertext='Remo'><a href=#mykid_page>Remo<span class=ui-li-count>1</span></a></li>";
		my_kids += "</ul>"; //FIXME: define #mykid_page
	  }
	  return my_kids;
	},
	
	loadMyClasses: function(accessCode) {
	  var my_classes = ""; // FIXME: search for classes having email as member
      var email = this.getEmailOfAccessCode(accessCode);
	  if (email != "?") {
	    my_classes += "<ul id=choose_home_list data-role=listview data-filter=true data-autodividers=true data-inset=true data-input=#choose_myclass>";
	    my_classes +=   "<li data-filtertext='1a Gym Kanti Uster'><a href=#member_page>1a Gym Kanti Uster<span class=ui-li-count>25</span></a></li>";
        my_classes +=   "<li data-filtertext='2. Kl. Primarschule Nänikon'><a href=#member_page>2. Kl. Primarschule Nänikon<span class=ui-li-count>20</span></a></li>";
        my_classes += "</ul>";
      }
	  return my_classes;
	},
	
	loadHelp: function() {
	  var help = "";
      help += "<ul id=choose_help_list data-role=listview data-filter=true data-autodividers=true data-inset=true data-input=#choose_help>";
	  help +=   "<li><a href=#help_1_page>Why can't I add homework?</a></li>";
      help +=   "<li><a href=#help_2_page>How do I find a class?</a></li>";
	  help += "</ul>";
      return help;
	},
	
	loadHomework: function() {
	  var homework = "";
      homework += "<ul id=choose_homework_list data-role=listview data-filter=true data-inset=true data-input=#choose_homework>";
	  homework +=   "<li data-role=list-divider>Tomorrow</li>";
	  homework +=   "<li><a href=#homework_detail_page>english voci p38<span class=ui-li-count>todo</span></a></li>";
	  homework +=   "<li data-role=list-divider>Fr</li>";
      homework +=   "<li><a href=#homework_detail_page>Presentation about spain<span class=ui-li-count>done</span></a></li>";
	  homework += "</ul>";
      return homework;
	},
	
	loadHomeworkDetail: function() {
	  var homework = ""; //TODO: Datamodel allows for private homeworks and class wide homework with private fields per homework: progress/notes 
	  homework += "<div class=ui-field-contain>";
	  homework +=   "<label for=homework_title>Title</label><input id=homework_title type=text value='english voci p38'>";
      homework +=   "<label for=homework_due>Due</label><input id=homework_due type=date>";
      homework +=   "<label for=homework_my_progress>My progress</label><input id=homework_my_progress type=range min=0 max=100 value=0 step=5 data-show-value=true>";
	  homework +=   "<label for=homework_fach>Subject</label><input id=homework_fach type=text value='english conversation II'>";
      homework +=   "<label for=homework_text>Task</label><textarea id=homework_text placeholder='enter description here (visible to other students)' rows=5></textarea>";
      homework +=   "<label for=homework_my_notes>My notes</label><textarea id=homework_my_notes placeholder='enter personal notes here (not visible to other students)' rows=5></textarea>";
      homework +=   "<label for=homework_is_private>private</label><input id=homework_is_private type=checkbox>";
	  //homework +=   "<label class=ui-hidden-accessible for=homework_submit></label><input id=homework_submit type=submit value=collaborate>";
	  homework += "</div>";
      return homework;
	},
	
	genCode: function() {
	  return "ABCDEF";
	},
	
	invite: function(person,email,role,clazz) {
	  //TODO: access code => user.email => From:
	  //      To: email 
	  //      Subject: user invites you into clazz
	  //      Body: Your personal access code: "i" + genCode();
	},
	
	getEmailOfAccessCode: function(accessCode) {
	  if (accessCode == this.genCode()) {
	    return "me@ho.me";
		//FIXME search for access code in invites
	  } else {
	    return "?";
	  }
	}
	
};