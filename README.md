# checkpoint 2 - Frontend



<b>Objetivo
```
Olá Houser, tudo bem com você? Esta atividade tem como objetivo servir como segundo instrumento avaliativo
da disciplina. Se atente às instruções e bom trabalho.
O entregável é uma aplicação de to-do (lista de coisas a fazer). O projeto terá 2 páginas.


Instruções e requisitos do entregável:
- A primeira página deve ter um formulário com os inputs: 
- Data de criação: o usuário não poderá alterar esse input, mas ele deve ser exibido.
- Data limite da tarefa: data que o usuário deseja terminar aquela tarefa.
- Descrição: texto da tarefa.
- Botão de submit.

Validações:
- Nenhum campo pode ser vazio.
- A descrição deve ter mais que 10 caracteres.
- IMPORTANTE: Quando o usuário não preencher corretamente deve ser exibido um alerta indicando que existem
erros na criação da tarefa.
- OPCIONAL: a data limite da tarefa deve ser hoje ou no futuro.


Funcionalidades:
Quando o usuário clicar em submit, se ele passar pela validação, a anotação deve ser exibida na tela por meio
de um card.
No card da anotação deve ter um botão para excluir a anotação. Quando ele for clicado deverá ser exibido um
aviso confirmando a intenção de excluir a anotação. Se o usuário confirmar a intenção de
excluir, o card desta nota deve desaparecer.
Ainda no card da anotação deverá existir um checkbox que ao ser clicado faz o texto
daquela anotação ficar tachado. Tarefa concluida.
Opcional: Escolher cor do fundo do card - (versão dark)

Agora nós vamos criar uma outra página, onde iremos consumir uma api de lista de tarefas:
O end-point “https://jsonplaceholder.typicode.com/todos/” responde com um JSON com
200 tarefas. Essas 200 tarefas devem ser consumidas pelo JS e renderizadas também como cards na página.
Nas tarefas onde o atributo “completed": true” o texto do atributo title deve estar tachado.
Pois significa que a tarefa ja foi completada.
Nas tarefas onde o atributo “completed": false” o texto do atributo title deve estar em negrito.
Pois significa que a tarefa está a fazer. 
Exiba também o conteúdo do atributo “id”.


ENTREGA:
- Devem ser entregues os arquivos HTML5, CSS3 e Javascript do projeto via Git/Github.
- Você deverá enviar o link do repositório por este formulário: https://forms.gle/CFCEmSgYeFBKXyL16 
- Até o dia 28/09/2021 às 23h59.

Conclusão:
Parabéns! Você acaba de finalizar o segundo checkpoint de Front End II!

```

### Execução
Seguindo a proposta do desafio, pensamos em como encaixar todos os critérios necessários, fazendo sua implementação
juntamente de um layout responsivo e com uma aparência limpa, moderna e sofisticada.

Elaboramos o projeto utilizando uma API de usuários na tela de Login que permite com que cada 
usuário acesse seus cards através do login com o usuário e a sua senha cadastrados na API.
 Neste processo há validações que informam ao usuário se os dados de login estiverem incorretos. 

Já na página de lista de tarefas, utilizamos uma outra API que insere fotos ao lado do "nome do usuário".
Há também os campos de inserção de novas tarefas, com a descrição de tarefa e a data, ambas cumprindo todos os requisitos
de validação, na qual quando preenchido de forma incorreta, gera um texto em vermelho orientando ao usuário o motivo do erro.

Caso preenchido o campo de data de termino e descrição da tarefa de forma correta, um card é gerado com a data de criação já
preenchida com o dia atual e com as possibilidades de exclusão do card (através do botão de lixeira) ou de marcar a tarefa como 
concluida (através do check-box).


  ### Funcionamento da aplicação:

![grab-landing-page](https://psv4.userapi.com/c536436/u307536254/docs/d50/44ede83ffbeb/gif_checkpoint-2-terceiro.gif?extra=xA7CXv6hgEP9E_GLXjg1_BaWx3uGjGYhBy3XSmsvtwsLJ-AHL5O--_7BLlrrTVEu9Wcduf8FrQ21YbXJP5WkOmS6Yq2P0oem5D5SNvz1t4Sa7Ay-17hCKW3ymCqaI3n-20zDsfO2azgOp2xfkImiJhJiEzY)
 ```
 Informações para teste:
 
 link no github pages: https://damaresbortolucci.github.io/CTD-frontend-II-checkpoint2/
 
 Usuário para teste:
 Login:Leopoldo_Corkery
 Senha:Leopoldo_Corkery
```
### Ressalva final
Nesse projeto mesclamos conhecimentos como a utilização de APIs, DOM, localstorage, responsibilidade, validação de dados, utilização de datas por meio do JavasCript e principalmente muito trabalho em equipe.

### Projeto realizado por:
- [Dâmares Bortolucci](https://github.com/damaresbortolucci)
- [Silas Medeiros](https://github.com/silasms)
- [Duyllyan Almeida de Carvalho](https://github.com/duyllyan)
- [Esther Pimentel](https://github.com/EstherPimentel)
- [Pedro Moreira](https://github.com/PedroMoreiraDev)
