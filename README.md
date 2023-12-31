﻿# Controle-de-ponto

Oi, como vai?
Este repositório é um projeto que eu fiz no intuito de treinar um pouco com manipulação de datas e também escrita em arquivos.
Aqui eu simulo o funcionamento de um controle de ponto, para marcar quando um usuário começou a trabalhar e quando ele saiu.

Existem 2 intermediarios:

- 'verificarDadosCadastro' => Este intermediário está presente apenas na rota para cadastro de um usuário. Sua função é verificar se todos os dados foram informados e se não existe um usuário com o cpf informado. Os dados devem ser informados no body da requisição.
- ![verificardados1 (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/807dd0bd-8b8d-453e-b8d6-645b32baf2fa)
  
- ![verificardados2 (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/921191cc-820f-4d06-bda2-f1cbee9f4a31)

- 'verificarUsuarioESenha' => Este intermediário está presente nas demais rotas e sua função é verificar se existe um usuário com ID informado como parametro de rota e caso exista, se a senha informada como parametro tipo query está correta.
- ![verificarusuariosenha1 (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/2602f1e4-ddd0-4ed6-953f-461de7694bd0)
  
- ![verificarusuariosenha2 (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/185e7370-bb55-4ad6-9f27-bae4fe1a4fc2)

Abaixo seguem as rotas disponiveis e a funcionalidade de cada uma:

- /criar
    - Rota do tipo (Post). Esta é a rota que deve ser acessada para criar um usuário, se todos os dados foram informados corretamente o cadastro é concluído.
    - ![criarusuario (3)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/3acc887e-4381-44d5-a512-877f6a42b350)

- /iniciar/:id
    - Rota do tipo (PUT). Esta rota serve para começar o registro, ou seja a hora que o usuário começou a trabalhar. Após a validação do intermediario avança para criação do registro de entrada. O registro não é criado se o usuário já estiver em serviço.
    - ![image](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/b3dfb23b-88ea-4252-b365-b12a8b9a9239)
      
    - ![iniciarregistro (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/09f04840-6a4e-4e56-8321-bc8026540a4d)

- /parar/:id
    - Rota do tipo (PUT). Esta rota é para finalizar o registro, o usuário deve acessar quando terminar o expediente. Após a validação do intermediario avança para criação do registro de saída. O registro não é criado se o usuário não estiver em serviço.
    - ![pararregistro2 (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/24ed41c1-3234-4401-b089-f30d9324d750)
      
    - ![pararregistro (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/2cde6583-c50a-4f23-9c1a-807150f8913d)

- /registros/:id
    - Rota do tipo (GET). Esta rota é para vizualiar todos os registros de entrada e saída do usuário com o ID informado.
    - ![exibirregistros (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/a65b5775-5184-42a1-94d2-44dfbdb0dc99)

- /horasTrabalhadas/:id
    - Rota do tipo (GET). Esta rota tem a função de somar as horas trabalhadas do usuário com ID informado e retornar o resultado. Caso o numéro de saídas seja menor que o de entradas a rota retorna que o usuário ainda está em serviço.
    - ![horastrabalhadas2 (3)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/6b18d53f-6178-45cb-9896-79e1392bbee7)

    - ![horastrabalhadas (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/f707f8b2-d595-4663-8c4f-3a1cf2f52728)

- /deletar/:id
    - Rota do tipo (DELETE). Esta rota tem como finalidade excluir um usuário do banco de dados.
    - ![deletarusuario (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/23c56552-2127-4990-96f3-2cd874dc011f)

Além dos intermediários e rotas, existem algumas funções na pasta utils para facilitar a implementação das rotas. Elas são:

- 'converterArquivo' => Função para ler o arquivo de usuarios e converter para um array.
- ![converterarquivo (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/dacf0750-5547-4257-a1ef-903b3829349a)
  
- 'encontrarUsuario' => Esta função recebe como argumento o array de usuarios e o ID do usuario solicitado e retorna o objeto desse usuário.
- ![encontrarusuario (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/1358be4f-7c2c-4f02-9d3e-cef837f7e69b)

- 'encontrarIndice' => Recebendo como argumento o array de usuarios e o ID do usuario desejado, esta função retorna a posição deste usuario no array.
- ![encontrarindice (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/b85b5648-675a-48c6-ab06-705b7668daf0)

- 'existeCpf' => Esta função recebe o array de usuarios e um cpf e ela serve para verificar se o cpf informado já está cadastrado.
- ![existecpf (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/02cdad1d-b4ae-4419-91b7-9acf13446568)

- 'formatarData' => Esta função pega a o objeto Date no momento em que é chamada e converte ele para uma string no formato dia/mes/ano hora:minutos:segundos e dentro do nosso fuso.
- ![formatardata (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/025f5cec-c12f-4950-bf3f-5e9c0aef1132)

- 'obterEntradas' => Recebe como argumento o ID do usuario desejado e retorna todas as entradas registradas deste usuario.
- ![obterentradas (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/aca22476-df8d-470e-a122-3e28293aebb5)

- 'obterSaidas' => Recebe como argumento o ID do usuario desejado e retorna todas as saidas registradas deste usuario.
- ![obtersaidas (2)](https://github.com/RuanPabloSS/Controle-De-Ponto/assets/124942516/d940ddaa-df8f-4e2e-a80c-a459a73c3072)

O arquivo 'contador.txt' serve de base para criação dos ID's dos usuarios, toda vez que se cria um usuario, o numero no contador aumenta, assim não é possivel a criação de 2 usuarios com o mesmo ID.

Para este projeto eu utilizei as bibliotecas:
- Express (servidor)
- Date-fns (manipulação de datas)
- Date-fns-tz (manipulação de datas)
- nodemon (apenas como dependencia de desenvolvimento)

Para iniciar o projeto basta utilizar o comando 'node ./src/index.js'

Ainda planejo fazer algumas atualizações como implementar uma função para considerar pausas durante o expediente como horário de almoço por exemplo. Fiquem no aguardo!
