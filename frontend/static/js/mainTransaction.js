//nav in mobile
const burger = document.querySelector(".left_side__img");
burger.addEventListener("click", (e) => {
  const nav = document.querySelector(".side-nav");
  nav.classList.toggle("side-nav_active");
});
