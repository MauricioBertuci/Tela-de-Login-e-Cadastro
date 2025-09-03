import sqlite3

BANCO_DE_DADOS_CLIENTE = "Clientes.db"

def conecta_bd_cliente():
    conexao = sqlite3.connect(BANCO_DE_DADOS_CLIENTE)
    cursor = conexao.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            telefone TEXT NOT NULL,
            senha TEXT NOT NULL,
            cpf TEXT NOT NULL
        )
    """)
    conexao.commit()
    return conexao, cursor


# COMPLEMENTO:
# Colocar UNIQUE no CPF

