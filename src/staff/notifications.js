import m from 'mithril';

import {menu} from './#menu.js';
import Icons from '../#icons.js';
import {appAlert} from '../#utils.js';
import {checkRedirect} from '../#utils.js';

import {switchPageMode} from '../#pageFunctions.js';
import {saveForm} from '../#pageFunctions.js';

var viewHeader = {
	view: function(vnode){
		return (
			m("nav",{class:"w-100 bg-black white-90 shadow-4 z-5 cf tc relative fixed top-0"},[
				m("a",{class:"link",oncreate:m.route.link,href:"/agent"},[
					m(Icons,{name:"x",class:"absolute white-90 h1 dim left-0 top-0 pa3"})
				]),
				m("p","NOTIFICATIONS"),
			])
		)
	}
}


var viewNotification = {
	view: function(vnode){
		return (
			m("li",{class:"fl w-100 lh-copy pa3 ph0-l bb b--black-10"},[
				m("div",{id:vnode.attrs.id+"Memo", class:"flex items-center "+vnode.attrs.color},[
					m(Icons,{name:"bell",class:"w2 h2 br-100 dim",onclick:()=>page.openNotification(vnode.attrs.id)}),
					m("div",{class:"ph2 flex-auto"},[
						m("span",{class:"f6 db black-70 truncate"},vnode.attrs.title),
						m("small",{class:"gray i"},vnode.attrs.date),
					]),
					m("div",m(Icons,{name:"envelope-open", class:"dn w1 h1 dim", id:vnode.attrs.id+"Open",onclick:()=>page.openNotification(vnode.attrs.id)})),
					m("div",m(Icons,{name:"envelope-closed", class:" w1 h1 dim", id:vnode.attrs.id+"Closed",onclick:()=>page.openNotification(vnode.attrs.id)}))
				]),
				m("div",{class:" fl w-100 black-70 tl dn", id:vnode.attrs.id+"Message"}),
			])
		)
	}
}

var page = {
	Url: "/api/memos", Form: {}, jwtToken:{}, searchXHR: null,
	viewForm:function(){
		switchPageMode(page, "view"); m(viewHeader);
		// m.render(document.getElementById('appMenu'), m(viewHeader));
	},
	saveForm:function(){ saveForm(page); },
	oninit: function() {
		var cookie = getCookie("dex.essentials");
		page.jwtToken = jwt_decode(cookie);

		m.render(document.getElementById('appMenu'), m(viewHeader));
		document.getElementById("appContent").style.paddingTop = "53px";
		m.redraw()
	},
	openNotification:function(id){
		document.getElementById(id+"Message").classList.toggle('dn');
		document.getElementById(id+"Closed").classList.toggle('dn');
		document.getElementById(id+"Open").classList.toggle('dn');

		var classList = document.getElementById(id+"Message").classList.value;
		var memoID = document.getElementById(id+"Memo");
		if(!(classList.indexOf("dn") !== -1)){

			if(memoID.classList.value.indexOf("black") !== -1){
				memoID.classList.toggle('black');
				memoID.classList.toggle('gray');
			}

			startLoader();
			if (page.searchXHR !== null) { page.searchXHR.abort() } page.searchXHR = null;
			m.request({ method: 'GET', url: page.Url, data: {id: id},
				config: function(xhr) {page.searchXHR = xhr}, }).then(function(response) {

				checkRedirect(response);
				if (response.Code == 200) {
					if (response.Body !== null && response.Body !== undefined ){

						//Mark as Read
						m.request({ method: 'POST', url: page.Url+"/read",
						data: {MemoID: response.Body.ID, UserID: page.jwtToken.ID}},)
						//Mark as Read

						m.render(document.getElementById(id+"Message"), [
							m("small",{class:"fl"},"From: "+response.Body.From),
							m("div",{class:"fl w-100"},m.trust(response.Body.File)),
						]);
					}
					stopLoader();
				}
			}).catch(function(error) {
				stopLoader();
				appAlert([{ type: 'bg-red', message: "Network Connectivity Error \n Please Check Your Network Access", }]);
			});
		}
	},
	searchText: "",
	searchForm: function(){
		var searchList = [];
		var pageSearchUrl = page.Url+"/search?workflow=publish&search="+page.searchText
		if (page.searchXHR !== null) { page.searchXHR.abort() } page.searchXHR = null;
		m.request({ method: 'GET', url: pageSearchUrl,
			config: function(xhr) {page.searchXHR = xhr}, }).then(function(response) {

			checkRedirect(response);
			if (response.Code == 200) {
				if (response.Body !== null && response.Body !== undefined ){
					var POS = 1;
					var color = "";
					response.Body.map(function(result) { if (result.ID > 0) {
						color = (result.Workflow == "pending") ?  "black" : "gray";
						searchList.push(m(viewNotification,{id:result.ID, color: color,
							title: result.Details, from: result.SubDetails, date: result.Date}
						))
					}})
				}
			}
			page.pageSearchList = searchList;
		}).catch(function(error) {
			appAlert([{ type: 'bg-red', message: "Network Connectivity Error \n Please Check Your Network Access", }]);
		});
	},
	oncreate:function(){page.searchForm()},
	view:function(){
	return  (

		<section>

			<div id="appAlert"></div>

			<div class="measure pa3 center cf">
				<span class="dt btnPrimary mv2 center br2">
					{m("input",{class:"f6 fl bn black-80 bg-near-white pa2 w5", placeholder:"search", type:"text",
					onchange: m.withAttr("value",function(value) {page.searchText = value}) })}
					<Icons name="magnifying-glass" class="h1 w1 button-reset dim fl pa2 tc white pointer br2" onclick={page.searchForm} />
				</span>
			</div>

			<ul class="list pl0 mt0 measure center cf">
				{page.pageSearchList}
			</ul>

		</section>
	)
  }
}

export default page;
