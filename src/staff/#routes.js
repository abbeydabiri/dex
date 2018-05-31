var m = require("mithril")


//Dashboard & Promoter footer menu
import pageDashboard from './dashboard.js';
import pageConsumer from './consumer.js';
import pageOutlet from './outlet.js';
import pageMedia from './media.js';


import pageNotifications from './notifications.js';
import pageProfile from './myprofile.js';
import pageTasks from './taskmanager.js';
import pageHelp from './gethelp.js';




m.route.prefix("")
m.route(document.getElementById('appContent'), "/staff", {

	"/staff":{ view: function() { return  m(pageDashboard)},},
	"/staff/consumer":{view: function() {return  m(pageConsumer)},},
	"/staff/outlet":{view: function() {return  m(pageOutlet)},},
	"/staff/media":{view: function() {return  m(pageMedia)},},

	"/staff/notifications":{view: function() {return  m(pageNotifications)},},
	"/staff/myprofile":{view: function() {return  m(pageProfile)},},
	"/staff/taskmanager":{view: function() {return  m(pageTasks)},},
	"/staff/gethelp":{view: function() {return  m(pageHelp)},},

});
