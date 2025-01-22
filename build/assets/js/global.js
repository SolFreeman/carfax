jQuery(document).ready(function ($) {
	faqAccordeon();

	let navOpener = document.querySelector('.js-nav-opener');
	let header = document.querySelector('.header');

	navOpener.addEventListener('click', () => {
		header.classList.toggle('active');
	})

	function handleTabClicks() {
		if ($(window).width() > 767) {
			$('ul.tabs__caption').on('click', 'li:not(.active)', function () {
				$(this)
					.addClass('active').siblings().removeClass('active')
					.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
			});
		} else {
			$('ul.tabs__caption').off('click', 'li:not(.active)');
		}
	}

	// Initial check
	handleTabClicks();

	// Check on window resize
	$(window).resize(function () {
		handleTabClicks();
	});

	function selectLang() {
		var nav = $('.language-title');
		var selection = $('.language-list');
		var select = selection.find('li');

		nav.click(function (event) {
			if (nav.hasClass('active')) {
				nav.removeClass('active');
				selection.stop().slideUp(200);
			} else {
				nav.addClass('active');
				selection.stop().slideDown(200);
			}
			event.preventDefault();
			event.stopPropagation(); // Останавливаем всплытие события, чтобы не сработал обработчик для документа
		});

		select.click(function (event) {
			select.removeClass('active');
			$(this).addClass('active');
			var $lang = $(this).text();
			nav.text($lang);
			nav.trigger('click');

			//event.preventDefault();
			//event.stopPropagation(); // Останавливаем всплытие события, чтобы не сработал обработчик для документа
		});

		$(document).click(function () {
			if (nav.hasClass('active')) {
				nav.removeClass('active');
				selection.stop().slideUp(200);
			}
		});
	}

	selectLang();

	function handleResize() {
		if ($(window).width() < 768) {
			$('.title').off('click').on('click', function () {
				$(this).toggleClass('active');
				$(this).next('.info-list').slideToggle();
			});
		} else {
			$('.title').off('click'); // Убираем обработчик клика на десктопе
			$('.info-list').removeAttr('style'); // Убираем инлайн-стили, установленные slideToggle
		}
	}

	handleResize(); // Первоначальная проверка при загрузке страницы

	$(window).resize(function () {
		handleResize(); // Проверка при изменении размера окна
	});

	$('.slider-news').slick({
		slidesToShow: 3,
		dots: true,
		// arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			},
		]
	});

	/**
	document.getElementById('copyButton').addEventListener('click', function() {
		var textField = document.getElementById('textField');
		navigator.clipboard.writeText(textField.value).then(function() {
			alert('Текст скопирован: ' + textField.value);
		}, function(err) {
			console.error('Ошибка копирования: ', err);
		});
	});
	**/

	$('.pricing-option label').click(function () {
		var this_price = $(this).data('price');
		$('.final-price span').text(this_price);
	});

	$('.tablist a').click(function (event) {
		event.preventDefault();
		$('.tablist a').removeClass('active');
		$(this).addClass('active');
	});

	$('.next').click(function () {
		$('.step_1').hide();
		$('.step_2, .info-text').show();
	});

	$('.back').click(function () {
		$('.step_2, .info-text').hide();
		$('.step_1').show();
	});

	openAccountNav();

	addActiveModalItem();

	document.querySelectorAll('.toggle-password').forEach(button => {
		button.addEventListener('click', () => {
			const input = button.previousElementSibling; // находим соседний input

			// Переключаем тип поля
			if (input.type === 'password') {
				input.type = 'text';
				button.classList.add('visible'); // Добавляем класс
			} else {
				input.type = 'password';
				button.classList.remove('visible'); // Убираем класс
			}
		});
	});

});

function faqAccordeon() {
	var allLi = jQuery('.faq-list li, .edit-list .item'),
		allSub = allLi.children('.filter');

	jQuery('.faq-list li > span, .edit-list .open-title').each(function () {
		var doc = jQuery(document),
			$this = jQuery(this),
			item = $this.parent('li, .item'),
			itemFilter = $this.next('.text-faq, .edit_js'),
			itemParent = item.parents('li, .item');


		$this.on('click', function () {
			if (item.hasClass('active')) {
				itemFilter.slideUp();
				item.removeClass('active');
			}
			else {
				allLi.not(itemParent).removeClass('active');
				allLi.not(itemParent).find('.text-faq, .edit_js').slideUp();
				itemFilter.slideDown();
				item.addClass('active');
			}
		});
	});
}

function openAccountNav() {
	var nav = $('.registered-user .btn-box');
	var selection = $('.account-list');

	nav.click(function (event) {
		if (nav.hasClass('active')) {
			nav.removeClass('active');
			selection.stop().slideUp(200);
		} else {
			nav.addClass('active');
			selection.stop().slideDown(200);
		}
		// event.preventDefault();
		event.stopPropagation(); // Останавливаем всплытие события, чтобы не сработал обработчик для документа
	});

	$(document).click(function () {
		if (nav.hasClass('active')) {
			nav.removeClass('active');
			selection.stop().slideUp(200);
		}
	});
}

function addActiveModalItem() {
	$('.open_edit_info_item').on('click', function () {
		$('.edit-list .item').removeClass('active');
		$('.edit_info_item').addClass('active');
	});

	$('.open_edit_pass_item').on('click', function () {
		$('.edit-list .item').removeClass('active');
		$('.edit_pass_item').addClass('active');
	});
}

