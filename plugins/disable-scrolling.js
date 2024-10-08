export default ({ app }, inject) => {
  app.directive("disable-scrolling", {
    mounted(el) {
      el.addEventListener("wheel", (event) => {
        if (
          el.getAttribute("type") === "number" &&
          el.classList.contains("noscroll")
        ) {
          event.preventDefault();
        }
      });
    },
  });
};
