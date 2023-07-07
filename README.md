# Fresh Rice

Projeto desenvolvido para disciplina SCC0219 - Introdução ao Desenvolvimento Web.

### Alunos:
*  **Rafael Sartori Vantin** - 12543353
*  **Renato Tadeu Theodoro Junior** - 11796750
*  **Fábio Verardino de Oliveira** - 12674547

## Introdução

A Fresh Rice começou como uma ótica fundada na Alemanha em 1978 que, com o tempo, se tornou uma franquia de ótica internacional e após muitos pedidos, irá lançar seu próprio ecommerce.

Agora, com o lançamento do nosso ecommerce, a Fresh Rice quer levar a experiência única de compra de óculos para o conforto da sua casa. Com uma vasta seleção de óculos de sol e de grau das melhores marcas, você pode navegar pelo nosso site facilmente e encontrar o par perfeito para você. Nós também oferecemos lentes de alta qualidade para garantir que você tenha a melhor visão possível. Não perca a oportunidade de comprar seus óculos com a Fresh Rice e experimentar o que há de melhor em qualidade e conveniência.

# Usuários para teste
Para facilitar o teste da aplicação, foram criados alguns usuários com dados pré-cadastrados. Os dados de acesso são:

**Cliente:**
* *Email:* joao.silva@gmail.com
* *Senha:* senhasenha

**Administrador:**
* *Email:* wave8wavew@gmail.com
* *Senha:* senhasenha


## 1. Requirements

### Usuário
#### Tela inicial
- A tela contará com um botão para redirecionar para a área de login.
- Contará com barra de busca para filtrar produtos.
- Contará com link para página de perfil (requer autenticação).
- Contará com link para página de produtos.
- Contará com link pro carrinho (requer autenticação).
- Contará com link para página sobre.
- Contará com imagens decorativas.  

#### Login
- Contará com botão pra registrar-se que irá redirecionar para página de cadastro.
- Contará com dois inputs (login e senha)
- Contará com um botão para logar.
- Após login irá redirecionar para a tela inicial.

#### Página de cadastro
- Irá conter os seguintes inputs:
  - Nome
  - Email
  - Data de nascimento
  - CPF
  - Endereço
  - Senha
  - Confirmar senha
- Irá conter um botão para cadastro
- Após o cadastro bem sucedido irá redirecionar para a tela inicial
- O Id é gerado automaticamente
#### Tela de Produtos
- Irá conter uma lista de todos os produtos
- Irá conter os seguintes filtros:
  - Preço
  - Cor
  - Material da Lente
- Será carregado 6 óculos por vez, podendo carregar mais
#### Produto específico
- Essa página é a paginá especifica do produto
- Irá conter uma foto do produto
- Irá conter a descrição
- Irá conter o preço
- Poderá selecionar a quantidade de óculos
- Poderá adicionar ao carrinho  
 -Caso adiciona uma quantidade maior que disponível será disparado uma mensagem de erro  
