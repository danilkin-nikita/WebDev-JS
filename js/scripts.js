"use strict";

// создание popup через класс (задание №3)
class Popup {
  constructor(popup, overlay, closeBtn, attribute) {
    this.popup = document.querySelector(popup);
    this.overlay = document.querySelector(overlay);
    this.closeBtn = closeBtn;
    this.attribute = attribute;
  }

  #openPopup() {
    this.overlay.classList.add("visible");
    this.popup.classList.add("visible");
  }

  #closePopup() {
    this.overlay.classList.remove("visible");
    this.popup.classList.remove("visible");
  }

  handler() {
    document.addEventListener("click", (event) => {
      let target = event.target;

      if (target.matches(`[data-toggle="${this.attribute}"]`)) {
        this.#openPopup();
      }

      if (target.closest(this.closeBtn) || target.contains(this.overlay)) {
        this.#closePopup();
      }
    });
  }

  init() {
    this.handler();
  }
}

const popup = new Popup(
  ".modal__dialog",
  ".modal__overlay",
  ".btn-close",
  "modal"
);

popup.init();

// задание №2
let slider = $(".slider");
slider.owlCarousel({
  loop: true,
  margin: 20,
  items: 3,
  dots: false,
});
$(".slider-button--next").click(function () {
  slider.trigger("next.owl.carousel");
});
$(".slider-button--prev").click(function () {
  slider.trigger("prev.owl.carousel");
});

// отправка формы (задание №4)
const sendForm = () => {
  const error = (elem, cssClass) => {
    elem.classList.add(cssClass);
    setTimeout(() => {
      elem.classList.remove(cssClass);
    }, 6000);
  };

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    let target = event.target;
    const statusMessage = target.querySelector(".status-message"),
      inputName = target.querySelector('input[name="name"]'),
      inputPhone = target.querySelector('input[name="phone"]'),
      inputEmail = target.querySelector('input[name="email"]');

    const validName = /^[а-яА-Яa-zA-Z]{2,}$/,
      validPhone = /^[+\-\)\(0-9 ]+$/,
      validEmai = /^\w+@\w+\.\w{2,}$/;

    let valid = true;

    if (target.matches(".form")) {
      if (!inputName.value.match(validName)) {
        error(inputName, "error-input");
        valid = false;
      }
      if (!inputPhone.value.match(validPhone)) {
        error(inputPhone, "error-input");
        valid = false;
      }
      if (!inputEmail.value.match(validEmai)) {
        error(inputEmail, "error-input");
        valid = false;
      }
      if (valid === false) {
        return;
      }

      statusMessage.innerHTML = `Отправка`;
    }
    const formData = new FormData(target);

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        statusMessage.textContent =
          "Сообщение отправлено! Мы скоро с вами свяжемся.";
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 6000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = "Что-то пошло не так...";
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 6000);
      });

    target.reset();
  });

  const postData = (formData) => {
    return fetch("./send.php", {
      method: "POST",
      body: formData,
      action: "./send.php",
    });
  };
};

sendForm();

// плавное появление блоков (задание №6)
const fadeItem = (itemsClass, interval = 300) => {
  let items = document.querySelectorAll(`${itemsClass}`);

  for (let i = 0; i < items.length; i++) {
    setTimeout(() => {
      items[i].style.opacity = "1";
    }, interval * i);
  }
};

fadeItem(".grid-item");

// создание аккардиона (задание №8)
const accordion = () => {
  const accordion = document.getElementById("accordion");

  const change = (event) => {
    let target = event.target;
    if (!target.classList.contains("accordion-item-title")) return;
    if (target.classList.contains("select")) {
      hideAll();
    } else {
      hideAll();
      target.classList.add("select");
      showText(target.nextElementSibling);
    }
  };
  const hideAll = () => {
    let accordionItemTitle = accordion.querySelectorAll(
      ".accordion-item-title"
    );
    let accordionItem = accordion.querySelectorAll(".accordion-item-text");
    for (var i = 0; i < accordionItemTitle.length; i++) {
      accordionItemTitle[i].classList.remove("select");
    }
    for (var i = 0; i < accordionItem.length; i++) {
      accordionItem[i].style.height = "0";
    }
  };
  const showText = (textEl) => {
    textEl.style.height = textEl.scrollHeight + "px";
  };

  accordion.addEventListener("click", change);
};

accordion();

let matrixExample = [
  [1, 2, 3, 4],
  [4, 5, 6, 5],
  [7, 8, 9, 7],
  [7, 8, 9, 7],
];

// Подсчет суммы основной и сторичной диагонали матрицы (задание №9)
const sumUpDiagonals = (matrix) => {
  let principal = 0,
    secondary = 0;

  (matrix.length > matrix[0].length ? matrix[0] : matrix).reduce(
    (acc, n, i) => {
      principal += matrix[i][i];
      secondary += matrix[i][matrix[i].length - i - 1];
      return acc;
    }
  );
  return `cумма основной оси - ${principal}; cумма вторичной оси - ${secondary}`;
};

console.log(sumUpDiagonals(matrixExample));
