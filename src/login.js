import m from 'mithril';
import {validateSubmit} from './#validateSubmit.js';

var action = {
	Submit: function() {
		var actionFields = [
			{validationType : '', fieldID : 'username'},
			{validationType : '', fieldID : 'password'},
		]
		validateSubmit( "/api/login", actionFields);
	},
};



var page = {
	oninit:function(vnode){ },
	view:function(vnode){
		return (
			<section class="bg-black min-vh-100">
				<div id="appAlert"></div>
				<section class="mw9-ns center pa2 white-90 flex flex-row justify-center">

				<div class="dib mv4 w-90 w-60-m w-30-l">
					<div class="mv4-l mv3 w-100 tc">
						<a href="/" oncreate={m.route.link} class="no-underline pointer">
							<img height="100px"  src="../../assets/img/logo.png" class="cf"/>
						</a>
					</div>

					<div class=" ph3 w-100  br2 ">
						<div class="f6 avenir cf">

							<div class="pb3 f5 tracked fw5">
								Welcome back!
							</div>

							<input type="hidden" id="action"/>

							<small class="fw6">Username</small>
							{m("div", {class:"br1  b--white shadow-1"} ,m("input",{ type:"text", style:"background-color: #37a0d7;", class: "w-100  white-90 bw0 br1 pa2 f6", id:"username",
								oninput: m.withAttr("value",function(value) {page.Username = value}),
								onkeyup: function(event) {if(event.key=="Enter"){action.Submit()}}
							 }))}

							 <div class="cf mv2"></div>

							<small class="fw6">Password</small>
							{m("div", {class:"br1  b--white shadow-1"} ,m("input",{ type:"password", style:"background-color: #37a0d7;", class: "w-100  white-90 bw0 br1 pa2 f6", id:"password",
								oninput: m.withAttr("value",function(value) {page.Password = value}),
								onkeyup: function(event) {if(event.key=="Enter"){action.Submit()}}
							 }))}

							 <div class="cf mv2"></div>

							<div class="pv3 tc">
								<span class="btnPrimary white-90 shadow-4 pointer fl w-100 dim pv3 br1" onclick={action.Submit}>Log me in » </span>
							</div>
							<div class="cf mv2"></div>

							<div class="tc pv2">
								<small>
									<a href="/forgot" oncreate={m.route.link} class="near-white no-underline ph1 br1">Forgot your password?</a>
								</small>
							</div>
						</div>
					</div>

					<div class="w-100 pv2 cf tc f6">
					  <small class="tc near-white">
							<a class="near-white no-underline br1 ph1" oncreate="{m.route.link}" href="/privacy">
								Privacy Policy
							</a>&nbsp; - <a class="near-white no-underline br1 ph1" oncreate="{m.route.link}" href="/terms">
								Terms of use
							</a>
				    </small>
					</div>

				</div>
				</section>
			</section>
		)
	}
}

export default page;
