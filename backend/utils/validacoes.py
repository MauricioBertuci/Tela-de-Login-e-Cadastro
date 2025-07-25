import re

def validar_cpf(cpf: str) -> bool: #bool: faz retornar True ou False
    #remove tudo que não for número
    #\D: qualquer coisa que não seja numero
    #\d: qualquer numero de 0 a 9
    #função re substitui "x" por "y"
    cpf = re.sub(r"\D", "", cpf)

    if len(cpf) != 11 or cpf == cpf[0] * 11:
        return False
    
    #fazendo calculo par ver se é valido o cpf
    for i in range(9, 11):
        soma = sum(int(cpf[j]) * ((i + 1) - j) for j in range(i))
        digito = (soma * 10 % 11) % 10
        if digito != int(cpf[i]):
            return False
    return True
