# Guia de Início Rápido do RSSHub

Este documento serve como um guia para configurar e executar o projeto RSSHub em diferentes ambientes.

## Sumário

1.  [Rodando no GitHub Codespaces (Recomendado)](#1-rodando-no-github-codespaces-recomendado)
2.  [Rodando Localmente com VS Code + Dev Containers](#2-rodando-localmente-com-vs-code--dev-containers)
3.  [Rodando Localmente (Método Tradicional)](#3-rodando-localmente-método-tradicional)
4.  [Links Disponíveis](#4-links-disponíveis)

---

### 1. Rodando no GitHub Codespaces (Recomendado)

Esta é a maneira mais fácil e rápida de começar, pois todo o ambiente de desenvolvimento já vem pré-configurado.

1.  **Acesse o Repositório:** Vá para a página do repositório RSSHub no GitHub.
2.  **Inicie o Codespace:**
    *   Clique no botão verde **`< > Code`**.
    *   Vá para a aba **`Codespaces`**.
    *   Clique em **`Create codespace on master`**.
3.  **Aguarde a Configuração:** O GitHub irá criar e configurar o ambiente para você. Isso pode levar alguns minutos. Os comandos de instalação de dependências (`pnpm i`) e build (`pnpm rb`) definidos em `.devcontainer/devcontainer.json` serão executados automaticamente.
4.  **Inicie o Servidor:** Assim que o terminal do VS Code estiver pronto, execute o comando:
    ```bash
    pnpm start
    ```
5.  **Acesse a Aplicação:** O Codespaces irá detectar que a porta `1200` está em uso e mostrará uma notificação para abri-la no navegador. A aplicação estará disponível para uso.

---

### 2. Rodando Localmente com VS Code + Dev Containers

Este método oferece um ambiente de desenvolvimento consistente e isolado, similar ao Codespaces, mas executando na sua máquina local.

**Pré-requisitos:**
*   Visual Studio Code
*   Docker Desktop
*   Extensão Dev Containers para o VS Code.

**Passos:**

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/DIYgod/RSSHub.git
    cd RSSHub
    ```
2.  **Abra no VS Code:**
    ```bash
    code .
    ```
3.  **Reabra no Container:** O VS Code detectará o arquivo `.devcontainer/devcontainer.json` e exibirá uma notificação no canto inferior direito perguntando se você deseja **"Reopen in Container"**. Clique nesse botão.
4.  **Aguarde o Build:** O VS Code irá construir a imagem Docker e configurar o container. Isso pode demorar na primeira vez.
5.  **Inicie o Servidor:** Após o container ser iniciado, abra um terminal dentro do VS Code (`Ctrl+``) e execute:
    ```bash
    pnpm start
    ```
    A aplicação estará acessível em `http://localhost:1200`.

---

### 3. Rodando Localmente (Método Tradicional)

Este método requer que você instale todas as dependências diretamente na sua máquina.

**Pré-requisitos:**
*   Node.js (versão 22 ou superior, conforme especificado em `.devcontainer/devcontainer.json`)
*   pnpm
*   Redis (opcional, mas recomendado para cache)

**Passos:**

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/DIYgod/RSSHub.git
    cd RSSHub
    ```
2.  **Instale as Dependências:**
    ```bash
    pnpm install
    ```
3.  **Construa o Projeto (Build):**
    ```bash
    pnpm build
    ```
4.  **Inicie o Servidor:**
    ```bash
    pnpm start
    ```
    A aplicação estará rodando em `http://localhost:1200`.

---

### 4. Links Disponíveis

Ao iniciar o servidor, você verá os seguintes links no seu terminal:

*   **Local:** `http://localhost:1200` - Endereço para acessar a aplicação no seu próprio computador.
*   **Network:** `http://<SEU_IP_NA_REDE>:1200` - Endereço para acessar a aplicação de outros dispositivos na mesma rede (ex: seu celular). Este link só aparece se a configuração `listenInaddrAny` estiver ativada.

**Links da Comunidade e Documentação:**

*   **Documentação Oficial:** https://docs.rsshub.app
*   **Repositório no GitHub:** https://github.com/DIYgod/RSSHub
*   **Grupo no Telegram:** https://t.me/rsshub
*   **Canal no Telegram:** https://t.me/awesomeRSSHub
*   **Perfil no X (Twitter):** https://x.com/intent/follow?screen_name=_RSSHub