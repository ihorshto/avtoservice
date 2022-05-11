"use strict"
// slider
$(function () {
  $('.photos-slider__inner').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    touchThreshold: 10,
    responsive: [{
        breakpoint: 1300,
        settings: {
          arrows: false
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          arrows: false
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      },
    ],
  })
});

$(function () {
  $('.photos-item__slider').slick({
    slidesToShow: 1,
  })
});

// menu burger
$('.menu__btn, .menu a').on('click', function () {
  $('.menu__list').toggleClass('menu__list--active');
});
$('.menu__btn, .menu a').on('click', function () {
  $('.phone__box').toggleClass('phone__box--active');
});
$('.menu__btn, .menu a').on('click', function () {
  $('.socials').toggleClass('socials--active');
});

// appear border-bottom in menu  
$(window).on("scroll", function () {
  var scrollPos = $(window).scrollTop();
  if (scrollPos <= 0) {
    $('.header__top').removeClass('header__top--scroll');
  } else {
    $('.header__top').addClass('header__top--scroll');
  }
});

// scroll
$(".menu a, .button-details").on("click", function (event) {
  event.preventDefault();
  var id = $(this).attr('href'),
    top = $(id).offset().top;
  $('body,html').animate({
    scrollTop: top
  }, 1500);
});


// popup
const openPopup = document.getElementById('popup-open');
const closePopup = document.getElementById('popup-close');
const popup = document.getElementById('popup');

openPopup.addEventListener('click', function (e) {
  e.preventDefault();
  popup.classList.add('popup__active');
});
closePopup.addEventListener('click', () => {
  popup.classList.remove('popup__active');
});

///////////////////////////////////////////////////////////////////////
/////// form contacts

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('telegram.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        form.reset();
        form.classList.remove('_sending');
        console.log('Well done!')
      } else {
        console.log("Error")
        form.classList.remove('_sending');
      }
    } else {
      console.log("Заповніть обов'язкові поля")
    }
  }

  function formValidate(form) {

    let error = 0;
    let formReq = form.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_phone')) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  };

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  // Функція тесту номера телефона
  function phoneTest(input) {
    return !/^(\+380|380|0)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{1}$/.test(input.value);
  }
});

////////////////////////////////////////////////////////////////
//// form popup

document.addEventListener('DOMContentLoaded', function () {
  const popup_form = document.getElementById('popup_form');
  popup_form.addEventListener('submit', formSendPopup);

  async function formSendPopup(e) {
    e.preventDefault();

    let errorPopup = formPopupValidate(popup_form);

    let formPopupData = new FormData(popup_form);

    if (errorPopup === 0) {
      popup.classList.add('_sending');
      let response = await fetch('telegram.php', {
        method: 'POST',
        body: formPopupData
      });
      if (response.ok) {
        popup_form.reset();
        popup.classList.remove('_sending');
        popup.classList.remove('popup__active');
        console.log('Well done!')
      } else {
        console.log("Error")
        popup.classList.remove('_sending');
      }
    } else {
      console.log("Заповніть обов'язкові поля")
    }
  }

  function formPopupValidate(popup_form) {

    let errorPopup = 0;
    let formPopupReq = popup_form.querySelectorAll('._req');

    for (let indexPopup = 0; indexPopup < formPopupReq.length; indexPopup++) {
      const inputPopup = formPopupReq[indexPopup];
      formPopupRemoveError(inputPopup);

      if (inputPopup.classList.contains('_phone')) {
        if (phonePopupTest(inputPopup)) {
          formPopupAddError(inputPopup);
          errorPopup++;
        }
      } else {
        if (inputPopup.value === '') {
          formPopupAddError(inputPopup);
          errorPopup++;
        }
      }
    }
    return errorPopup;
  };

  function formPopupAddError(inputPopup) {
    inputPopup.parentElement.classList.add('_error');
    inputPopup.classList.add('_error');
  }

  function formPopupRemoveError(inputPopup) {
    inputPopup.parentElement.classList.remove('_error');
    inputPopup.classList.remove('_error');
  }
  // Функція тесту номера телефона
  function phonePopupTest(inputPopup) {
    return !/^(\+380|380|0)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{1}$/.test(inputPopup.value);
  }
});