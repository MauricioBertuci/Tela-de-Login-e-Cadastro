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
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const dados = {email,senha};

    fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados) 
    })
    .then(response => {
        if (!response.ok) throw new Error("Email ou senha incorretos");
        return response.json();
    })
    .then(data => {
        window.location.href = "home.html";
    })
    .catch(error => {
        alert("Erro no login: " + error.message);
    });
}

// Quando a página carregar, ativa o botão de olho
window.addEventListener("DOMContentLoaded", () => {
    configurarToggleSenha();

    const form = document.querySelector(".form-login");
    form.addEventListener("submit", verificarLogin);
});