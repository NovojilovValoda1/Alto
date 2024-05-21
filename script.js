window.addEventListener("DOMContentLoaded", (event) => {
  const audio = new Audio("Peder B.mp3");
  audio.loop = true;
  audio.play();

  // Остановка воспроизведения при закрытии вкладки
  window.addEventListener("beforeunload", (event) => {
    audio.pause();
  });
});

// Получаем элементы слайдера
const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const slides = Array.from(slider.querySelectorAll("img"));
const slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

// Инициализация слайдера
updateSlider();

// // slaider
// document.addEventListener("DOMContentLoaded", (event) => {
//   let slideIndex = 0;
//   showSlides();

//   function showSlides() {
//     let slides = document.querySelectorAll(".slide");
//     slides.forEach((slide) => {
//       slide.style.display = "none";
//     });
//     slideIndex++;
//     if (slideIndex > slides.length) {
//       slideIndex = 1;
//     }
//     slides[slideIndex - 1].style.display = "block";
//     setTimeout(showSlides, 3000); // Change slide every 3 seconds
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const collection = [
    { id: 1, category: "music", image: "1.jpg", title: "Название пластинки 1" },
    {
      id: 2,
      category: "poetry",
      image: "2.jpg",
      title: "Название пластинки 2",
    },
    { id: 3, category: "prose", image: "3.jpg", title: "Название пластинки 3" },
    // Добавьте остальные предметы коллекции здесь
  ];

  function displayItems(items) {
    const collectionDiv = document.getElementById("collection");
    collectionDiv.innerHTML = "";
    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p>${item.title}</p>
            `;
      itemDiv.addEventListener("click", () => {
        window.location.href = `item.html?id=${item.id}`;
      });
      collectionDiv.appendChild(itemDiv);
    });
  }

  function filterItems(category) {
    if (category === "all") {
      displayItems(collection);
    } else {
      const filteredItems = collection.filter(
        (item) => item.category === category
      );
      displayItems(filteredItems);
    }
  }

  // Display all items by default
  displayItems(collection);
});

document.addEventListener("DOMContentLoaded", () => {
  const collection = [
    {
      id: 1,
      category: "music",
      image: "1.jpg",
      title: "Название пластинки 1",
      description: "Описание пластинки 1",
    },
    {
      id: 2,
      category: "poetry",
      image: "2.jpg",
      title: "Название пластинки 2",
      description: "Описание пластинки 2",
    },
    {
      id: 3,
      category: "prose",
      image: "3.jpg",
      title: "Название пластинки 3",
      description: "Описание пластинки 3",
    },
    // Добавьте остальные предметы коллекции здесь
  ];

  function getItemById(id) {
    return collection.find((item) => item.id === parseInt(id));
  }

  if (window.location.pathname.endsWith("item.html")) {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");
    const item = getItemById(itemId);

    if (item) {
      const itemDetailsDiv = document.getElementById("item-details");
      itemDetailsDiv.innerHTML = `
                <h1>${item.title}</h1>
                <img src="${item.image}" alt="${item.title}">
                <p>${item.description}</p>
            `;
    }
  }
});

// validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    // Регулярное выражение для проверки имени, фамилии и отчества
    const nameRegex = /^[а-яА-ЯёЁ\s-]+$/;

    // Проверка имени
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    if (!nameRegex.test(name.value)) {
      isValid = false;
      nameError.textContent =
        "Имя должно содержать только кириллицу, пробел или тире.";
    } else {
      nameError.textContent = "";
    }

    // Проверка фамилии
    const surname = document.getElementById("surname");
    const surnameError = document.getElementById("surnameError");
    if (!nameRegex.test(surname.value)) {
      isValid = false;
      surnameError.textContent =
        "Фамилия должна содержать только кириллицу, пробел или тире.";
    } else {
      surnameError.textContent = "";
    }

    // Проверка отчества
    const patronymic = document.getElementById("patronymic");
    const patronymicError = document.getElementById("patronymicError");
    if (patronymic.value && !nameRegex.test(patronymic.value)) {
      isValid = false;
      patronymicError.textContent =
        "Отчество должно содержать только кириллицу, пробел или тире.";
    } else {
      patronymicError.textContent = "";
    }

    // Проверка email
    const login = document.getElementById("login");
    const loginError = document.getElementById("loginError");
    if (login.value === "admin") {
      loginError.textContent = 'Имя пользователя "admin" недоступно.';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(login.value)) {
        isValid = false;
        loginError.textContent = "Введите корректный email.";
      } else {
        loginError.textContent = "";
      }
    }

    // Проверка пароля
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    if (password.value.length < 6) {
      isValid = false;
      passwordError.textContent =
        "Пароль должен содержать не менее 6 символов.";
    } else {
      passwordError.textContent = "";
    }

    // Проверка повторного пароля
    const passwordRepeat = document.getElementById("password_repeat");
    const passwordRepeatError = document.getElementById("passwordRepeatError");
    if (password.value !== passwordRepeat.value) {
      isValid = false;
      passwordRepeatError.textContent = "Пароли не совпадают.";
    } else {
      passwordRepeatError.textContent = "";
    }

    // Проверка согласия с правилами
    const rules = document.getElementById("rules");
    const rulesError = document.getElementById("rulesError");
    if (!rules.checked) {
      isValid = false;
      rulesError.textContent = "Вы должны согласиться с правилами.";
    } else {
      rulesError.textContent = "";
    }

    if (isValid) {
      alert("Регистрация прошла успешно!");
      // Здесь можно добавить код для отправки данных на сервер
      form.reset();
    }
  });
});

// login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    // Проверка email
    const login = document.getElementById("login");
    const loginError = document.getElementById("loginError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login.value)) {
      isValid = false;
      loginError.textContent = "Введите корректный email.";
    } else {
      loginError.textContent = "";
    }

    // Проверка пароля
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    if (password.value.length < 6) {
      isValid = false;
      passwordError.textContent =
        "Пароль должен содержать не менее 6 символов.";
    } else {
      passwordError.textContent = "";
    }

    if (isValid) {
      // Перенаправление на страницу "Каталог" после успешной авторизации
      window.location.href = "catalog.html";
    }
  });
});

// rezerv
document.addEventListener("DOMContentLoaded", () => {
  const reserveButtons = document.querySelectorAll(".reserve-button");
  const modal = document.getElementById("modal");
  const confirmReserve = document.getElementById("confirmReserve");
  const cancelReserve = document.getElementById("cancelReserve");

  reserveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.display = "block";
    });
  });

  confirmReserve.addEventListener("click", () => {
    alert("Предмет помещен в резерв");
    modal.style.display = "none";
  });

  cancelReserve.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Обработчик формы удаления резерва
  const deleteReserveForm = document.getElementById("deleteReserveForm");
  if (deleteReserveForm) {
    deleteReserveForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const reserveId = document.getElementById("reserveId").value;
      // Логика удаления резерва по ID
      alert(`Резерв с ID ${reserveId} удален.`);
    });
  }

  // Обработчик формы управления предметами
  const itemForm = document.getElementById("itemForm");
  if (itemForm) {
    itemForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const itemName = document.getElementById("itemName").value;
      const itemDescription = document.getElementById("itemDescription").value;
      const itemCategory = document.getElementById("itemCategory").value;
      const itemImage = document.getElementById("itemImage").value;
      // Логика сохранения предмета
      alert(`Предмет "${itemName}" сохранен.`);
    });
  }

  // Обработчик формы управления категориями
  const categoryForm = document.getElementById("categoryForm");
  if (categoryForm) {
    categoryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const categoryName = document.getElementById("categoryName").value;
      // Логика сохранения категории
      alert(`Категория "${categoryName}" сохранена.`);
    });
  }
});
