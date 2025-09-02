from fastapi import APIRouter, HTTPException
from typing import List
from backend.crud.cliente_crud import listar_clientes, inserir_cliente, deletar_cliente, buscar_login
from backend.models.cliente import Clientes, ClientesCreate

router = APIRouter()

@router.get("/clientes", response_model=List[Clientes])
async def listar():
    dados = listar_clientes()
    return [Clientes(id=c[0], nome=c[1], email=c[2], telefone=c[3], senha=c[4], cpf=c[5]) for c in dados]
    
@router.post("/clientes", response_model=Clientes)
async def cadastrar(cliente: ClientesCreate):
    novo_id = inserir_cliente(cliente)
    # verifiar o model_dump
    return Clientes(id=novo_id, **cliente.model_dump()) # **cliente.dict() Esse método converte o cliente (que é do tipo ClientesCreate) para um dicionário

@router.delete("/clientes/{cliente_id}")
async def deletar(cliente_id: int):
    deletar_cliente(cliente_id)
    return {"mensagem": f"Cliente ID {cliente_id} deletado com sucesso."}

@router.post("/login")
async def login(dados: dict):
    email = dados.get("email")
    senha = dados.get("senha")
    usuario = buscar_login(email, senha)
    if usuario:
        return {"success": True, "redirect": "/home"}
    else:
        raise HTTPException(status_code=401, detail="Credenciais inválidas.")
