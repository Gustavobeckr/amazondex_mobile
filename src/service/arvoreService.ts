import { ArvoreDTO } from "@/types/arvore.types";
import { axiosRequest } from "./axios";
import { AxiosError } from "axios";

export default async function buscarTodasArvores(): Promise<ArvoreDTO[]> {
  try {
    const response = await axiosRequest.get("arvore/list");

    return response.data.data;
  } catch (error) {
    const erro = error as AxiosError;
    throw new Error("Erro ao buscar arvores cadastradas: " + erro.message);
  }
}
