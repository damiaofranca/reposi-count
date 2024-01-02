# Cliente Vysor

Projeto desenvolvido para gerênciamento de clientes + produtos.

## Funcionalidades

O projeto possui as seguintes funcionalidades:

- Autenticação de usuários: É possível fazer login utilizando o email e senha cadastrados no ambiente de teste (e logout).
- Exibição de dados do cliente: São exibidos os dados do cliente logado.
- Dashboard de clientes e cidades: Na página do dashboard, são exibidos os dados do clientes (estático) e informações dos das cidades(vindas do firabase-realtime)
- Integração com o Google Maps: A aplicação utiliza a API do Google Maps para exibir um mapa interativo com marcadores das lojas cadastradas.
- Adição: É possivel fazer o cadastrado de lojas de forma real-time.

## Pré-requisitos

Antes de executar o projeto em ambiente local, certifique-se de ter as seguintes dependências configuradas:

- Um projeto Firebase com Firestore e Firebase Authentication configurados. Consulte a documentação oficial do Firebase para obter mais informações.
- Uma chave de API do Google Maps. É necessário configurar essa chave no arquivo .env para o mapa funcionar corretamente.

## Configuração do ambiente

Siga as instruções abaixo para configurar e executar o projeto em ambiente local:

1. Clone o repositório do projeto no GitHub: `git clone <URL_DO_REPOSITÓRIO>`
2. Navegue até o diretório do projeto: `cd <NOME_DO_DIRETÓRIO>`
3. Instale as dependências do projeto utilizando o comando: `yarn install`
4. Crie um arquivo `.env` baseado no arquivo `.env.example` e preencha as variáveis de ambiente necessárias, como a chave de API do Google Maps e as configurações do Firebase.
5. Execute o comando `yarn start` para iniciar a aplicação localmente.

## Contribuição

Se você quiser contribuir para este projeto, sinta-se à vontade para abrir issues e enviar pull requests no repositório do GitHub. Faremos o possível para revisar e incorporar suas contribuições.

## Licença

Todos os direitos reservados. Este projeto não permite o uso, cópia ou distribuição do código-fonte para terceiros.
