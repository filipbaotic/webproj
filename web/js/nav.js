$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementTop - 1 < viewportTop && elementBottom > viewportTop;
};

$(window).on("scroll", function () {
  if ($("#hero").isInViewport()) {
    $('.nav a[href$="#"]').addClass("active");
  } else {
    $('.nav a[href$="#"]').removeClass("active");
  }
  if ($("#exhibitions").isInViewport()) {
    $(".nav").addClass("nav-active_exhibitions");
    $('.nav a[href$="#exhibitions"]').addClass("active");
  } else {
    $(".nav").removeClass("nav-active_exhibitions");
    $('.nav a[href$="#exhibitions"]').removeClass("active");
  }
  if ($("#about").isInViewport()) {
    $(".nav").addClass("nav-active_about");
    $('.nav a[href$="#about"]').addClass("active");
  } else {
    $(".nav").removeClass("nav-active_about");
    $('.nav a[href$="#about"]').removeClass("active");
  }
  if ($("#news").isInViewport()) {
    $(".nav").addClass("nav-active_news");
    $('.nav a[href$="#news"]').addClass("active");
  } else {
    $(".nav").removeClass("nav-active_news");
    $('.nav a[href$="#news"]').removeClass("active");
  }
});

const Logout = async () => {
  document.cookie = "isLoggedIn=;max-age=0";
  history.pushState({}, "", "/");
  location.reload();
};
