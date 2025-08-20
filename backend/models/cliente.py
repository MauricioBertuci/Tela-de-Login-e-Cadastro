from pydantic import BaseModel, validator
from backend.utils.validacoes import validar_cpf

class ClientesCreate(BaseModel):
    nome: str
    email: str
    telefone: str
    senha: str
    senha_confrimar: str
    cpf: str

    @validator("cpf")
    def cpf_valido(cls, v):
        if not validar_cpf(v):
            raise ValueError("CPF inválido")
        return v

class Clientes(BaseModel):
    id: int
    nome: str
    email: str
    telefone: str
    senha: str    
    cpf: str
