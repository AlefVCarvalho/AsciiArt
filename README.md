# Conversor de Imagens para ASCII

Uma aplicação web que transforma imagens em arte ASCII colorida, utilizando caracteres para representar os detalhes visuais da imagem original. O projeto funciona diretamente no navegador, sem necessidade de instalação de programas, bibliotecas externas ou configuração de um ambiente de desenvolvimento.

# Sumário

- [Demonstração](#demonstração)
- [Funcionalidades](#funcionalidades)
- [Como utilizar](#como-utilizar)
- [Como funciona](#como-funciona)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Imagens para teste](#imagens-para-teste)
- [Estrutura do projeto](#estrutura-do-projeto)

## Demonstração

Abaixo estão algumas imagens que demonstram a interface da aplicação, o processo de conversão e os resultados obtidos.

### Interface da aplicação
<img width="1720" height="968" alt="interface" src="https://github.com/user-attachments/assets/43997859-ed9a-4f33-a314-acaf07d6f7e6" />

### Resultado da conversão
<img width="1720" height="968" alt="result" src="https://github.com/user-attachments/assets/c6745f2f-2023-4b27-9c99-b3c78022bf17" />

## Funcionalidades

- **Conversão de imagens para ASCII:** transforma imagens em composições formadas por caracteres.
- **Cores preservadas:** utiliza as informações de cor da imagem original para gerar uma arte ASCII colorida.
- **Seleção de largura:** permite ajustar a quantidade de caracteres utilizados na representação da imagem.
- **Pré-visualização:** exibe a imagem selecionada antes da conversão.
- **Carregamento por arrastar e soltar:** permite adicionar imagens diretamente pela área de seleção.
- **Remoção de imagem:** possibilita remover a imagem selecionada e iniciar uma nova conversão.
- **Cópia em formato ANSI:** disponibiliza a saída com códigos de escape ANSI para representar as cores em terminais compatíveis.
- **Download em HTML:** permite salvar a arte ASCII colorida em um arquivo HTML independente.
- **Interface responsiva:** adapta a disposição dos elementos para diferentes tamanhos de tela.

## Como utilizar

Não é necessário instalar programas ou configurar um ambiente de desenvolvimento para utilizar a aplicação.

1. Acesse o repositório do projeto no GitHub.
2. Clique no botão **Code** e selecione **Download ZIP**.
3. Extraia o conteúdo do arquivo ZIP para uma pasta do seu computador.
4. Entre na pasta que contém o arquivo `index.html`.
5. Abra o arquivo `index.html` em um navegador atualizado, como Google Chrome, Microsoft Edge ou Firefox.
6. Clique em **Adicionar imagem** ou arraste uma imagem para a área de seleção.
7. Ajuste a largura da arte utilizando o controle deslizante.
8. Clique em **Gerar arte ASCII** para iniciar a conversão.
9. Utilize as opções disponíveis para copiar a saída ANSI ou baixar a arte em HTML.

Após abrir o arquivo `index.html`, a aplicação estará pronta para uso.

## Como funciona

O conversor utiliza recursos nativos do navegador para processar imagens e transformá-las em representações textuais coloridas.

O funcionamento segue estas etapas:

1. **Carregamento:** a imagem selecionada é carregada e exibida em uma área de pré-visualização.
2. **Redimensionamento:** a imagem é ajustada às dimensões necessárias para a conversão, considerando a largura selecionada e a proporção original.
3. **Análise dos pixels:** a aplicação utiliza o elemento `Canvas` para obter as informações de cor dos pixels da imagem.
4. **Conversão para caracteres:** o brilho médio de cada pixel é utilizado para selecionar um caractere de uma sequência ASCII.
5. **Aplicação das cores:** cada caractere recebe uma cor correspondente às informações RGB do pixel analisado.
6. **Exibição:** a arte ASCII colorida é apresentada diretamente na interface.
7. **Exportação:** o resultado pode ser copiado em formato ANSI ou baixado como um documento HTML.

A aparência do resultado depende da imagem original, de suas características visuais e da largura escolhida para a conversão.

## Tecnologias utilizadas

- **HTML5:** estrutura e organização dos elementos da interface.
- **CSS3:** estilização, cores, layout, animações e adaptação para diferentes tamanhos de tela.
- **JavaScript:** processamento das imagens, conversão para caracteres ASCII, gerenciamento dos controles e exportação dos resultados.
- **Canvas API:** leitura e processamento dos pixels das imagens.
- **Blob API:** criação do arquivo HTML disponibilizado para download.
- **Clipboard API:** cópia do resultado para a área de transferência, com alternativa para navegadores que não permitem o acesso direto à API.

O projeto não depende de bibliotecas externas para executar a versão web.

## Imagens para teste

O projeto pode incluir imagens de exemplo para facilitar os testes e demonstrar os resultados da conversão.

- `assets/examples/` — diretório destinado às imagens originais utilizadas nos testes.
- `assets/results/` — diretório destinado aos exemplos dos resultados obtidos após a conversão.

Esses diretórios são utilizados para organizar imagens de referência e não são necessários para o funcionamento básico da aplicação. Sua presença depende dos arquivos disponibilizados no repositório.

## Estrutura do projeto

```text
asciiart/
├── assets/
│   ├── examples/       # Imagens originais para teste
│   └── results/        # Exemplos dos resultados da conversão
├── src/
│   ├── index.html      # Estrutura da página
│   ├── style.css       # Estilos da interface
│   └── script.js      # Lógica de conversão e funcionalidades
└── README.md           # Documentação do projeto
```

### Responsabilidade dos arquivos

- `index.html`: contém a estrutura da aplicação e referencia os arquivos CSS e JavaScript.
- `style.css`: define a aparência da interface, incluindo cores, espaçamentos, botões, áreas de visualização e estilos responsivos.
- `script.js`: implementa o carregamento das imagens, a conversão para ASCII, o ajuste da largura, a cópia ANSI e o download em HTML.
- `assets/examples/`: organiza as imagens de exemplo, quando disponibilizadas.
- `assets/results/`: organiza os resultados de referência, quando disponibilizados.
- `README.md`: apresenta as informações e instruções do projeto.

Os três arquivos principais da versão web devem permanecer juntos na mesma pasta, conforme os caminhos definidos no `index.html`.
