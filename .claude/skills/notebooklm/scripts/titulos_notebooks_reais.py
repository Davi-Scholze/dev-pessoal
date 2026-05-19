#!/usr/bin/env python3
"""
Pega TITULO REAL de cada notebook visitando a URL individual.
Atualiza notebooks_conta.json com os titulos corretos.
"""

import sys
import json
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from patchright.sync_api import sync_playwright
from browser_utils import BrowserFactory


def main():
    data_path = Path(__file__).parent.parent / "data" / "notebooks_conta.json"
    with open(data_path, encoding="utf-8") as f:
        data = json.load(f)

    notebooks = data["notebooks"]
    print(f"Processando {len(notebooks)} notebooks...\n")

    playwright = sync_playwright().start()
    context = BrowserFactory.launch_persistent_context(playwright, headless=True)

    try:
        page = context.new_page()
        for i, nb in enumerate(notebooks, 1):
            try:
                page.goto(nb["url"], wait_until="domcontentloaded", timeout=30000)
                time.sleep(2)
                # Tentar varios seletores de titulo
                titulo = page.evaluate("""
                    () => {
                        // 1. Procurar no titulo da pagina
                        const tituloPag = document.querySelector('h1, [role="heading"]');
                        if (tituloPag && tituloPag.textContent.trim()) {
                            const t = tituloPag.textContent.trim();
                            if (t && !t.toLowerCase().includes('notebooklm')) return t;
                        }
                        // 2. Procurar no cabecalho do notebook
                        const nomes = document.querySelectorAll('[class*="title"], [class*="Title"], [class*="name"], [class*="Name"]');
                        for (const el of nomes) {
                            const t = el.textContent.trim();
                            if (t && t.length > 3 && t.length < 200 && !t.toLowerCase().includes('notebooklm')) return t;
                        }
                        // 3. Pegar do document.title
                        const docTitulo = document.title;
                        if (docTitulo) return docTitulo.replace(/\\s*[-|]\\s*NotebookLM/i, '').trim();
                        return '(sem titulo)';
                    }
                """)
                nb["titulo"] = titulo or "(sem titulo)"
                print(f"  {i:2}. {titulo}")
            except Exception as e:
                print(f"  {i:2}. ERRO: {e}")
                nb["titulo"] = "(erro ao buscar)"

        # Salvar
        with open(data_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"\nAtualizado: {data_path}")

    finally:
        context.close()
        playwright.stop()


if __name__ == "__main__":
    main()
