# Projeto_Certificadora_Identitaria
Projeto acadêmico da disciplina Certificadora de Competência Identitária, orientado pela professora Monique Emídio de Oliveira.
- **Para compilar e executar o sistema:**
    - Ferramenta para codificar, compilar e executar o projeto:
        - Visual Studio Code; Versão 1.96+; link: https://code.visualstudio.com/
        - Bootstrap; Versão 5.3; link: https://getbootstrap.com/docs/5.3/getting-started/introduction/
    - Ferramenta para criar e hospedar a base de dados:
        - Supabase; Versão 2.4.0; link: https://supabase.com/
    - Roteiro a ser seguido para criar e executar a base de dados do sistema:
        - Não é necessário executar um roteiro para criar a base de dados do sistema, já que o banco de dados é remoto.
    - Roteiro a ser seguido para salvar o código, compilar o projeto e executar a aplicação.
        - Acessar o código pelo Github, no repositório. Clonar o repositório  e assim executar o projeto dentro do VSCode. Instale a extensão Live Server e clique com botão direito no arquivo para abrir com o Live Server. O navegador abrirá com recarregamento automático. 
- Para testar o sistema:
    - Eleonora de Mello Gaspari, Igor Martins, João Vitor Fernandes Marques, Luiz Antonio Marçon
    - Objetivo do Sistema:
        
        Criar uma página web simples para apresentar informações sobre o campus UTFPR-CP, incluindo:
        
        - Tour pelo campus
        - Cursos
        - Projetos de extensão
        - Vestibular
        - Formulário de interesse
    - Breve apresentação das Funcionalidades Desenvolvidas;
        
        ### Funcionalidades principais
        
        1. **Menu de navegação principal**
            
            Permite a movimentação rápida entre as seções: Home, Tour, Cursos, Projetos, Vestibular, Fale Conosco, Entrar/Admin. 
            
        2. **Seção “Tour pelo Campus”**
            
            Apresenta diversos espaços do campus, como Biblioteca, Restaurante Universitário, Laboratórios, Blocos de aula, Complexo Esportivo, Área de convivência. Cada local com imagem + descrição.
            
        3. **Seção “Cursos”**
            
            Lista os cursos oferecidos pelo campus com duração e breve descrição de cada um. Exemplo: Engenharia de Software, Engenharia de Computação, Controle e Automação, Engenharia Elétrica, Engenharia Eletrônica, Análise e Desenvolvimento de Sistemas, Matemática.
            
        4. **Seção “Projetos de Extensão”**
            
            Apresenta os projetos de extensão do campus, com descrição dos objetivos e público-alvo. Exemplos: Robótica Educacional, Meninas Digitais, Cine UTFPR, Apoio às Escolas Públicas, Laboratório de Inovação e Prototipagem. 
            
        5. **Seção “Como Ingressar” (Vestibular e SISU)**
            
            Explica as formas de ingresso na UTFPR: via SISU/ENEM ou vestibular tradicional. Apresenta o fluxo passo-a-passo para inscrição, prova e matrícula. Inclui link para editais.
            
        6. **Seção “Fale Conosco”**
            
            Um formulário para contato com campos como nome, e-mail, assunto, mensagem. Permite enviar dúvidas ou solicitações sobre cursos, visitas ao campus, etc. 
            
        7. **Login/Admin (opcional)**
            
            Há menção de “Entrar” ou “Admin”, o que sugere área destinada à administração ou login de usuário. 
            
    - Roteiro a ser seguido para testar o sistema (Por exemplo, se será necessário algum cadastro antes de outro);
        - **Acessar o sistema**
            - Abrir o projeto no navegador.
        - **Testar navegação**
            - Clicar nos itens do menu (Home, Tour, Cursos, Projetos, Vestibular, Contato).
            - Confirmar se cada seção é exibida corretamente.
        - **Verificar conteúdo das seções**
            - *Tour:* checar textos e imagens.
            - *Cursos:* validar lista e descrições.
            - *Projetos:* conferir títulos e explicações.
            - *Vestibular:* verificar texto e link.
        - **Testar formulário de contato**
            - Preencher nome, e-mail e interesse.
            - Clicar em “Enviar”.
            - Confirmar que aparece a mensagem de sucesso.
            - Testar envio com campos obrigatórios vazios → navegador deve impedir.
        - **Testar visualização em diferentes tamanhos**
            - Abrir no celular ou modo responsivo do navegador.
            - Verificar se o layout permanece organizado.
    - Contas de Acesso padrão para iniciar o uso do sistema.
        
        usuario admin
        admin@email.com
        12345678
