"use strict";

$(document).ready(function() {

    // подсвечиваем ссылки с одинаковым адресом
    $(document).on('mouseover mouseout', "a", function(e) {
    var href = $(this).attr('href');
      if (!href || href == '#') {
        return;
      }
    $("a")
      .filter('[href="' + $(this).attr('href') + '"]')
      .toggleClass("hover", e.type == 'mouseover');
    });
    // /подсвечиваем ссылки с одинаковым адресом

    // поведение шапки при скролле
    (function(){
      var header = $("._headline-menu");
      $(document).on('scroll', function(scrlevt) {
          scrlevt.preventDefault();
          var scroll = $(window).scrollTop();


          if (scroll >= 220) {
              header.removeClass('fixed-off').addClass("fixed");
          } else {
              header.removeClass("fixed").addClass('fixed-off');
          }

          return false;
      });
    })();
    // /поведение шапки при скролле
    // поведение шапки на главной странице при скролле
    (function(){
        var headerhome = $("._header-home");
        $(document).on('scroll', function(scrlevt) {
            scrlevt.preventDefault();
            var scroll = $(window).scrollTop();

            if (scroll >= 1) {
                headerhome.removeClass('header-no-bg');
            } else {
                headerhome.addClass('header-no-bg');
            }

            return false;
        });
    })();
    // /поведение шапки при скролле

    // спойлер-блок на странице
    $('._foldable__content').hide();
    $('._foldable__control').click(function(){
        $(this).toggleClass("folded").toggleClass("unfolded").next().slideToggle();
        var close = $('._foldable__link').attr("data-text-close");
        var  open = $('._foldable__link').attr("data-text-open");
        if($(this).hasClass('folded')) {
          if (close) {
            $('._foldable__link').html(close);
          } else {
            $('._foldable__link').html('Свернуть раскрывающийся контент');
          }
        }
        else {
          if (open) {
            $('._foldable__link').html(open);
          } else {
            $('._foldable__link').html('Показать раскрывающийся контент');
          }
        }
    });
    // /спойлер-блок на странице

    // шпионский скролл в меню
    (function(){
        var lastId,
            topMenu = $("._spy-nav"),
            topMenuHeight = topMenu.outerHeight()+35,
            menuItems = topMenu.find("a"),
            scrollItems = menuItems.map(function(){
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            });
        menuItems.click(function(e){
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 650);
            e.preventDefault();
        });
        $(window).scroll(function(){
            var fromTop = $(this).scrollTop()+topMenuHeight;
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                return this;
            });
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
            if (lastId !== id) {
                lastId = id;
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#"+id+"']").parent().addClass("active");
            }
        });
    })();
    // /шпионский скролл в меню

    // показываем тултип, наверное?
    $('.help-icon').click(function(){
        console.log('ok, click');
        $('.popover').toggleClass("__active");
    });
    // /показываем тултип, наверное?

    // показываем форму поиска в шапке
    $('.search-form_btn-search, .search-form_btn-search_clear').click(function(){

        $('.main-menu').toggleClass('search-open');
        $('.search-form').toggleClass('search-form_expanded');
        $('.search-form__field').focus(function(){
            $('.search-form_btn-search_clear, .search-form_btn-search').addClass('__focus');
        }).blur(function(){
            $('.search-form_btn-search_clear, .search-form_btn-search').removeClass('__focus');
        })
    });
    // /показываем форму поиска в шапке

});
