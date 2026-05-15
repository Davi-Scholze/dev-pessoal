# SKILL: refactor-safely

## Quando invocar
Quando um arquivo ultrapassa 400 linhas ou quando a estrutura de um módulo está dificultando o desenvolvimento. Delega ao agente refactor-surgeon para casos complexos.

## Entrada
Arquivo(s) a refatorar + problema específico (muito grande, duplicação, acoplamento).

## Processo (baby steps obrigatório)
1. Leia o arquivo inteiro antes de tocar em qualquer coisa
2. Identifique dependências: quem importa este módulo?
3. Garanta cobertura de testes antes de começar
4. Execute um refactor por commit (extraia → teste → commit → próximo)

## Técnicas mais comuns
| Problema | Técnica |
|----------|---------|
| Arquivo grande | Extraia funções/hooks para arquivos próprios |
| Lógica duplicada | Extraia para `src/utils/` ou hook compartilhado |
| Props drilling | Introduza Context ou Zustand store |
| Função grande | Extraia sub-funções com nomes descritivos |
| Lógica misturada | Separe concerns (UI / dados / efeitos) |

## Restrições
- Nunca mude comportamento e estrutura no mesmo commit
- Nunca remova a API pública sem versionar
- Se não há testes, crie antes de começar — não negocie isso
