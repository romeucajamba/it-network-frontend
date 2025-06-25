
---

# 💻 Rede social e Educação Interativa – Frontend

Este projeto é uma aplicação **frontend** construída com **Next.js**, **TypeScript**, **React Query**, **Zustand**, **Axios**, **Phosphor React Icons** e **TailwindCSS**, que simula uma rede social educacional com interações sociais e funcionalidades de agenda e projetos.

## 🚀 Funcionalidades Principais
Romeu, segue abaixo a lista das funcionalidades que você mencionou organizadas por módulos, com alguns ajustes de ortografia e redundância eliminada para melhor compreensão e manutenção no projeto. Isso também facilita caso você deseje transformar em **requisitos funcionais/documentação técnica**, ou **planejamento de features** para dividir entre times de desenvolvimento:

---

### **1. Autenticação e Conta**

* O sistema deve permitir o cadastro de usuário.
* O sistema deve permitir o login de usuários cadastrados.
* O sistema deve permitir o logout de usuários.
* O sistema deve permitir o usuário recuperar a palavra-passe (esqueci minha senha).
* O sistema deve permitir o usuário alterar a palavra-passe.
* O sistema deve permitir o usuário se autenticar.
* O sistema deve permitir obter os dados de um usuário logado.
* O sistema deve permitir se cadastrar com a conta do Google ou do GitHub.

---

### **2. Perfil do Usuário**

* O sistema deve permitir o usuário visualizar seu perfil.
* O sistema deve permitir o usuário alterar seus dados (nome, bio, etc).
* O sistema deve permitir o usuário alterar o idioma.
* O sistema deve permitir o usuário alterar a foto de perfil.
* O sistema deve permitir o usuário remover a foto de perfil.
* O sistema deve permitir o usuário adicionar imagem de capa.
* O sistema deve permitir o usuário atualizar imagem de capa.
* O sistema deve permitir o usuário remover imagem de capa.

---

### **3. Rede Social (Posts, Reações e Comentários)**

* O sistema deve permitir o usuário fazer posts.
* O sistema deve permitir o usuário visualizar publicações.
* O sistema deve permitir o usuário comentar em posts.
* O sistema deve permitir o usuário editar seus comentários.
* O sistema deve permitir o usuário editar seus posts.
* O sistema deve permitir o usuário eliminar comentários.
* O sistema deve permitir o usuário reagir em posts.
* O sistema deve permitir o usuário compartilhar posts.
* O sistema deve permitir o usuário compartilhar vídeos e fotos como posts.

---

### **4. Amizades, Conversas e Comunicação**

* O sistema deve permitir o usuário conversar com outros usuários que fazem parte da rede de amigos.
* O sistema deve permitir o usuário conversar com o chatbot.
* O sistema deve permitir o usuário enviar mensagens de áudio.
* O sistema deve permitir pesquisar mensagens de amigos pelo nome.
* O sistema deve permitir o usuário ver quem está online.
* O sistema deve permitir o usuário eliminar mensagens.
* O sistema deve permitir o usuário editar mensagens (com limite de 30 minutos).
* O sistema deve permitir o usuário visualizar a quantidade de mensagens que foram enviadas para ele.
* O sistema deve permitir o usuário fazer chamadas.
* O sistema deve permitir o usuário fazer videochamadas.
* O sistema deve permitir o usuário compartilhar vídeos e fotos nas conversas com outros usuários.

---

### **5. Pesquisa**

* O sistema deve permitir o usuário pesquisar por outros usuários.
* O sistema deve permitir o usuário pesquisar por professores.
* O sistema deve permitir o usuário pesquisar por escolas.
* O sistema deve permitir o usuário pesquisar por faculdades.
* O sistema deve permitir pesquisar por canais para respectivos cursos.

---

### **6. Educação e Ensino**

