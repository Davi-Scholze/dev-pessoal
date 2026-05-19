#!/usr/bin/env python3
"""
Remove da library local os notebooks que NAO existem mais na conta (orfaos).
Faz backup antes e lista o que vai remover.
"""

import json
import shutil
from pathlib import Path
from datetime import datetime


def main():
    data_dir = Path(__file__).parent.parent / "data"
    lib_path = data_dir / "library.json"
    conta_path = data_dir / "notebooks_conta.json"

    # Carregar dados
    with open(lib_path, encoding="utf-8") as f:
        lib = json.load(f)
    with open(conta_path, encoding="utf-8") as f:
        conta = json.load(f)

    ids_conta = {n["id"] for n in conta["notebooks"]}
    notebooks_lib = lib.get("notebooks", {})

    # Identificar orfaos
    orfaos = []
    validos = {}
    for slug, nb in notebooks_lib.items():
        url = nb.get("url", "")
        if "/notebook/" in url:
            nb_id = url.split("/notebook/")[1].split("?")[0].split("/")[0]
            if nb_id in ids_conta:
                validos[slug] = nb
            else:
                orfaos.append((slug, nb.get("name", "?"), nb_id))
        else:
            validos[slug] = nb

    print(f"Library atual: {len(notebooks_lib)} notebooks")
    print(f"Validos:       {len(validos)}")
    print(f"Orfaos:        {len(orfaos)}\n")

    if not orfaos:
        print("Nada a remover.")
        return

    print("ORFAOS que serao removidos:")
    for slug, nome, nb_id in orfaos:
        print(f"   - {nome}")
        print(f"     slug: {slug}")
        print(f"     id:   {nb_id}")

    # Backup
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = data_dir / f"library.backup_{stamp}.json"
    shutil.copy(lib_path, backup)
    print(f"\nBackup: {backup}")

    # Salvar versao limpa
    lib["notebooks"] = validos
    with open(lib_path, "w", encoding="utf-8") as f:
        json.dump(lib, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Library limpa. {len(validos)} notebooks restantes.")


if __name__ == "__main__":
    main()
