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

// Função que faz o cadastro
function enviarCadastro(event) {
  event.preventDefault(); // Impede o envio padrão
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const cpf = document.getElementById('cpf').value;

  const dados = { nome, telefone, email, senha, cpf };

  fetch('http://127.0.0.1:8000/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  // usado para retonar a mesma mensagem de erro
  // .then(response => {
  //   if (!response.ok) throw new Error('Dados invalidos.');
  //   return response.json();
  // })

  // usado para retornar diferentes mensagens de erro
  .then(async response => {
    if (!response.ok) {
      const erro = await response.json(); // pega ra resposta com o detal
      throw new Error(erro.detail || 'Erro ao cadastrar.');
    }
    return response.json();
  })
  // .then(async response => {
  //   if(!response.ok) {
  //     const erro = await response.json();
  //     throw new Error(erro.detail || '')
  //   }
  // })
  .then(data => {
    alert("Cadastro realizado com sucesso!");
  })
  .catch(error => {
    alert("Erro ao cadastrar: " + error.message);
  });

}

// Quando a pagina carregar, ativa o botão de olho
window.addEventListener("DOMContentLoaded", () => {
  configurarToggleSenha();

  const form = document.querySelector("form-cadastro")
  form.addEventListener("submit", enviarCadastro)
})


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


