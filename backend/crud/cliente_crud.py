from backend.database.conexao import conecta_bd_cliente
from sqlite3 import IntegrityError
from fastapi import HTTPException 

def listar_clientes():
    conexao, cursor = conecta_bd_cliente()
    cursor.execute("SELECT * FROM clientes")
    clientes = cursor.fetchall()
    conexao.close()
    return clientes

def inserir_cliente(cliente):
    conexao, cursor = conecta_bd_cliente()
    try:
        cursor.execute("INSERT INTO clientes (nome, email, telefone, senha, cpf) VALUES (?, ?, ?, ?, ?)",
                    (cliente.nome, cliente.email, cliente.telefone, cliente.senha, cliente.cpf))
    except IntegrityError as e:
        # Verifica se o erro se tem algo duplicado
        if "UNIQUE" in str(e):
            conexao.close() 
            raise HTTPException(status_code=400, detail="E-mail ou CPF já cadastrado.")
        conexao.close()
        raise HTTPException(status_code=400, detail="Erro ao cadastrar no banco.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro inesperado: {str(e)}")
    novo_id = cursor.lastrowid
    conexao.commit()
    conexao.close()
    return novo_id

def deletar_cliente(cliente_id):
    conexao, cursor = conecta_bd_cliente()
    cursor.execute("DELETE FROM clientes WHERE id = ?", (cliente_id,))
    conexao.commit()
    conexao.close()

def buscar_login(email, senha):
    conexao, cursor = conecta_bd_cliente()
    cursor.execute("SELECT * FROM clientes WHERE email = ? AND senha = ?", (email, senha))
    usuario = cursor.fetchone()
    conexao.close()
    return usuario
