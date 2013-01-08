// Init Collection
Bookings = new Meteor.Collection("Bookings");    

if (Meteor.isClient) {
   /**
    *  TEMPLATES
    */
    
    Template.bookingform.showForm = function () {
      return Session.get("showForm");
    };

    Template.bookinglist.expand= function () {
      return Session.equals("expand", this._id);
    };

    Template.bookinglist.showEdit= function () {
      return Session.equals("showEdit", this._id);
    };
    
    Template.bookingform.preserve(['#formPage']);
    
    Template.bookinglist.bookings = function() {
        var bookings = Bookings.find().fetch();
        
        return bookings;
    };
    
    Template.page.showCreateDialog = function () {
      return Session.get("showCreateDialog");
    };
	
    Template.createDialog.error = function () {
      return Session.get("createError");
    };

	/**
     * EVENTS
     */
    
	Template.navbar.events = {
	    'click #addBooking' :function(){    
	        Session.set("showForm", true); 
	   },
	    'click #clearBookings' :function(){ 
	        Session.set("createError",
                  "Are you sure you want to clear all current bookings? (this can't be undone)");
	        Session.set("showCreateDialog", true); 
	   }
	};
	
	Template.bookingform.events = {
	     'click #formCancel' :function(){ Session.set("showForm", false); },
	     'click, #formSubmit' :function(event, template){
	         var time = new Date().getTime() / 60000;
	         
	         var name = template.find("#name").value;
	         var time = Math.round(parseFloat(time));
	         var pax = template.find("#pax").value;
	         var number = template.find("#number").value;
	         var table = template.find("#table").value;
	         
	         if(name.length && pax.length) {
	             Bookings.insert({ 'Name' : name, 'Time' : time, 'Pax' : pax, 'Number' : number, 'Table' : table, 'Seated' : false });
	            Session.set("showForm", false);
	           } else {
	             console.log("ERROR: required params are missing");
	         }

	     },
         'keydown, #formSubmit' :function(event, template){
             if (event.which === 13) {
                 var time = new Date().getTime() / 60000;
                 
                 var name = template.find("#name").value;
                 var time = Math.round(parseFloat(time));
                 var pax = template.find("#pax").value;
                 var number = template.find("#number").value;
                 var table = template.find("#table").value;
                 
                 if(name.length && pax.length) {
                     Bookings.insert({ 'Name' : name, 'Time' : time, 'Pax' : pax, 'Number' : number, 'Table' : table, 'Seated' : false });
                    Session.set("showForm", false);
                   } else {
                     console.log("ERROR: required params are missing");
                 }
            }

         }
	};
    
    Template.createDialog.events = {
        'click #errorCancel' :function(){ Session.set("showCreateDialog", false); },
        'click #clearYes' :function(){ 
            Bookings.remove({}); 
            Session.set("showCreateDialog", false);
        }
    };
    
    Template.bookinglist.events = {
        'click .expandButton' :function(e) {
            Session.set('expand', false);
            Session.set('expand', this._id);
        },
        'click .contractButtons' :function(e) {
            Session.set('expand', false);
        },
        'click .bookingSeat' :function() {
            Bookings.update(this._id, { $set: {'Seated':true} });
            Session.set('expand', false);
        },
        'click .bookingCancel' :function() {
            Bookings.update(this._id, { $set: {'Cancel':true} });
            Session.set('expand', false);
        },
        'click .bookingDelete' :function() {
            Bookings.remove(this._id);
            Session.set('expand', false);
        },
        'click .bookingEdit' :function(e) {
            Session.set('showEdit', this._id);
        },
        'click .cancelUpdate' :function() {
            Session.set('showEdit', false);
            Session.set('expand', false);
        },
        'click .bookingUpdate' :function(event, template) {
            var name = template.find("#updateForm #name").value;
            var pax = template.find("#updateForm #pax").value;
            var number = template.find("#updateForm #number").value;
            var table = template.find("#updateForm #table").value;
            
            Bookings.update(this._id, { $set: {'Name':name, 'Pax': pax, 'Number': number, 'Table': table} });
            Session.set('showEdit', false);
            Session.set('expand', false);
        }
    };
    
    /**
     * FUNCTIONS
     */
    /**
     * Top Clock Function
     */
    Meteor.setInterval(
    function() {
        var time_div = $('#time');
        var date = new Date();
        var currentHour = date.getHours();
        var currentMinute = date.getMinutes();
        var currentSeconds = date.getSeconds();
        var time = currentHour + ':' + currentMinute +':'+ currentSeconds;
        
        time_div.text(time);
        
    },1000);
    
    Meteor.setInterval(

    /**
     * Time Since Booking Function]
     */
    function() {
       var bookings = Bookings.find().fetch();
       
       bookings.forEach(function(booking) {
           var booked = booking.Time;
           var time = new Date().getTime() / 60000;
           var current = Math.round(parseFloat(time));
           
           var diff = current-booked;
           Bookings.update(booking._id, { $set: {'Timeago':diff} });
       });
    }, 60000);
    
    /**
     * Preloader Function
     */
    $(window).load(function() { 
        setTimeout(function(){
            window.scrollTo(0, 1);
        }, 0);
        $("#preLoadDiv").delay(3000).fadeOut(); 
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
