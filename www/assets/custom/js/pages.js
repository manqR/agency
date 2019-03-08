'use strict';


/*
|------------------------------------------------------------------------------
| Checkout
|------------------------------------------------------------------------------
*/

myApp.onPageInit('checkout', function(page) {

	$$('.page[data-page=checkout] [data-action=show-tab-address]').on('click', function(e) {
		e.preventDefault();
		myApp.showTab('#tab-address');
	});

	$('.page[data-page=checkout] form[name=shipping-address]').validate({
		rules: {
			name: {
				required: true
			},
			address: {
				required: true
			},
			city: {
				required: true
			},
			zip: {
				required: true
			}
		},
    messages: {
			name: {
				required: 'Please enter name.'
			},
			address: {
				required: 'Please enter address.'
			},
			city: {
				required: 'Please enter city.'
			},
			zip: {
				required: 'Please enter ZIP.'
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.showTab('#tab-payment');
		}
	});

	$('.page[data-page=checkout] form[name=payment]').validate({
		ignore: '',
		rules: {
			payment_method: {
				required: true
			}
		},
    messages: {
			payment_method: {
				required: 'Please select a payment method.'
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			if(element.attr('name') == 'payment_method')
			{
				error.appendTo(element.parent().parent().siblings('li').find('.input-error'));	
			}
			else {
				error.appendTo(element.parent().siblings('.input-error'));	
			}
		},
		submitHandler: function(form) {
			myApp.showTab('#tab-done');
		}
	});

});


/*
|------------------------------------------------------------------------------
| Feedback
|------------------------------------------------------------------------------
*/

myApp.onPageInit('feedback', function(page) {

	$$('.page[data-page=feedback] form[name=feedback]').on('submit', function(e) {
		e.preventDefault();
		myApp.addNotification({
       message: 'Thank you for your valuable feedback.',
			hold: 2000,
			button: {
				text: ''
			}
		});
		mainView.router.load({
			url: 'home.html'
		});
	});

});

/*
|------------------------------------------------------------------------------
| Home
|------------------------------------------------------------------------------
*/

myApp.onPageInit('home', function(page) {
	
	
	
	var html = '';
	var slider = '';
	// $.get(`${URL}/x-mob-slider.php`, 
	// 	function(data, status){
	// 		//myApp.hideIndicator();
	// 		var slidex = '';		
	// 		if(data != null){
	
	// 			data.map((slide) => {	
	// 				slidex +='<div class="swiper-slide" style="background-image: url('+slide.IMG_SLIDE+');">'+
	// 							'<div class="slide-content">'+
	// 							'</div>'+
	// 						'</div>';					
					
	// 			})

	// 			slider = '<div class="swiper-container">'+
	// 						'<div class="swiper-wrapper" >'+
							
	// 							slidex +
								
	// 						'</div>'+
	// 						'<div class="swiper-pagination"></div>'+
	// 					'</div>';
			
	// 			$$(".swiper-wrapper").css("height", "");
	// 			$$(".swiper-wrapper img").css("display", "none");
	// 			$$("#temp_preview").css("display", "none");

	// 			// document.getElementById("inner_slider").innerHTML = '';
	// 			// document.getElementById("inner_slider").innerHTML = slider;

	// 			// var mySwiper = myApp.swiper('.swiper-container', {
	// 			// 	pagination:'.swiper-pagination',
	// 			// 	speed: 400,
	// 			// });
	// 			myApp.swiper('.page[data-page=home] .slider-hero .swiper-container', {
	// 				autoplay: 10000,
	// 				loop: true,
	// 				pagination: '.swiper-pagination',
	// 				paginationClickable: true
	// 			});
	// 			//console.log(slidex);
		
	// 		}
	// 	}
	// );

	/* menu home */
	var largest = 0

	$(".Tr6Hj").each(function(){
		var findHeight = $(this).height();
		if(findHeight > largest){
			largest = findHeight;
		}  
	});
	var Findwidth = $(window).width();	
	if(largest <= 62 && Findwidth < 375){ //Based on Iphone 7 width
		largest = largest+10; //Resolusi Iphone 7 kebawah		
		$(".Tr6Hj").css({"height":largest+"px"});
	}else{
		largest = largest+10; //Resolusi Iphone 7 keatas
		$(".Tr6Hj").css({"height":largest+"px"});
	}	
	/* end menu home */


	

});


/*
|------------------------------------------------------------------------------
| Splash Screen
|------------------------------------------------------------------------------
*/

myApp.onPageInit('splash-screen', function(page) {

		let data = localStorage.getItem('loginData');            
		if(data){
			mainView.router.load({
				url: 'home.html'
			});

			// console.log(data);
		}else{
			mainView.router.load({
				url: 'walkthrough.html'
			});
		}
		// setTimeout(function() {			
		// 	mainView.router.load({
		// 		url: 'walkthrough.html'
		// 	});
		// }, 2000);
		// /* 1 second after page is loaded, show preloader. */		
		// setTimeout(function() {
		// 	$$('.page[data-page=splash-screen] .splash-preloader').css('opacity', 1);
		// }, 1000);

	


	

});
/*
|------------------------------------------------------------------------------
| Walkthrough
|------------------------------------------------------------------------------
*/

myApp.onPageInit('walkthrough', function(page) {

	/* Initialize Slider */
	myApp.swiper('.page[data-page=walkthrough] .walkthrough-container', {
		pagination: '.page[data-page=walkthrough] .walkthrough-pagination',
		paginationClickable: true
	});
	

});