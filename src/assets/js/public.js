(()=>{
	
	/*
		* 左侧边栏菜单切换效果
	*/

	let homePage = document.getElementsByClassName('home-page')[0],
		menuPage = document.getElementsByClassName('menu-page')[0],
		menuTrigger = document.getElementsByClassName('menu-trigger')[0],
		menuClose = document.getElementsByClassName('close')[0],
		lg_media = window.matchMedia('(min-width: 1025px)'),
		md_media = window.matchMedia('(max-width: 1024px)'),
		curEventType  = '',
		menuBtnActive = false;

	addEvent();

	lg_media.addListener(()=>{

		mediaListenHandle({
			mediaType: lg_media,
			curEventType: curEventType,
			openBtn: menuTrigger,
			closeBtn: menuClose,
			menuBtnActive: menuBtnActive
		});

	});

	md_media.addListener(()=>{

		mediaListenHandle({
			mediaType: md_media,
			curEventType: curEventType,
			openBtn: menuTrigger,
			closeBtn: menuClose,
			menuBtnActive: menuBtnActive
		});

	});

	function mediaListenHandle(options){

		let mediaType = options.mediaType,
			curEventType = options.curEventType,
			openBtn = options.openBtn,
			closeBtn = options.closeBtn,
			menuBtnActive = options.menuBtnActive;

		if(mediaType.matches){

			if(menuBtnActive){
				closeBtn.click();
				removeEvent(curEventType);
				addEvent();
				openBtn.click();
			}else{
				removeEvent(curEventType);
				addEvent();
			}

		}

	}

	function addEvent(){

		if(lg_media.matches){
			menuTrigger.addEventListener('click', show_menuPage_lg, false);
			menuClose.addEventListener('click', close_menuPage_lg, false);
			curEventType = 'menuPage_lg';
		}else if(md_media.matches){
			menuTrigger.addEventListener('click', show_menuPage_md, false);
			menuClose.addEventListener('click', close_menuPage_md, false);
			curEventType = 'menuPage_md';
		}

	}

	function removeEvent(eventType){

		if(eventType === 'menuPage_lg'){
			menuTrigger.removeEventListener('click', show_menuPage_lg, false);
			menuClose.removeEventListener('click', close_menuPage_lg, false);
		}else if(eventType === 'menuPage_md'){
			menuTrigger.removeEventListener('click', show_menuPage_md, false);
			menuClose.removeEventListener('click', close_menuPage_md, false);
		}

	}

	function show_menuPage_lg(){

		homePage.style.display = 'none';
		menuPage.style.display = 'block';
		menuBtnActive = true;

	}

	function close_menuPage_lg(){

		homePage.style.display = 'block';
		menuPage.style.display = 'none';
		menuBtnActive = false;

	}

	function show_menuPage_md(){

		homePage.style.display = 'none';
		menuPage.style.display = 'block';
		document.body.style.height = '100%';
		document.body.style.overflow = 'hidden';
		menuBtnActive = true;

	}

	function close_menuPage_md(){

		homePage.style.display = 'block';
		menuPage.style.display = 'none';
		document.body.style.height = '100%';
		document.body.style.overflow = 'visible';
		menuBtnActive = false;

	}



	/*
		* swiper广告轮播展示效果参数配置
	*/

	let swiper_slider_ad = new Swiper ('.slider-ad .swiper-container', {
    	
    	direction: 'horizontal',
    	loop: true,
    	speed: 800,

    	autoplay: {
    		delay: 3600,
   	 		stopOnLastSlide: false,
    		disableOnInteraction: false,
    	},
    
    	navigation: {
      		nextEl: '.swiper-button-next',
    	},

  	});

  	swiper_slider_ad.el.onmouseover = function(){

  		swiper_slider_ad.autoplay.stop();

	};

	swiper_slider_ad.el.onmouseout = function(){

  		swiper_slider_ad.autoplay.start();

	};

	$('.slider-ad .swiper-button-next').click(()=>{

		swiper_slider_ad.autoplay.start();

	});  



	/*
		* swiper星讲堂滑动展示效果参数配置
	*/

	let swiper_scroll_ad = new Swiper ('.coffeehouse .swiper-container', {
		
		direction: 'horizontal', 
	    loop: false, 
	    slidesPerView: 'auto',
	    freeMode: true,
	    mousewheel: true,
	    
	    navigation: {
	      nextEl: '.coffeehouse .swiper-button-next',
	      prevEl: '.coffeehouse .swiper-button-prev',
	    },

	});



	/*
		* Mobile导航按钮
	*/

	let nav_mobile_btn = document.getElementsByClassName('nav-mobile-btn'),
		nav_mobile_btn_arr = Array.prototype.slice.call(nav_mobile_btn);

	nav_mobile_btn_arr.forEach((curBtn)=>{

		listenMobileNavBtn(curBtn);

	});

	function listenMobileNavBtn(curBtn){

		curBtn.addEventListener('click', ()=>{

			toggleClass(curBtn, nav_mobile_btn_arr);
			togglePages(curBtn);

		}, false);
	}

	function toggleClass(curBtn, allBtn){

		let btn_classList = curBtn.classList;
		
		// 如果点击的为当前活动按钮或“更多”按钮则不继续执行
		if(btn_classList.contains('active') || btn_classList.contains('more-mobile')){
			return;
		}

		initAllClass(allBtn);
		setActBtnClass(curBtn);

	}

	function togglePages(curBtn){

		if(curBtn.classList.contains('more-mobile')){

			curBtn.addEventListener('click', show_menuPage_md, false);
			menuClose.addEventListener('click', close_menuPage_md, false);
			curBtn.click();

		}
		// 切换至其他页面的功能待更新...
	}

	function initAllClass(allBtn){

		allBtn.forEach((element)=>{

			let btn_classList = element.classList,
				icon_classList = element.getElementsByClassName('icon')[0].classList,
				act_icon_classList = element.getElementsByClassName('active-icon')[0].classList;

			if(btn_classList.contains('active')){
				btn_classList.remove('active')
			}

			if(icon_classList.contains('hidden')){
				icon_classList.remove('hidden');
				icon_classList.add('show');
			}

			if(act_icon_classList.contains('show')){
				act_icon_classList.remove('show');
				act_icon_classList.add('hidden');
			}

		});

	}

	function setActBtnClass(curBtn){

		let btn_classList = curBtn.classList,
			icon_classList = curBtn.getElementsByClassName('icon')[0].classList,
			act_icon_classList = curBtn.getElementsByClassName('active-icon')[0].classList;

		btn_classList.add('active');

		icon_classList.remove('show');
		icon_classList.add('hidden');

		act_icon_classList.remove('hidden');
		act_icon_classList.add('show');

	}

})();





















