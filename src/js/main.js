// Файл: src/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // --- Крок 1: Знаходимо елементи на сторінці ---
  const themeSwitcherBtn = document.querySelector(".theme-switcher"); // Знаходимо кнопку по її класу
  const bodyElement = document.body; // Знаходимо тег <body>

  // --- Крок 2: Логіка перемикання теми по кліку ---
  themeSwitcherBtn.addEventListener("click", () => {
    // Метод toggle() автоматично додає клас, якщо його немає, і видаляє, якщо він є.
    bodyElement.classList.toggle("dark-theme");

    // Після перемикання, нам потрібно зберегти вибір користувача.
    // Перевіряємо, чи є зараз у body клас 'dark-theme'.
    if (bodyElement.classList.contains("dark-theme")) {
      // Якщо так, зберігаємо в localStorage значення 'dark'
      localStorage.setItem("theme", "dark");
    } else {
      // Якщо ні, зберігаємо значення 'light'
      localStorage.setItem("theme", "light");
    }
  });

  // --- Крок 3: Застосування збереженої теми при завантаженні сторінки ---
  const applySavedTheme = () => {
    // Дістаємо збережене значення з localStorage
    const savedTheme = localStorage.getItem("theme");

    // Перевіряємо, чи було щось збережено і чи це саме 'dark'
    if (savedTheme === "dark") {
      // Якщо так, додаємо клас 'dark-theme' до body
      bodyElement.classList.add("dark-theme");
    }
    // В іншому випадку нічого не робимо, оскільки світла тема є темою за замовчуванням.
  };

  // Викликаємо функцію застосування теми одразу ж, як тільки сторінка завантажилась
  applySavedTheme();
});
