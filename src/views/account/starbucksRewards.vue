<template>
	<div>
		<article class="wrapper">
			<nav class="nav">
				<nav-container v-on:showMenuOverlay="showMenuExec" v-show="!show_menu_bol">
					<span slot="navbody">
						<section class="navbody-menu body">
							<div class="accountbtn menubtn account">
								<h2 v-if="!isLogin">登录或创建一个新帐户 🌟 </h2>
								<ul v-if="!isLogin">
									<li @click="pageRedir(2, 'login')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'login'}">
											登录
										</a>
									</li>
									<li @click="pageRedir(4, 'register')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'register'}">
											注册
										</a>
									</li>
									<li @click="pageRedir(5, 'starbucks-rewards')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'starbucks-rewards'}">
											关于星享俱乐部
										</a>
									</li>
								</ul>
								<h2 v-if="isLogin">
									<span class="welcome">{{hello}}</span>
									<span class="nickname">{{NickName}}</span>
									&nbsp;☕
								</h2>
								<ul v-if="isLogin">
									<li @click="pageRedir(2, 'account')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'account'}">
											账户一览
										</a>
									</li>
									<li @click="pageRedir(6, 'activity')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'activity'}">
											消费记录
										</a>
									</li>
									<li @click="pageRedir(7, 'rewards')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'rewards'}">
											星享好礼
										</a>
									</li>
									<li @click="pageRedir(8, 'profile')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'profile'}">
											管理我的账户
										</a>
									</li>
									<li @click="pageRedir(5, 'starbucks-rewards')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'starbucks-rewards'}">
											关于星享俱乐部
										</a>
									</li>
								</ul>
							</div>
						</section>
					</span>
				</nav-container>
				<nav-overlay v-on:closeMenuOverlay="closeMenuExec" v-show="show_menu_bol">
				</nav-overlay>
				<nav-mobile v-on:showMenuOverlay="showMenuExec"></nav-mobile>
			</nav>
			<article class="content" v-if="lgMedia || !show_menu_bol">
				<div class="tag-ad">广告</div>

				<!-- hero -->
				<section class="intro-sbux-rewards-top">
					<a href="javascript:;" class="intro-poster-tablet tablet-show mobile-hidden">
						<img src="/static/images/sbux-rewards/header_cn-rewards.jpg" alt="">
					</a>
					<a href="javascript:;" class="intro-poster-mobile tablet-hidden mobile-show">
						<img src="/static/images/sbux-rewards/header_cn_mobile.jpg" alt="">
					</a>
				</section>

				<!-- 1 -->
				<section class="new-sbux-rewards bg-dark">
					<div class="wrapper">
						<div class="rewards-title">
							<img src="/static/images/sbux-rewards/01-new-rewards-title.png" alt="" class="tablet-show mobile-hidden">
							<img src="/static/images/sbux-rewards/01-new-rewards-title-mobile.png" alt="" class="tablet-hidden mobile-show">
						</div>
						<div class="rewards-content clearfix">
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/new-rewards-1.png" alt="">
								</div>
								<div class="item-content">
									<h2>消费累积星星</h2>
									<p>
										每累计消费￥50元累积一颗星星
										<br>
										使用星巴克中国App内星礼卡支付，
										<br>
										每累计消费￥40元积一颗星星
										<br>
										(比其他支付方式积星快25%）
									</p>
								</div>
							</div>
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/new-rewards-2.png" alt="">
								</div>
								<div class="item-content">
									<h2>积星升级 好礼享不停</h2>
								</div>
							</div>
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/new-rewards-3.png" alt="">
								</div>
								<div class="item-content">
									<h2>会员专享星星奖励活动</h2>
								</div>
							</div>
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/new-rewards-4.png" alt="">
								</div>
								<div class="item-content">
									<h2>星星兑换丰富好礼</h2>
								</div>
							</div>
						</div>
						<div class="rewards-tips">
							<p class="white">
								详情以<a href="javascript:;" class="ga-msr-intro-terms">《星享俱乐部活动的条款和条件》</a>的规定为准
							</p>
						</div>
					</div>
				</section>
				<div class="bg-dark">
					<img src="/static/images/sbux-rewards/bg-banner-01.png" alt="">
				</div>

				<!-- 2 -->
				<section class="member-upgrade bg-grey">
					<div class="wrapper">
						<div class="rewards-title">
							<img src="/static/images/sbux-rewards/02-member-upgrade-title.png" alt="" class="tablet-show mobile-hidden">
							<img src="/static/images/sbux-rewards/02-member-upgrade-title-mobile.png" alt="" class="tablet-hidden mobile-show">
						</div>
						<div class="rewards-content clearfix">
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/1star.png" alt="" class="tablet-show mobile-hidden">
									<img src="/static/images/sbux-rewards/1star-mobile.png" alt="" class="tablet-hidden mobile-show">
								</div>
								<div class="item-content">
									<p>
										免费注册星享俱乐部帐户
										<br>
										即成为<b class="silver">银星级</b>会员
										<br>
										可开始消费积星星
									</p>
								</div>
							</div>
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/4stars.png" alt="" class="tablet-show mobile-hidden">
									<img src="/static/images/sbux-rewards/4stars-mobile.png" alt="" class="tablet-hidden mobile-show">
								</div>
								<div class="item-content">
									<p>
										累积<b>4</b>颗星星
										<br>
										升级至<b class="green">玉星级</b>会员
									</p>
								</div>
							</div>
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/20stars.png" alt="" class="tablet-show mobile-hidden">
									<img src="/static/images/sbux-rewards/20stars-mobile.png" alt="" class="tablet-hidden mobile-show">
								</div>
								<div class="item-content">
									<p>
										玉星级
										<br>
										再累积<b>16</b>颗星星
										<br>
										升级至<b class="gold">金星级</b>会员
									</p>
								</div>
							</div>
						</div>
						<div class="rewards-tips">
							<p>
								详情以<a href="javascript:;" class="ga-msr-intro-terms">《星享俱乐部活动的条款和条件》</a>的规定为准
							</p>
						</div>
					</div>
				</section>
				<div class="bg-grey">
					<img src="/static/images/sbux-rewards/bg-banner-02.png" alt="">
				</div>

				<!-- 3 -->
				<section class="member-gift bg-light-grey">
					<div class="wrapper">
						<div class="rewards-title">
							<img src="/static/images/sbux-rewards/03-member-gift-title.png" alt="" class="tablet-show mobile-hidden">
							<img src="/static/images/sbux-rewards/03-member-gift-title-mobile.png" alt="" class="tablet-hidden mobile-show">
						</div>
						<div class="rewards-content clearfix">
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/welcome-star-cn.png" alt="">
									<span></span>
								</div>
								<div class="item-content">
									<ul>
										<li>各类奖励星星活动</li>
										<li>购买绑定100元及以上星礼卡可直通玉星级</li>
										<li>购买绑定会员星礼包可直通玉星级</li>
									</ul>
								</div>
							</div>
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/green-star-cn.png" alt="">
									<span></span>
								</div>
								<div class="item-content">
									<ul>
										<li>各类奖励星星活动</li>
										<li>玉星晋级饮品券</li>
										<li>金星在望饮品券</li>
										<li>生日饮品券</li>
										<li>永享玉星级保级</li>
									</ul>
								</div>
							</div>
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/gold-star-cn.png" alt="">
									<span></span>
								</div>
								<div class="item-content">
									<ul>
										<li>各类奖励星星活动</li>
										<li>金星晋级饮品券</li>
										<li>周年庆饮品券</li>
										<li>生日饮品券</li>
										<li>永享玉星级保级</li>
										<li>好礼星星兑换饮品</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="rewards-tips">
							<p>
								详情以<a href="javascript:;" class="ga-msr-intro-terms">《星享俱乐部活动的条款和条件》</a>的规定为准
							</p>
						</div>
					</div>
				</section>
				<div class="bg-light-grey">
					<img src="/static/images/sbux-rewards/bg-banner-03.png" alt="">
				</div>

				<!-- 4 -->
				<section class="member-package bg-grey">
					<div class="wrapper">
						<div class="rewards-title">
							<img src="/static/images/sbux-rewards/04-member-package-title.png" alt="" class="tablet-show mobile-hidden">
							<img src="/static/images/sbux-rewards/04-member-package-title-mobile.png" alt="" class="tablet-hidden mobile-show">
						</div>
						<div class="rewards-content">
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/srkit-mobile.png" alt="">
								</div>
							</div>
							<div class="item">
								<div class="item-image">
									<img src="/static/images/sbux-rewards/coupon-zh.png" alt="">
								</div>
							</div>
							<div class="item">
								<div class="item-content">
									<ul>
										<li class="title">
											<h3>选购会员星礼包，丰富好礼随心享：</h3>
										</li>
										<li>
											6张电子好礼券<small>*</small>，适用多种商品种类
										</li>
										<li>
											附赠一张精美星礼卡<small>**</small>，可绑定至星巴克中国App 内充值并支付，享受每消费40元累积1颗星星的专属优惠
										</li>
										<li>银星级会员初次将会员星礼包成功绑定至帐户后，即可升级成为玉星级会员</li>
									</ul>
									<p class="small">
										<small>* 每份券将在添加至您的星享俱乐部帐户的当天生效，有效期为90天。</small>
										<br>
										<small>** 附赠星礼卡的初始余额为0元。</small>
									</p>
								</div>
							</div>
						</div>
						<div class="rewards-tips">
							<p>
								详情以<a href="javascript:;" class="ga-msr-intro-terms">《星享俱乐部活动的条款和条件》</a>的规定为准
							</p>
						</div>
					</div>
				</section>
				<div class="bg-grey">
					<img src="/static/images/sbux-rewards/bg-banner-04.png" alt="">
				</div>

				<!-- 5 -->
				<section class="member-star-acquire bg-dark">
					<div class="wrapper">
						<div class="rewards-title">
							<img src="/static/images/sbux-rewards/05-member-star-acquire-title.png" alt="" class="tablet-show mobile-hidden">
							<img src="/static/images/sbux-rewards/05-member-star-acquire-title-mobile.png" alt="" class="tablet-hidden mobile-show">
						</div>
						<div class="rewards-content">
							<div class="item">
								<h2>更多渠道</h2>
								<div class="item-content">
									<div class="padded">
										<img src="/static/images/sbux-rewards/ic_store.png" alt="">
										<p>星巴克门店</p>
									</div>
									<div class="padded">
										<img src="/static/images/sbux-rewards/ic_MOD.png" alt="">
										<p>专星送™<small>***</small></p>
									</div>
									<div class="padded">
										<img src="/static/images/sbux-rewards/ic_3rdparty.png" alt="">
										<p>第三方平台</p>
									</div>
								</div>
							</div>
							<div class="item">
								<h2>更多方式</h2>
								<div class="item-content">
									<div class="padded">
										<img src="/static/images/sbux-rewards/ic_app.png" alt="">
										<p>星巴克中国App支付</p>
									</div>
									<div class="padded">
										<img src="/static/images/sbux-rewards/ic_starrewards.png" alt="">
										<p>各种星星奖励活动</p>
									</div>
								</div>
							</div>
						</div>
						<div class="rewards-tips">
							<p class="white">
								详情以<a href="javascript:;" class="ga-msr-intro-terms">《星享俱乐部活动的条款和条件》</a>的规定为准
							</p>
							<p class="white">
								<small>*** 专星送™ 目前仅通过部分渠道完成的专星送™订单可累积星星</small>
							</p>
						</div>
					</div>
				</section>
				<div class="bg-dark">
					<img src="/static/images/sbux-rewards/bg-banner-05.png" alt="">
				</div>

				<!-- 6 -->
				<section class="member-join bg-grey">
					<div class="wrapper">
						<div class="rewards-title">
							<img src="/static/images/sbux-rewards/06-member-join-title.png" alt="" class="tablet-show mobile-hidden">
							<img src="/static/images/sbux-rewards/06-member-join-title-mobile.png" alt="" class="tablet-hidden mobile-show">
						</div>
						<div class="rewards-content">
							<div class="item">
								<h2>现在就来加入星享俱乐部</h2>
								<p>
									轻松注册，立即开启
									<br>
									您的星享之旅，好礼享不停。
								</p>
								<a href="javascript:;" class="button" @click="pageRedir(4)" v-if="!isLogin">立即注册</a>
							</div>
							<div class="item">
								<h2>已是星享俱乐部的会员</h2>
								<p>
									登录后即可绑定会员星礼包或星礼卡，
									<br>
									查看帐户详情
								</p>
								<a href="javascript:;" class="button" @click="pageRedir(2)" v-if="!isLogin">立即登录</a>
							</div>
						</div>
						<div class="rewards-tips">
							<p>
								详情以<a href="javascript:;" class="ga-msr-intro-terms">《星享俱乐部活动的条款和条件》</a>的规定为准
							</p>
						</div>
					</div>
				</section>
				<div class="bg-grey">
					<img src="/static/images/sbux-rewards/bg-banner-06.png" alt="">
				</div>

				<!-- 7 -->
				<section class="member-faq">
					<div class="wrapper">
						<div class="rewards-title">
							<img src="/static/images/sbux-rewards/07-member-faq-title.png" alt="" class="tablet-show mobile-hidden">
							<img src="/static/images/sbux-rewards/07-member-faq-title-mobile.png" alt="" class="tablet-hidden mobile-show">
						</div>
						<div class="rewards-content">
							<div class="item">
								<a href="javascript:;" class="header" @click="toggleIcon(0)" :class="{'showArticle': showArticle[0]}">
									<img src="/static/images/sbux-rewards/faq-part-1.svg" alt="">
									<h2>加入星享俱乐部</h2>
								</a>
								<div class="body">
									<div class="container">
										<p>1.1&nbsp;&nbsp;&nbsp;什么是星享俱乐部？</p>
							          	<p class='padding-2em'>星享俱乐部是星巴克推出的顾客忠诚计划。您可以通过注册星享俱乐部帐户成为星享俱乐部会员，并通过消费累积“星星”、享受会员权益。</p>
							          	<p>1.2&nbsp;&nbsp;&nbsp;如何加入星享俱乐部？</p>
							          	<p class='padding-2em'>您可以通过星巴克中国移动应用（以下简称“<b>星巴克App</b>”）或者在2018年12月14日以后通过星巴克指定的第三方合作伙伴（以下简称“<b>合作伙伴</b>”）的渠道（例如：通过淘宝App内的“星巴克中国”新零售智慧门店页面），按照相关指引注册星享俱乐部帐户。自您成功注册了星享俱乐部帐户之日（以下简称“<b>帐户注册日</b>”）起，您就成为了星享俱乐部会员（以下简称“<b>会员</b>”）。</p>
							          	<p>1.3&nbsp;&nbsp;&nbsp;通过星巴克App和通过其他渠道加入星享俱乐部有什么不同？</p>
							          	<p class='padding-2em'>没有不同。无论您是通过星巴克App或者通过其他渠道加入星享俱乐部，您都可以享受到相同的会员权益。</p>
							          	<p>1.4&nbsp;&nbsp;&nbsp;2018年12月5日及以后加入星享俱乐部的新会员和此前已加入星享俱乐部的老会员，所享受的会员权益有什么不同？</p>
							          	<p class='padding-2em'>对于在2018年12月5日及以后加入星享俱乐部的新会员，他们将根据2018年12月5日起生效的《星享俱乐部活动的条款和条件》（以下简称“<b>新版星享俱乐部制度</b>”）的规定享受会员权益。</p>
							          	<p class='padding-2em'>对于在2018年12月5日之前已加入星享俱乐部的老会员，我们会在2018年12月5日按照《新、旧版<星享俱乐部活动的条款和条件>的衔接安排》（以下简称“衔接安排”）和新版星享俱乐部制度的规定，对已有会员的等级、好礼、星星等进行保留或调整。除非衔接安排另有不同的规定，新、老会员享受相同的会员权益。</p>
							          	<p>1.5&nbsp;&nbsp;&nbsp;如何登录和使用我的星享俱乐部帐户？</p>
							          	<p class='padding-2em'>您可以在星巴克App或合作伙伴的App上登录您的星享俱乐部帐户，消费积星、查看会员等级、星星和好礼、使用好礼或好礼星星等。通过不同渠道可使用的星享俱乐部帐户的功能以该渠道届时开放的实际功能为准。</p>
									</div>
								</div>
							</div>
						</div>
						<div class="rewards-content">
							<div class="item">
								<a href="javascript:;" class="header" @click="toggleIcon(1)" :class="{'showArticle': showArticle[1]}">
									<img src="/static/images/sbux-rewards/faq-part-2.svg" alt="">
									<h2>会员等级和好礼</h2>
								</a>
								<div class="body">
									<div class="container">
										<p>2.1&nbsp;&nbsp;&nbsp;星星有什么用？</p>
          								<p class='padding-2em'>在成功注册星享俱乐部帐户后，您每次在参加星享俱乐部活动的星巴克门店或通过星巴克App以及星巴克不时指定的其他渠道购买产品（不包括星礼卡、月饼、星冰粽等产品，详见本问答第2.4问，以下简称“<b>除外商品</b>”）时，可以在您的星享俱乐部帐户中累积星星。</p>
          								<p class='padding-2em'>星星分为等级星星和好礼星星。“<b>等级星星</b>”是指用于确定会员等级的积分。当等级星星累积达到一定的数量时，您将从银星级会员升级为玉星级会员或者从玉星级会员升级为金星级会员，并且可以享受该等级所对应的会员礼遇。“<b>好礼星星</b>”是指金星级会员专享的可用于兑换中杯手工调制饮品或指定食品的积分。</p>
          								<p>2.2&nbsp;&nbsp;&nbsp;如何获得和累积星星？</p>
          								<p class='padding-2em'>在您注册星享俱乐部帐户之后，您每次到参加星享俱乐部活动的星巴克门店、通过星巴克App以及星巴克不时指定的其他渠道购买产品（不包括除外商品）时，您可以在星巴克App上登录您的星享俱乐部帐户，点击帐户首页“我的二维码”后，向店内咖啡师出示页面上所呈现的动态二维码，或者出示您星享俱乐部帐户中的任意一张星礼卡或星享卡活跃卡，当POS机具成功读取动态二维码、或星礼卡或星享卡活跃卡时，您的购买金额就将记录在您的星享俱乐部帐户中。</p>
          								<p class='padding-2em'>当您将星礼卡绑定至您的星享俱乐部帐户中，并通过星巴克App扫描该星礼卡的动态二维码付款（以下简称“<b>星礼卡移动支付</b>”）的情况下，您支付的购买金额除以40并按四舍五入保留到小数点后第四位的结果，即为可记录在您帐户中的等级星星和好礼星星（若您当时是金星级会员）的数量；当您使用其他的有效付款方式付款的情况下，您支付的购买金额除以50，并按四舍五入保留到小数点后第四位的结果，即为可记录在您帐户中的等级星星和好礼星星（若您当时是金星级会员）的数量。星星会在交易完成后的24小时内记录在您的星享俱乐部帐户中。</p>
          								<p class='padding-2em'>请注意，如果因各种原因而导致购买未成功，例如产生了纠纷或者您退回了所买的产品，那么星巴克将有权撤销您帐户里因为此次购买而获得的相应数量的星星。</p>
          								<p>2.3&nbsp;&nbsp;&nbsp;在哪些渠道消费可以累积星星？</p>
          								<p class='padding-2em'>前往参加星享俱乐部活动的星巴克门店购买产品（不包括除外商品），以及通过星巴克App使用星巴克“专星送”网络订餐服务（不包括订单的外送费）均可累积星星。</p>
          								<p>2.4&nbsp;&nbsp;&nbsp;哪些产品的购买金额不能被计入到星享俱乐部帐户中以累积星星？</p>
          								<p class='padding-2em'>购买会员星礼包、星礼卡（含为星礼卡充值的金额）、购买星冰粽、月饼、各类星巴克礼品券、兑换券的金额不能被计入到星享俱乐部帐户中；享受优惠或折扣的大宗商品购买的金额不能被计入到星享俱乐部帐户中。您在星巴克天猫旗舰店、用星说平台等线上渠道购买预付卡券时，消费额不可以计入到星享俱乐部帐户中，但使用上述预付卡券在星巴克门店以及星巴克指定的渠道购买或兑换产品时，相应的消费额可以计入到星享俱乐部帐户中。任何形式的赠饮（例如您通过参加信用卡“买一赠一”推广活动、信用卡积分兑换饮品活动或凭兑换券获赠的饮品）均不视为购买，无法在星享俱乐部帐户中累积星星。此外，星巴克有权不时指定不能计入到星享俱乐部帐户中累积星星的产品购买。</p>
          								<p>2.5&nbsp;&nbsp;&nbsp;星星会过期吗？</p>
          								<p class='padding-2em'>等级星星：如您是银星级会员，自帐户注册日起，如您未在连续三个日历月内累积满4颗等级星星或满足其他符合升级条件的话，您帐户中所累积的等级星星将在连续三个日历月届满后被清零。</p>
          								<p class='padding-2em'>如您是玉星级或金星级会员，您帐户中所累积的等级星星在您星享俱乐部帐户的每个帐户周年复审日被清零。帐户周年复审日指的是您从银星级会员升级成为玉星级会员、或从银星级会员直接升级成为金星级会员之日起，每满12个日历月的周年日。</p>
          								<p class='padding-2em'>好礼星星：如您是金星级会员，您帐户中所累积的好礼星星将在其记入帐户之日起生效，并在记入帐户后的下一个公历年度的同一个月份的最后一天到期失效并被清除；但是，如您在某帐户周年复审日起被降至玉星级，那么您帐户中所累积的全部好礼星星也将在该帐户周年复审日到期失效并被清除。</p>
          								<p class='padding-2em'>例如：假如金星级会员王女士的星享俱乐部帐户中在2020年4月1日累积了1颗好礼星星，该好礼星星应于2021年4月30日到期失效并被清除。但如果王女士在2021年3月9日的帐户周年复审日被降为玉星级会员，那么在2020年4月1日记入她星享俱乐部帐户中的这1颗好礼星星将在该帐户周年复审日当天到期失效并被清除。</p>
          								<p>2.6&nbsp;&nbsp;&nbsp;如何升级我的会员等级？</p>
          								<p class='padding-2em'>在您成功注册星享俱乐部帐户后，您即成为银星级会员。自帐户注册日起，当您的星享俱乐部帐户在连续三个日历月中累积满4颗等级星星时，您就可以晋升为玉星级会员；同时，您星享俱乐部帐户中将被清除4颗等级星星，剩余的等级星星（若有）将被保留。</p>
          								<p class='padding-2em'>此外，银星级会员也可以通过其他方式升级，例如：当银星级会员的帐户中首次绑定一份会员星礼包或余额不小于人民币100元的星礼卡时，银星级会员也可以晋升为玉星级会员。在升级完成时，银星级会员帐户中所累积的全部等级星星将被清零。</p>
          								<p class='padding-2em'>当玉星级会员在一个帐户周年内累积满16颗等级星星时，就可以晋升为金星级会员。</p>
          								<p>2.7&nbsp;&nbsp;&nbsp;如何保留我的玉星级会员等级？</p>
          								<p class='padding-2em'>一旦您成为玉星级会员，在您的星享俱乐部帐户存续期间，您不会被降级为银星级会员；但如果您退回了您购买的商品或发生其他导致您不符合晋升至玉星级的条件时，星巴克有权在相关购买被撤销的当日，将您从玉星级降级至银星级。</p>
          								<p>2.8&nbsp;&nbsp;&nbsp;如何保留我的金星级会员等级？</p>
          								<p class='padding-2em'>星巴克会在您的星享俱乐部帐户的每个帐户周年复审日，检查您帐户在前一个帐户年度中所累积的等级星星数量。如果等级星星数量大于或等于16颗，您会在接下来的一个帐户年度保留在金星级会员等级。请见以下示例：</p>
          								<p class='padding-2em'>
          								<ul class='padding-2em'>
            								<li>2019年3月10日，小赵晋升为玉星级会员；</li>
            								<li>2019年7月19日，小赵成功累积16颗等级星星，晋升为金星级会员；</li>
            								<li>2020年3月10日，星巴克会检查小赵帐户在前一个帐户年度中所累积的等级星星数量。如果所累积的等级星星数量大于或等于16颗，那么小赵可以在2020年3月10日至2021年3月9日期间继续保留在金星级会员等级；但如果所累积的等级星星数量小于16颗，那么小赵会在2020年3月10日当日被降至玉星级。2020年3月10日当天，小赵帐户内所累积的所有等级星星也被同时清零。</li>
          								</ul>
          								</p>
          								<p>2.9&nbsp;&nbsp;&nbsp;什么是金星级会员专属电子星礼卡？我该如何使用？</p>
          								<p class='padding-2em'>在星享俱乐部会员首次成为金星级会员时，一张金星级专属电子星礼卡会在您晋升为金星级会员后的24小时内自动绑定至您的星享俱乐部帐户，并作为您帐户内的默认星礼卡。金星级专属电子星礼卡是一种可充值的预付费卡。该卡完成充值后，您在中国大陆地区的指定星巴克门店消费时，可以使用星礼卡付款（您可以查阅《星礼卡常见问题》以了解使用星礼卡的更多详情）。</p>
          								<p>2.10&nbsp;&nbsp;&nbsp;哪里可以兑换我星享俱乐部帐户中的好礼？</p>
          								<p class='padding-2em'>光顾中国大陆地区任何一家参加星享俱乐部活动的星巴克门店时，您可以在星巴克App登录您的星享俱乐部帐户，点击帐户首页“我的二维码”后，向店内咖啡师出示页面上所呈现的动态二维码、或者出示您星享俱乐部帐户中的任意一张星礼卡或星享卡活跃卡，当POS机具成功读取动态二维码、星礼卡或星享卡活跃卡时，您即可兑换使用帐户中的会员好礼电子券。此外，您也可以通过合作伙伴的渠道登录星享俱乐部帐户，当店内咖啡师通过该渠道指定的方式得以识别您的会员身份后，您即可兑换使用帐户中的会员好礼电子券。</p>
          								<p class='padding-2em'>请您注意，您无法在星巴克臻选上海烘焙工坊、星巴克臻选北京坊店、星巴克臻选上海世茂广场店等星巴克不时指定的门店（以下简称“不可使用会员好礼的门店”）使用星享俱乐部帐户中的会员好礼。此外，除非部分会员好礼的使用规则另有相反的说明，会员好礼不能在星巴克专星送线上订餐服务中使用。</p>
          								<p class='padding-2em'>请您留意您星享俱乐部帐户中好礼的使用期限，并在使用期限内使用好礼。如有疑问请致电我们的客服热线400-820-6998寻求帮助。</p>
          								<p class='padding-2em'>为保护星享俱乐部帐户的安全，星巴克门店不接受本常见问题解答中没有规定的其他方式使用星享俱乐部帐户及/或星享卡（包括但不限于：对实体星享卡上的条形码、二维码等进行拍摄或扫描获得的照片，以及通过第三方软件呈现或生成于第三方软件的条形码、二维码等）。</p>
          								<p>2.11&nbsp;&nbsp;&nbsp;玉星级会员如何获得玉星晋级饮品券？</p>
          								<p class='padding-2em'>为庆祝您晋级，当您从银星级升至玉星级时，星巴克会在24小时内将一张免费的玉星晋级饮品券（采用电子券的形式）添加到您的星享俱乐部帐户中。此电子券将在添加至您的星享俱乐部帐户后的次日起生效，有效期为7天。在您的星巴克帐户存续期间，您只能获得一次玉星晋级饮品券。</p>
          								<p>2.12&nbsp;&nbsp;&nbsp;玉星级/金星级会员如何获得生日饮品券？</p>
          								<p class='padding-2em'>为庆祝您的生日，在您成为玉星级会员后的每个帐户周年复审日，如果您的星享俱乐部帐户在上一个帐户年度内通过购买累积满了1颗等级星星（不包括奖励星星），那么星巴克会在该帐户周年复审日，将一张免费的生日饮品券（采用电子券的形式）添加到您的星享俱乐部帐户中。此电子券将在您的下一个生日当天生效，有效期为7天。在一个帐户年度内，您只能获得一次生日饮品券。</p>
          								<p>2.13&nbsp;&nbsp;&nbsp;玉星级会员如何获得金星在望饮品券？</p>
          								<p class='padding-2em'>在您从银星级会员首次升级成为玉星级会员之后，当您的星享俱乐部帐户中首次累积满了8颗等级星星时，星巴克会在24小时内将一张免费的金星在望饮品券（采用电子券的形式）添加到您的星享俱乐部帐户中。此电子券将在添加至您的星享俱乐部帐户后的次日起生效，有效期为7天。</p>
          								<p>2.14&nbsp;&nbsp;&nbsp;金星级会员如何获得金星晋级饮品券？</p>
          								<p class='padding-2em'>为庆祝您晋级，当您每次从玉星级会员升级成为金星级会员时，我们均会在24小时内将一张免费的金星晋级饮品券（采用电子券的形式）添加到您的星享俱乐部帐户中。此电子券将在添加至您的星享俱乐部帐户后的次日起生效，有效期为7天。在一个帐户年度内，您只能获赠一次金星晋级饮品券。</p>
          								<p>2.15&nbsp;&nbsp;&nbsp;金星级会员如何获得周年庆邀请券？</p>
          								<p class='padding-2em'>为庆祝您的帐户周年日，如果您在某一帐户周年复审日之前的帐户年度内累积满了16颗等级星星，我们会在该帐户周年复审日将一张免费的周年庆饮品券（采用电子券的形式）添加到您的星享俱乐部帐户中。此电子券将在添加到您的星享俱乐部帐户中后的下一个帐户周年复审日生效，有效期为7天。</p>
          								<p>2.16&nbsp;&nbsp;&nbsp;与饮品相关的会员好礼是否可用于兑换星巴克门店内的所有饮品？</p>
          								<p class='padding-2em'>星享俱乐部会员好礼及其他活动受<a href='javascript:;'>www.starbucks.com.cn</a>网站所示的完整版本的《星享俱乐部活动的条款和条件》的约束。星享俱乐部帐户中赠送的所有会员好礼不能在不可使用会员好礼的门店中使用，也不能用于兑换特定的星巴克饮品（即：星巴克指定的不能使用星享俱乐部帐户中好礼兑换的饮品，包括但不限于瓶装水、瓶装饮料等预包装饮品、星巴克臻选咖啡、虹吸壶冲泡咖啡、星巴克气致冷萃系列饮品和星巴克咖啡融合冰淇淋系列产品等）。</p>
          								<p>2.17&nbsp;&nbsp;&nbsp;金星级会员如何使用好礼星星？</p>
          								<p class='padding-2em'>如您帐户中累积的有效的好礼星星达到9颗或以上，您可在参加星享俱乐部活动的星巴克门店（不包括不可使用会员好礼的门店），使用9颗好礼星星兑换一杯中杯手工调制饮品或一份指定食品。</p>
          								<p class='padding-2em'>完成兑换后，9颗好礼星星将从您的星享俱乐部帐户中被清除。请注意，如果您的星享俱乐部帐户中所累积的、有效的好礼星星大于9颗，我们将优先清除您帐户中最先到期的好礼星星。</p>
          								<p>2.18&nbsp;&nbsp;&nbsp;金星级会员可以使用好礼星星兑换星巴克门店内的所有饮品或所有食品吗？</p>
          								<p class='padding-2em'>好礼星星不能用于兑换特定的星巴克饮品（即：星巴克指定的不能使用星享俱乐部帐户中好礼兑换的饮品，包括但不限于瓶装水、瓶装饮料等预包装饮品、星巴克臻选咖啡、虹吸壶冲泡咖啡、星巴克气致冷萃系列饮品和星巴克咖啡融合冰淇淋系列产品等），也不能在不可使用会员好礼的门店中使用。</p>
          								<p class='padding-2em'>好礼星星可兑换星巴克门店摆放在店堂食品柜内现场售卖的指定食品（具体产品见店内说明）。为明确起见，星巴克门店内售卖的以下产品不属于指定食品：(1) 星巴克门店依据特定配方现场手工制作的饮料（包括但不限于手工调制饮品），(2) 瓶装水、瓶装果汁、瓶装咖啡以及其它预包装饮料，(3) 月饼、星冰粽，(4) 整只蛋糕，(5) 甜心小点礼盒、咸香小点礼盒、法式小点礼盒等星享小点以及其他组合类食品，以及(6) 未摆放在店堂食品柜内的食品（例如摆放在店内柜台和货架上的棒棒糖、口香糖、黄油曲奇饼干礼盒等）。</p>
          								<p>2.19&nbsp;&nbsp;&nbsp;如何查询我的会员等级、星星数量以及星享俱乐部帐户中的电子好礼券数量？</p>
          								<p class='padding-2em'>您可以访问<a href='javascript:;'>www.starbucks.com.cn/account/</a>网站或在星巴克App上，登录您的星享俱乐部帐户后，您就可以查询您的星星数量、会员等级、电子好礼券数量等信息。</p>
          								<p class='padding-2em'>如您的星享俱乐部帐户已与您在星巴克指定的合作伙伴渠道上已建立的账户（或账号）绑定，您也可以登录合作伙伴的渠道，进入相关页面查询您星享俱乐部帐户的星星数量、会员等级、电子好礼券数量等信息。</p>
									</div>
								</div>
							</div>
						</div>
						<div class="rewards-content">
							<div class="item">
								<a href="javascript:;" class="header" @click="toggleIcon(2)" :class="{'showArticle': showArticle[2]}">
									<img src="/static/images/sbux-rewards/faq-part-3.svg" alt="">
									<h2>会员服务</h2>
								</a>
								<div class="body">
									<div class="container">
										<p>3.1&nbsp;&nbsp;&nbsp;在验证我的星享俱乐部帐户时，我发现我的手机号对应多个并非我本人创建的帐户。这是为什么？这是否意味着我的帐户不安全？</p>
          								<p class='padding-2em'>在发生上述情况时，这说明您所使用的手机号码曾被其他用户用来注册过星享俱乐部帐户。通常来说，以上情况并不会影响您注册新的星享俱乐部帐户。同时，请您放心，登录任一星享俱乐部帐户时都需要输入帐户密码。如您在注册或登录星享俱乐部帐户过程中有任何疑问，请致电我们的服务热线400-820-6998。</p>
          								<p>3.2&nbsp;&nbsp;&nbsp;为什么我通过星巴克App登录我的星享俱乐部帐户之后，却看不到我帐户中的动态二维码？</p>
          								<p class='padding-2em'>请检查您的手机是否已接入移动或无线局域网络。当您的手机尚未接入移动或无线局域网络时，星巴克App是无法呈现您星享俱乐部帐户中的动态二维码的。</p>
          								<p>3.3&nbsp;&nbsp;&nbsp;我能否通过多个设备同时登录我的同一个星享俱乐部帐户？</p>
          								<p class='padding-2em'>为保护星享俱乐部帐户的安全，星巴克App不支持您通过多个设备同时登录并使用同一个星享俱乐部帐户。</p>
          								<p>3.4&nbsp;&nbsp;&nbsp;如何保护我的星享俱乐部帐户内已绑定的星礼卡资金及会员好礼不被人盗用？</p>
          								<p class='padding-2em'>请保护好您的星享俱乐部帐户密码并及时更新帐户密码。我们还强烈建议您在星巴克App中为您的星享俱乐部帐户设置并开启口令密码。同时，请您妥善保管好您的实体星享卡或星礼卡。</p>
          								<p>3.5&nbsp;&nbsp;&nbsp;如果我帐户中的消费记录、星星数量以及会员等级等信息不准确或不清楚，我该如处理？</p>
          								<p class='padding-2em'>如果您有这些方面的疑问，请致电我们的服务热线400-820-6998。</p>
          								<p>3.6&nbsp;&nbsp;&nbsp;如果已经被绑定在星享俱乐部帐户中的星礼卡的实体卡片丢失了，我该怎么办？</p>
          								<p class='padding-2em'>在星礼卡的实体卡片发生遗失或者被盗后，您可以访问<a href='javascript:;'>www.starbucks.com.cn/account/</a>网站，申请冻结并转移该遗失或者被盗星礼卡的卡内余额（以下简称“余额保护”）。由于我们需要一定的时间处理您的申请，您的余额保护申请并非即时生效。一旦余额保护申请被批准，我们将为您在您的星享俱乐部帐户中免费生成并绑定一张电子星礼卡并将被申请保护的原实体星礼卡卡内余额全部转移到该电子星礼卡中，同时，该遗失或者被盗的实体星礼卡的卡片无法继续使用。新生成并绑定的该电子星礼卡的有效期与被申请保护的原实体星礼卡的有效期相同。因原实体星礼卡被盗或遗失而可能造成的卡内资金的损失风险由您自行承担。</p>
          								<p>3.7&nbsp;&nbsp;&nbsp;我还有关于星享俱乐部的其他问题，该如何解决？</p>
          								<p class='padding-2em'>请致电我们的服务热线400-820-6998。</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<!-- footer -->
				<section class="libra-msr-footer">
					<div class="wrapper">
						<div class="footer-desc">
							<p>详情以<a href="javascript:;" class="ga-msr-intro-terms">《星享俱乐部活动的条款和条件》</a>的规定为准</p>
					      	<p>关于12月5日全新星享俱乐部的详细变化，请参见星巴克中国官方网站的<a href="javascript:;" class="ga-msr-intro-terms">具体条款</a>.</p>
					      	<p><b>© 2018 Starbucks Corporation. All rights reserved.</b></p>
					      	<div class='container'>
					       		<div class='legal'>
					          		<div class='license'>
					          			<span>
					            			<a href='javascript:;'>
					              				<img width='10' height='10' src='/static/images/icpicon.png'>&nbsp;沪公网安备 31010402000318号
					            			</a>
					          			</span>
					            		<a href='javascript:;'>沪ICP备17003747号</a>
					          		</div>
					        	</div>
							</div>
						</div>
					</div>
				</section>
			</article>
		</article>
	</div>
</template>

<script>

	import '@/assets/css/bootstrap.min.css'
	import '@/assets/css/swiper.min.css'
	import '@/assets/css/init.css'
	import '@/assets/css/styles.css'
	import '@/assets/css/account.css'
	import '@/assets/css/userinfo.css'
	import NavContainer from '@/components/navContainer'
	import NavOverlay from '@/components/NavOverlay'
	import NavMobile from '@/components/navMobile'
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	import axios from 'axios'

	export default {
		name: 'account',
		metaInfo: {
			title: '星享俱乐部',
			titleTemplate: '%s | 星巴克',
			meta: [
				{
					name: 'keywords',
					content: ''
				},
				{
					name: 'description',
					content: '星享俱乐部'
				}
			]
		},
		data(){
			return {
				show_menu_bol: false,
				lgMedia: window.matchMedia('(min-width: 1025px)').matches,
				curActive: 'starbucks-rewards',
				showArticle: {
					0: false,
					1: false,
					2: false
				},
				isLogin: false,
				welcome: [
					'早上好!',
					'上午好!',
					'中午好!',
					'下午好!',
					'晚上好!'
				],
				hello: '您好!'
			}
		},
		computed: {
			NickName(){
				return this.$store.state.NickName;
			}
		},
		mounted(){
			const _self = this;
			window.matchMedia('(min-width: 1025px)').addListener(()=>{
				_self.lgMedia = window.matchMedia('(min-width: 1025px)').matches;
			});

			this.toggleArticle_JQListener();
			this.checkLogin();
			this.trackingVisitor();
			
		},
		components: {
			NavContainer: NavContainer,
			NavOverlay: NavOverlay,
			NavMobile: NavMobile,
		},
		methods: {
			showMenuExec(){
				this.show_menu_bol = true;
			},
			closeMenuExec(){
				this.show_menu_bol = false;
			},
			pageRedir(item, curName){
				this.curActive = curName;
				this.$store.commit('pageRedir', item);
			},
			toggleIcon(index){
				this.showArticle[index] = !this.showArticle[index];
			},
			toggleArticle_JQListener(){
				$('.member-faq a.header').click(function(){
					$(this).next().slideToggle(600)
				});
			},
			checkLogin(){
				let ReqToken = TokenTools.TokenSetting('sbux_token_cl');
				
				if(ReqToken){
					axios.post("users/checkLogin",{
						ReqToken: ReqToken
					}).then((res)=>{
						let data = res.data;
						if(data.status == '0'){
							let res = data.result;
							this.isLogin = true;
							this.$store.commit('updateUserInfo', res.NickName);
							this.getHelloWord();
						}else{
							this.isLogin = false;
							this.$store.commit('updateUserInfo', '');
						}
						CookieTools.DelCookie('sbux_token_cl');
					});
				}
			},
			getHelloWord(){
				let time = new Date(),
					hours = time.getHours(),
					index = '';

				if(hours >= 0 && hours < 8) {
					index = 0;
				}else if(hours >= 8 && hours < 12) {
					index = 1;
				}else if(hours >= 12 && hours < 14) {
					index = 2;
				}else if(hours >= 14 && hours < 20) {
					index = 3;
				}else {
					index = 4;
				}

				this.hello = this.welcome[index];
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '我的账户-星享俱乐部';
					if(!VisitorID) return;
					axios.post('users/tracking',{
						visitorID: VisitorID,
						page: page
					})
				}
				
			}
		}
	}

</script>
