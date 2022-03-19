const keyCodes = () => {
  document.addEventListener("keydown", function (e) {
    console.log(e);
    console.log(
      "keyCodeDEP",
      e.which,
      "key",
      e.key,
      "code",
      e.code,
      "location",
      e.location
    );
  });
};
keyCodes();
