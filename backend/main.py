from fastapi import FastAPI
from pydantic import BaseModel
from database import get_connection


app = FastAPI()


class Movimentacao(BaseModel):
    tipo: str
    descricao: str
    valor: float
    categoria: str
    data: str


@app.get("/")
def root():
    return {"mensagem": "API do Controle Financeiro funcionando!"}


@app.get("/movimentacoes")
def listar_movimentacoes():
    conexao = get_connection()
    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM movimentacoes")
    movimentacoes = cursor.fetchall()

    conexao.close()

    return [dict(movimentacao) for movimentacao in movimentacoes]


@app.post("/movimentacoes")
def criar_movimentacao(movimentacao: Movimentacao):
    conexao = get_connection()
    cursor = conexao.cursor()

    cursor.execute("""
        INSERT INTO movimentacoes
        (tipo, descricao, valor, categoria, data)
        VALUES (?, ?, ?, ?, ?)
    """, (
        movimentacao.tipo,
        movimentacao.descricao,
        movimentacao.valor,
        movimentacao.categoria,
        movimentacao.data
    ))

    conexao.commit()

    novo_id = cursor.lastrowid

    conexao.close()

    return {
        "id": novo_id,
        "tipo": movimentacao.tipo,
        "descricao": movimentacao.descricao,
        "valor": movimentacao.valor,
        "categoria": movimentacao.categoria,
        "data": movimentacao.data
    }


@app.delete("/movimentacoes/{id}")
def excluir_movimentacao(id: int):
    conexao = get_connection()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM movimentacoes WHERE id = ?",
        (id,)
    )

    conexao.commit()

    conexao.close()

    return {"mensagem": "Movimentação excluída com sucesso!"}