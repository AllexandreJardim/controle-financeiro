
Readme · MD
# 💰 Controle Financeiro
 
Aplicação web fullstack para controle de receitas e despesas pessoais, com cadastro, listagem, exclusão de movimentações e cálculo automático de saldo.
 
## 📋 Sobre o projeto
 
O Controle Financeiro permite que o usuário registre suas movimentações financeiras (receitas e despesas), acompanhando em tempo real o saldo total, o total de receitas e o total de despesas. Todos os dados são persistidos em banco de dados, através de uma API REST construída em Python.
 
## 🚀 Funcionalidades
 
- ✅ Cadastro de receitas e despesas (descrição, valor, categoria e data)
- ✅ Listagem de todas as movimentações
- ✅ Exclusão de movimentações
- ✅ Cálculo automático de saldo, total de receitas e total de despesas
- ✅ Persistência de dados em banco SQLite
- ✅ Comunicação entre frontend e backend via API REST
## 🛠️ Tecnologias utilizadas
 
**Frontend**
- HTML5
- CSS3
- JavaScript (Vanilla)
**Backend**
- Python
- FastAPI
- SQLite
## 📁 Estrutura do projeto
 
```
controle-financeiro/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
│
└── backend/
    ├── main.py            # rotas da API
    ├── database.py        # conexão e criação da tabela
    ├── requirements.txt   # dependências do projeto
    └── banco.db           # banco de dados (gerado automaticamente)
```
 
## ⚙️ Como executar o projeto
 
```bash
git clone https://github.com/AllexandreJardim/controle-financeiro.git
cd controle-financeiro
```
 
### 2. Configure o backend
 
```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # Linux/Mac
 
pip install -r requirements.txt
```
 
### 3. Inicie o servidor da API
 
```bash
uvicorn main:app --reload
```
 
A API estará disponível em `http://127.0.0.1:8000`, com a documentação interativa em `http://127.0.0.1:8000/docs`.
 
### 4. Abra o frontend
 
Abra o arquivo `index.html` (na raiz do projeto) diretamente no navegador.
 
> O banco de dados (`banco.db`) e a tabela são criados automaticamente na primeira vez que o servidor é iniciado.
 
## 🔌 Rotas da API
 
| Método | Rota | Descrição |
|---|---|---|
| GET | `/movimentacoes` | Lista todas as movimentações |
| POST | `/movimentacoes` | Cria uma nova movimentação |
| DELETE | `/movimentacoes/{id}` | Exclui uma movimentação pelo id |

## 🧠 Arquitetura
 
```
Usuário
   ↓
HTML + CSS + JavaScript
   ↓
API REST (FastAPI)
   ↓
SQLite
```
 
O frontend envia requisições HTTP para a API, que valida os dados, persiste no banco SQLite e retorna a resposta em JSON, que é utilizada para atualizar a interface.
 
## 👤 Autor
 
Desenvolvido por **Alexandre Jardim**.
 
## 🤝 Sobre o desenvolvimento
 
Este projeto foi desenvolvido durante meu processo de aprendizado em desenvolvimento fullstack. Usei IA (Claude e ChatGPT) como apoio pontual — pra tirar dúvidas sobre conceitos, boas práticas de Git e construção de APIs REST.
 
Arquitetura, regras de negócio, commits e debug foram feitos por mim.
 