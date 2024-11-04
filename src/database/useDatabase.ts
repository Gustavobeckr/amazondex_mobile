import { useSQLiteContext } from "expo-sqlite";

export type ArvoreDatabase = {
  id: number;
  nome: string;
};

export function useDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<ArvoreDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO arvore (nome) VALUES ($nome)"
    );

    try {
      const result = await statement.executeAsync({
        $nome: data.nome,
      });
      return result.lastInsertRowId.toLocaleString();
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function listAll() {
    const query = "SELECT * FROM arvore";
    try {
      const result = await database.getAllAsync<ArvoreDatabase>(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function findById(id: number) {
    const query = "SELECT * FROM arvore id = ?";
    try {
      const result = await database.getAllAsync<ArvoreDatabase>(query, id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  return { create, listAll, findById };
}