* O sistema deve permitir o usuário visualizar cursos.
* O sistema deve permitir o usuário visualizar professores.
* O sistema deve permitir o usuário visualizar informações sobre escolas ou faculdades.
* O sistema deve permitir o usuário visualizar cursos de escolas ou faculdades.
* O sistema deve permitir visualizar informações sobre os cursos.
* O sistema deve permitir visualizar plataformas de ensino.
* O sistema deve permitir o usuário visualizar as melhores instituições de ensino.
* O sistema deve permitir o usuário visualizar os melhores professores.
* O sistema deve permitir visualizar os melhores canais de ensino digital.
* O sistema deve permitir o usuário visualizar as melhores plataformas de ensino.

---

### **7. Agenda e Organização Pessoal**

* O sistema deve permitir o usuário criar agendas.
* O sistema deve permitir o usuário acessar uma agenda.
* O sistema deve permitir o usuário visualizar dados da agenda.
* O sistema deve permitir o usuário editar nome da agenda.
* O sistema deve permitir o usuário editar dados da agenda.
* O sistema deve permitir o usuário inserir dados na agenda.
* O sistema deve permitir o usuário eliminar dados da agenda.
* O sistema deve permitir o usuário eliminar a agenda.

---

### **8. Projetos**

* O sistema deve permitir o usuário criar projetos pessoais.
* O sistema deve permitir o usuário criar projetos colaborativos.
* O sistema deve permitir o usuário adicionar projetos do computador.
* O sistema deve permitir o usuário eliminar projetos.
* O sistema deve permitir o usuário compartilhar projetos com outros usuários.

---

### **9. Lógica de Programação**

* O sistema deve permitir o usuário praticar lógica de programação com Python.
* O sistema deve permitir o usuário praticar lógica de programação com JavaScript.

---

### **10. Notificações e Ajuda**

* O sistema deve permitir o usuário visualizar notificações.
* O sistema deve permitir o usuário ver a quantidade de notificações recebidas.
* O sistema deve permitir o usuário visualizar gráfico de desempenho.
* O sistema deve permitir o usuário visualizar o guia de uso da plataforma.


## 🛠 Tecnologias Utilizadas

* **Next.js** – Framework React para aplicações fullstack
* **TypeScript** – Tipagem estática robusta
* **TailwindCSS** – Estilização rápida e responsiva
* **React Query** – Gerenciamento de estado assíncrono
* **Zustand** – Store leve e reativa para estado global
* **Axios** – Cliente HTTP para comunicação com a API
* **Phosphor React Icons** – Ícones modernos e flexíveis
* **React Hook Form** – Gerenciamento de formulários
* **Headless UI** – Componentes acessíveis
* **React Toastify** – Notificações de sucesso e erro

---

## 🧱 Estrutura de Pastas (sugestão)

```
src/
├── components/       # Componentes reutilizáveis (Botões, Inputs, Cards, etc.)
├── features/         # Módulos separados por funcionalidades (auth, profile, chat, agenda, etc.)
├── hooks/            # Hooks personalizados
├── lib/              # Instância Axios, i18n config, utils gerais
├── app/              # Páginas da aplicação (rotas Next.js)
├── stores/           # Zustand stores
├── types/            # Tipagens globais e interfaces
└── services/         # Camada de comunicação com a API
└── lib/              # Pasta onde contem icones e rotas da aplicação
```

## 🌐 Integração com API

A aplicação se comunica com uma API REST (como a versão backend em Django/Python) para realizar operações como:

* Login, cadastro, autenticação com Google/GitHub
* Envio e recebimento de mensagens
* Upload e recuperação de dados de perfil e agenda
* Consulta de cursos, professores, escolas
* Gestão de projectos

---

## 📊 Recursos Visuais

* Gráficos de desempenho por atividade do usuário
* Guias visuais e tutoriais dentro da plataforma
* Responsividade total para mobile e desktop
* Chat de conversas

---

## 🧑‍💻 Desenvolvedor

Projeto desenvolvido por \[Romeu Cajamba]
📫 **Contato:** [romeucajambl@email.com](mailto:romeucajambl@email.com)
🔗 **GitHub:** [https://github.com/romeucajamba](https://github.com/romeucajamba)

---
