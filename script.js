const colorsItem = document.querySelectorAll(".color");
const hexItem = document.querySelectorAll(".hex");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const colorPicker = document
    .getElementById("color-picker")
    .value.substring(1);
  const colorScheme = document.getElementById("color-scheme").value;
  fetch(
    `https://www.thecolorapi.com/scheme?format=json&hex=${colorPicker}&mode=${colorScheme}`
  )
    .then((res) => res.json())
    .then((data) => {
      const colorsApi = data.colors;
      colorsItem.forEach((colorEl, index) => {
        const color = colorsApi[index].hex.value;
        colorEl.style.background = color;
      });
      hexItem.forEach((hexEl, index) => {
        var hex = colorsApi[index].hex.value;
        hexEl.textContent = hex;
      });
    });
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });
});

colorsItem.forEach((color) => {
  color.addEventListener("click", (e) => {
    const colorValue = navigator.clipboard.writeText(hex);
    color.classList.toggle("copied");
  });
});
