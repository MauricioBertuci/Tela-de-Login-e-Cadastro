from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.cliente_routes import router

app = FastAPI(title="Cadastro de usuario")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
