var m = require("mithril");
import {appAlert} from './#utils.js';

export var footer = {
	clickedContact: false,
	clickedNewsletter: false,
	IpAddress:"", UserAgent:"",
	FormNewsletter : {Firstname:"",Lastname:"",Email:""},
	FormContact : {Firstname:"",Lastname:"",Company:"",Email:"",Message:"",IpAddress:"", UserAgent:""},
	submitContact: function() {
		var alert = []
		if (footer.clickedContact) {
			console.log("footer.clickedContact: "+footer.clickedContact)
			appAlert([{ message: "Signed up already!!" }]); return
		}

		footer.FormContact.IpAddress = footer.IpAddress
		footer.FormContact.UserAgent = footer.UserAgent

		if (footer.FormContact.Firstname.length == 0) { alert.push({ message: "Title is required" }); }
		else if (footer.FormContact.Lastname.length < 2) { alert.push({ message: "Title is required" });}

		if (footer.FormContact.Firstname.length == 0) { alert.push({ message: "First Name is required" }); }
		else if (footer.FormContact.Lastname.length < 3) { alert.push({ message: "First Name is required" });}

		if (footer.FormContact.Lastname.length == 0) { alert.push({ message: "Last Name is required" }); }
		else if (footer.FormContact.Lastname.length < 3) { alert.push({ message: "Last Name is too short" }); }

		if (footer.FormContact.Fullname.length == 0) { alert.push({ message: "Company is required" }); }
		else if (footer.FormContact.Fullname.length < 3) { alert.push({ message: "Company is too short" }); }

		if (footer.FormContact.Email.length == 0) { alert.push({ message: "Email is required" }); }
		else if(!footer.FormContact.Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			alert.push({ message: "Email is invalid" });
		}

		if (footer.FormContact.Message.length == 0) { alert.push({ message: "Message is required" }); }
		else if (footer.FormContact.Message.length < 30) { alert.push({ message: "Message is too short" }); }

		if (alert.length > 0) {
			footer.clickedContact = false
			appAlert(alert)
			return
		}

		// startLoader();
		footer.FormContact.List = "contact-newsletter"
		footer.FormContact.Notify = "contact-newsletter-notify"
		m.request({ method: 'POST', url: "/api/signup-newsletter", data: footer.FormContact, }).then(function(response) {
			var lStoploader = true;
			if (response.Message !== null &&  response.Message !== "") {
				appAlert([{ message: response.Message }]);
			}
			// if(lStoploader) { stopLoader();}
		}).catch(function(error) {
			appAlert([{ message: error }]);
			// stopLoader();
		});
		for (var field in footer.FormContact) {
			footer.FormContact[field] = "";
		}
		footer.clickedContact = true
		footer.FormContact.Firstname = "";
		footer.FormContact.Lastname = "";
		footer.FormContact.Email = "";
		m.redraw()
	},
	submitNewsletter: function() {
		var alert = []
		if (footer.clickedNewsletter) {
			console.log("footer.clickedNewsletter: "+footer.clickedNewsletter)
			appAlert([{ message: "Signed up already!!" }]); return
		 }

		if (footer.FormNewsletter.Firstname.length == 0) { alert.push({ message: "First Name is required" }); }
		else if (footer.FormNewsletter.Lastname.length < 3) { alert.push({ message: "Last Name is required" });}

		if (footer.FormNewsletter.Lastname.length == 0) { alert.push({ message: "Last Name is required" }); }
		else if (footer.FormNewsletter.Lastname.length < 3) { alert.push({ message: "Last Name is too short" }); }

		if (footer.FormNewsletter.Email.length == 0) { alert.push({ message: "Email is required" }); }
		else if(!footer.FormNewsletter.Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			alert.push({ message: "Email is invalid" });
		}

		if (alert.length > 0) {
			footer.clickedNewsletter = false
			appAlert(alert)
			return
		}

		// startLoader();
		footer.FormNewsletter.List = "signup-newsletter"
		footer.FormNewsletter.Notify = "signup-newsletter-notify"
		m.request({ method: 'POST', url: "/api/signup-newsletter", data: footer.FormNewsletter, }).then(function(response) {
			var lStoploader = true;
			if (response.Message !== null &&  response.Message !== "") {
				appAlert([{ message: response.Message }]);

			}
			// if(lStoploader) { stopLoader();}
		}).catch(function(error) {
			appAlert([{ message: error }]);
			// stopLoader();
		});
		for (var field in footer.FormNewsletter) {
			footer.FormNewsletter[field] = "";
		}
		footer.clickedNewsletter = true
		footer.FormNewsletter.Firstname = "";
		footer.FormNewsletter.Lastname = "";
		footer.FormNewsletter.Email = "";
		m.redraw()
	},
	oninit: function(){
		// m.request({method:'GET', url: "https://icanhazip.com/",
		// 	deserialize: function(value) {return value}}).then(function(response){
		// 	footer.IpAddress = response;
		// 	footer.UserAgent = navigator.userAgent;
		// });
	},
	view: function(vnode) {
		return (
			<footer class=" black-80 " id="">
				<div id="appAlert"></div>
				<a id="contact"></a>

				<article class="bg-near-white flex flex-row-ns flex-column">

					<div class="fl w-100 w-50-l pv5 order-2 order-1-ns ph3">
						<div class="dt w-100 tracked">
							<div class="dtc v-mid ">
								<legend class="pa0 ph2 f5 fw6 f4-ns mb3 tl ttu tracked w-100">SEND US A MESSAGE:</legend>
								<legend class="pa0 ph2 f6 fw4 f5-ns mb3 tl tracked w-100 pb2">
									<small>Someone from our team will be in touch within 1-2 business days.</small>
								</legend>

								<div class="cf w-100 pv3">
									<div class="fl ph2">
										<label class="db fw4 lh-copy f6">TITLE</label>
										{m("input",{ type:"text",  value: footer.FormContact.Title,
											class: "w3 f6 input-reset bn black bg-white pa2 lh-solid",
											oninput: m.withAttr("value",function(value) {footer.FormContact.Title = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitContact}}
										})}
									</div>
								</div>

								<div class="cf w-100 pv3">
									<div class="fl w-50 ph2">
										<label class="db fw4 lh-copy f6">FIRST NAME</label>
										{m("input",{ type:"text", value: footer.FormContact.Firstname,
											class: "fl w-100 f6 input-reset bn black bg-white pa2 lh-solid",
											oninput: m.withAttr("value",function(value) {footer.FormContact.Firstname = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitContact}}
										})}
									</div>

									<div class="fl w-50 ph2">
										<label class="db fw4 lh-copy f6">LAST NAME</label>
										{m("input",{ type:"text", value: footer.FormContact.Lastname,
											class: "fl w-100 f6 input-reset bn black bg-white pa2 lh-solid",
											oninput: m.withAttr("value",function(value) {footer.FormContact.Lastname = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitContact}}
										})}
									</div>
								</div>

								<div class="cf w-100 pv3">
									<div class="fl w-50 ph2">
										<label class="db fw4 lh-copy f6">COMPANY</label>
										{m("input",{ type:"text", value: footer.FormContact.Company,
											class: "fl w-100 f6 input-reset bn black bg-white pa2 lh-solid",
											oninput: m.withAttr("value",function(value) {footer.FormContact.Company = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitContact}}
										})}
									</div>

									<div class="fl w-50 ph2">
										<label class="db fw4 lh-copy f6">MOBILE</label>
										{m("input",{ type:"text", value: footer.FormContact.Mobile,
											class: "fl w-100 f6 input-reset bn black bg-white pa2 lh-solid",
											oninput: m.withAttr("value",function(value) {footer.FormContact.Mobile = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitContact}}
										})}
									</div>
								</div>

								<div class="cf w-100 pv3">
									<div class="fl w-100 ph2">
										<label class="db fw4 lh-copy f6">EMAIL</label>
										{m("input",{ type:"text", value: footer.FormContact.Email,
											class: "fl w-100 f6 input-reset bn black bg-white pa2 lh-solid",
											oninput: m.withAttr("value",function(value) {footer.FormContact.Email = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitContact}}
										})}
									</div>
								</div>

								<div class="cf w-100 pv3">
									<div class="fl w-100 ph2">
										<label class="db fw4 lh-copy f6">MESSAGE</label>
										{m("textarea",{ value: footer.FormContact.Message,
											class: "h4 w-100 f6 input-reset bn black bg-white pa2 lh-solid",
											oninput: m.withAttr("value",function(value) {footer.FormContact.Message = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitContact}}
										})}
									</div>

									<div class="fl w-100 pa2">
										{m("span",{ onclick: footer.submit,
											class: "f6 button-reset fl pa3 tc bn bg-animate ttu tracked bg-black hover-bg-dark-green white pointer",
										},"SEND")}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="fl w-100 w-50-l order-1 order-2-ns parallaxBG" style="background-image:url('../../assets/img/contact-bg.jpg')">
						<div class="dt w-100 tracked white bg-black-50" style="height:100%;max-height:800px">
							<div class="dtc v-mid pv5 ph4">
								<legend class="pa0 ph2 f4 fw6 f3-ns mb3 tl ttu tracked w-100">CHAT WITH US</legend>
								<legend class="pa0 ph2 f6 fw4 f5-ns mb3 tl tracked w-100 pb2 lh-landing">
										If you have a question or concern that requires immediate assistance,
										you can call or send us an email and someone will be in touch within 24-48 hours.
								</legend>
								<legend class="pa0 ph2 f6 fw4 f5-ns mb3 tl tracked w-100 pv1 lh-landing">
									You can call us:<br/> (27) 073 656 6492
								</legend>
								<legend class="pa0 ph2 f6 fw4 f5-ns mb3 tl tracked w-100 pt1 pb3 lh-landing">
									Or send us an email: <br/> libuyilesupplier@gmail.com
								</legend>
								<div class="cf w-100 pv3"/>
								<legend class="pa0 ph2 f4 fw6 f3-ns mb3 tl ttu tracked w-100">VISIT OUR OFFICE</legend>
								<legend class="pa0 ph2 f6 fw4 f5-ns mb3 tl tracked w-100 pv1 lh-landing">
									Still have questions?<br/>
									We are available Mon - Fri from 9am - 5pm <br/>
									43 Mdakane Street,  <br/>
									Kwa-Thema, Springs, <br/>
									1575 - South Africa <br/>
								</legend>

							</div>
						</div>
					</div>

				</article>

				<article class="dt w-100 ">
					<div class="dtc v-mid tc near-white bg-blue">

						<div class="pa2 pa3-ns">
						  <div class=" mw6 mw7-l center pa2 pa3-ns br2 ">
						    <span class="cf bn ma0 pa0">
									<legend class="pa0 f5 f4-ns mb3 white-90 tc  ttu tracked w-100">SIGN UP FOR A NEWSLETTER</legend>
									<legend class="pa0 f6 f5-ns mb3 white-90 tc tracked w-100">
										<small>Get the latest news, events and special offers delivered right to your inbox.</small>
									</legend>
						      <div class="fl w-50 w-25-l ph1 pv1">
										<label class="clip" for="first-name">First Name</label>
										{m("input",{ type:"text", placeholder: "Your First Name", value: footer.FormNewsletter.Firstname,
											class: "f6 input-reset bn fl black bg-white w-100 pa3 lh-solid br2-ns",
											oninput: m.withAttr("value",function(value) {footer.FormNewsletter.Firstname = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitNewsletter}}
										})}
									</div>
									<div class="fl w-50 w-25-l ph1 pv1">
										<label class="clip" for="last-name">Last Name</label>
										{m("input",{ type:"text", placeholder: "Your Last Name", value: footer.FormNewsletter.Lastname,
											class: "f6 input-reset bn fl black bg-white w-100 pa3 lh-solid br2-ns",
											oninput: m.withAttr("value",function(value) {footer.FormNewsletter.Lastname = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitNewsletter}}
										})}
									</div>
						      <div class="fl w-100 w-50-l ph1 pv1">
						        <label class="clip" for="email-address">Email Address</label>
										{m("input",{ type:"text", placeholder: "Your Email Address", value: footer.FormNewsletter.Email,
											class: "f6 input-reset bn fl black bg-white pa3 lh-solid w-100 w-70-m w-70-l br2-ns br--left-ns",
											oninput: m.withAttr("value",function(value) {footer.FormNewsletter.Email = value}),
											onkeyup: function(event) {if(event.key=="Enter"){footer.submitNewsletter}}
										})}
										{m("span",{ onclick: footer.submit,
												class: "f6 button-reset fl pv3 tc bn bg-animate ttu tracked bg-black hover-bg-dark-green white pointer w-100 w-30-m w-30-l br2-ns br--right-ns",
										},"Subscribe")}
						      </div>
						    </span>
						  </div>
						</div>

					</div>
				</article>

				<div class="fl w-100 pv4 ph3 ph5-m ph6-l silver bg-black">
				  <small class="f6 db tc">© 2018 <b class="tracked">Libuyile Suppliers</b>., All Rights Reserved</small>
				  <div class="tc mt3">
				    <a href="/terms/"    title="Terms" class="f6 dib ph2 link silver dim">Terms of Use</a>
				    <a href="/privacy/"  title="Privacy" class="f6 dib ph2 link silver dim">Privacy</a>
				  </div>
				</div>

			</footer>
		)
	}
}

export default footer;
