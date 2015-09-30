var _toggleCollapse = function() {
  $('[data-toggle="collapse"]').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('is-open');
  });
  $('.navbar--global').on('hide.bs.collapse show.bs.collapse', function () {
    $(this).prev().toggleClass('next-sibling-is-visible');
  });
};

_toggleCollapse();
