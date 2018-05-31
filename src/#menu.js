var m = require("mithril");
import Icons from './#icons.js';

// export function menu() {
// 	m.render(document.getElementById('appMenu'), m(menu))
// }

export var menu = {
	color:"red",
	oninit: function() {},
	linkItem : {
		view: function(vnode) {
			return(
				<a class="link" href={vnode.attrs.href}>
					<li class="tc" onclick={menu.toggle}>
						<p class="ph2 pv4 mv0 black hover-red dim bt b--near-white">
							{vnode.children}
						</p>
					</li>
				</a>
			)
		}
	},
	menuItem : {
		view: function(vnode) {
			return(
				<a class="link f5" oncreate={m.route.link} href={vnode.attrs.href}>
					<li class="tc" onclick={menu.toggle}>
						<p class="ph2 pv4 mv0 black hover-red dim bt b--near-white">
							{vnode.children}
						</p>
					</li>
				</a>
			)
		}
	},
	toggle: function() {
		var appmenuToggle = document.getElementById("menuToggle");
		var appmenuCover = document.getElementById("menuCover");
		appmenuCover.classList.toggle('dn');
		appmenuToggle.classList.toggle('animated');
		appmenuToggle.classList.toggle('bounceInRight');

		// document.getElementById("nav").classList.toggle('dn');
		// document.getElementById("menuBlur").classList.toggle('vh-100');
		document.getElementById("html").classList.toggle('overflow-hidden');
	},
	view: function(vnode) {
		return (
			<section id="menuBlur" class="z-max w-100 fixed">
				<div id="menuCover"  class=" absolute right-0 w-100 vh-100 fr dn navy pa0" style="">
					<ul id="menuToggle" class="fr list pl0 w-80 w-40-m w-20-l bl b--near-white bg-white vh-100 ma0 overflow-scroll" style="">
						<li class="tr">
							<p class="ph2 mv0 gray hover-red">
								<Icons name="cancel" class=" mh2 mv3 h1 dim dib navy" onclick={menu.toggle}/>
							</p>
						</li>

						{m(menu.linkItem,{href:"/login",icon:"user"},"Login")}
					</ul>
				</div>

				<nav id="nav" class="fl w-100 bg-white black z-5 ph2 " >
					<div class="w-100 mw9 ph5-l fl">

						<a class="link" href="/">
							<img class="fl f5 ma2 tracked fw5" src="../../assets/img/logo.png" height="40px"/>
						</a>
						<Icons name="menu" class="fr mr2 mv3 h1 dib dn-ns black " onclick={menu.toggle}/>

						<nav class="fr mv3 dn dib-ns">
						  <a class=" ph2 ph3-l ttu link tracked dark-gray f6 dib " href="/login">Login</a>
						</nav>
					</div>
				</nav>
			</section>
		)
	}
}

export default menu;
