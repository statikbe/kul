window.app = window.app || {};

app.kul = (function($, undefined) {
  var $document = $(document),
      $window = $(window),
      $html = $('html'),
      $body = $('body');

  var _initialize = function() {
    svg4everybody();
    // First set window size
    this.windowResize();
    $window.on('resize', debounce(app.kul.windowResize, 250, false));

    _moreMenu();
    _gallery();
  };

  var _sticky = function() {
    // $("header .navbar--local").removeAttr('style').unstick().sticky({
    //   responsiveWidth: true
    // });
  };

  var _windowResize = function() {
    $.extend(app.variables, {
      windowWidth: $window.width(),
      windowHeight: $window.height()
    });
    // _sticky();
  };

  var _gallery = function() {
    if ($.fn.colorbox) {
      $('.colorbox').colorbox({
        close: '&times;',
        next: '&rsaquo;',
        previous: '&lsaquo;',
        maxWidth: '90%',
        maxHeight: '90%',
        photo: true
      });

      $('.colorbox--video').colorbox({
        close: '&times;',
        next: '&rsaquo;',
        previous: '&lsaquo;',
        maxWidth: '90%',
        maxHeight: '90%',
        iframe: true,
        innerWidth: 640,
        innerHeight: 480
      });
    }
  };

  var _moreMenu = function() {
    var $menus = $('.nav--more');

    renderMore();
    $window.on('resize', debounce(resetList, 250, false));

    function resetList() {
      $menus.each(function() {
        var $menu = $(this).find('ul'),
            $items = $menu.find('li:not(.nav__more)').clone();

        $menu.empty().append($items);
      });
      renderMore();
    }

    function renderMore() {
      $menus.each(function() {
        var $menu = $(this),
            $list = $menu.find('ul'),
            menuWidth = $menu.width();

        var $moreItem = $('<li class="nav__more"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Meer <i class="material-icons">&#xE313;</i></a><ul class="dropdown__menu"></ul></li>'),
            $moreList = $moreItem.find('ul');
        $list.append($moreItem);


        var itemsTotalWidth = $moreItem.outerWidth();
        $moreItem.hide();


        var $menuItems = $menu.find('li').not($moreItem);
        // $list.prepend($menuItems);

        $menuItems.each(function() {
          var $item = $(this),
              itemWidth = $item.outerWidth(true);

          itemsTotalWidth = itemsTotalWidth + itemWidth;

          // console.log(menuWidth, itemsTotalWidth, itemWidth);

          if(itemsTotalWidth > menuWidth) {
            $moreList.append($item);
          }
        });

        if(!$moreList.is(':empty')) {
          $moreItem.show();
        }
      });
    }

    // Rerender the sticky header
    // _sticky();
  };

  var _finalize = function() {
    var doneClass = 'js-done';

    $window.on('load', function(){
      $html.addClass(doneClass);
    });
    function delayedJS() {
      if(!$html.hasClass(doneClass)) {
        $html.addClass(doneClass);
      }
    }
    window.setTimeout(delayedJS, 4000);

    _sticky();
  };

  return {
    init: _initialize,
    windowResize: _windowResize,
    finalize: _finalize
  };
})(jQuery);

// Helper functions for common.js
window.debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    $('.scroll-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});
