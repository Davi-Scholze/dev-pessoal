#!/usr/bin/env python3
"""
Lista TODOS os notebooks da conta NotebookLM do usuario.
Usa o BrowserFactory da skill (mesmo contexto persistente com auth).
"""

import sys
import json
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from patchright.sync_api import sync_playwright
from browser_utils import BrowserFactory

HOMEPAGE = "https://notebooklm.google.com/"


def main():
    playwright = None
    context = None
    try:
        playwright = sync_playwright().start()
        context = BrowserFactory.launch_persistent_context(playwright, headless=True)

        page = context.new_page()
        print("Abrindo NotebookLM homepage...")
        page.goto(HOMEPAGE, wait_until="domcontentloaded", timeout=45000)

        # Aguardar homepage carregar
        try:
            page.wait_for_selector('a[href*="/notebook/"]', timeout=20000)
        except Exception:
            print("Nao apareceram links de notebook. Tentando continuar...")

        time.sleep(4)  # garantir que cards renderizem

        notebooks = page.evaluate("""
            () => {
                const links = document.querySelectorAll('a[href*="/notebook/"]');
                const vistos = new Set();
                const resultado = [];
                for (const link of links) {
                    const href = link.href;
                    const match = href.match(/\\/notebook\\/([a-f0-9\\-]+)/);
                    if (!match) continue;
                    const id = match[1];
                    if (vistos.has(id)) continue;
                    vistos.add(id);

                    // Tenta varios lugares pra achar o titulo
                    let titulo = '';

                    // 1. Procurar ancestrais ate encontrar elemento com texto util
                    let atual = link;
                    for (let i = 0; i < 6; i++) {
                        if (!atual || !atual.parentElement) break;
                        atual = atual.parentElement;
                        const tituloEl = atual.querySelector('h2, h3, h4, [role="heading"]');
                        if (tituloEl) {
                            titulo = tituloEl.textContent.trim();
                            if (titulo) break;
                        }
                    }

                    // 2. Se nao achou, pega do aria-label ou title do link
                    if (!titulo) titulo = link.getAttribute('aria-label') || link.getAttribute('title') || '';

                    // 3. Fallback: texto do proprio link
                    if (!titulo) {
                        titulo = link.textContent.trim().split('\\n')[0].substring(0, 150);
                    }

                    resultado.push({ id, url: href, titulo: titulo || '(sem titulo)' });
                }
                return resultado;
            }
        """)

        print(f"\n{len(notebooks)} notebooks encontrados na conta\n")
        print("=" * 70)
        for i, n in enumerate(notebooks, 1):
            print(f"{i:3}. {n['titulo']}")
            print(f"     {n['url']}")
        print("=" * 70)

        # Comparar com library local
        lib_path = Path(__file__).parent.parent / "data" / "library.json"
        if lib_path.exists():
            with open(lib_path, encoding="utf-8") as f:
                lib = json.load(f)

            if isinstance(lib, list):
                notebooks_lib = lib
            elif isinstance(lib, dict) and "notebooks" in lib:
                notebooks_lib = lib["notebooks"] if isinstance(lib["notebooks"], list) else list(lib["notebooks"].values())
            elif isinstance(lib, dict):
                notebooks_lib = list(lib.values())
            else:
                notebooks_lib = []

            ids_locais = set()
            titulos_locais = {}
            for nb in notebooks_lib:
                if not isinstance(nb, dict):
                    continue
                url = nb.get("url", "")
                if "/notebook/" in url:
                    nb_id = url.split("/notebook/")[1].split("?")[0].split("/")[0]
                    ids_locais.add(nb_id)
                    titulos_locais[nb_id] = nb.get("name", nb.get("title", "(sem nome)"))

            ids_conta = {n["id"] for n in notebooks}
            faltam = ids_conta - ids_locais
            orfaos = ids_locais - ids_conta

            print("\nCOMPARACAO:")
            print(f"   Na conta:        {len(ids_conta)}")
            print(f"   Na library:      {len(ids_locais)}")
            print(f"   Faltam adicionar: {len(faltam)}")
            print(f"   Orfaos:          {len(orfaos)}")

            if faltam:
                print("\nFORA da library (precisam ser adicionados):")
                for n in notebooks:
                    if n["id"] in faltam:
                        print(f"   - {n['titulo']}")
                        print(f"     {n['url']}")

            if orfaos:
                print("\nORFAOS (na library mas nao na conta — podem ter sido deletados):")
                for oid in orfaos:
                    print(f"   - {titulos_locais.get(oid, '(sem nome)')}")
                    print(f"     ID: {oid}")

        # Salvar resultado
        out_path = Path(__file__).parent.parent / "data" / "notebooks_conta.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump({"total": len(notebooks), "notebooks": notebooks}, f, ensure_ascii=False, indent=2)
        print(f"\nSalvo: {out_path}")

    finally:
        if context:
            context.close()
        if playwright:
            playwright.stop()


if __name__ == "__main__":
    main()
