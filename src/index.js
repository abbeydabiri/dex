import m from 'mithril';
import Siema from 'siema';

import menu from './#menu.js';
import footer from './#footer.js';
import Icons from './#icons.js';

import {appAlert} from './#utils.js';
import {checkRedirect} from './#utils.js';


var page = {sliderInterval:30000, mySiema:{}, sliderTimeout:{}, sliderContainer:[],
	sliderPrev: function(vnode){ console.log("sliderPrev"); page.mySiema.prev(); clearTimeout(page.sliderTimeout);
		page.sliderTimeout = setTimeout(function(){page.sliderPrev()}, page.sliderInterval);
	},
	sliderNext: function(vnode){ console.log("sliderNext"); page.mySiema.next(); clearTimeout(page.sliderTimeout);
		page.sliderTimeout = setTimeout(function(){page.sliderNext()}, page.sliderInterval);
	},
	sliderItemOLD: { view: function(vnode) {
		return(m("div",{class:"w-100 vh-100 vh-75-l parallaxBG", style:"background-image:url('../../"+vnode.attrs.filepath+"');"},
			m("div",{class:" "}, m("p",{class:"w-100 fl dn pv2 ma0 ph3 bg-black-60 tc f6 ttu tracked white"}))
		))
	}},
	sliderItem: { view: function(vnode) {
		return(
			<div class="pa2 pv5-l dt center w-100 mw7 z-999">
				<section class="dtc v-mid ">

					<article class="bg-near-white flex flex-row-ns flex-column br2">



						<div class="fl w-100 w-50-l order-1 parallaxBG br2" style={"min-height:150px; background-image:url('../../"+vnode.attrs.filepath+"')"}></div>
						<div class="fl w-100 w-50-l pv5-l pv3 order-2 ph3">
							<div class="dt w-100 tracked">
								<div class="dtc v-mid ">
									<legend class="pa0 ph2 f5 fw6 f4-ns mb3 tl ttu tracked w-100">{vnode.attrs.title}</legend>
									<p class="black-70 measure lh-copy">
										{vnode.attrs.description}
									</p>
									<a href="#contact" class="no-underline f5 tc db w4 pv3 bg-animate bg-blue hover-bg-dark-blue white br2">Contact Us</a>
								</div>
							</div>
						</div>


					</article>

					<div class="pv2 tl">
						<Icons onclick={page.sliderPrev} name="chevron-left" class="h1 pr2 silver dim"/>
						<Icons onclick={page.sliderNext} name="chevron-right" class="h1 pl2 silver dim"/>
					</div>

				</section>
			</div>)
	}},
	sliderInit: function(vnode){
		var searchList = [];

		searchList.push(m(page.sliderItem,{filepath:"assets/img/menatwork-one.jpg",title:"REPAIR CATHODES",
		description:"We use new end pins and side to repair Cathodes plates, We use plastic rubber Hammers and silicone  to install back new side stripps on the stainless  plate."}));

		searchList.push(m(page.sliderItem,{filepath:"assets/img/menatwork-two.jpg",title:"CLEANING OF ANODES PLATE",
		description:"We use over head crane to move and position anodes stainless steel plates on the rags. We use 20Mpa High pressure machine to clean stainless plates. We remove all unwanted particles and crystals on the plate, high pressure washer allows to clean plates without  damaging surface of the plate."}));

		searchList.push(m(page.sliderItem,{filepath:"assets/img/menatwork-three.jpg",title:"CLEANING OF CATHODES STAINLESS STEEL",
		description:"We strip cathodes stainless steel by removing bottom and side stripps and end pins We use aluminium chemical cleaner to clean cathodes stainless steel We use schotch brite to clean cathodes stainless steel."}));

		// searchList.push(m(page.sliderItem,{filepath:"assets/img/hero-3.jpg"}));
		// searchList.push(m(page.sliderItem,{filepath:"assets/img/hero-4.jpg"}));
		// searchList.push(m(page.sliderItem,{filepath:"assets/img/hero-5.jpg"}));
		// searchList.push(m(page.sliderItem,{filepath:"assets/img/hero-6.jpg"}));
		// searchList.push(m(page.sliderItem,{filepath:"assets/img/hero-7.jpg"}));
		if(searchList.length > 0) {
			page.sliderContainer = searchList; m.redraw();
			page.mySiema = new Siema({loop:true,duration: 1000,});
			// page.sliderTimeout = setTimeout(function(){page.sliderNext()}, page.sliderInterval);
		}

		// var searchList = [m(page.sliderItem,{title:"NEW SLIDER",filepath:"/assets/img/banner.png"})];
		// page.sliderContainer = searchList
		// m.redraw()
		// page.mySiema = new Siema({loop:true,duration: 1000,});

		/*
		m.request({ method: 'POST', url: "https://edgevillaestate.com/api/gallery",data:{} }).then(function(response) {
			searchList = [];
			checkRedirect(response);
			if (response.Code == 200) {
				if (response.Body !== null && response.Body !== undefined ){
					response.Body.map(function(result) { searchList.push(m(page.sliderItem,{title:result.Title,filepath:result.Filepath}))})
				}
			}
			if(searchList.length > 0) {
				page.sliderContainer = searchList
				m.redraw()
				page.mySiema = new Siema({loop:true,duration: 1000,});
				page.sliderTimeout = setTimeout(function(){page.sliderNext()}, page.sliderInterval);
			}
		}).catch(function(error) {
			appAlert([{ type: 'bg-red', message: "Network Connectivity Error \n Please Check Your Network Access", }]);
		});
		*/
		// var searchList = [];
		// searchList.push(m(page.sliderItem,{title:"NEW SLIDER",filepath:"/assets/img/banner.png"}));
		// searchList.push(m(page.sliderItem,{title:"NEW SLIDERX",filepath:"/assets/img/banner.png"}));
		// if(searchList.length > 0) {
		// 	page.sliderContainer = searchList
		// 	m.redraw()
		// 	page.mySiema = new Siema({loop:true,duration: 1000,});
		// 	page.sliderTimeout = setTimeout(function(){page.sliderNext()}, page.sliderInterval);
		// }
	},
	oninit:function(vnode){
		m.render(document.getElementById('appMenu'), m(menu,{color:"white"}))
		m.render(document.getElementById('appFooter'), m(footer));
		setTimeout(function(){page.sliderInit()},500);


		//search for published gallery images and display them here


		//simple load list and show
	},
	view:function(vnode){
		return (
			<section class=" min-vh-100">
				<div id="appAlert"></div>
				<div class="cf w-100"></div>
				<article class="" id="gallery">
					<div class="relative">
						<div class="mb4 mb0-l w-100 parallaxBG" style="background-image:url('../../assets/img/hero-1.jpg')">
							<div class="siema  w-100 bg-black-60">
								{page.sliderContainer}
							</div>


						</div>
					</div>
				</article>

				<a id="about"></a>
				<section class="mw7 tc center pt5 cf w-100">
					<div class="flex flex-row-ns flex-column justify-center">
					  <div class=" tc bg-orange order-2 order-1-l">
							<div class="dt w-100 pv4">
							  <div class="dtc v-mid tc white ph5">
							    <span class="db b tc tracked" style="font-size:100px">20</span>
							    <span class="db fw3 tc tracked pv1" style="font-size:40px">YEARS</span>
							    <span class="db fw3 tc tracked" style="font-size:18px">EXPERIENCE</span>
							  </div>
							</div>
					  </div>

					  <div class=" tl ph3 order-1 order-2-l">
					    <p class=" pt0 mt0 f4 gray fw2 tracked">W E L C O M E !</p>
							<div class="cf w-100 pv3">
									<span class="db pv1 f2 fw1 tracked ">ALL ABOUT OUR</span>
									<span class="db pv1 f2 f1-ns b tracked ">SECRETS OF SUCCESS</span>
							</div>
					  </div>
					</div>

				  <div class="db tl black-80 tracked ph2 fw3 lh-landing">
						<p class="pv2">Libuyile Suppliers was registered in 1998 and ever since we have been establishing ourselves to undertake available opportunities in the main stream economy.</p>
						<p class="pv2">Libuyile Suppliers is one of the new breed of South African SMME business ventures who combines a wealth of experience with professional theoretical background required to get the job done within the time and at the right quality.</p>

						<p class="pv3">Our <span class="b">Primary Business</span> is to become a strong arm in the supply and construction chain bridging the gap between major companies and their logistical needs.</p>
						<p class="pv2">Our <span class="b">Secondary Business</span> is to grow our business and become one of the best intermediaries in our economy, thus creating further sound business opportunities.</p>
				  </div>
				</section>

				<div class="bg-blue">
					<div class="mw8 center ph3-ns tracked pv1 fw4 white tc">
						<div class="fl w-100 pv3">
							<div class="pa2">
								<img class="h4 dn" src="../../assets/img/goals.svg"/>
								<h1 class="mt3 ">OUR GOALS</h1>
								<p class="f6 f5-l tc">is to add value to potential clients and grow into being a </p>
								<p class="f6 f5-l tc">recognized black owned company that services the needs of all stake holders.</p>
							</div>
						</div>

						<div class="cf pv3 w-100">
							<div class="fl w-100 w-50-ns">
								<div class="pa2">
									<img class="h4" src="../../assets/img/vision.svg"/>
									<h1 class="mt3">VISION</h1>
									<p class="f6 tl">
										<ul>
											<li class="pv2">To grow and be a recognized company, also acquire endorsement from reputable bodies in the country</li>
											<li class="pv2">We also want to                          grow by expanding our area of operation to other regions in the country and abroad</li>
											<li class="pv2">Engage ourselves in large operations and opening branches</li>
										</ul>
									</p>
								</div>
							</div>

							<div class="fl w-100 w-50-ns">
								<div class="pa2">
									<img class="h4" src="../../assets/img/mission.svg"/>
									<h1 class="mt3">MISSION</h1>
									<p class="f6 tl">
										<ul>
											<li class="pv2">To contribute in the social development of our communities</li>
											<li class="pv2">To be one of the leading companies in the Supply chain and construction business</li>
											<li class="pv2">To provide an excellent service to our clients across various sectors of our economy</li>
										</ul>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<a id="services"></a>
				<div class="bg-near-white">
					<div class="mw8 center ph3-ns tracked pv1 fw4 black tc">
						<div class="fl w-100 pv3">
							<div class="pa2">
								<h1 class="mt3">CORE SERVICES</h1>
								WE OFFER
								<h3 class="mt3">Washing of Cathodes and Anodes</h3>
								as well as

							</div>
						</div>

						<div class="cf pv3 w-100">
							<div class="fl w-100 w-50-ns">
								<div class="pa2">
									<img class="h4" src="../../assets/img/civil.svg"/>
									<h1 class="mt3">CIVIL WORK</h1>
									<p class="f6 tl">
										<ul class="ph5">
											<li class="pv2">Paving</li>
											<li class="pv2">Excavation</li>
											<li class="pv2">Pipe laying</li>
											<li class="pv2">Tar Surfacing</li>
											<li class="pv2">Concrete work</li>
											<li class="pv2">Pre cast kerbs and fences</li>
										</ul>
									</p>
								</div>
							</div>

							<div class="fl w-100 w-50-ns">
								<div class="pa2">
									<img class="h4" src="../../assets/img/house.svg"/>
									<h1 class="mt3">BUILDING WORK</h1>
									<p class="f6 tl">
										<ul class="ph5">
											<li class="pv2">Capentry</li>
											<li class="pv2">Painting</li>
											<li class="pv2">Plastering</li>
											<li class="pv2">Brick Work</li>
											<li class="pv2">Concrete foundations</li>
											<li class="pv2">Concrete castings and floors</li>
										</ul>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>




				<a id="projects"></a>
				<div class="bg-black">
					<div class="mw8 center ph3-ns tracked pv1 fw4 white tc">
						<div class="fl w-100 pt3">
							<div class="pa2">
								<img class="h4 dn" src="../../assets/img/goals.svg"/>
								<h1 class="mt3 ">PROJECTS</h1>
								<p class="f6 f5-l tc">Our Work History</p>
							</div>
						</div>

						<div class="cf pb3 w-100">

							<div class="fl pa2 dib w-100 w-50-ns">
								<article class="dib center black bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
									<div class="tc">
										<h1 class="f4">Springs Town Council</h1>
										<hr class="mw3 bb bw1 b--black-10"/>
									</div>
									<p class="lh-copy measure center f6 black-70">
										Construction of RDP’s houses in Ext. 6, Kwa-Thema
									</p>
									<p class="lh-copy measure center f6 black-70">
										Year: <b>2008</b> - Duration: <b>04 Months</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										Value: <b>R  300 000.00</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										<b>Reference:</b> <br/>Cato Consulting Engineer’s Contact: Mpho Mohapa – 083 321 0629
									</p>
								</article>
							</div>

							<div class="fl pa2 dib w-100 w-50-ns">
								<article class="dib center black bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
									<div class="tc">
										<h1 class="f4">Xazulula Construction Company</h1>
										<hr class="mw3 bb bw1 b--black-10"/>
									</div>
									<p class="lh-copy measure center f6 black-70">
										Renovation of RDP houses in Kwa-Thema
									</p>
									<p class="lh-copy measure center f6 black-70">
										Year: <b>2009</b> - Duration: <b>08 Months</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										Value: <b>R  500 000.00</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										<b>Reference:</b> <br/>Consultant Engineer’s Contact: Mpho Mohapa – 083 321 0629
									</p>
								</article>
							</div>

							<div class="fl pa2 dib w-100 w-50-ns">
								<article class="dib center black bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
									<div class="tc">
										<h1 class="f4">Ekurhuleni Metropolitan Council</h1>
										<hr class="mw3 bb bw1 b--black-10"/>
									</div>
									<p class="lh-copy measure center f6 black-70">
										Upgrade of toilet facilities at Brakpan Fire Station
									</p>
									<p class="lh-copy measure center f6 black-70">
										Year: <b>2010</b> - Duration: <b>03 Months</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										Value: <b>R  200 000.00</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										<b>Reference:</b> <br/>Inspector Precious Khanyi – (011)360-2408
									</p>
								</article>
							</div>


							<div class="fl pa2 dib w-100 w-50-ns">
								<article class="dib center black bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
									<div class="tc">
										<h1 class="f4">Impala Platinum Refineries</h1>
										<hr class="mw3 bb bw1 b--black-10"/>
									</div>
									<p class="lh-copy measure center f6 black-70">
										Renovation and upgrading of Daveyton Main Clinic
									</p>
									<p class="lh-copy measure center f6 black-70">
										Year: <b>2014</b> - Duration: <b>03 Months</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										Value: <b>R  250 000.00</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										<b>Reference:</b> <br/>Gillian Seane Tel: (011)360-3302
									</p>
								</article>
							</div>

							<div class="fl pa2 dib w-100">
								<article class="dib center black bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
									<div class="tc">
										<h1 class="f4">Impala Platinum Refineries</h1>
										<hr class="mw3 bb bw1 b--black-10"/>
									</div>
									<p class="lh-copy measure center f6 black-70">
										General Construction maintenance e.g excavations brickwork, glazing carpentry, concrete work, tiling, tar work pipe laying etc as and when and on required basis
									</p>
									<p class="lh-copy measure center f6 black-70">
										Year: <b>2013</b> - Duration: <b>On continous basis</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										Value: <b>As per quote required</b>
									</p>
									<p class="lh-copy measure center f6 black-70">
										<b>Reference:</b> <br/>Mr. S.C. Colyn Tel: 011 360 3440
									</p>
								</article>
							</div>


						</div>
					</div>
				</div>

			</section>
		)
	}
}

export default page;
