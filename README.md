# Tela de Login e Cadastro

Aplicação simples de autenticação construída com **FastAPI**, **Jinja2** e JavaScript vanilla. O backend expõe rotas REST para cadastro e login de usuários em um banco SQLite, enquanto o frontend renderiza páginas HTML servidas pelo próprio FastAPI.

## Público alvo
Desenvolvedores que desejam um exemplo direto de implementação de cadastro/login com FastAPI + SQLite, incluindo validação de CPF e templates estáticos (HTML/CSS/JS).

## Arquitetura e stack
- **Backend:** FastAPI, Gunicorn/Uvicorn, Pydantic, SQLite (criando `Clientes.db` automaticamente).
- **Frontend:** Templates Jinja2 (HTML) com assets estáticos em CSS/JS.
- **Estrutura de pastas:**
  - `backend/main.py`: instancia o app FastAPI, configura CORS, monta arquivos estáticos e templates.
  - `backend/routes/cliente_routes.py`: rotas de API (`/clientes`, `/login`).
  - `backend/crud/cliente_crud.py`: operações SQLite.
  - `backend/database/conexao.py`: criação/conexão do banco.
  - `backend/models/cliente.py`: modelos Pydantic e validação de CPF.
  - `frontend/templates`: páginas `index.html` (login), `cadastro.html`, `home.html`.
  - `frontend/static`: CSS e JS dos formulários (`login.js`, `cadastro.js`).

## Pré-requisitos
- Python 3.10+.
- `venv` ou outra ferramenta de ambiente virtual.

## Configuração rápida (≤10 minutos)
1. **Criar e ativar ambiente virtual**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Linux/macOS
   .venv\Scripts\activate    # Windows
   ```
2. **Instalar dependências**
   ```bash
   pip install -r requirements.txt
   ```
3. **Rodar servidor de desenvolvimento**
   ```bash
   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
   ```
4. **Acessar o app**
   Abra http://localhost:8000 no navegador para a tela de login, ou http://localhost:8000/cadastro para o formulário de cadastro.

> ℹ️ O arquivo `Clientes.db` é criado automaticamente na primeira execução.

## Variáveis de ambiente
- `PORT`: porta usada apenas quando o script `backend/main.py` é executado diretamente (padrão: `8000`).

## Endpoints principais
- `GET /clientes`: lista clientes.
- `POST /clientes`: cria cliente. Corpo (JSON): `nome`, `email`, `telefone`, `senha`, `cpf`.
- `DELETE /clientes/{cliente_id}`: remove cliente pelo id.
- `POST /login`: autentica usuário com `email` e `senha`.
- Páginas HTML: `/` (login), `/cadastro`, `/home`.

## Observações sobre o frontend
- Os scripts `frontend/static/login.js` e `frontend/static/cadastro.js` hoje apontam para um endpoint FastAPI hospedado no Azure (`fastapi-com-front-b6a4hwguhsapeedk...`). Para testar localmente, ajuste as URLs `fetch` nesses arquivos para `http://localhost:8000/login` e `http://localhost:8000/clientes` conforme o endpoint desejado.

## Execução em produção
- O repositório inclui um comando de inicialização via Gunicorn/Uvicorn (`startup.txt`):
  ```bash
  gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app
  ```
  Use-o como referência para processos gerenciados (ex.: systemd, containers ou plataformas PaaS).

## Troubleshooting
- **Banco vazio ou ausente:** confirme permissões de escrita no diretório e reinicie o app para recriar `Clientes.db`.
- **Erros de duplicidade no cadastro:** o backend valida `email` e `cpf` (restrição `UNIQUE` em `email`), retornando HTTP 400.
- **CORS/local:** CORS está liberado para qualquer origem no `backend/main.py`; revise antes de expor publicamente.
