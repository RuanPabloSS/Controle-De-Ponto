# Controle-de-ponto

Oi, como vai?
Este repositório é um projeto que eu fiz no intuito de treinar um pouco com manipulação de datas e também escrita em arquivos.
Aqui eu simulo o funcionamento de um controle de ponto, para marcar quando um usuário começou a trabalhar e quando ele saiu.

Existem 2 intermediarios:

- 'verificarDadosCadastro' => Este intermediário está presente apenas na rota para cadastro de um usuário. Sua função é verificar se todos os dados foram informados e se não existe um usuário com o cpf informado. Os dados devem ser informados no body da requisição.

- 'verificarUsuarioESenha' => Este intermediário está presente nas demais rotas e sua função é verificar se existe um usuário com ID informado como parametro de rota e caso exista, se a senha informada como parametro tipo query está correta.

Abaixo seguem as rotas disponiveis e a funcionalidade de cada uma:

- /criar
    - Rota do tipo (Post). Esta é a rota que deve ser acessada para criar um usuário, se todos os dados foram informados corretamente o cadastro é concluído.

- /iniciar/:id
    - Rota do tipo (PUT). Esta rota serve para começar o registro, ou seja a hora que o usuário começou a trabalhar. Após a validação do intermediario avança para criação do registro de entrada.

- /parar/:id
    - Rota do tipo (PUT). Esta rota é para finalizar o registro, o usuário deve acessar quando terminar o expediente. Após a validação do intermediario avança para criação do registro de saída.

- /registros/:id
    - Rota do tipo (GET). Esta rota é para vizualiar todos os registros de entrada e saída do usuário com o ID informado.

- /horasTrabalhadas/:id
    - Rota do tipo (GET). Esta rota tem a função de somar as horas trabalhadas do usuário com ID informado e retornar o resultado. Caso o numéro de saídas seja menor que o de entradas a rota retorna que o usuário ainda está em serviço.

- /deletar/:id
    - Rota do tipo (DELETE). Esta rota tem como finalidade excluir um usuário do banco de dados.

Além dos intermediários e rotas, existem algumas funções na pasta utils para facilitar a implementação das rotas. Elas são:

- 'converterArquivo' => Função para ler o arquivo de usuarios e converter para um array.

- 'encontrarUsuario' => Esta função recebe como argumento o array de usuarios e o ID do usuario solicitado e retorna o objeto desse usuário.

- 'encontrarIndice' => Recebendo como argumento o array de usuarios e o ID do usuario desejado, esta função retorna a posição deste usuario no array.

- 'existeCpf' => Esta função recebe o array de usuarios e um cpf e ela serve para verificar se o cpf informado já está cadastrado.

- 'formatarData' => Esta função pega a o objeto Date no momento em que é chamada e converte ele para uma string no formato dia/mes/ano hora:minutos:segundos e dentro do nosso fuso.

- 'obterEntradas' => Recebe como argumento o ID do usuario desejado e retorna todas as entradas registradas deste usuario.

- 'obterSaidas' => Recebe como argumento o ID do usuario desejado e retorna todas as saidas registradas deste usuario.

O arquivo 'contador.txt' serve de base para criação dos ID's dos usuarios, toda vez que se cria um usuario, o numero no contador aumenta, assim não é possivel a criação de 2 usuarios com o mesmo ID.

Para este projeto eu utilizei as bibliotecas:
- Express (servidor)
- Date-fns (manipulação de datas)
- Date-fns-tz (manipulação de datas)
- nodemon (apenas como dependencia de desenvolvimento)

Para iniciar o projeto basta utilizar o comando 'node ./src/index.js'

Ainda planejo fazer algumas atualizações como implementar uma função para considerar pausas durante o expediente como horário de almoço por exemplo. Fiquem no aguardo!