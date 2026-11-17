# API REST de usuários

Atividade de Express e publicação no Render. Usa uma lista em memória com João e Maria. Não precisa de MySQL nem de variáveis DB_*. Os dados voltam ao estado inicial a cada reinício do processo; não há persistência entre instâncias.

## Executar

1. Execute npm ci.
2. Execute npm run dev para desenvolvimento, ou npm start.
3. Abra http://localhost:3000. Se seu .env definir outra PORT, use essa porta.

A página permite listar, adicionar, editar e excluir usuários. A API e a página usam o mesmo endereço, com URL relativa /usuarios.

## Rotas

| Método | Rota | Resultado |
| --- | --- | --- |
| GET | /usuarios | Lista usuários |
| GET | /usuarios/:id | Busca usuário |
| POST | /usuarios | Cria usuário (201) |
| PUT | /usuarios/:id | Atualiza usuário |
| DELETE | /usuarios/:id | Remove usuário |

POST e PUT recebem Content-Type: application/json e corpo {"nome":"Carlos"}. Nome vazio e ID inválido retornam 400; usuário inexistente retorna 404. IDs novos são sequenciais e não são reutilizados durante a execução.

## Publicar no Render ? roteiro da disciplina

1. Crie um repositório no GitHub e envie os arquivos deste projeto. Inclua package-lock.json; não envie .env ou node_modules.
2. No Render, entre com GitHub e selecione New > Web Service.
3. Conecte o repositório e selecione a branch enviada (normalmente main).
4. Escolha um nome e deixe Root Directory vazio se package.json estiver na raiz do repositório.
5. Runtime: Node. Build Command: npm install. Start Command: npm run dev, conforme o material. Também há npm start para executar sem o modo de observação.
6. Selecione Free, se disponível, confira o plano e clique em Create Web Service.
7. Não ? necessário cadastrar credenciais de banco. O servidor j? usa process.env.PORT com padrão 3000 e aceita conexões em 0.0.0.0.
8. Acompanhe os logs e abra a URL pública fornecida pelo Render.
9. Teste a página e a rota /usuarios. Teste tamb?m GET por ID, POST, PUT, DELETE e o retorno 404 para um usuário removido.

O arquivo config/db.js e a dependência mysql2 são remanescentes do projeto anterior e não são usados nesta versão da atividade.

## Entrega

O enunciado pede um link do Notion com a API funcionando. Crie uma página sua no Notion com a URL pública do Render, uma descrição das rotas e evidências dos testes. Habilite o acesso para o professor e entregue o link dessa página. Não entregue o link do material da disciplina nem localhost.
