import {
  AlimentacaoDataBase,
  AproveitamentoDataBase,
  AproveitamentoDTO,
  ArvoreCommand,
  ArvoreDataBase,
  ArvoreDTO,
  BioatividadeDataBase,
  BiologiaReprodutivaDatabase,
  BiotecnologiaDataBase,
  CuidadosEspeciaisDataBase,
  CultivoDataBase,
  CultivoDTO,
  FotoArvoreDataBase,
  OcorrenciaNaturalDataBase,
  PaisagismoDataBase,
} from "@/types/arvore.types";
import { useSQLiteContext } from "expo-sqlite";

export function useDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<ArvoreDTO, "id">) {
    try {
      const arvoreCommand = await database.runAsync(
        "INSERT INTO arvore (nome, descricao_botanica, aspectos_ecologicos, regeneracao_natural) VALUES (?, ?, ?, ?)",
        data.nome,
        data.descricaoBotanica,
        data.aspectosEcologicos,
        data.regeneracaoNatural
      );
      const arvoreId = arvoreCommand.lastInsertRowId;
      data.ocorrenciaNatural.forEach(async ({ latitude, longitude }, index) => {
        await database.runAsync(
          "INSERT INTO ocorrencia_natural (latitude, longitude, arvore_id) VALUES (?, ?, ?)",
          latitude,
          longitude,
          arvoreId
        );
      });

      await database.runAsync(
        "INSERT INTO biologia_reprodutiva (descricao, tipo, arvore_id) VALUES (?, ?, ?)",
        data.biologiaReprodutiva.descricao,
        data.biologiaReprodutiva.tipo,
        arvoreId
      );

      await database.runAsync(
        "INSERT INTO paisagismo (descricao, arvore_id) VALUES (?, ?)",
        data.paisagismo.descricao,
        arvoreId
      );

      for (let i = 0; i < data.fotoArvore.length; i++) {
        const foto = data.fotoArvore[i];
        await database.runAsync(
          "INSERT INTO fotos_arvores (descricao, foto_id, arvore_id) VALUES (?, ?, ?)",
          foto.descricao,
          foto.foto.id,
          arvoreId
        );
      }
      const aproveitamentoInsert = await database.runAsync(
        "INSERT INTO aproveitamento (descricao, arvore_id) VALUES (?, ?)",
        data.aproveitamento.descricao,
        arvoreId
      );
      const aproveitamentoId = aproveitamentoInsert.lastInsertRowId;

      await database.runAsync(
        "INSERT INTO alimentacao (dados_nutricionais, formas_consumo,aproveitamento_id) VALUES (?, ?, ?)",
        data.aproveitamento.alimentacao.dadosNutricionais,
        data.aproveitamento.alimentacao.formasConsumo,
        aproveitamentoId
      );

      await database.runAsync(
        "INSERT INTO biotecnologia (composicao, potencia_bioprodutos,aproveitamento_id) VALUES (?, ?, ?)",
        data.aproveitamento.biotecnologia.composicao,
        data.aproveitamento.biotecnologia.potenciaBioprodutos,
        aproveitamentoId
      );
      await database.runAsync(
        "INSERT INTO bioatividade (descricao, aproveitamento_id) VALUES (?, ?)",
        data.aproveitamento.bioatividade.descricao,
        aproveitamentoId
      );
      const cultivoInsert = await database.runAsync(
        "INSERT INTO cultivo (descricao, arvore_id) VALUES (?, ?)",
        data.cultivo.descricao,
        arvoreId
      );
      const cultivoId = cultivoInsert.lastInsertRowId;

      for (let i = 0; i < data.cultivo.cuidadosEspeciais.length; i++) {
        const cuidado = data.cultivo.cuidadosEspeciais[i];
        await database.runAsync(
          "INSERT INTO cuidados_especiais (tipo_cuidado, descricao, cultivo_id) VALUES (?, ?, ?)",
          cuidado.tipoCuidado,
          cuidado.descricao,
          cultivoId
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async function listAll() {
    const query = "SELECT * FROM arvore";
    try {
      const result = await database.getAllAsync<ArvoreDataBase>(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function findArvoreById(id: string): Promise<ArvoreDataBase> {
    const query = `SELECT * FROM arvore WHERE id = ?`;
    try {
      const result = await database.getFirstAsync<ArvoreDataBase>(query, [id]);
      if (result == null) {
        throw new Error("Não foi possivel achar a árvore selecionada.");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function deleteAll() {
    try {
      const result = await database.runAsync("DELETE FROM arvore");
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function findBioRepeByArvoreId(
    id: string
  ): Promise<BiologiaReprodutivaDatabase> {
    const query = `SELECT * FROM biologia_reprodutiva WHERE arvore_id = ?`;
    try {
      const result = await database.getFirstAsync<BiologiaReprodutivaDatabase>(
        query,
        [id]
      );
      if (result == null) {
        throw new Error("Não foi possivel achar a árvore selecionada.");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function findOcorrenciaNatByArvoreId(
    id: string
  ): Promise<OcorrenciaNaturalDataBase[]> {
    const query = `SELECT * FROM ocorrencia_natural WHERE arvore_id = ?`;
    try {
      const result = await database.getAllAsync<OcorrenciaNaturalDataBase>(
        query,
        [id]
      );
      if (result == null) {
        throw new Error("Não foi possivel achar a árvore selecionada.");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function findFotoByArvoreId(id: string): Promise<FotoArvoreDataBase[]> {
    const query = `SELECT * FROM fotos_arvores WHERE arvore_id = ?`;
    try {
      const result = await database.getAllAsync<FotoArvoreDataBase>(query, [
        id,
      ]);
      if (result == null) {
        throw new Error("Não foi possivel achar a árvore selecionada.");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function findAproveitamentoByArvoreId(
    id: string
  ): Promise<AproveitamentoDTO> {
    try {
      const aproveitamento =
        await database.getFirstAsync<AproveitamentoDataBase>(
          `SELECT * FROM aproveitamento WHERE arvore_id = ?`,
          [id]
        );
      if (aproveitamento == null) {
        throw new Error(
          "Não foi possivel achar o aproveitamento da árvore selecionada."
        );
      }
      const alimentacao = await database.getFirstAsync<AlimentacaoDataBase>(
        `SELECT * FROM alimentacao WHERE aproveitamento_id = ?`,
        [aproveitamento.id]
      );
      if (alimentacao == null) {
        throw new Error(
          "Não foi possivel achar a alimnetação da árvore selecionada."
        );
      }
      const biotecnologia = await database.getFirstAsync<BiotecnologiaDataBase>(
        `SELECT * FROM biotecnologia WHERE aproveitamento_id = ?`,
        [aproveitamento.id]
      );
      if (biotecnologia == null) {
        throw new Error(
          "Não foi possivel achar a biotecnologia da árvore selecionada."
        );
      }
      const bioatividade = await database.getFirstAsync<BioatividadeDataBase>(
        `SELECT * FROM bioatividade WHERE aproveitamento_id = ?`,
        [aproveitamento.id]
      );
      if (bioatividade == null) {
        throw new Error(
          "Não foi possivel achar a bioatividade da árvore selecionada."
        );
      }

      return {
        id: aproveitamento.id,
        descricao: aproveitamento.descricao,
        alimentacao: {
          id: alimentacao.id,
          aproveitamento_id: alimentacao.aproveitamento_id,
          dados_nutricionais: alimentacao.dados_nutricionais,
          formas_consumo: alimentacao.formas_consumo,
        },
        bioatividade: {
          id: bioatividade.id,
          aproveitamento_id: bioatividade.aproveitamento_id,
          descricao: bioatividade.descricao,
        },
        biotecnologia: {
          id: biotecnologia.id,
          aproveitamento_id: biotecnologia.aproveitamento_id,
          composicao: biotecnologia.composicao,
          potencia_bioprodutos: biotecnologia.potencia_bioprodutos,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async function findPaisagismoByArvoreId(
    id: string
  ): Promise<PaisagismoDataBase> {
    const query = `SELECT * FROM paisagismo WHERE arvore_id = ?`;
    try {
      const result = await database.getFirstAsync<PaisagismoDataBase>(query, [
        id,
      ]);
      if (result == null) {
        throw new Error(
          "Não foi possivel achar o paisagismo da árvore selecionada."
        );
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function findCultivoByArvoreId(id: string): Promise<CultivoDTO> {
    try {
      const cultivo = await database.getFirstAsync<CultivoDataBase>(
        `SELECT * FROM cultivo WHERE arvore_id = ?`,
        [id]
      );
      if (cultivo == null) {
        throw new Error(
          "Não foi possivel achar o cultivo da árvore selecionada."
        );
      }
      const cuidados = await database.getAllAsync<CuidadosEspeciaisDataBase>(
        `SELECT * FROM cuidados_especiais WHERE cultivo_id = ?`,
        [cultivo.id]
      );
      if (cuidados == null) {
        throw new Error(
          "Não foi possivel achar o cuidados especiais da árvore selecionada."
        );
      }
      let cuidadoEspeciais: CuidadosEspeciaisDataBase[] = [];
      cuidados.map((value) => {
        cuidadoEspeciais.push({
          id: value.id,
          cultivo_id: value.cultivo_id,
          descricao: value.descricao,
          tipo_cuidado: value.tipo_cuidado,
        });
      });
      return {
        descricao: cultivo.descricao,
        cuidadosEspeciais: cuidadoEspeciais,
      };
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    listAll,
    deleteAll,
    findArvoreById,
    findFotoByArvoreId,
    findCultivoByArvoreId,
    findBioRepeByArvoreId,
    findPaisagismoByArvoreId,
    findOcorrenciaNatByArvoreId,
    findAproveitamentoByArvoreId,
  };
}
