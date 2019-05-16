'use strict';


/*
|------------------------------------------------------------------------------
| Registrasi
|------------------------------------------------------------------------------
*/

myApp.onPageInit('signup', function(page) {


	$('.page[data-page=signup] form[name=signup]').validate({
		rules: {
			username: {
				required: true
     	 	},
			email: {
				required: true
     	 	},
			password: {
				required: true
     	 	}
		},
    messages: {
			username: {
				required: 'Mohon Masukan username dengan benar'
      		},
			email: {
				required: 'Mohon Masukan Email dengan benar'
      		},
			password: {
				required: 'Mohon Masukan Password dengan benar'
      		}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {

			var username = $("input[name=username]").val();
			var emails = $("input[name=emails]").val();
			var passwords = $("input[name=passwords]").val();
			myApp.showIndicator();

			// console.log(passwords);
			$.post(`${URL}?r=signup/create`,{
				username: username,
				email: emails,
				dvid: device.uuid,
				password: SHA1(passwords,KEY),
			},
			function(data, status){
				if(data.msg == 'success'){
					// console.log(password);
					myApp.hideIndicator();
					// console.log('data ', data.data)
					// localStorage.setItem("loginData", data);

					mainView.router.load({
						url: 'login.html'
					});
				}
			});
		}
	});
})



/*
|------------------------------------------------------------------------------
| Login
|------------------------------------------------------------------------------
*/

myApp.onPageInit('login', function(page) {

	localStorage.removeItem("loginData");
	$('.page[data-page=login] form[name=login]').validate({
		rules: {
			email: {
				required: true
     	 	},
			password: {
				required: true
     	 	}
		},
    messages: {
			email: {
				required: 'Mohon Masukan Email dengan benar'
      		},
			password: {
				required: 'Mohon Masukan Password dengan benar'
      		}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {

			var emaill = $("input[name=emaill]").val();
			var passwordl = $("input[name=passwordl]").val();
			// console.log(passwordl)
			myApp.showIndicator();
			$.post(`${URL}?r=api/login`,{
				email: emaill,
				password: SHA1(passwordl,KEY),
			},
			function(data, status){
				// console.log(data)
				// console.log('password ',password);
				myApp.hideIndicator();
				if(data.msg == 'success'){
						localStorage.setItem("loginData", data.token);
						mainView.router.load({
							url: 'home.html'
						});
				}else{
					alert('Incorect Password or Email');
				}
			});
		}

	});

})





/*
|------------------------------------------------------------------------------
| User Profile
|------------------------------------------------------------------------------
*/


function listExperience(loginData, model){
	$.post(`${URL}?r=api/list-experience`,{
		token: loginData,
	},
	function(data, status){
		var html = '';
			data.map((exp) => {


				if(model == 'edit-profile'){

					console.log('model1 ',model);

					html += '<li>';
					html +=			'<div class="item-content">';
					html +=					'<div class="item-inner">';
					html +=							'<div class="item-title">';
					html +=										'<i class="material-icons">work</i>';
					html +=							'</div>';
					html +=					'<div class="item-after">'+exp.company+' , '+exp.start_date+'</div>';
					html +=				'</div>';
					html +=			'</div>';
					html +=		'</li>';

				}else if(model == 'user-profile'){

					console.log('model2 ',model);

					html +='<li>';
					html +=	'<div class="item-content">';
					html +=			'<div class="item-media">';
					html +=					'<i class="material-icons">work</i>';
					html +=			'</div>';
					html +=			'<div class="item-inner">';
					html +=					'<div class="item-title-row">'
					html +=							'<div class="item-title">'+exp.title+'</div>';
					html +=					'</div>';
					html +=						'<div class="item-subtitle">'+exp.company+'</div>';
					html +=						'<div class="item-text">'+exp.start_date+'</div>';
					html +=					'</div>';
					html +=			'</div>';
					html +=	'</li>'


				}

					$$('.experience').append(html).html('');
					$$('.experience').append(html);

			})
	})
}

function listSocial(loginData,id){
		$.post(`${URL}?r=api/social`,{
			token: loginData,
		},
		function(data, status){
				data.map((soc) => {
						console.log('Load social ',soc.msg)
						if(id == 'xx'){
							$('#'+soc.icons+id).val(soc.link);
						}else{
							document.getElementById(soc.icons+id).innerHTML = soc.link;
						}
					

						myApp.hideIndicator();

				})
		})
}


myApp.onPageInit('user-profile', function(page) {

	/* Portfolio Images Browser */
	$$('body').on('click', '.page[data-page=user-profile] #tab-portfolio .image-gallery .image-wrapper img', function() {
		var photos = [];

		$('.page[data-page=user-profile] #tab-portfolio .image-gallery .image-wrapper img').each(function() {
			photos.push({
				url: $(this).attr('src'),
				caption: $(this).attr('alt')
			});
		});

		var myPhotoBrowser = myApp.photoBrowser({
    	photos: photos,
			exposition: false,
			lazyLoading: true,
			lazyLoadingInPrevNext: true,
			lazyLoadingOnTransitionStart: true,
			loop: true
		});
		myPhotoBrowser.open();
	});

	var loginData = localStorage.getItem('loginData');
	console.log(loginData);
	$.post(`${URL}?r=api/profile`,{
		token: loginData,
	},
	function(data, status){
			console.log(data)
			if(data.msg == 'success'){
					// document.getElementById("username").innerHTML = data.username;
					document.getElementById("about").innerHTML = data.description;
					document.getElementById("name").innerHTML = data.first_name;
					document.getElementById("birthday").innerHTML = data.bod;
					document.getElementById("location").innerHTML = data.address;
<<<<<<< HEAD
					document.getElementById("phone").innerHTML = data.phone; 
					document.getElementById("email").innerHTML = data.email; 

=======
					document.getElementById("phone").innerHTML = data.phone;
					document.getElementById("email").innerHTML = data.email;
>>>>>>> 3afb75ce6af786eb15b31d2bf331496788cb5294
			}
	})
	
	listSocial(loginData,'');	
	listExperience(loginData, 'user-profile')

});


/*
|------------------------------------------------------------------------------
| Edit Profile
|------------------------------------------------------------------------------
*/


myApp.onPageInit('edit-profile', function(page) {

		console.log('edit profile');
<<<<<<< HEAD
		var loginData = localStorage.getItem('loginData');
	console.log(loginData);
	$.post(`${URL}?r=api/profile`,{						
		token: loginData,				
	},
	function(data, status){	
			
			if(data.msg == 'success'){
					// document.getElementById("username").innerHTML = data.username;
					document.getElementById("about").innerHTML = data.description;						
					document.getElementById("name").innerHTML = data.first_name;
					document.getElementById("birthday").innerHTML = data.bod;
					document.getElementById("location").innerHTML = data.address;
					document.getElementById("phone").innerHTML = data.phone; 
					document.getElementById("email").innerHTML = data.email; 

					let emai = $$("#email").val();
			}
	})
	
=======
		myApp.showIndicator();
		var loginData = localStorage.getItem('loginData');
		console.log(loginData);
		$.post(`${URL}?r=api/profile`,{
			token: loginData,
		},
		function(data, status){
				console.log(data)
				if(data.msg == 'success'){

						// document.getElementById("username").innerHTML = data.username;

						document.getElementById("namex").innerHTML = data.first_name;
						document.getElementById("birthdayx").innerHTML = data.bod;
						document.getElementById("locationx").innerHTML = data.address;
						document.getElementById("phonex").innerHTML = data.phone;
						document.getElementById("emailx").innerHTML = data.email;

						listSocial(loginData,'x');
				}
		})



		listExperience(loginData,'edit-profile');
>>>>>>> 3afb75ce6af786eb15b31d2bf331496788cb5294
})

/*
|------------------------------------------------------------------------------
| Edit Experience
|------------------------------------------------------------------------------
*/

myApp.onPageInit('edit-experience', function(page) {

		var loginData = localStorage.getItem('loginData');
		console.log('edit Experience');

		$('.page[data-page=edit-experience] form[name=edit-experience]').validate({

				submitHandler: function(form) {

						var title = $("#title").val();
						var company = $("#company").val();
						var year = $("#year").val();

						myApp.showIndicator();
						$.post(`${URL}?r=api/experience`,{
							token: loginData,
							title:title,
							company:company,
							year:year
					},
					function(data, status){
							if(data.msg == 'success'){
								myApp.hideIndicator();
								myApp.alert('Success');
								listExperience(loginData);
									// mainView.router.loadPage({
									// 	url:'home.html',
									// 	ignoreCache:true,
									// 	reload:true
									// })
							}
					})


				}
		});

})

/*
|------------------------------------------------------------------------------
| Edit Social
|------------------------------------------------------------------------------
*/

myApp.onPageInit('edit-social', function(page) {

		var loginData = localStorage.getItem('loginData');
		function insertSocial(model, link){
				$.post(`${URL}?r=api/update-social`,{
						token: loginData,
						model:model,
						link:link
				},
				function(data, status){
						if(data.msg == 'success'){
								mainView.router.loadPage({
									url:'home.html',
									ignoreCache:true,
									reload:true
								})
						}
				})
		}

		console.log('edit social');

		listSocial(loginData,'xx');

		$('.page[data-page=edit-social] form[name=edit-social]').validate({

			submitHandler: function(form) {

						var facebook = $("input[name=facebookxx]").val();
						var instagram = $("input[name=instagramxx]").val();
						var twitter = $("input[name=twitterxx]").val();
						var linekdin = $("input[name=linekdinxx]").val();

						insertSocial('facebook',facebook);
						insertSocial('instagram',instagram);
						insertSocial('twitter',twitter);
						insertSocial('linekdin',linekdin);

						myApp.showIndicator();

				}
		});

})





/*
|------------------------------------------------------------------------------
| Edit Personal
|------------------------------------------------------------------------------
*/

myApp.onPageInit('edit-personal', function(page) {


		var loginData = localStorage.getItem('loginData');

		/* Mobiscroll */
		$("#birthdayxx").mobiscroll({
			preset: 'date',
			theme: 'android-ics light',
			mode: 'scroller',
		});

		$(".changes").mobiscroll({
			preset: 'select',
			theme: 'android-ics light',		// Specify theme like: theme: 'ios' or omit setting to use default
		});



		// PROVINCE GET FUNCTION
function GetProvince(token,loc){

	console.log('location function ',loc);

	if(loc === 'null' || loc === ''){
			$("select#locationxx").append( $("<option>")
					.val('')
					.html('- Location -')
			);
	}else{
		$("select#locationxx").append( $("<option>")
					.val(loc)
					.html(loc)
			);
	}


	$.post(`${URL}?r=api/province`,{
		token: token,
	},
	function(data, status){

		data.map((loc) => {
			myApp.hideIndicator();
			$('.changes').css('display','block');
			$("select#locationxx").append( $("<option>")
				.val(loc.location)
				.html(loc.location)
			);
		})
	})
}



myApp.showIndicator();
$.post(`${URL}?r=api/profile`,{
	token: loginData,
},
function(data, status){
		if(data.msg == 'success'){
				myApp.hideIndicator();
				$('#usernamexx').val(data.username);
				$('#namexx').val(data.first_name);
				// console.log('xxxxx ',data.bod);
				if(data.bod !== '' || data.bod !== null){
						$('#birthdayxx').val(data.bod);
				}
				$('#locationxx').val(data.address);
				$('#phonexx').val(data.phone);
				$('#emailxx').val(data.email);
				$('#aboutxx').val(data.description)

				GetProvince(loginData, data.address);
		}
})



	// console.log('currentLoc 2',currentLoc);





	$('.page[data-page=edit-personal] form[name=edit-personal]').validate({
			rules: {
				username: {
					required: true
					},
				email: {
					required: true
					},
				name: {
					required: true
					},
			},
			messages: {
				email: {
					required: 'Please fill email field ..'
					},
				username: {
					required: 'Please fill username field ..'
					},
				name: {
					required: 'Please fill Name field ..'
					}
			},
			onkeyup: false,
			errorElement : 'div',
			errorPlacement: function(error, element) {
				error.appendTo(element.parent().siblings('.input-error'));
			},

			submitHandler: function(form) {

				var username = $("input[name=usernamexx]").val();
				var name = $("input[name=namexx]").val();
				var birthday = $("input[name=birthdayxx]").val();
				var locations = $("#locationxx").val();

				var phone = $("input[name=phonexx]").val();
				var email = $("input[name=emailxx]").val();
				var about = $("#aboutxx").val();

				console.log('submit', locations);
				myApp.showIndicator();
				$.post(`${URL}?r=api/update-profile`,{
					token: loginData,
					username: username,
					name: name,
					email: email,
					birthday: birthday,
					location: locations,
					phone: phone,
					about: about,
				},function(data, status){
					if(data.msg == 'success'){
							mainView.router.loadPage({
								url:'home.html',
								ignoreCache:true,
								reload:true
							})
					}

				});

			}

		});

})


/*
|------------------------------------------------------------------------------
| Pembelian Voucher
|------------------------------------------------------------------------------
*/

myApp.onPageInit('pembelian-voucher', function(page) {

	/* Mobiscroll */
	$("#tgllahir").mobiscroll({
		preset: 'date',
		theme: 'android-ics light',
		mode: 'scroller',
	});



	function randomString(STRlen) {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = STRlen;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}

		return randomstring;

	}


	function randomNumber(STRlen) {
		var chars = "0123456789";
		var string_length = STRlen;
		var randomNumber = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomNumber += chars.substring(rnum,rnum+1);
		}

		return randomNumber;

	}
	function getRequestDateTime() {
		var now = new Date();
		now =dateFormat(now, "yyyymmddHHMMss");
		$("input[name=REQUESTDATETIME]").val(now);
		return now;
	}

	function genInvoice() {
		$("input[name=TRANSIDMERCHANT]").val(randomString(12));
		return  randomString(12);
	}

	function genSessionID() {
		$("input[name=SESSIONID]").val(randomString(20));
		return  randomString(20);
	}

	function genBookingCode() {
		$("input[name=BOOKINGCODE]").val(randomString(6));
		return  randomString(6);
	}




	/* Calendar with Disabled Dates */
	var dateToday = new Date();
	var dateWeekLater = new Date().setDate(dateToday.getDate() + 7);


	$(".changes").mobiscroll({
		preset: 'select',
		theme: 'android-ics light',		// Specify theme like: theme: 'ios' or omit setting to use default
	});

	var myNumpadLimitedValueLength = myApp.keypad({
		input: '.page[data-page=pembelian-voucher] #numpad-limited-value-length',
		valueMaxLength: 12,
		dotButton: false
	});

	myApp.showIndicator();
	$('.changes').css('display','block');
	$("select#paket").append( $("<option>")
		.val('')
		.html('- Pilih Masa Asuransi -')
	);

	$.post(`${URL}/x-mob-produk.php`,{
		id:''
	},
	function(data, status){
		data.map((cat) => {
			myApp.hideIndicator();

			$("select#paket").append( $("<option>")
				.val(cat.KATEGORI)
				.html(cat.KATEGORI)
			);
		})
	})


	$('select#paket').on('change', function() {
		$("select#jumlah").append('').html('');
		$("select#jumlah").append( $("<option>")
			.val('')
			.html('- Pilih Jumlah Polis -')
		);
		myApp.showIndicator();

		if(this.value == 0){
			myApp.hideIndicator();
		}
		$.post(`${URL}/x-mob-produk.php`,{
			id: this.value
		},
		function(data, status){
			data.map((jml) => {
				myApp.hideIndicator();
				$("select#jumlah").append( $("<option>")
				.val(jml.JUMLAH+";"+jml.HARGA)
				.html(jml.JUMLAH +' Polis'));
			})

		})
	})

	var calendarDisabledDates = myApp.calendar({
    dateFormat: 'MM dd, yyyy',
    disabled: {
      from: dateToday,
      to: dateWeekLater
    },
		input: '.page[data-page=pembelian-voucher] #calendar-disabled-dates'
	});


	$('.page[data-page=pembelian-voucher] form[name=pembelian-voucher]').validate({
		rules: {

			Jumlah: {
				required: true,
			},
			Paket: {
				required: true,
			},
			nama: {
				required: true,
			},
			noktp: {
				required: true,
				minlength: 16
			},
			tgllahir: {
				required: true,
			},
			alamat: {
				required: true,
			},
			kota: {
				required: true,
			},
			hp: {
				required: true,
			},
			email: {
				required: true,
				email:true
			},
			ahliwaris: {
				required: true,
			}
		},
    messages: {

			Paket: {
				required: 'Mohon masukan Paket Asuransi Mikor Siaga',
			},
			Jumlah: {
				required: 'Mohon masukan Jumlah Polis',
			},
			nama: {
				required: 'Mohon masukan nama',
			},
			noktp: {
				required: 'Mohon masukan nomor penduduk',
				minlength: 'KTP minimun harus 16 digit'
			},
			tgllahir: {
				required: 'Mohon masukan tanggal lahir',
			},
			alamat: {
				required: 'Mohon masukan alamat',
			},
			kota: {
				required: 'Mohon masukan kota',
			},
			hp: {
				required: 'Mohon masukan nomor telepon yang digunakan',
			},
			email: {
				required: 'Mohon Masukan Alamat email',
				email: 'Mohon masukan alamat email dengan benar'
			},
			ahliwaris: {
				required: 'Mohon masukan Ahli Waris',
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.showIndicator();
			var paket = $('select[name="Paket"]').val();
			var jumlah = $('select[name="Jumlah"]').val();
			var nama = $("input[name=nama]").val();
			var noktp = $("input[name=noktp]").val();
			var tgllahir = $("input[name=tgllahir]").val();
			var alamat = $("textarea[name='alamat']").val();
			var kota = $("input[name=kota]").val();
			var hp = $("input[name=hp]").val();
			var email = $("input[name=email]").val();
			var ahliwaris = $("input[name=ahliwaris]").val();



			$.post(`${URL}/x-mob-voucher.php`,{
				Paket: paket,
				Jumlah: jumlah,
				Nama: nama,
				No_KTP: noktp,
				Tanggal_Lahir: tgllahir,
				Desa: alamat,
				Kota: kota,
				Nama_Ahli_Waris1: ahliwaris,
				No_HP: hp,
				Email: email,
				Token: randomNumber(4),
				Uuid : device.uuid
			},
			function(data, status){
				data.map((xx) => {
					if(xx.ERR == 'OK'){
						$.post(`${URL}/x-mob-promo.php`,{
							MODE: 1,
							NO_INVOICE:''
						},function(data, status){
							if(data[0].WORDING_PROMO != null){
								//console.log(data[0].WORDING_PROMO)
								$$('#promo').css('display','block');
								document.getElementById("promo").innerHTML = '<p style="text-align:justify">' +data[0].WORDING_PROMO +'</p>';
							}
						})
						myApp.hideIndicator();

						document.getElementById("invoice").innerHTML = "#"+xx.Inv;
						document.getElementById("price").innerHTML = "Rp "+ xx.AmountV;
						document.getElementById("pay").innerHTML = "Rp "+ xx.AmountV;
						document.getElementById("grnd").innerHTML = "Rp "+ xx.AmountV;
						document.getElementById("pack").innerHTML = xx.Paket;
						document.getElementById("desc").innerHTML = xx.DESKRIPSI;
						document.getElementById("qty").innerHTML = xx.Jumlah+' Polis';

						function getWords() {
							var msg = xx.Amount+'.00'+ xx.MALLID + "J06GQ1e0lkoR" +xx.Inv ;
							$("input[name=WORDS]").val(SHA1(msg));
							return SHA1(msg);

						}
						$$('#submit-form').on('click', function() {
							//console.log('submit');
							payChannel();
							myApp.hideIndicator();
							myApp.closeModal('.cart_b');
							var wait = setInterval(function() {
								mainView.router.loadPage({
									url:'error.html?id='+xx.Inv,
									ignoreCache:true,
									reload:true
								})
								clearInterval(wait);
							}, 5000);



						})
						function payChannel() {
							//console.log('klik');
							var ref;
							var pageContent = '<html><head></head><body><form id="MerchatPaymentPage" name="MerchatPaymentPage" action="'+DOKU+'" method="post">' +
							'<input type="hidden" name="BASKET" id="BASKET" value="'+xx.BASKET+'">'+
							'<input type="hidden" name="MALLID" id="MALLID" value="'+xx.MALLID+'">'+
							'<input type="hidden" name="CHAINMERCHANT" id="CHAINMERCHANT" value="NA">'+
							'<input type="hidden" name="CURRENCY" id="CURRENCY" value="360">'+
							'<input type="hidden" name="PURCHASECURRENCY" id="PURCHASECURRENCY" value="360">'+
							'<input type="hidden" name="AMOUNT" id="AMOUNT" value="'+xx.Amount+'.00">'+
							'<input type="hidden" name="PURCHASEAMOUNT" id="PURCHASEAMOUNT" value="'+xx.Amount+'.00">'+
							'<input type="hidden" name="TRANSIDMERCHANT" id="TRANSIDMERCHANT" value="'+xx.Inv+'">'+
							'<input type="hidden" name="WORDS" id="WORDS" value="'+getWords()+'">'+
							'<input type="hidden" name="REQUESTDATETIME" id="REQUESTDATETIME" value="'+getRequestDateTime()+'">'+
							'<input type="hidden" name="SESSIONID" id="SESSIONID" value="'+genSessionID()+'">'+
							'<input type="hidden" name="PAYMENTCHANNEL" id="PAYMENTCHANNEL" value="">'+
							'<input type="hidden" name="EMAIL" id="EMAIL" value="'+email+'">'+
							'<input type="hidden" name="NAME" id="NAME" value="'+nama+'">'+
							'<input type="hidden" name="ADDRESS" id="ADDRESS" value="'+alamat+'">'+
							'<input type="hidden" name="COUNTRY" id="COUNTRY" value="360">'+
							'<input type="hidden" name="STATE" id="STATE" value="'+kota+'">'+
							'<input type="hidden" name="CITY" id="CITY" value="'+kota+'">'+
							'<input type="hidden" name="PROVINCE" id="PROVINCE" value="'+kota+'">'+
							'<input type="hidden" name="ZIPCODE" id="ZIPCODE" value="10000" />'+
							'<input type="hidden" name="HOMEPHONE" id="HOMEPHONE" value="'+hp+'">'+
							'<input type="hidden" name="MOBILEPHONE" id="MOBILEPHONE" value="'+hp+'">'+
							'<input type="hidden" name="WORKPHONE" id="WORKPHONE" value="'+hp+'">'+
							'<input type="hidden" name="BIRTHDATE" id="BIRTHDATE" value="19880101">'+
							'</form> <script type="text/javascript">document.getElementById("MerchatPaymentPage").submit();</script></body></html>';
							var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
							var ref = window.cordova.InAppBrowser.open(
								pageContentUrl ,
								"_blank",
								"hidden=no,location=no,closebuttoncaption=Done,clearsessioncache=yes,clearcache=yes"
							);

							ref.addEventListener('loadstart', function(event) {
								if(event.url == CLOSE_URL2){
									ref.close();
								}
								//alert('loadstart: ' + event.url);
							});
						}
						myApp.popup('.cart_b');
					}else{
						var html = '';
						myApp.hideIndicator();
						html += '<div class="toolbar">';
							html += '<div class="toolbar-inner">';
								html += '<div class="left">';
									html += '<a href="#" class="link disabled"></a>';
								html += '</div>';
								html += '<div class="center">Pembelian Gagal</div>';
									html += '<div class="right">';
										html += '<a href="#" class="link close-popup">';
											html += '<i class="material-icons">clear</i>';
										html += '</a>';
									html += '</div>';
								html += '</div>';
						html += '</div>';
						html += '<div class="error-container">';
							html += '<div class="error-media">';
								html += '<img src="assets/custom/img/emoji-sad.svg" alt="Error" />';
							html += '</div>';
							html += '<div class="error-code">Ooppss..</div>';
								html += '<div class="error-message">'+xx.ERR+'.</div>';
							html += '</div>';
						// html += '<div class="content-block text-center">';
						// 	html += '<p>'+xx.ERR+'</p>';
						// html += '</div>';

						$$('.page[data-page=pembelian-voucher] .popup-password-reset-token').append(html).html('');
						$$('.page[data-page=pembelian-voucher] .popup-password-reset-token').append(html);
						myApp.popup('.popup-password-reset-token');
					}

				})
			});

		}
	});

});




/*
|------------------------------------------------------------------------------
| Status Pembelian Voucher
|------------------------------------------------------------------------------
*/

myApp.onPageInit('status-voucher', function(page) {

	var html ="";
	var STATUS;
	var LINK;

	myApp.showIndicator();

	$.post(`${URL}/x-mob-histori.php`, {
		Uuid: device.uuid
	},function(data, status) {
		data.map((row) => {
			myApp.hideIndicator();
			//console.log(row);
			if(row.ERR == 'OK'){
				if(row.STATUS == 1){
					LINK = 'pending.html';
					STATUS = '<div class="alert alert-warning">'+
								'<div class="alert-media">'+
									'<i class="fa fa-fw fa-lg fa-check"></i>'+
								'</div>'+
								'<div class="alert-text">Belum dibayar</div>'+
							'</div>';
				}else{
					LINK = 'riwayat.html';
					STATUS = '<div class="alert alert-success">'+
								'<div class="alert-media">'+
									'<i class="fa fa-fw fa-lg fa-check"></i>'+
								'</div>'+
								'<div class="alert-text">Sudah Terbayar</div>'+
							'</div>';

				}
				html+= '<a href="'+LINK+'?id='+row.NO_INVOICE+'" style="color:#777777;">';
				html+= '	<div class="card">';
				html+= '		<div class="card-content">';
				html+= '			<div class="card-content-inner">';
				html+= '				<div class="list-block media-list no-hairlines no-hairlines-between">';
				html+= '					<ul class="products-list">';
				html+= '						<li class="swipeout" title="Swipe Left or Right">';
				html+= '							<div class="swipeout-content item-content">';
				html+= '								<div class="item-inner line_inner">';
				html+= '									<div class="item-title-row">';
				html+= '										<div class="item-title"># '+row.NO_INVOICE+'</div>';
				html+= '										<div class="item-after" ><span  class="product-amount">Rp '+row.AMOUNTV+'</span></div>';
				html+= '									</div>';
				html+= '									<div class="item-subtitle">'+row.KATEGORI+'</div>';
				html+= '									<div class="item-subtitle">'+row.DESKRIPSI+'</div>';
				html+= '									<div class="item-text">';
				html+= '										<div class="chip chip-small">';
				html+= '											<div class="chip-label"><span  class="product-quantity">'+row.JUMLAH +' Polis</span></div>';
				html+= '										</div>';
				html+= '									</div>';

				html+= 										STATUS;

				html+= '								</div>';
				html+= '							</div>';
				html+= '						</li>';
				html+= '					</ul>';
				html+= '				</div>';
				html+= '			</div>';
				html+= '		</div>';
				html+= '	</div>';
				html+= '</a>';
				document.getElementById("his_card").innerHTML = '';
				document.getElementById("his_card").innerHTML = html;
			}else{
				STATUS = '<div class="alert alert-failure">'+
							'<div class="alert-media">'+
								'<i class="fa fa-fw fa-lg fa-times"></i>'+
							'</div>'+
							'<div class="alert-text">'+row.ERR+'</div>'+
						'</div>';

				html+= '<a href="home.html" style="color:#777777;">';
				html+= '	<div class="card">';
				html+= '		<div class="card-content">';
				html+= '			<div class="card-content-inner">';
				html+= '				<div class="list-block media-list no-hairlines no-hairlines-between">';
				html+= '					<ul class="products-list">';
				html+= '						<li class="swipeout" title="Swipe Left or Right">';
				html+= '							<div class="swipeout-content item-content">';
				html+= '								<div class="item-inner line_inner">';

				html+= 										STATUS;

				html+= '								</div>';
				html+= '							</div>';
				html+= '						</li>';
				html+= '					</ul>';
				html+= '				</div>';
				html+= '			</div>';
				html+= '		</div>';
				html+= '	</div>';
				html+= '</a>';
				document.getElementById("his_card").innerHTML = '';
				document.getElementById("his_card").innerHTML = html;
			}


		})

	})

});



/*
|------------------------------------------------------------------------------
| Cetak Pembelian Voucher
|------------------------------------------------------------------------------
*/

myApp.onPageInit('cetak', function(page) {

	$('.page[data-page=cetak] form[name=cetak]').validate({
		rules: {
			pin: {
				required: true
     	 	}
		},
    messages: {
			pin: {
				required: 'Mohon Masukan Nomor PIN dengan benar'
      		}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			var pin = $("input[name=pin]").val();
			$.post(`${URL}/x-mob-voucher-cek-js.php`,{
				NOMOR_PIN: pin,
			},
			function(data, status){
				data.map((xx) => {
					//console.log(data);
					if(xx.ERR == 'OK'){
						var html = '';
							html += '<div class="toolbar">';
								html += '<div class="toolbar-inner">';
									html += '<div class="left">';
										html += '<a href="#" class="link disabled"></a>';
									html += '</div>';
									html += '<div class="center">Pencarian Berhasil</div>';
										html += '<div class="right">';
											html += '<a href="#" class="link close-popup">';
												html += '<i class="material-icons">clear</i>';
											html += '</a>';
										html += '</div>';
									html += '</div>';
							html += '</div>';
							html += '<div class="error-container">';
								html += '<div class="error-media">';
									html += '<a href="#" class="download"><img src="assets/custom/img/print.svg" alt="Suksess" /></a>';
								html += '</div>';
								html += '<div class="error-message">Silahkan Unduh Polis sebagai dokumen resmi Asuransi Anda. </div>';
							html += '</div>';
						$$('.page[data-page=cetak] .popup-cetak').append(html).html('');
						$$('.page[data-page=cetak] .popup-cetak').append(html);
						myApp.popup('.popup-cetak');

						$(".download").click(function () {
						myApp.showIndicator();
						$.post(`${PDF_URL2}/mob-genpdf-display.php`,{
							nama: xx.nama,
							alamat1: xx.alamat1,
							kota: xx.kota,
							provinsi: xx.provinsi,
							kodepos : xx.kodepos,
							birthdate: xx.birthdate,
							grouppremi : xx.grouppremi,
							premi : xx.premi+'.00',
							code: xx.code,
							issuedate: xx.issuedate,
							enddate: xx.enddate,
							UP: xx.UP,
							UP_convert: xx.UP + '.00',
							UP_AMR : xx.UP / 10,
							UP_AMR_convert : xx.UP / 10 + '.00',
							enddate : xx.enddate,
							aw1 : xx.aw1,
							aw1hub : xx.aw1hub,
							aw2 : xx.aw2,
							aw2hub : xx.aw2hub,
							aw3 : xx.aw3,
							aw3hub : xx.aw3hub,
							description : xx.description,
							pin : xx.pin,
							alamat : xx.alamat1.trim(),
							nopol : xx.nopol

						},
						function(attr, status){
							//console.log(status);
							myApp.hideIndicator();
								window.open(`${PDF_URL2}/pdf/${xx.nopol}.pdf`, '_system', 'location=yes')

							})
						});

					}else{
						var html = '';
						html += '<div class="toolbar">';
							html += '<div class="toolbar-inner">';
								html += '<div class="left">';
									html += '<a href="#" class="link disabled"></a>';
								html += '</div>';
								html += '<div class="center">Cetak Gagal</div>';
									html += '<div class="right">';
										html += '<a href="#" class="link close-popup">';
											html += '<i class="material-icons">clear</i>';
										html += '</a>';
									html += '</div>';
								html += '</div>';
						html += '</div>';
						html += '<div class="error-container">';
							html += '<div class="error-media">';
								html += '<img src="assets/custom/img/emoji-sad.svg" alt="Error" />';
							html += '</div>';
							html += '<div class="error-code">Ooppss..</div>';
								html += '<div class="error-message">'+xx.ERR+'.</div>';
							html += '</div>';
						// html += '<div class="content-block text-center">';
						// 	html += '<p>'+xx.ERR+'</p>';
						// html += '</div>';

						$$('.page[data-page=cetak] .popup-cetak').append(html).html('');
						$$('.page[data-page=cetak] .popup-cetak').append(html);
						myApp.popup('.popup-cetak');
					}

				});
			});
		}
	});
});







/*
|------------------------------------------------------------------------------
| Aktivasi Voucher
|------------------------------------------------------------------------------
*/

myApp.onPageInit('aktivasi-voucher', function(page) {


	$("#tgllahir").mobiscroll({
		preset: 'date',
		theme: 'android-ics light',
		mode: 'scroller',
	});

	/* Basic Calendar */

	var calendarBasic = myApp.calendar({
    input: '.page[data-page=aktivasi-voucher] #calendar-basic'
	});


	function randomString(STRlen) {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = STRlen;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}

		return randomstring;

	}

	function getRequestDateTime() {
		var now = new Date();
		now =dateFormat(now, "yyyymmddHHMMss");
		$("input[name=REQUESTDATETIME]").val(now);
		return now;
	}

	function genInvoice() {
		$("input[name=TRANSIDMERCHANT]").val(randomString(12));
		return  randomString(12);
	}

	function genSessionID() {
		$("input[name=SESSIONID]").val(randomString(20));
		return  randomString(20);
	}

	function genBookingCode() {
		$("input[name=BOOKINGCODE]").val(randomString(6));
		return  randomString(6);
	}

	function getWords() {

		var msg = $("input[name=AMOUNT]").val() + $("input[name=MALLID]").val() + "J06GQ1e0lkoR" + $("input[name=TRANSIDMERCHANT]").val() ;
		$("input[name=WORDS]").val(SHA1(msg));
		return msg;
	}



	/* Calendar with Disabled Dates */
	var dateToday = new Date();
	var dateWeekLater = new Date().setDate(dateToday.getDate() + 7);

	var calendarDisabledDates = myApp.calendar({
    dateFormat: 'MM dd, yyyy',
    disabled: {
      from: dateToday,
      to: dateWeekLater
    },
		input: '.page[data-page=aktivasi-voucher] #calendar-disabled-dates'
	});


	$('.page[data-page=aktivasi-voucher] form[name=aktivasi-voucher]').validate({
		rules: {
			pin: {
				required: true,
			},
			nama: {
				required: true,
			},
			noktp: {
				required: true,
				minlength: 16
			},
			tgllahir: {
				required: true,
			},
			alamat: {
				required: true,
			},
			kota: {
				required: true,
			},
			hp: {
				required: true,
			},
			email: {
				required: true,
				email:true
			},
			ahliwaris: {
				required: true,
			}
		},
    messages: {
			nama: {
				required: 'Mohon masukan PIN yang ada pada kartu',
			},
			nama: {
				required: 'Mohon masukan nama',
			},
			noktp: {
				required: 'Mohon masukan nomor penduduk',
				minlength: 'KTP minimun harus 16 digit'
			},
			tgllahir: {
				required: 'Mohon masukan tanggal lahir',
			},
			alamat: {
				required: 'Mohon masukan alamat',
			},
			kota: {
				required: 'Mohon masukan kota',
			},
			hp: {
				required: 'Mohon masukan nomor telepon yang digunakan',
			},
			email: {
				required: 'Mohon Masukan Alamat email',
				email: 'Mohon masukan alamat email dengan benar'
			},
			ahliwaris: {
				required: 'Mohon masukan Ahli Waris',
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {

			var nama = $("input[name=nama]").val();
			var pin = $("input[name=pin]").val();
			var noktp = $("input[name=noktp]").val();
			var tgllahir = $("input[name=tgllahir]").val();
			var alamat = $("textarea[name='alamat']").val();
			var kota = $("input[name=kota]").val();
			var hp = $("input[name=hp]").val();
			var email = $("input[name=email]").val();
			var ahliwaris = $("input[name=ahliwaris]").val();


			//console.log(tgllahir);
			$.post(`${URL}/x-mob-voucher-js.php`,{
				Nama: nama,
				NO_PIN: pin,
				No_KTP: noktp,
				Tanggal_Lahir: tgllahir,
				Desa: alamat,
				Kota: kota,
				Nama_Ahli_Waris1: ahliwaris,
				No_HP: hp,
				Email: email,
				ASAL_DATA: 'MOB'
			},
			function(data, status){
				//console.log(pin);
				data.map((xx) => {
					if(xx.ERR == 'OK'){

						var html = '';
						html += '<div class="toolbar">';
							html += '<div class="toolbar-inner">';
								html += '<div class="left">';
									html += '<a href="#" class="link disabled"></a>';
								html += '</div>';
								html += '<div class="center">Aktivasi Berhasil</div>';
									html += '<div class="right">';
										html += '<a href="#" class="link close-popup">';
											html += '<i class="material-icons">clear</i>';
										html += '</a>';
									html += '</div>';
								html += '</div>';
						html += '</div>';
						html += '<div class="error-container">';
							html += '<div class="error-media">';
								html += '<img src="assets/custom/img/success.svg" alt="Suksess" />';
							html += '</div>';
							html += '<div class="error-code">Sukses..</div>';
							html += '<div class="error-message">No PIN '+pin+' Berhasil  aktivasi</div>';
						html += '</div>';

						$$('.page[data-page=aktivasi-voucher] .aktivasi').append(html).html('');
						$$('.page[data-page=aktivasi-voucher] .aktivasi').append(html);
						myApp.popup('.aktivasi');
					}else{
						var html = '';
						html += '<div class="toolbar">';
							html += '<div class="toolbar-inner">';
								html += '<div class="left">';
									html += '<a href="#" class="link disabled"></a>';
								html += '</div>';
								html += '<div class="center">Aktivasi Gagal</div>';
									html += '<div class="right">';
										html += '<a href="#" class="link close-popup">';
											html += '<i class="material-icons">clear</i>';
										html += '</a>';
									html += '</div>';
								html += '</div>';
						html += '</div>';
						html += '<div class="error-container">';
							html += '<div class="error-media">';
								html += '<img src="assets/custom/img/emoji-sad.svg" alt="Error" />';
							html += '</div>';
							html += '<div class="error-code">Ooppss..</div>';
								html += '<div class="error-message">'+xx.ERR+'.</div>';
							html += '</div>';
						// html += '<div class="content-block text-center">';
						// 	html += '<p>'+xx.ERR+'</p>';
						// html += '</div>';

						$$('.page[data-page=aktivasi-voucher] .aktivasi').append(html).html('');
						$$('.page[data-page=aktivasi-voucher] .aktivasi').append(html);
						myApp.popup('.aktivasi');
					}

				})
			});

		}
	});

});



/*
|------------------------------------------------------------------------------
| Events
|------------------------------------------------------------------------------
*/

myApp.onPageInit('events', function(page) {



	var html = '';
	var status = 0;
	var slider = '';


	// myApp.showIndicator();
	// $.get(`${URL}/x-mob-events.php`,
	// 	function(data, status){
	// 	myApp.hideIndicator();
	// 	var slidex = '';
	// 	//console.log(data)
	// 	if(data != null){
	// 		data.map((slide) => {
	// 			slidex +=  '<div class="swiper-slide"><img src="'+slide.IMG_SLIDER+'" class="swiper-img"  alt="'+slide.KETERANGAN+'"/></div>';
	// 		})


	// 		slider= '<div class="swiper-container">'+
	// 					'<div class="swiper-wrapper" >'+

	// 						slidex +

	// 					'</div>'+
	// 					'<div class="swiper-pagination"></div>'+
	// 				'</div>';

	// 		html += slider;
	// 		html += ' <div class="mobi"></div>'+
	// 				'<form name="events" action="#" method="POST" enctype="multipart/form-data">'+
	// 					'<div class="content-block-title">Informasi Peserta</div>'+
	// 					'<div class="list-block no-hairlines no-hairlines-between">'+
	// 					'<ul>'+
	// 						'<li>'+
	// 							'<div class="item-content">'+
	// 								'<div class="item-media">'+
	// 									'<i class="material-icons">person_outline</i>'+
	// 								'</div>'+

	// 								'<div class="item-inner line_inner">'+

	// 									'<div class="item-input">'+
	// 										'<input type="text" name="nama" placeholder="Nama"/>'+
	// 									'</div>'+
	// 									'<div class="item-text input-error"></div>'+
	// 								'</div>'+
	// 							'</div>'+
	// 						'</li>'+

	// 						'<li class="align-top">'+
	// 							'<div class="item-content">'+
	// 								'<div class="item-media">'+
	// 									'<i class="material-icons">event_note</i>'+
	// 								'</div>'+
	// 								'<div class="item-inner line_inner">'+
	// 									'<div class="item-input">'+
	// 										'<input type="text" id="tgllahir" name="tgllahir" placeholder="Tanggal Lahir" readonly />'+
	// 									'</div>'+
	// 								'<div class="item-text input-error"></div>'+
	// 								'</div>'+
	// 							'</div>'+
	// 						'</li>'+


	// 						'<li>'+
	// 							'<div class="item-content">'+
	// 								'<div class="item-media">'+
	// 									'<i class="material-icons">card_membership</i>'+
	// 								'</div>'+
	// 								'<div class="item-inner line_inner">'+
	// 									'<div class="item-input">'+
	// 										'<input type="numpad"  id="numpad-limited-value-length" name="noktp"  placeholder="No KTP" />'+
	// 									'</div>'+
	// 									'<div class="item-text input-error"></div>'+
	// 								'</div>'+
	// 							'</div>'+
	// 						'</li>'+

	// 						'<li>'+
	// 							'<div class="item-content">'+
	// 								'<div class="item-media">'+
	// 									'<i class="material-icons">mail_outline</i>'+
	// 								'</div>'+
	// 								'<div class="item-inner line_inner">	'+
	// 									'<div class="item-input">'+
	// 										'<input type="email" name="email" placeholder="Email" required />'+

	// 									'</div>'+
	// 									'<div class="item-text input-error"></div>'+
	// 								'</div>'+
	// 							'</div>'+
	// 						'</li>'+


	// 						'<li>'+
	// 							'<div class="item-content">'+
	// 								'<div class="item-media">'+
	// 									'<i class="material-icons">stay_current_portrait</i>'+
	// 								'</div>'+
	// 								'<div class="item-inner line_inner">	'+
	// 									'<div class="item-input">'+
	// 										'<input type="text" name="hp" placeholder="No Handphone"/>'+
	// 									'</div>'+
	// 									'<div class="item-text input-error"></div>'+
	// 								'</div>'+
	// 							'</div>'+
	// 						'</li>'+

	// 						'<li>'+
	// 							'<div class="item-content">'+
	// 								'<div class="item-media">'+
	// 									'<i class="material-icons">fiber_pin</i>'+
	// 								'</div>'+
	// 								'<div class="item-inner line_inner">'+

	// 									'<div class="item-input">'+
	// 										'<input type="text" name="pin" placeholder="Kode Aktivasi"/>'+
	// 									'</div>'+
	// 									'<div class="item-text input-error"></div>'+
	// 								'</div>'+
	// 							'</div>'+
	// 						'</li>'+

	// 					'</ul>'+
	// 				'</div>'+
	// 				'<div class="content-block">'+
	// 					'<button type="submit" class="button button-big button-block button-fill">Aktivasi</button>'+
	// 				'</div>'+
	// 			'</form>'+
	// 			'<div class="popup tablet-fullscreen pop-event"></div>';

	// 			document.getElementById("his_form").innerHTML = '';
	// 			document.getElementById("his_form").innerHTML = html;



	// 			myApp.swiper('.swiper-container', {
	// 				pagination: '.swiper-pagination',
	// 			});

	// 			$("#tgllahir").mobiscroll({
	// 				preset: 'date',
	// 				theme: 'android-ics light',
	// 				mode: 'scroller',
	// 			});

	// 			var myNumpadLimitedValueLength = myApp.keypad({
	// 				input: '.page[data-page=events] #numpad-limited-value-length',
	// 				valueMaxLength: 16,
	// 				dotButton: false
	// 			});


	// 			$('.page[data-page=events] form[name=events]').validate({
	// 				rules: {
	// 					pin: {
	// 						required: true,
	// 					},
	// 					nama: {
	// 						required: true,
	// 					},
	// 					noktp: {
	// 						required: true,
	// 						minlength: 16
	// 					},
	// 					tgllahir: {
	// 						required: true,
	// 					},

	// 					hp: {
	// 						required: true,
	// 					},
	// 					email: {
	// 						required: true,
	// 						email:true
	// 					}
	// 				},
	// 			messages: {
	// 					pin: {
	// 						required: 'Mohon masukan PIN yang ada pada kartu',
	// 					},
	// 					nama: {
	// 						required: 'Mohon masukan nama',
	// 					},
	// 					noktp: {
	// 						required: 'Mohon masukan nomor penduduk',
	// 						minlength: 'KTP minimun harus 16 digit'
	// 					},
	// 					tgllahir: {
	// 						required: 'Mohon masukan tanggal lahir',
	// 					},
	// 					hp: {
	// 						required: 'Mohon masukan nomor telepon yang digunakan',
	// 					},
	// 					email: {
	// 						required: 'Mohon Masukan Alamat email',
	// 						email: 'Mohon masukan alamat email dengan benar'
	// 					}
	// 				},
	// 				onkeyup: false,
	// 			errorElement : 'div',
	// 				errorPlacement: function(error, element) {
	// 					error.appendTo(element.parent().siblings('.input-error'));
	// 				},
	// 				submitHandler: function(form) {

	// 					var nama = $("input[name=nama]").val();
	// 					var pin = $("input[name=pin]").val();
	// 					var noktp = $("input[name=noktp]").val();
	// 					var tgllahir = $("input[name=tgllahir]").val();
	// 					var hp = $("input[name=hp]").val();
	// 					var email = $("input[name=email]").val();

	// 					$.post(`${URL}/x-mob-voucher-js.php`,{
	// 						Nama: nama,
	// 						NO_PIN: pin,
	// 						No_KTP: noktp,
	// 						Tanggal_Lahir: tgllahir,
	// 						No_HP: hp,
	// 						Email: email,
	// 						ASAL_DATA: 'PRM',
	// 						Uuid : device.uuid
	// 					},
	// 					function(data, status){
	// 						//console.log(pin);
	// 						data.map((xx) => {
	// 							if(xx.ERR == 'OK'){
	// 								//console.log(xx);
	// 								var xhtml = '';
	// 								xhtml += '<div class="toolbar">';
	// 									xhtml += '<div class="toolbar-inner">';
	// 										xhtml += '<div class="left">';
	// 											xhtml += '<a href="#" class="link disabled"></a>';
	// 										xhtml += '</div>';
	// 										xhtml += '<div class="center">Aktivasi Berhasil</div>';
	// 											xhtml += '<div class="right">';
	// 												xhtml += '<a href="#" class="link close-popup">';
	// 													xhtml += '<i class="material-icons">clear</i>';
	// 												xhtml += '</a>';
	// 											xhtml += '</div>';
	// 										xhtml += '</div>';
	// 								xhtml += '</div>';
	// 								xhtml += '<div class="error-container">';
	// 									xhtml += '<div class="error-media">';
	// 										xhtml += xx.NOTIF_IMG;
	// 									xhtml += '</div>';
	// 									// xhtml += '<div class="error-code">Sukses</div>';
	// 									// xhtml += '<div class="error-message">Selamat! Anda telah dilindungi Asuransi Kecelakaan dari MNC Life<br/><br/>Silahkan periksa email Anda untuk informasi Manfaat Asuransi.</div>';
	// 								xhtml += '</div>';

	// 								$$('.page[data-page=events] .pop-event').append(xhtml).html('');
	// 								$$('.page[data-page=events] .pop-event').append(xhtml);
	// 								myApp.popup('.pop-event');
	// 							}else{
	// 								var xhtml = '';
	// 								xhtml += '<div class="toolbar">';
	// 									xhtml += '<div class="toolbar-inner">';
	// 										xhtml += '<div class="left">';
	// 											xhtml += '<a href="#" class="link disabled"></a>';
	// 										xhtml += '</div>';
	// 										xhtml += '<div class="center">Aktivasi Gagal</div>';
	// 											xhtml += '<div class="right">';
	// 												xhtml += '<a href="#" class="link close-popup">';
	// 													xhtml += '<i class="material-icons">clear</i>';
	// 												xhtml += '</a>';
	// 											xhtml += '</div>';
	// 										xhtml += '</div>';
	// 								xhtml += '</div>';
	// 								xhtml += '<div class="error-container">';
	// 									xhtml += '<div class="error-media">';
	// 										xhtml += '<img src="assets/custom/img/emoji-sad.svg" alt="Error" />';
	// 									xhtml += '</div>';
	// 									xhtml += '<div class="error-code">Ooppss..</div>';
	// 										xhtml += '<div class="error-message">'+xx.ERR+'.</div>';
	// 									xhtml += '</div>';


	// 								$$('.page[data-page=events] .pop-event').append(xhtml).html('');
	// 								$$('.page[data-page=events] .pop-event').append(xhtml);
	// 								myApp.popup('.pop-event');
	// 								// console.log(xhtml)
	// 							}

	// 						})
	// 					});

	// 				}
	// 			});
	// 		}else{
	// 			var xhtml = '';

	// 			xhtml += '<div class="error-container">';
	// 			xhtml += 	'<div class="error-media">';
	// 			xhtml += 		'<img src="assets/custom/img/events.png" alt="Error" />';
	// 			xhtml += 	'</div>';
	// 			xhtml += 	'<div class="error-code">Ooppss..</div>';
	// 			xhtml += 	'<div class="error-message">Party is Over</div>';
	// 			xhtml += '</div>';

	// 			document.getElementById("his_form").innerHTML = '';
	// 			document.getElementById("his_form").innerHTML = xhtml;

	// 		}
	//	}
	//);

});

/*
|------------------------------------------------------------------------------
| Err
|------------------------------------------------------------------------------
*/

myApp.onPageInit('error', function(page) {

		var id = page.query.id;
		var wait = setInterval(function() {
			$.post(`${URL}/x-mob-check-done.php`, {
				NO_INVOICE: id
			},function(data) {
				data.map((cc) => {
					//console.log(cc);
					if(cc.STATUS == '2'){
						mainView.router.loadPage({
							url:'done.html?id='+id,
							ignoreCache:true,
							reload:true
						})
						clearInterval(wait);
					}else if(cc.STATUS == '1'){
						mainView.router.loadPage({
							url:'pending.html?id='+id,
							ignoreCache:true,
							reload:true
						})
						clearInterval(wait);
					}else{
						$$('#finish').on('click' , function(){
							mainView.router.loadPage({
								url:'home.html',
								ignoreCache:true,
								reload:true
							})
							clearInterval(wait);
						})
						//console.log('loop');
					}
				})
			})
		}, 2000);
		setTimeout(function() {
			clearInterval(wait);
		}, 300000);

})

/*
|------------------------------------------------------------------------------
| Done
|------------------------------------------------------------------------------
*/

myApp.onPageInit('done', function(page) {
	var id = page.query.id;

	$.post(`${URL}/x-mob-promo.php`,{
		MODE: 2,
		NO_INVOICE: id
	},function(data, status){
		if(data != null){
			if(data[0].jml > 0){
				console.log(data);
				$$('#promo').css('display','block');
				document.getElementById("promo").innerHTML = "<img src="+data[0].NOTIF_IMG+" />";
			}
		}
	})

	$.post(`${URL}/x-mob-check-done.php`,{
		NO_INVOICE: id,
	},
	function(data, status){
		data.map((xx) => {
			//console.log(xx);
			document.getElementById("invoice").innerHTML = "#"+xx.NO_INVOICE;
			document.getElementById("price").innerHTML = "Rp "+ xx.AMOUNTV;
			// document.getElementById("sub").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("pay").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("grnd").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("pack").innerHTML = xx.KATEGORI;
			document.getElementById("desc").innerHTML = xx.DESKRIPSI;
			document.getElementById("qty").innerHTML = xx.JUMLAH +' Polis';



			$$('#download-form').on('click', function(){
				myApp.showIndicator();
				$.post(`${URL}/x-mob-cekstatus-js.php`,{
					NOMOR_VA: xx.NO_INVOICE,
				},
				function(data, status){
					data.map((xy) => {

						$.post(`${URL}/x-mob-pdf.php`,{
							NOMOR_VA : xy.NOMOR_VA
						},
						function(attr, status){
							//console.log(status);
							myApp.hideIndicator();
							window.open(`${PDF_URL}/${xx.NO_INVOICE}.pdf`, '_system', 'location=yes')
						})
					})
				})
			});
		})
	})
});
/*
|------------------------------------------------------------------------------
| Done
|------------------------------------------------------------------------------
*/

myApp.onPageInit('pending', function(page) {
	var id = page.query.id;
	$.post(`${URL}/x-mob-check-done.php`,{
		NO_INVOICE: id,
	},
	function(data, status){
		data.map((xx) => {
			document.getElementById("invoice").innerHTML = "#"+xx.NO_INVOICE;
			document.getElementById("price").innerHTML = "Rp "+ xx.AMOUNTV;
			// document.getElementById("sub").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("pay").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("grnd").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("pack").innerHTML = xx.KATEGORI;
			document.getElementById("desc").innerHTML = xx.DESKRIPSI;
			document.getElementById("qty").innerHTML = xx.JUMLAH +' Polis';

			//console.log(xx);
			var PILIH;
			var STATUS;

			if(xx.CHANNEL == '07'){
				PILIH = 'dengan transfer ke Bank Permata (kode bank 013)';
			}else if(xx.CHANNEL == '14'){
				PILIH = 'melalui ALFAMART';
			}else{
				PILIH = 'dengan transfer ke Bank Permata (kode bank 013)';
			}
			STATUS = '<div class="alert alert-warning">'+
						'<div class="alert-media">'+
							'<i class="fa fa-fw fa-lg fa-check"></i>'+
						'</div>'+
						'<div class="alert-text">Silahkan melakukan pembayaran '+PILIH+' dengan Nomor Virtual '+xx.NO_VA+'</div>'+
					'</div>';
			document.getElementById("msg").innerHTML = STATUS;

		})
	})
});

/*
|------------------------------------------------------------------------------
| Riwayat
|------------------------------------------------------------------------------
*/

myApp.onPageInit('riwayat', function(page) {
	var id = page.query.id;

	$.post(`${URL}/x-mob-promo.php`,{
		MODE: 2,
		NO_INVOICE: id
	},function(data, status){
		if(data != null){

			if(data[0].jml > 0){
				console.log(data);
				$$('#promo').css('display','block');
				document.getElementById("promo").innerHTML = "<img src="+data[0].NOTIF_IMG+" />";
			}
		}
	})

	$.post(`${URL}/x-mob-check-done.php`,{
		NO_INVOICE: id,
	},
	function(data, status){
		data.map((xx) => {
			//console.log(xx);
			document.getElementById("invoice").innerHTML = "#"+xx.NO_INVOICE;
			document.getElementById("price").innerHTML = "Rp "+ xx.AMOUNTV;
			// document.getElementById("sub").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("pay").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("grnd").innerHTML = "Rp "+ xx.AMOUNTV;
			document.getElementById("pack").innerHTML = xx.KATEGORI;
			document.getElementById("desc").innerHTML = xx.DESKRIPSI;
			document.getElementById("qty").innerHTML = xx.JUMLAH +' Polis';

			$$('#download-form').on('click', function(){
				myApp.showIndicator();
				$.post(`${URL}/x-mob-cekstatus-js.php`,{
					NOMOR_VA: xx.NO_INVOICE,
				},
				function(data, status){
					data.map((xy) => {

						//console.log(xy);
						$.post(`${URL}/x-mob-pdf.php`,{
							NOMOR_VA : xx.NO_INVOICE

						},
						function(attr, status){
							//console.log(status);
							myApp.hideIndicator();
							window.open(`${PDF_URL}/${xx.NO_INVOICE}.pdf`, '_system', 'location=yes')
							//window.open(`https://docs.google.com/viewer?url=${PDF_URL}/${xy.NOMOR_VA}_${xy.nopol}.pdf`, '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
							// var link = document.createElement('a');
							// link.href = 'http://uat-www.mnclife.com/evoucher/files/pdfm/'+xx.NOMOR_VA+'_'+xx.nopol+'.pdf';
							// link.download = 'file.pdf';
							// link.dispatchEvent(new MouseEvent('click'));
						})
					})
				})

			});
		})
	})
});
/*
|------------------------------------------------------------------------------
| Geocomplete
|------------------------------------------------------------------------------
*/

myApp.onPageInit('geocomplete', function(page) {

	$('.page[data-page=geocomplete] input[name=geocomplete-search]').geocomplete({
		map: '#map',
		details: '.geocomplete-details',
		detailsAttribute: 'data-geo'
	})

	$('.page[data-page=geocomplete] input[name=geocomplete-search]').geocomplete('find', 'Shamgarh, Madhya Pradesh, India');

});

/*
|------------------------------------------------------------------------------
| Infinite Scroll
|------------------------------------------------------------------------------
*/

myApp.onPageInit('infinite-scroll', function(page) {

	/* Loading Flag */
	var loading = false;

	/* Last Loaded Index */
	var lastIndex = $$('.page[data-page=infinite-scroll] .list-block li').length;

	/* Max Items to Load */
	var maxItems = 100;

	/* Append Items per Load */
	var itemsPerLoad = 20;

	/* Attach 'infinite scroll' Event Handler */
	$$('.page[data-page=infinite-scroll] .infinite-scroll').on('infinite', function() {

		/* Exit, If Loading in Progress */
		if (loading) return;

		/* Set Loading Flag */
		loading = true;

		/* Emulate 1s Loading */
		setTimeout(function() {
			/* Reset Loading Flag */
			loading = false;

			if (lastIndex >= maxItems) {
				/* Nothing more to load, detach infinite scroll events to prevent unnecessary loadings */
				myApp.detachInfiniteScroll($$('.page[data-page=infinite-scroll] .infinite-scroll'));
				/* Remove Preloader */
				$$('.page[data-page=infinite-scroll] .infinite-scroll-preloader').remove();
				return;
			}

			/* Generate New Items HTML */
			var html = '';
			for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
				html += '<li><div class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></div></li>';
			}

			/* Append New Items */
			$$('.page[data-page=infinite-scroll] .list-block ul').append(html);

			/* Update Last Loaded Index */
			lastIndex = $$('.page[data-page=infinite-scroll] .list-block li').length;
		}, 1000);
	});

});
