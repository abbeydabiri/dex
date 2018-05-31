import m from 'mithril';
import menu from './#menu.js';
import footer from './#footer.js';

import Icons from './#icons.js';
import {appAlert} from './#utils.js';
import {checkRedirect} from './#utils.js';
import {defaultImage} from './#utils.js';
import {displayImage} from './#utils.js';

var searchXHR = null
var searchTimer;

var page = {
	Url: "/api/blogs", Form: {},
	searchText: "", searchView: "", formView: "dn", searchResult:[], formPinned: {},
	searchBlogs:function(){
		if (searchTimer){ clearTimeout(searchTimer); }
		if (searchXHR !== null) { searchXHR.abort() } searchXHR = null;

		page.searchResult = []
		searchTimer = setTimeout(function(){
			m.request({ method: 'GET', url: page.Url+"/list?search="+page.searchText,
				config: function(xhr) {searchXHR = xhr}, }).then(function(response) {

				var searchList = [];
				checkRedirect(response);


				if (response.Code == 200) {
					if (response.Body !== null && response.Body !== undefined ){
						response.Body.map(function(result) { if (result.ID > 0) {
							result.Updatedate = result.Updatedate.slice(0, 10);
							searchList.push( m(searchBlogsResult,
								{Code: result.Code, Category: result.Category, Image: result.Image, Title: result.Title,
									Description: m.trust(result.Description), Author: result.Author, Updatedate: result.Updatedate}
							))


							if (result.Pinned) {
								if (page.formPinned.Title == undefined) {
									page.formPinned.Image = "background-image: url(../../../"+result.Image+");background-position: center;background-size: cover;";
									page.formPinned.Title = result.Title;
									page.formPinned.Code = result.Code;

									console.log(page.formPinned.Image)
								}
							}

						}})
						page.formView = "dn"; page.searchView == "";
						page.searchResult = searchList
					}
				}

			}).catch(function(error) {
				appAlert([{ type: 'bg-red', message: "Network Connectivity Error \n Please Check Your Network Access", }]);
			});
		}, 750);
	},

	readBlogs:function(vnode){
		if (searchXHR !== null) { searchXHR.abort() } searchXHR = null;
		// page.formView = ""; page.searchView = "dn";
		m.request({ method: 'GET', url: page.Url+"/read?search="+vnode.attrs.path,
			config: function(xhr) {searchXHR = xhr}, }).then(function(response) {
			checkRedirect(response);

			if (response.Code == 200) {
				if (response.Body !== null && response.Body !== undefined ){
					page.Form = response.Body;
					page.Form.Updatedate = page.Form.Updatedate.slice(0, 10);
					page.Form.Image = "background-image: url(../../../"+page.Form.Image+");background-position: center;background-size: cover;";
					page.Form.File = m.trust(page.Form.File)
					page.formView = ""; page.searchView = "dn";
				}
			}

		}).catch(function(error) {
			appAlert([{ type: 'bg-red', message: "Network Connectivity Error \n Please Check Your Network Access", }]);
		});

	},
	oninit:function(){
		m.render(document.getElementById('appMenu'), m(menu,{color:"white"}))
		m.render(document.getElementById('appFooter'), m(footer));
	},
	oncreate:function(vnode){
		(vnode.attrs.path == undefined) ? page.searchBlogs() : page.readBlogs(vnode)
	},
	view:function(vnode){
	return (<section class="center bg-white min-vh-100 pb5">

			<div id="appAlert"></div>

			<section class={page.formView}>

				<article class="vh-50 dt w-100 bg-silver" id="PinnedArticle" style={page.Form.Image}>
					<div class="dtc v-mid tcnear-white"></div>
				</article>

				<section class="mw7 center pa2">
					<h1 class="f4 f3-m f2-l fw4 tc dark-gray">{page.Form.Title}</h1>
					<p class="tc f6"> by {page.Form.Author} <br/> <small class="i">{page.Form.Updatedate}</small></p>

					<br/><br/>

					{page.Form.File}

					<p>
						SHARE VIA:

						<a class="link dim dark-gray bg-near-white dib h2 w2 mr3 pa2 bg-near-white ba b--black-10" href="#" title="">
						  <svg data-icon="facebook" viewBox="0 0 32 32" style="fill:currentcolor">
						    <title>facebook icon</title>
						    <path d="M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z"></path>
						  </svg>
						</a>
						<a class="link dim dark-gray bg-near-white dib h2 w2 mr3 pa2 bg-near-white ba b--black-10" href="#" title="">
						  <svg data-icon="twitter" viewBox="0 0 32 32" style="fill:currentcolor">
						    <title>twitter icon</title>
						    <path d="M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4"></path>
						  </svg>
						</a>
					</p>


					<a href="/projects" class="no-underline fr ph2 pv1 f6 br1 bg-black near-white dim pointer">
						Back To Projects
					</a>

				</section>
			</section>

			<section class={page.searchView}>
				<article class="vh-50 dt w-100 bg-silver" id="PinnedArticle" style={page.formPinned.Image}>
					<div class="dtc v-mid tc near-white bg-black-80">
						<h1 class="f4 f3-m f2-l fw4 tc washed-blue">{page.formPinned.Title}</h1>
						<a href={"projects/"+page.formPinned.Code} class="no-underline">
							<span class="ph2 pv1 f6 shadow-1 br1 bg-orange near-white dim pointer">Read More</span>
						</a>
					</div>
				</article>

				<section class="mw7 center pv1 ph3">
					<p class="tc f6 w-100">
						{m('input', {type:"text", class:" pa2 w-50 w-30-ns dib ba b--silver", placeholder:"Search Articles",
							onchange: m.withAttr("value",function(value){page.searchText = value;})
						})}
						{m('span', {class:" pa2 bg-dark-green near-white dim  dib ba b--near-white", onclick: page.searchBlogs}, "Search" )}
					</p>
					<br/>
					{page.searchResult}
				</section>
			</section>
		</section>
	)
  }
}

var searchBlogsResult = {view: function(vnode) {return(
	<section class="pv3 bb b--moon-gray">
		<h1 class="f4 f3-m f2-l fw5 dark-gray">{page.formPinned.Title}</h1>
		<img alt=""  src={"../../../"+vnode.attrs.Image} class="w-100 f5 " id={vnode.attrs.Code} onerror={()=>defaultImage(vnode.attrs.Code)}/>
		<p class="ph3 tl">
			{vnode.attrs.Description}
			<small> by {vnode.attrs.Author} on {vnode.attrs.Updatedate} </small>
			<a href={"projects/"+vnode.attrs.Code} class="no-underline">
				<small class="fr ph2 pv1 f6 br1 bg-blue washed-blue fw4 dim pointer">Read More</small>
			</a>
		</p>
	</section>
)}}

export default page;
