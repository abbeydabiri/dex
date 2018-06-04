import m from 'mithril';
import {menu} from './#menu.js';
import {footerItem} from './#footer.js';

// import {validateSubmit} from '../../#validateSubmit.js';


// var actionContact = {
// 	Submit: function() {
// 		var actionFields = [
// 			{validationType : '', fieldID : 'fullname' },
// 			{validationType : '', fieldID : 'company'},
// 			{validationType : '', fieldID : 'mobile'},
// 			{validationType : 'email', fieldID : 'email'},
// 			{validationType : 'sentence', fieldID : 'message'},
// 			{validationType : '', fieldID : 'ipaddress'},
// 			{validationType : '', fieldID : 'useragent'},
// 		]
// 		validateSubmit( "/api/contact", actionFields);
// 	},
// };



var page = {
	IpAddress: "",
	UserAgent: "",
	oninit: function(){
		menu();
		// m.request({method:'GET', url: "https://icanhazip.com/",
		// 	deserialize: function(value) {return value}}).then(function(response){
		// 	page.IpAddress = response;
		// 	page.UserAgent = navigator.userAgent;
		// });
	},
	view:function(){
	return (
		<section class="">
			<div id="appAlert" class="z-max"></div>
			<section class="mw9-ns center">
				<div class=" pa3-ns pa2">
					<article class="avenir br2 pa2 bg-white tracked fw2">
						<div class="cf">

							<div class="cf w-100 w-50-l center">
								<p class="ma0 f2 pa2 tc tracked">Get Help</p>

								<input type="hidden" id="ipaddress" error="IP-Address is required" value={page.IpAddress}/>
								<input type="hidden" id="useragent" error="User-Agent is required" value={page.UserAgent}/>

								<div  class="fl pa2 w-100 w-50-ns">
								{m("select",{ class: "pa2", onchange: m.withAttr("value",function(value) {page.Form.Code = value})},
									[m("option",{value:""},"select-issue"), m("option","Technical"), m("option","Non-Technical")])}
								</div>

								<div class="fl pa2 w-100">
									<textarea name="message" rows="7" id="message" class="w-100 pa2" placeholder="Message" error="Message is too short"></textarea>
								</div>

								<div class="fl pa2 tc w-100 ">
									<button class="pv3 ph3 btnPrimary white-90 w-100  shadow-4 bw0 link dim" onclick="{actionContact.Submit}">SEND MESSAGE</button>
								</div>
							</div>


						</div>

					</article>

				</div>
			</section>

			<nav class="w-100 z-max fixed bg-black bottom-0 tc center">
				{m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/agent",icon:"person"},"PROMOTER")}
				{m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/staff/consumer",icon:"people"},"CONSUMER")}
				{m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/staff/outlet",icon:"basket"},"OUTLET")}
				{m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/staff/media",icon:"aperture"},"MEDIA")}
		  </nav>
		</section>
		)
  	}
}

export default page;
