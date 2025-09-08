// Função troca o tipo da senha para texto
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
function configurarToggleConfirmarSenha() {
    const senhaConfirmarInput = document.getElementById("confirmarSenha");
    const toggleConfirmarSenha = document.getElementById("toggleConfirmarSenha");

    toggleConfirmarSenha.addEventListener("click", () => { // aqui estava errado
        const tipo = senhaConfirmarInput.getAttribute("type") === "password" ? "text" : "password";
        senhaConfirmarInput.setAttribute("type", tipo);

        // Troca o emoji do botão
        toggleConfirmarSenha.textContent = tipo === "password" ? "👁️" : "🙈";
    });
}


// Função que faz cadastro
function enviarCadastro(event) {
  event.preventDefault(); 

  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;
  const cpf = document.getElementById('cpf').value;

  const mensagem = document.getElementById("mensagem");

  // ✅ Validação ANTES de enviar para o backend
  if (senha !== confirmarSenha) {
    mensagem.textContent = "❌ As senhas não coincidem!";
    mensagem.className = "mensagem erro";
    return;
  }

  // 🔥 Agora monta só os dados que o backend espera
  const dados = { nome, telefone, email, senha, cpf };

  fetch('https://fastapi-com-front-b6a4hwguhsapeedk.northcentralus-01.azurewebsites.net/cadastro', { //Colocar /cadastro e testar para ver se deu certo
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  .then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      let msg = "Erro ao cadastrar.";

      if (Array.isArray(data.detail)) {
        msg = data.detail[0].msg; // pega primeiro erro do FastAPI
      } else if (data.detail) {
        msg = data.detail;
      }

      mensagem.textContent = "❌ " + msg;
      mensagem.className = "mensagem erro";
    } else {
      mensagem.textContent = "✅ Cadastro realizado com sucesso!";
      mensagem.className = "mensagem sucesso";
    }
  })

  .catch(() => {
    mensagem.textContent = "❌ Erro ao conectar com o servidor!";
    mensagem.className = "mensagem erro";
  });
}

// Quando a pagina carregar
window.addEventListener("DOMContentLoaded", () => {
  configurarToggleSenha();
  configurarToggleConfirmarSenha();

  const form = document.getElementById("form-cadastro");
  form.addEventListener("submit", enviarCadastro);
});


// Função que faz a mascara do telefone
function mascaraTelefone(input) {
  let valor = input.value.replace(/\D/g, ""); // Remove tudo que não é número

  if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

  if (valor.length > 6) {
    input.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
  } else if (valor.length > 2) {
    input.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
  } else if (valor.length > 0) {
    input.value = `(${valor}`;
  }
}

// Função que faz a mascara cpf
function mascaraCPF(input) {
  let valor = input.value.replace(/\D/g, "");

  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length > 9) {
    input.value = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6, 9)}-${valor.slice(9)}`;
  } else if (valor.length > 6) {
    input.value = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6)}`;
  } else if (valor.length > 3) {
    input.value = `${valor.slice(0, 3)}.${valor.slice(3)}`;
  } else {
    input.value = valor;
  }
}


