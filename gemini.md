# Constituição do Projeto: Portal do Aluno - Gaia Escola de Astrologia

Este documento define a constituição, regras de negócio, dados e invariantes para o portal do aluno e integração com o site existente da Gaia Escola de Astrologia.

## 📋 Esquema de Dados (Data Schema)

Os dados dos alunos e suas respectivas informações acadêmicas são estruturados localmente de forma estática para permitir o funcionamento 100% client-side (GitHub Pages compatível).

### Modelo do Aluno (Student Academic Profile)
```json
{
  "username": "caiotrombini",
  "nome": "Caio Trombini",
  "cpf": "397.337.018-39",
  "dataNascimento": "09/08/1990",
  "curso": "Astrologia – Ciência dos Astros",
  "validadeCarteirinha": "2030",
  "matricula": "GEA-199008-01",
  "status": "Ativo",
  "avatar": "caio.jpg",
  "cursos": [
    {
      "nome": "Introdução à Astrologia Hermética",
      "cargaHoraria": "60h",
      "professor": "Robson Papaleo",
      "frequencia": "92%",
      "faltas": 4,
      "limiteFaltas": 12,
      "nota": 9.5,
      "status": "Aprovado"
    },
    {
      "nome": "Cálculo e Desenho de Mapas Astrológicos",
      "cargaHoraria": "80h",
      "professor": "Robson Papaleo",
      "frequencia": "88%",
      "faltas": 6,
      "limiteFaltas": 16,
      "nota": 8.8,
      "status": "Em curso"
    }
  ],
  "declaracaoTexto": "Declaramos para os devidos fins que Caio Trombini está regularmente matriculado no curso profissionalizante de Astrologia – Ciência dos Astros na Gaia Escola de Astrologia."
}
```

## 🛠️ Regras de Negócio e Comportamentais
1. **Autenticação Client-Side:** O portal rodará de forma totalmente estática. Os dados dos alunos estarão salvos de forma encriptada leve ou ofuscada em um arquivo Javascript de banco de dados estático (`db.js`) para evitar visualização direta em texto limpo do código fonte, caso necessário. O login será verificado via JS básico.
2. **Identidade Visual Premium:** O portal deve adotar a paleta de cores oficial extraída da análise de carteirinhas:
   - Dominante Escuro: `#0D1118` (Fundo, cartões e elementos principais)
   - Laranja Dourado: `#EE6806` (Destaques, botões ativos, bordas selecionadas)
   - Azul Luminoso: `#0A70C3` (Acentos e gradientes celestes)
   - Branco/Cinza Claro: `#F5F7FA` (Textos secundários e fundos alternados)
3. **Carteirinha Digital Interativa:** Renderizar o cartão físico no navegador na proporção correta (`~1.599:1`) com a foto do aluno, QR Code funcional (apontando para uma página de validação pública), gradiente azul celeste na lateral esquerda e design idêntico ao fornecido na imagem.
4. **Declaração de Matrícula:** Fornecer um botão para gerar a Declaração de Matrícula oficial em PDF ou tela de impressão limpa contendo o logotipo da Gaia, dados da matrícula e um código hash de verificação de autenticidade.

## 🚀 Log de Manutenção
- **2026-06-30:** Criação da constituição do projeto para a integração do Portal do Aluno na Gaia Escola de Astrologia.
