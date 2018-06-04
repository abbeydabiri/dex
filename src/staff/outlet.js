import m from 'mithril';
import {menu} from './#menu.js';
import {footerItem} from './#footer.js';
import Icons from  '../#icons.js';

var page = {
	Url: "/api/customer", Form: {}, jwtToken: {},
	oninit:function(){
		menu("");
		// var cookie = getCookie("datex");
		// page.jwtToken = jwt_decode(cookie);
		// console.log(document.cookie);
	},
	view:function(){
	return  (
		<section class="">

			<div id="appAlert"></div>

			<article class="dt w-100 pv2">
				<div class="dtc v-mid tc red ph3 ph4-l">

					<h1 class=" fw6 tc">OUTLET</h1>

				</div>
			</article>

			{m("nav",{class:"w-100 z-max fixed bg-black bottom-0 tc center"},[
				m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/agent",icon:"person"},"PROMOTER"),
				m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/staff/consumer",icon:"people"},"CONSUMER"),
				m(footerItem,{color:"red bg-white hover-bg-black hover-white", href:"/staff/outlet",icon:"basket"},"OUTLET"),
				m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/staff/media",icon:"aperture"},"MEDIA")
		  ])}

		</section>
	)},
}

export default page;
