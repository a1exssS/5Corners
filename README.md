Важно: 
В тег head нужно обернуть скрипт (внизу) в try во избежание ошибок в консоле:
  <script>
		(function ($) {
			$(function () {
				try {
					$('.vk').EmbedVkGallery();
				} catch (e) {}
			});
		})(jQuery);
	</script>





------------

Чанки:

1. header.html - https://a1exsss.github.io/5Corners/header

2. main-adv - https://a1exsss.github.io/5Corners/main-adv

3. main-first - https://a1exsss.github.io/5Corners/main-first

4. main-form - https://a1exsss.github.io/5Corners/main-form

5. main-indpr - https://a1exsss.github.io/5Corners/main-upload

6. action-card - https://a1exsss.github.io/5Corners/action-card

7. card-chars - https://a1exsss.github.io/5Corners/card-chars

8. card-whatinclude - https://a1exsss.github.io/5Corners/card-whatinclude

9. cat-filters - https://a1exsss.github.io/5Corners/cat-filters

10. full-filter-chunk - https://a1exsss.github.io/5Corners/full-filter-chunk (Был исправлен common.js для фильтра, изменения - стр.412 -> 690, также добавлены картинки close-icon.svg, filer-icon.svg)

11. full-item-chunk - https://a1exsss.github.io/5Corners/full-item-chunk (добавлена картинка arrow-button.svg, в head была добавлена ссылка на swiper.css стр.11, и в конце body была добавлена сама логика swiper js (за место пердыдущего слайдера) )

12. nav - https://a1exsss.github.io/5Corners/nav (небольшая навигация под header + изменения в common.js стр. 689 -> 728)

13. header+nav - https://a1exsss.github.io/5Corners/header+nav (объеденил header и nav чтобы показать как это работает вметсе)

14. faq - https://a1exsss.github.io/5Corners/faq (Был найден и исправлен баг с footer который присутвует на сайте (контактные данные не отражались + была изменена компания которая продвигает этот проект на artgorka ))