- Poderá experimentar o óculos, isto é, sua webcam será aberta e uma imagem do óculos estara na tela para experimetnar.   
#### Página carrinho
 - Irá conter lista dos produtos adicionados 
 - Opção para prosseguir com o pagamento
 - Preço total
 #### Página pagamento
 - Irá conter inputs para adicionar os dados do cartão:
  - Número do cartão
  - Nome no cartão
  - Data de vencimento
  - Código de segurança
 - Botão para realizar pagamento
 #### Página Recibo
 - Essa página irá conter resumidamente as informações do pedido
 #### Menu perfil
 - Esse menu se localizará no canto superior esquerdo, substituindo o botão de Login, após um usuário entrar com sua conta.
 - Se tratará de um menu dropdown com 3 opções:
   - Link para página que irá permitr as alterações de informações, execeto email. Senha somente com a confirmação da senha atual
   - Link para o histórico de pedidos do cliente.
   - Botão para realizar logout.
 #### Página histórico
 - Irá conter todos os pedidos realizados pelo cliente
 #### Página sobre
 - Página com um texto sobre a empresa
 ### Admin
 #### Página login
 - Contará com dois inputs (login e senha)
 - Contará com um botão para logar.
 - Após o login irá redirecionar para uma pagina admin
 #### Página admin
 - Irá conter três botões:
  - Gerenciar cliente
  - Gerenciar produtos
  - Gerenciar administradores
 #### Gerenciar cliente
 - Irá conter uma lista de clientes cadastrados
 #### Gerenciar produtos
 - Irá conter os seguintes botões:
  - Cadastrar novos produtos
  - Alterar Produtos
  - Visualizar produtos
 #### Página cadastro produtos
 - Irá conter os seguintes inputs:
  - Nome
  - Preço
  - Descrição
  - Material Lente
  - Cor
  - Imagem
  - Quantidade
 - Irá conter um botão para salvar essas informações
 - Após isso irá aparecer uma mensagem, caso houve sucesso ou falha
 - O Id é gerado automaticamente
 ##### Página alterar produto
 - Irá conter uma barra de pesquisa para digitar o id do produto
 - Após a busca com sucesso será possível alterar as informações do produto ou excluir o produto
  ##### Página Listar produto
 - Será possível visualizar em lista todos os produtos
 - Ao clicar num produto será redirecionado para a página de alterar produto
#### Gerenciar admin
- Crud admin
## 2. Project description

