function configurarToggleSenha() {
    const senhaInput = document.getElementById("senha");
    const toggleSenha = document.getElementById("toggleSenha");

    toggleSenha.addEventListener("click", () => {
        const tipo = senhaInput.getAttribute("type") === "password" ? "text" : "password";
        senhaInput.setAttribute("type", tipo);

        // Troca o emoji do botão
        toggleSenha.textContent = tipo === "password" ? "👁️" : "🙈";
    });
    
}

// Função que faz o login
function verificarLogin(event) {
  event.preventDefault(); // Impede o envio automático do form

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem");

  fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        mensagem.textContent = data.detail || "Erro no login";
        mensagem.className = "mensagem erro";
      } else {
        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.className = "mensagem sucesso";
        // Aqui sim você pode redirecionar:
        window.location.href = "home.html";
      }
    })
    .catch(() => {
      mensagem.textContent = "Erro ao conectar com o servidor.";
      mensagem.className = "mensagem erro";
    });
}

// Quando a página carregar, ativa o botão de olho
window.addEventListener("DOMContentLoaded", () => {
    configurarToggleSenha();

    const form = document.querySelector(".form-login");
    form.addEventListener("submit", verificarLogin);
});