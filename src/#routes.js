var m = require("mithril")


//Generic Website Pages
import pageBlog from './blogs.js';
import pageIndex from './index.js';
import pageLogin from './login.js';
import pageForgot from './forgot.js';
import pageDocumentation from './documentations.js';
import pageTerms from './terms.js';
import pagePrivacy from './privacy.js';
//


m.route.prefix("")
m.route.mode = "pathname"
m.route(document.getElementById('appContent'), "/", {
	"/":{ view: function(vnode) { return m(pageLogin);},},
	"/login":{ view: function(vnode) { return m(pageLogin);},},
	"/forgot":{ view: function(vnode) { return m(pageForgot);},},

	"/terms": {view: function() { return  m(pageTerms) },},
	"/privacy": {view: function() { return  m(pagePrivacy) },},

	"/blogs":{ view: function(vnode) { return m(pageBlog,vnode.attrs);},},
	"/blogs/:path":{ view: function(vnode) { return m(pageBlog,vnode.attrs);},},

	"/documentations":{ view: function(vnode) { return m(pageDocumentation,vnode.attrs);},},
	"/documentations/:path":{ view: function(vnode) { return m(pageDocumentation,vnode.attrs);},},
});