> Clique [aqui](https://encurtador.com.br/iJKQ6) para acessar o link do figma.

### Diagrama de navegação:
> [Clique aqui](https://www.figma.com/proto/0Z40o9PE301GszwxYBSKAF/Ecommerce-Wireframe-Kit-(Community)?type=design&node-id=1-11654&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A11654&show-proto-sidebar=1) para visualizar o a sequência esperada do usuário   
> 
> [Clique aqui](https://www.figma.com/proto/0Z40o9PE301GszwxYBSKAF/Ecommerce-Wireframe-Kit-(Community)?type=design&node-id=592-926&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=592%3A926&show-proto-sidebar=1) para visualizar a sequência esperada do admin.
>  
![Diagrama](front-end/public/navigation.png)


## 3. Comments about the code

A funcionalidade específica da nossa aplicação é o filtro de produtos na página de listagem de produtos (/shop).

## 4. Test plan


### Tela Inicial

1. Teste: Verificar redirecionamento do link para a página de perfil
   - Resultado Esperado: O link deve redirecionar corretamente para a página de perfil apenas quando o usuário estiver autenticado.

2. Teste: Verificar funcionamento do link para a página "sobre"
   - Resultado Esperado: O link para a página "sobre" deve funcionar corretamente, exibindo o conteúdo esperado.

### Login

1. Teste: Verificar exibição de mensagem de erro para credenciais incorretas
   - Resultado Esperado: Quando as credenciais de login estiverem incorretas, uma mensagem de erro deve ser exibida ao usuário.

2. Teste: Verificar possibilidade de recuperar senha através da opção "esqueci senha"
   - Resultado Esperado: O usuário deve ser capaz de recuperar sua senha utilizando a opção "esqueci senha" e receber instruções para redefinição.

### Página de Cadastro

1. Teste: Verificar exibição de mensagem de erro para informações inválidas ou já existentes
   - Resultado Esperado: Caso as informações fornecidas no cadastro sejam inválidas ou já estejam presentes na base de dados, uma mensagem de erro deve ser exibida ao usuário.

### Tela de Produtos

1. Teste: Verificar funcionamento dos filtros de preço, cor e material de lente
   - Resultado Esperado: Os filtros de preço, cor e material de lente devem funcionar corretamente, exibindo os produtos correspondentes às seleções do usuário.

2. Teste: Verificar possibilidade de carregar mais produtos além dos 10 iniciais
   - Resultado Esperado: O usuário deve ser capaz de carregar mais produtos na página, além dos 6 que são carregados inicialmente.

### Produto Específico

1. Teste: Verificar seleção de quantidade de óculos e adição ao carrinho com sucesso
   - Resultado Esperado: O usuário deve conseguir selecionar a quantidade desejada de óculos e adicioná-los ao carrinho sem problemas.

2. Teste: Verificar exibição de mensagem de erro para quantidade selecionada maior que o estoque disponível
   - Resultado Esperado: Se o usuário tentar selecionar uma quantidade maior do que a disponível em estoque, uma mensagem de erro deve ser exibida.

### Página Carrinho

1. Teste: Verificar possibilidade de prosseguir com o pagamento ao clicar no botão correspondente
   - Resultado Esperado: O usuário deve ser capaz de prosseguir com o pagamento ao clicar no botão correspondente, avançando para a próxima etapa do processo.

2. Teste: Verificar exibição correta do preço total
   - Resultado Esperado: O preço total dos itens no carrinho deve ser exibido corretamente, refletindo os valores dos produtos selecionados.

### Página de Gerenciar Produtos (Admin)

1. Teste: Verificar a adição de um novo produto
   - Resultado Esperado: Ao adicionar um novo produto, ele deve ser exibido corretamente na lista de produtos existente.

2. Teste: Verificar a edição de um produto existente
   - Resultado Esperado: Ao editar as informações de um produto existente, as alterações devem ser salvas corretamente e refletidas na lista de produtos.

3. Teste: Verificar a remoção de um produto existente
   - Resultado Esperado: Ao remover um produto existente, ele deve ser removido com sucesso da lista de produtos e não deve mais ser exibido.

### Página de Gerenciar Clientes (Admin)

1. Teste: Verificar a visualização dos detalhes de um cliente específico
   - Resultado Esperado: Ao selecionar um cliente na lista, os detalhes desse cliente devem ser exibidos corretamente, incluindo informações como nome, endereço e histórico de compras.

2. Teste: Verificar a remoção de um cliente existente
   - Resultado Esperado: Ao remover um cliente existente, ele deve ser removido com sucesso da lista de clientes e não deve mais ser exibido.


---

### *Resultado Esperado* (para todos os testes):

- Os testes devem ser executados sem erros ou problemas técnicos significativos.
- As funcionalidades devem operar de acordo com as especificações fornecidas.
- Mensagens de erro devem ser exibidas quando aplicável, com os textos corretos e informativos.
- O sistema deve fornecer respostas adequadas às ações do usuário e exibir informações corretas.
- Os resultados obtidos devem estar em conformidade com as expectativas dos requisitos de cada funcionalidade testada.
## 5. Test results
### Tela Inicial

1. OK

2. OK
### Login

1. OK

2. OK
### Página de Cadastro

1. OK

### Tela de Produtos

1. OK

2. OK

### Produto Específico

1. OK

2. OK
### Página Carrinho

1. OK

2. OK

### Página de Gerenciar Produtos (Admin)

1. OK

2. OK

3. OK

### Página de Gerenciar Clientes (Admin)

1. OK

2. OK
## 6. Build procedures

### Requisitos 
Node.js instalado.

### Front End
Para rodar o front-end, é necessário ter o Node.js instalado. Após isso, basta rodar os seguintes comandos:
```
cd front-end
npm install
npm start
```
### Back end
Para rodar o back-end com o próprio database, é necessário ter um conta no mongodb e cadastrar um novo cluster.

Por motivos de segurança para quem for revisar por favor entrar em contato com um dos membros do grupo para obter a URL com login e senha do database utilizado para desenvolvimento do projeto.

Após conseguir a URL de conexão com os membros do grupo, basta inserir a URL de conexão no arquivo .env.default na pasta back-end e alterar o nome do arquivo para .env.

Após isso: 
```
cd back-end
npm install
npm run serve
```

Para funcionamento correto tanto o front-end quanto o back-end devem estar rodando simultaneamente. 
## 7. Problems
No problems
## 8. Comments
No comments
