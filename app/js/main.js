"use strict"

// slider
$(function () {
  $('.photos-slider__inner').slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    touchThreshold: 10,
  })
});

// menu burger
  $('.menu__btn').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active');
  });
   $('.menu__btn').on('click', function () {
     $('.phone__box').toggleClass('phone__box--active');
   });
   $('.menu__btn').on('click', function () {
     $('.socials').toggleClass('socials--active');
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

// form contacts
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert("Помилка main");
        form.classList.remove('_sending');
      }
    } else {
      alert("Заповніть обов'язкові поля")
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

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
    // return !/^\+380\d{3}\d{2}\d{2}\d{2}$/.test(input.value);
  }
});

