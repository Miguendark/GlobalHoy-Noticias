// irArriba.js

const btnIrArriba = document.getElementById("btnIrArriba");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnIrArriba.style.display = "block";
  } else {
    btnIrArriba.style.display = "none";
  }
});

btnIrArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
