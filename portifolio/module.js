import emailjs from "https://cdn.emailjs.com/dist/email.min.js";

emailjs.init("Ix_cFCHhOIzE2E9Ew");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_8zf1f6x", "template_kou8urm", this)
      .then(() => alert("Mensagem enviada com sucesso!"))
      .catch((error) => alert("Erro ao enviar: " + error));
  });
