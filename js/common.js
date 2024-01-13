$(function () {
	var tabContainers = $('div.tabs > div');
	tabContainers.hide().filter(':first').show();
	$('div.tabs ul.tabNavigation a').click(function () {
		tabContainers.hide();
		tabContainers.filter(this.hash).show();
		$('div.tabs ul.tabNavigation a').removeClass('selected');
		$(this).addClass('selected');
		return false;
	}).filter(':first').click();
});

function nn(x) {
	return (x + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

function calc_dops() {
	setTimeout(function () {
		let base_price = parseInt($('.baseprice').data('price'));
		let dops_str = '';
		let dops_int = 0;
		$('.item-page .options .item button.active').each(function () {
			let p = $(this).parent().parent();
			dops_int = dops_int + parseInt(p.data('price'));
			dops_str = dops_str + '<p>' + p.data('name') + ' + ' + nn(parseInt(p.data('price'))) + ' руб.</p>';
		});
		$('.item-page .fund button.active').each(function () {
			let p = $(this).parent();
			dops_str = dops_str + '<p>Фундамент: ' + p.data('name') + '</p>';
		});
		$('.prices_dops').html(dops_str);
		$('.allprice').html(nn(dops_int + base_price));
	}, 10);
}

$(function () {

	$('.razrezimg span').on('click mouseover', function () {
		$(this).parent().find('span').removeClass('active');
		$(this).addClass('active');
		var curdesc = $(this).attr('data-desc');
		$(this).parent().parent().find('.razrezdesc p').removeClass('active');
		$(this).parent().parent().find('.razrezdesc .' + curdesc).addClass('active');
	});

	$('.razrezdesc p').on('click mouseover', function () {
		$(this).parent().find('p').removeClass('active');
		$(this).addClass('active');
		var curnum = $(this).attr('data-num');
		$(this).parent().parent().find('.razrezimg span').removeClass('active');
		$(this).parent().parent().find('.razrezimg .' + curnum).addClass('active');
	});

	$('.sort select').on('change', function () {
		let v = $(this).val();
		setTimeout(function () {
			document.location.href = v;
		}, 10);
	});

	$('.item-page .options .item  button').click(function () {
		calc_dops();
	});

	$('.item-page .options .item .name .link').click(function () {
		$(this).parent().toggleClass('active');
		$(this).parent().next('.text').slideToggle();
	});
	$('.item-page .options .item .name button').click(function () {
		$(this).toggleClass('active');

	});
	$('.item-page .fund .item button').click(function () {
		let t = $(this);

		if (t.hasClass('active')) {
			$('.item-page .fund .item button').removeClass('active');
			t.text(t.data('def'));
		} else {
			$('.item-page .fund .item button').removeClass('active');
			$('.item-page .fund .item button').text(t.data('def'));
			t.addClass('active');
			t.text(t.data('act'));
		}
		calc_dops();
	});
	$('.item-page .contents .item .name').click(function () {
		$(this).toggleClass('active');
		$(this).next('.text').slideToggle();
	});
	$('.menubg, .mobile-menu .close').click(function () {
		$('.header .menu-button').removeClass('active');
		$('.menubg').fadeOut();
		$('.mobile-menu').removeClass('opened');
	});
	$('.header .menu-button').click(function () {
		$('.header .menu-button').addClass('active');
		$('.menubg').fadeIn();
		$('.mobile-menu').addClass('opened');
	});
	// $('.item-page .photos').slick({
	// 	dots: true
	// });

	$('#filename1').on('change', function () {
		var filename = $(this).val().replace(/^.*\\/, '');
		if (filename != '') {
			$('#popup .upload').html('<a></a> ' + filename);
		} else {
			$('#popup .upload').html('<a>Прикрепить файл</a>');
		}
	});
	$('#filename2').on('change', function () {
		var filename = $(this).val().replace(/^.*\\/, '');
		if (filename != '') {
			$('#frmraschet .upload').html('<a></a> ' + filename);
		} else {
			$('#frmraschet .upload').html('<a>Прикрепить файл</a>');
		}
	});
});
$(document).ready(function () {

	// $(".phone-number").mask("(999) 999-9999");

	if ($('body').hasClass('page_main')) {

		var divs = $('.index-select-block .list .item');

		function CachePositions() {
			divs.each(function () {
				if ($(this).css('position') != 'sticky')
					$(this).data({ initialTop: $(this).position().top });
			});
		}

		var scrollable = $(window);
		scrollable.scroll(function () {
			divs.each(function () {
				var top = $(this).data('initialTop');
				var w = $(window).width();

				if (top < scrollable.scrollTop()) {
					if (w < 992) {
						$(this).css({ position: 'sticky', top: '150px' });
					} else {
						$(this).css({ position: 'sticky', top: '70px' });
					}
				} else {
					$(this).css({ position: 'absolute', top: top + 'px' });
				}
			})
		});

		var resizeTimeout;
		$(window).resize(function () {
			if (resizeTimeout)
				clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function () {
				resizeTimeout = null;
				CachePositions();
			}, 100);
		});
		CachePositions();
	}

	// Форма - "Консультация"
	$('#frmcons .but').click(function () {
		$.ajax({
			url: '/frmCons.php',
			data: {
				'c1': $("#frmcons .f_1001").val(),
				'c2': $("#frmcons .f_1002").val(),
				'cururl': document.location.href,
				'title': document.title
			},
			type: 'GET',
			success: function (response) {
				//ym(52303579,'reachGoal','form2');
				if (response == 0) {
					$("#frmcons .answ").html('Заявка успешно отправлена! Ожидайте звонка!');
					$("#frmcons .f_1001").val('');
					$("#frmcons .f_1002").val('');
					try {
						//ym(93759831,'reachGoal','frmcons');
					} catch (e) { }
				} else {
					$("#frmcons .answ").html(response);
				}
			}
		});
	});
	// Форма - "Рассчитаем ваш проект"
	$('#popup .but').click(function () {
		$("#popup .answ").html('Отправка, ожидайте...');
		var data = new FormData();
		data.append('filename', $('#filename1').prop('files')[0]);
		data.append('f_1', $("#popup .f_2001").val());
		data.append('f_2', $("#popup .f_2002").val());
		data.append('f_3', $("#popup .f_2003").val());
		data.append('cururl', document.location.href);
		data.append('title', document.title);
		$.ajax({
			type: 'POST',
			processData: false, // important
			contentType: false, // important
			data: data,
			url: "/frmRaschet.php",
			dataType: 'json',
			success: function (response) {
				//ym(52303579,'reachGoal','form1');
				switch (response) {
					case 0:
						$("#popup .answ").html('Проект успешно отправлен! Ожидайте расчёта!');
						$("#popup .f_2001").val('');
						$("#popup .f_2002").val('');
						$("#popup .f_2003").val('');
						$('#filename1').val('');
						try {
							//ym(93759831,'reachGoal','popup');
						} catch (e) { }
						break;
					default:
						$("#popup .answ").html(response);
						break;
				}
			}
		});
	});
	//Форма - "Заявка на экскурсию"
	$('#frmex .but').click(function () {
		$.ajax({
			url: '/frmExc.php',
			data: {
				'c1': $("#frmex .f_3001").val(),
				'cururl': document.location.href,
				'title': document.title
			},
			type: 'GET',
			success: function (response) {
				//ym(52303579,'reachGoal','form3');
				if (response == 0) {
					$("#frmex .answ").html('Заявка успешно отправлена! Ожидайте звонка!');
					$("#frmex .f_3001").val('');
					try {
						//ym(93759831,'reachGoal','frmex');
					} catch (e) { }
				} else {
					$("#frmex .answ").html(response);
				}
			}
		});
	});
	// Форма - Есть проект дома? Смело присылайте!
	$('#frmraschet .but').click(function () {
		$("#frmraschet .answ").html('Отправка, ожидайте...');
		var data = new FormData();
		data.append('filename', $('#filename2').prop('files')[0]);
		data.append('f_1', $("#frmraschet .f_4001").val());
		data.append('cururl', document.location.href);
		data.append('title', document.title);
		$.ajax({
			type: 'POST',
			processData: false, // important
			contentType: false, // important
			data: data,
			url: "/frmRaschet2.php",
			dataType: 'json',
			success: function (response) {
				//ym(52303579,'reachGoal','form-footer');
				switch (response) {
					case 0:
						$("#frmraschet .answ").html('Проект успешно отправлен! Ожидайте расчёта!');
						$("#frmraschet .f_4001").val('');
						$('#filename2').val('');
						try {
							//ym(93759831,'reachGoal','frmraschet');
						} catch (e) { }
						break;
					default:
						$("#frmraschet .answ").html(response);
						break;
				}
			}
		});
	});

	$('button[data-src="#frmzakaz"]').click(function () {
		let base_price = parseInt($('.baseprice').data('price'));
		let dops_str = '';
		let dops_int = 0;
		$('.item-page .options .item button.active').each(function () {
			let p = $(this).parent().parent();
			dops_int = dops_int + parseInt(p.data('price'));
			dops_str = dops_str + p.data('name') + ' + ' + nn(parseInt(p.data('price'))) + ' руб.\n';
		});
		$('.item-page .fund button.active').each(function () {
			let p = $(this).parent();
			dops_str = dops_str + 'Фундамент: ' + p.data('name') + '\n';
		});
		$('.f_5004').html('Итоговая стоимость: ' + nn(dops_int + base_price) + '\n' + dops_str);
	});

	// Форма - "Узнайте подробнее!" в карточке проекта
	$('#frmzakaz .but').click(function () {
		$.ajax({
			url: '/frmZakaz.php',
			data: {
				'c1': $("#frmzakaz .f_5001").val(),
				'c2': $("#frmzakaz .f_5002").val(),
				'c3': $("#frmzakaz .f_5003").val(),
				'c4': $("#frmzakaz .f_5004").val(),
				'c5': $("#frmzakaz .f_5005").val(),
				'cururl': document.location.href,
				'title': document.title
			},
			type: 'GET',
			success: function (response) {
				//ym(52303579,'reachGoal','form-project');
				if (response == 0) {
					$("#frmzakaz .answ").html('Заявка успешно отправлена! Ожидайте звонка!');
					$("#frmzakaz .f_5001").val('');
					$("#frmzakaz .f_5002").val('');
					$("#frmzakaz .f_5003").val('');
					$("#frmzakaz .f_5005").val('');
					try {
						//ym(93759831,'reachGoal','frmzakaz');
					} catch (e) { }
				} else {
					$("#frmzakaz .answ").html(response);
				}
			}
		});
	});

	// Форма - "Оставить заявку" на странице "Акции" с карточки акции
	let subject;
	$('button[data-src="#frmaction"]').click(function (e) {
		dataId = $(e.target).data('id');
		subject = $(e.target).data('sbj');
		$('#frmaction').find('.name').text(subject);
	});

	$('#frmaction .but').click(function () {
		$("#frmaction .answ").html('Отправка, ожидайте...');
		var data = new FormData();
		data.append('sbj', subject);
		data.append('id', dataId);
		data.append('f_1', $("#frmaction .f_2001").val());
		data.append('f_2', $("#frmaction .f_2002").val());
		data.append('f_3', $("#frmaction .f_2003").val());
		data.append('cururl', document.location.href);
		data.append('title', document.title);
		console.log(Number(data.get('id')) + 1);
		// $.ajax({
		// 	type: 'POST',
		// 	processData: false, // important
		// 	contentType: false, // important
		// 	data: data,
		// 	url: "/frmAction.php",
		// 	dataType : 'json',
		// 	success: function(response){
		// 		switch (parseInt(data.get('id'))) {
		// 			case 287:
		// 				//ym(52303579,'reachGoal','form-sale1');
		// 				break;
		// 			case 288:
		// 				//ym(52303579,'reachGoal','form-sale2');
		// 				break;
		// 			case 289:
		// 				//ym(52303579,'reachGoal','form-sale3');
		// 				break;
		// 		}
		// 		switch (response) {
		// 			case 0:
		// 				$("#frmaction .answ").html('Проект успешно отправлен! Ожидайте расчёта!');
		// 				$("#frmaction .f_2001").val('');
		// 				$("#frmaction .f_2002").val('');
		// 				$("#frmaction .f_2003").val('');
		// 				$('#filename1').val('');
		// 				break;
		// 			default:
		// 				$("#frmaction .answ").html(response);
		// 				break;
		// 		}
		// 	}
		// });
	});

	(function mobileDropdown() {
		document.querySelectorAll('.menu-dropdown').forEach(dd => {
			let collapse = dd.querySelector('ul');
			let open = false;
			resizeCollapse();
			dd.addEventListener('click', function () {
				open = !open;
				resizeCollapse();
			})
			window.addEventListener('resize', resizeCollapse);

			function resizeCollapse() {
				let height = 0;
				if (open) collapse.querySelectorAll('li').forEach(ch => height += ch.clientHeight);
				collapse.style.height = height + 'px';

			}
		})
	})()
});


/*********************************************
 *********************************************

				Фильтр для каталога

				Полностью изменен *(частично)

 ********************************************
 ********************************************/

document.addEventListener('DOMContentLoaded', () => {

	// Мои добавки в mob filter
	// Клик кнопка  "mob filter"
	const element = document.querySelectorAll(".block-selection_filter");
	element.forEach((element) => {

		const children = Array.from(element.children[0].children);
		const showAllButton = document.createElement("div");
		showAllButton.setAttribute('type', 'button')
		showAllButton.classList.add('block-selection_filter-show-btn')
		let initialChildrenCount
		if (window.innerWidth < 575) {
			initialChildrenCount = 6
		} else {
			initialChildrenCount = 9999
		}
		let isExpanded = false;

		children.forEach((child, index) => {
			if (index >= initialChildrenCount) {
				child.style.display = "none";
			}
		});
		if (children.length > 6) {
			element.querySelector('.block-btn-filter').classList.add('after-active')
		}
		if (children.length > initialChildrenCount) {
			showAllButton.textContent = "Показать все";
			element.querySelector('.select-box').appendChild(showAllButton, element.nextSibling);

			showAllButton.addEventListener("click", () => {
				children.forEach((child, index) => {
					if (index >= initialChildrenCount) {
						child.style.display = isExpanded ? "none" : "";
					}
				});

				showAllButton.textContent = isExpanded ? "Показать все" : "Скрыть";
				isExpanded = !isExpanded;
			});
		}
	})



	$('.block_btm-mob-filter-btn').click(() => {
		if (window.innerWidth < 576) {
			$('.from-selection_filter').css({
				'position': 'fixed', "top": "0", "left": "0", "right": "0", "bottom": "0", "z-index": "10", "height": "100%", "background": "#fff", 'margin-top': "0", "padding": "0 15px", "overflow": 'auto', "display": "flex", "flex-direction": 'column', "flex-wrap": "nowrap"
			});
			$('body').css({ 'overflow': 'hidden' })
			$('.main-block_filter').css({ 'display': 'flex' });
			$('.block-selection_filter').css({ 'width': '100%', "top:": "20px" });
			$('.main-block_filter div').css({ 'justify-content': 'space-between' });
			$('.block_btm-clear-filter').css({ 'align-items': 'center' });
			$('.main-block_filter > div').css({ 'width': '100%' });
			$('.box-title-param').css({ 'width': '100%' });
			$('.right-block_sort').css({ 'display': 'none' });
			$('.block-btn-filter-mob').css({ 'display': 'block' });
			$('.main-block_filter-header').css({ "display": "flex" });
		}
	})

	$('.main-block_filter-header_btn').click(() => {
		$('.main-block_filter-header').css({ 'display': '' });
		$('body').css({ 'overflow': '' })
		$('.right-block_sort').css({ 'display': '' });
		$('.from-selection_filter').removeAttr("style")
		$('.main-block_filter').removeAttr("style")
		$('.block-selection_filter').css({ "width": "", "justify-content": "" })
		$('.block_size-param-main, .block_area-param-main, .block_prise-param-main, .block_floor-param-main, .block_options-param-main, .block_bedroom-param-main, .block_btm-clear-filter').removeAttr("style")
		$('.box-title-param').removeAttr("style")
		$('.block-btn-filter-mob').css({ 'display': '' });
	})

	function updateDropdownDirection(dropdown) {
		if (window.innerWidth > 575) {
			$('.main-block_filter-header').css({ 'display': '' });
			$('body').css({ 'overflow': '' })
			$('.right-block_sort').css({ 'display': '' });
			$('.from-selection_filter').removeAttr("style")
			$('.main-block_filter').removeAttr("style")
			$('.block-selection_filter').css({ "width": "", "justify-content": "" })
			$('.block_size-param-main, .block_area-param-main, .block_prise-param-main, .block_floor-param-main, .block_options-param-main, .block_bedroom-param-main, .block_btm-clear-filter').removeAttr("style")
			$('.box-title-param').removeAttr("style")
			$('.block-btn-filter-mob').css({ 'display': '' });
		}
		if (window.innerWidth > 575) {
			var dropdownRect = dropdown[0].getBoundingClientRect();
			var isInRightHalf = dropdownRect.left > window.innerWidth / 2;

			// Устанавливаем правильное положение dropdown в зависимости от расположения
			if (isInRightHalf) {
				dropdown.css("right", 0);
				dropdown.css("left", "auto");
			} else {
				dropdown.css("right", "auto");
				dropdown.css("left", 0);
			}
			$(".selection_filter-prise").css({ "right": "0", "left": "auto" });
		}
		if (window.innerWidth < 630 && window.innerWidth > 575) {
			$(".selection_filter-options").css({ "right": "0", "left": "auto" });
		}
	}


	// Изменяем направление dropdown при загрузке страницы
	$(".block-selection_filter").each(function () {
		updateDropdownDirection($(this));
	});

	// Изменяем направление dropdown при изменении размера окна
	$(window).resize(function () {
		$(".block-selection_filter").each(function () {
			updateDropdownDirection($(this));
		});
	});

	// Клик кнопка  "Размер"
	$('.box-title-param-size').click(() => {
		if (window.innerWidth > 575) {
			$('.block-event').toggleClass('opacity1');
		}
		$('.svg-color-size').toggleClass('svg-color-active');
		$('.galochka-svg-size').toggleClass('active-svg');
		$('.title-text-size').toggleClass('active-text-fff');
		$('.block_size-param-main').toggleClass('active-filter');
		$('.selection_filter-size').toggleClass('hidden');
	})
	//кнопка  "Размер"

	// кнопка "Этажность"
	$('.box-title-param-floor').click(() => {
		``
		if (window.innerWidth > 575) {
			$('.block-event').toggleClass('opacity1');
		}

		$('.svg-color-floor').toggleClass('svg-color-active');
		$('.galochka-svg-floor').toggleClass('active-svg');
		$('.title-text-floor').toggleClass('active-text-fff');
		$('.block_floor-param-main').toggleClass('active-filter');
		$('.selection_filter-floor').toggleClass('hidden');
	})
	// кнопка "Этажность"

	// кнопка "Цена"
	$('.box-title-param-prise').click(() => {
		if (window.innerWidth > 575) {
			$('.block-event').toggleClass('opacity1');
		}

		$('.svg-color-prise').toggleClass('svg-color-active');
		$('.galochka-svg-prise').toggleClass('active-svg');
		$('.title-text-prise').toggleClass('active-text-fff');
		$('.block_prise-param-main').toggleClass('active-filter');
		$('.selection_filter-prise').toggleClass('hidden');
	})
	// кнопка "цена"

	// кнопка "Площадь"
	$('.box-title-param-area').click(() => {
		if (window.innerWidth > 575) {
			$('.block-event').toggleClass('opacity1');
		}

		$('.svg-color-area').toggleClass('svg-color-active');
		$('.galochka-svg-area').toggleClass('active-svg');
		$('.title-text-area').toggleClass('active-text-fff');
		$('.block_area-param-main').toggleClass('active-filter');
		$('.selection_filter-area').toggleClass('hidden');
	})
	// кнопка "Площадь"

	// кнопка "Кол-во спален"
	$('.box-title-param-bedroom').click(() => {
		if (window.innerWidth > 575) {
			$('.block-event').toggleClass('opacity1');
		}

		$('.svg-color-bedroom').toggleClass('svg-color-active');
		$('.galochka-svg-bedroom').toggleClass('active-svg');
		$('.title-text-bedroom').toggleClass('active-text-fff');
		$('.block_bedroom-param-main').toggleClass('active-filter');
		$('.selection_filter-bedroom').toggleClass('hidden');
	})
	// кнопка "Кол-во спален"

	// кнопка "Опции"
	$('.box-title-param-options').click(() => {
		if (window.innerWidth > 575) {
			$('.block-event').toggleClass('opacity1');
		}

		$('.svg-color-options').toggleClass('svg-color-active');
		$('.galochka-svg-options').toggleClass('active-svg');
		$('.title-text-options').toggleClass('active-text-fff');
		$('.block_options-param-main').toggleClass('active-filter');
		$('.selection_filter-options').toggleClass('hidden');
	})
	// кнопка "Опции"

	// кнопка "Сортировка"
	$('.box-title-param-sort').click(() => {
		if (window.innerWidth > 575) {
			$('.block-event').toggleClass('opacity1');
		}

		$('.svg-color-sort').toggleClass('svg-color-active');
		$('.galochka-svg-sort').toggleClass('active-svg');
		$('.title-text-sort').toggleClass('active-text-fff');
		$('.block_sort-param-main').toggleClass('active-filter');
		$('.selection_filter-sort').toggleClass('hidden');
	})
	// кнопка "Сортировка"


	//Клик по свободному месту.
	$('.block-event').click(() => {
		$('.block-event').removeClass('opacity1')

		//size param
		$('.svg-color-size').removeClass('svg-color-active');
		$('.galochka-svg-size').removeClass('active-svg');
		$('.title-text-size').removeClass('active-text-fff');
		$('.block_size-param-main').removeClass('active-filter');
		$('.selection_filter-size').addClass('hidden');
		//floor param
		$('.svg-color-floor').removeClass('svg-color-active');
		$('.galochka-svg-floor').removeClass('active-svg');
		$('.title-text-floor').removeClass('active-text-fff');
		$('.block_floor-param-main').removeClass('active-filter');
		$('.selection_filter-floor').addClass('hidden');
		//prise param
		$('.svg-color-prise').removeClass('svg-color-active');
		$('.galochka-svg-prise').removeClass('active-svg');
		$('.title-text-prise').removeClass('active-text-fff');
		$('.block_prise-param-main').removeClass('active-filter');
		$('.selection_filter-prise').addClass('hidden');
		//area param
		$('.svg-color-area').removeClass('svg-color-active');
		$('.galochka-svg-area').removeClass('active-svg');
		$('.title-text-area').removeClass('active-text-fff');
		$('.block_area-param-main').removeClass('active-filter');
		$('.selection_filter-area').addClass('hidden');
		//sort param
		$('.svg-color-sort').removeClass('svg-color-active');
		$('.galochka-svg-sort').removeClass('active-svg');
		$('.title-text-sort').removeClass('active-text-fff');
		$('.block_sort-param-main').removeClass('active-filter');
		$('.selection_filter-sort').addClass('hidden');
		//bedroom param
		$('.svg-color-bedroom').removeClass('svg-color-active');
		$('.galochka-svg-bedroom').removeClass('active-svg');
		$('.title-text-bedroom').removeClass('active-text-fff');
		$('.block_bedroom-param-main').removeClass('active-filter');
		$('.selection_filter-bedroom').addClass('hidden');
		//options param
		$('.svg-color-options').removeClass('svg-color-active');
		$('.galochka-svg-options').removeClass('active-svg');
		$('.title-text-options').removeClass('active-text-fff');
		$('.block_options-param-main').removeClass('active-filter');
		$('.selection_filter-options').addClass('hidden');
	})

	//  Мои изменения в header after scroll

	$(document).ready(function () {
		var changingElementContacts = $(".header .contacts-pc")
		var changingElementEmail = $(".header .contacts-pc-email")
		var changingElementSocials = $(".header .social")
		var changingElement = $(".header .topnav");
		var changingElementLogoImg = $(".header .logo img");
		var changingElementLogo = $(".header .logo");
		var changingElementMenu = $(".header .header__menu");
		var changingElementPhone = $(".header .contacts-pc-phone");

		$(window).scroll(function () {
			// Получаем текущую высоту прокрутки
			var scrollHeight = $(this).scrollTop();

			// Если прокрутка больше 70px, меняем цвет фона элемента
			if (scrollHeight > 1) {
				if (window.innerWidth > 1199) {
					changingElementPhone.css({ "font-size": "18px" })
					changingElementMenu.css({ "gap": "20px" })
					changingElementContacts.css({ "margin-right": "0" })
					changingElementLogo.css({ "width": "50px", "overflow": "hidden" })
					changingElementLogoImg.css({ "max-width": "unset" })
					changingElementEmail.css({ "display": "none" })
					changingElementSocials.css({ "display": "none" })
					changingElement.css({ "display": "flex", "padding-top": "0px", "align-items": "center" });
				}
			} else {
				changingElementPhone.removeAttr("style")
				changingElementMenu.removeAttr("style")
				changingElementContacts.removeAttr("style")
				changingElementLogo.removeAttr("style")
				changingElementLogoImg.removeAttr("style")
				changingElementEmail.removeAttr("style")
				changingElementSocials.removeAttr("style")
				changingElement.removeAttr("style")
			}
		});
	});

	/*
	* Логика кнопки очищения конкретного фильтра появление / нажатия
	*
	 */

	//Этажность
	const inputFilterFloor = document.querySelectorAll('.input-filter-floor');
	inputFilterFloor.forEach((elem) => {
		const checked = elem.checked
		if (checked) {
			$('.clear-filter-floor').removeClass('hidden')
		}
	})
	$('.clear-filter-floor').click(() => {
		inputFilterFloor.forEach((elem) => {
			elem.checked = false

		})
	})

	//кол-во спален
	const inputFilterBedroom = document.querySelectorAll('.input-filter-bedroom');
	inputFilterBedroom.forEach((elem) => {
		const checked = elem.checked
		if (checked) {
			$('.clear-filter-bedroom').removeClass('hidden')
		}
	})
	$('.clear-filter-bedroom').click(() => {
		inputFilterBedroom.forEach((elem) => {
			elem.checked = false
		})
	})

	//Опции
	const inputFilterOptions = document.querySelectorAll('.input-filter-options');
	inputFilterOptions.forEach((elem) => {
		const checked = elem.checked
		if (checked) {
			$('.clear-filter-options').removeClass('hidden')
		}
	})
	$('.clear-filter-options').click(() => {
		inputFilterOptions.forEach((elem) => {
			elem.checked = false
		})
	})

	/*
	* Логика кнопки очищения конкретного фильтра появление / нажатия
	*
	 */





	/// Выделение текста выбранного параметра в сортировке
	const titleTextSort = document.querySelector('.title-text-sort');
	const optionSort = document.querySelectorAll('.option-sort');
	if ($('.opt-sort1').val() === titleTextSort.value) {
		$('.opt-sort1').addClass('bold');
	}
	if ($('.opt-sort2').val() === titleTextSort.value) {
		$('.opt-sort2').addClass('bold');
	}
	if ($('.opt-sort3').val() === titleTextSort.value) {
		$('.opt-sort3').addClass('bold');
	}
	if ($('.opt-sort4').val() === titleTextSort.value) {
		$('.opt-sort4').addClass('bold');
	}
	if ($('.opt-sort5').val() === titleTextSort.value) {
		$('.opt-sort5').addClass('bold');
	}
	if ($('.opt-sort6').val() === titleTextSort.value) {
		$('.opt-sort6').addClass('bold');
	}
	/// Выделение текста выбранного параметра в сортировке

	optionSort.forEach((el) => {
		el.addEventListener('click', (e) => {
			const value = e.target.value;
			addValueText(value)
		})
	})
	function addValueText(text) {
		titleTextSort.value = text;
	}

	/*****************************
	 *
	 *  input для Цены и полощади.
	 *
	 *****************************/
	function inputRangePrice() {
		var $range = $(".js-range-slider"),
			$inputFrom = $(".js-input-from"),
			$inputTo = $(".js-input-to"),
			instance,
			min = 1110000,
			max = 5570000,
			from = 0,
			to = 0;

		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			min: min,
			max: max,
			from: $inputFrom.val(),
			to: Number($inputTo.val()) === 0 ? max : $inputTo.val(),
			onStart: updateInputs,
			onChange: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;

			$inputFrom.prop("value", from);
			$inputTo.prop("value", to);
		}

		$inputFrom.on("input", function () {
			var val = $(this).prop("value");

			// validate
			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});
		});

		$inputTo.on("input", function () {
			var val = $(this).prop("value");

			// validate
			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val
			});
		});
		if (Number($inputFrom.val()) === min && Number($inputTo.val()) === max) {
			$(".clear-filter-prise").addClass('hidden');
		} else {
			$(".clear-filter-prise").removeClass('hidden');
		}

		$(".clear-filter-prise").click(() => {
			$inputFrom.val(min);
			$inputTo.val(max);
			$(".clear-filter-prise").addClass('hidden');
		})
	}
	inputRangePrice();
	function inputRangeArea() {
		var $rangeArea = $(".js-range-slider-area"),
			$inputFromArea = $(".js-input-from-area"),
			$inputToArea = $(".js-input-to-area"),
			instanceArea,
			minArea = 30,
			maxArea = 250,
			fromArea = 0,
			toArea = 0;

		$rangeArea.ionRangeSlider({
			skin: "round",
			type: "double",
			min: minArea,
			max: maxArea,
			from: $inputFromArea.val(),
			to: Number($inputToArea.val()) === 0 ? maxArea : $inputToArea.val(),
			onStart: updateInputs,
			onChange: updateInputs
		});
		instanceArea = $rangeArea.data("ionRangeSlider");

		function updateInputs(data) {
			fromArea = data.from;
			toArea = data.to;

			$inputFromArea.prop("value", fromArea);
			$inputToArea.prop("value", toArea);
		}

		$inputFromArea.on("input", function () {
			var val = $(this).prop("value");

			// validate
			if (val < min) {
				val = minArea;
			} else if (val > toArea) {
				val = toArea;
			}

			instanceArea.update({
				from: val
			});
		});

		$inputToArea.on("input", function () {
			var val = $(this).prop("value");

			// validate
			if (val < fromArea) {
				val = fromArea;
			} else if (val > max) {
				val = max;
			}

			instanceArea.update({
				to: val
			});
		});

		if (Number($inputFromArea.val()) === minArea && Number($inputToArea.val()) === maxArea) {
			$(".clear-filter-area").addClass('hidden');
		} else {
			$(".clear-filter-area").removeClass('hidden');
		}

		$(".clear-filter-area").click(() => {
			$inputFromArea.val(minArea);
			$inputToArea.val(maxArea);
			$(".clear-filter-area").addClass('hidden');

			svgColorArea.classList.remove('svg-color-active');
			galochkaSvgArea.classList.remove('active-svg');
			titleTextArea.classList.remove('active-text-fff');
			blockAreaParamArea.classList.remove('active-filter');
			blockSelectionFilterArea.classList.add('hidden');
		})
	}
	inputRangeArea()

	// Добавлен мобильный фильтр



});
const jsInputFrom = document.querySelector('.js-input-from');
const value = jsInputFrom.value
console.log(value.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 '));
$('.js-input-from').val()
/*********************
 *
 *  input для Цены и полощади.
 *
 **********************/

/*********************************************
 *********************************************

 Фильтр для каталога

 ********************************************
 ********************************************/

