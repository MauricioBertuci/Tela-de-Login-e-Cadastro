from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from backend.routes.cliente_routes import router

app = FastAPI(title="Cadastro de usuário")

# 🔹 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Rotas da API
app.include_router(router)

# 🔹 Frontend
# Servir arquivos estáticos (CSS, JS, imagens)
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Servir templates HTML
templates = Jinja2Templates(directory="frontend/templates")

# === ROTAS DE PÁGINAS ===
@app.get("/", response_class=HTMLResponse)
async def serve_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/home", response_class=HTMLResponse)
async def serve_home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/cadastro", response_class=HTMLResponse)
async def serve_cadastro(request: Request):
    return templates.TemplateResponse("cadastro.html", {"request": request})

#python -m uvicorn backend.main:app --reload