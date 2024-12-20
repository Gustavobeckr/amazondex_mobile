import buscarTodasArvores from "@/service/arvoreService";
import { useState } from "react";
import { useDatabase } from "./useDatabase";
import { ArvoreDataBase, ArvoreDTO } from "@/types/arvore.types";

export default function useArvore() {
  const [arvore, setArvore] = useState();
  const { create, deleteAll, listAll } = useDatabase();
  async function atualizarArvores(): Promise<ArvoreDataBase[] | false> {
    try {
      deleteAll();
      const listaArvore = await buscarTodasArvores();
      for (let i = 0; i < listaArvore.length; i++) {
        const arvore = listaArvore[i];
        create(arvore);
      }
      const listArvore = await listAll();
      return listArvore;
    } catch (error) {
      return false;
    }
  }
  return {
    arvore,
    setArvore,
    atualizarArvores,
  };
}
