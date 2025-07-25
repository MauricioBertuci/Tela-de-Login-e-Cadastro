// Função que alterna visibilidade da senha
export function configurarToggleSenha() {
    const senhaInput = document.getElementById("senha");
    const toggleSenha = document.getElementById("toggleSenha");

    toggleSenha.addEventListener("click", () => {
        const tipo = senhaInput.getAttribute("type") === "password" ? "text" : "password";
        senhaInput.setAttribute("type", tipo);

        // Troca o emoji do botão
        toggleSenha.textContent = tipo === "password" ? "👁️" : "🙈";
    });
    
}

