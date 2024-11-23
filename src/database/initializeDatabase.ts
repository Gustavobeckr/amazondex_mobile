import { type SQLiteDatabase } from "expo-sqlite";
import { Alert } from "react-native";
export async function initializaDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS arvore (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome text,
        descricao_botanica text,
        aspectos_ecologicos text,
        regeneracao_natural text
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS ocorrencia_natural (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude text,
        longitude text,
        arvore_id INTEGER,
        FOREIGN KEY (arvore_id) REFERENCES arvore (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS biologia_reprodutiva (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        descricao TEXT,
        arvore_id INTEGER,
        FOREIGN KEY (arvore_id) REFERENCES arvore (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS paisagismo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao text,
        arvore_id INTEGER,
        FOREIGN KEY (arvore_id) REFERENCES arvore (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS paisagismo_foto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        foto_id INTEGER,
        paisagismo_id INTEGER,
        FOREIGN KEY (paisagismo_id) REFERENCES paisagismo (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS fotos_arvores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao text,
        foto_id INTEGER,
        arvore_id INTEGER,
        FOREIGN KEY (arvore_id) REFERENCES arvore (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS aproveitamento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao text,
        arvore_id INTEGER,
        FOREIGN KEY (arvore_id) REFERENCES arvore (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS alimentacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dados_nutricionais text,
        formas_consumo text,
        aproveitamento_id INTEGER,
        FOREIGN KEY (aproveitamento_id) REFERENCES aproveitamento (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS biotecnologia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        composicao text,
        potencia_bioprodutos text,
        aproveitamento_id INTEGER,
        FOREIGN KEY (aproveitamento_id) REFERENCES aproveitamento (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS bioatividade (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao text,
        aproveitamento_id INTEGER,
        FOREIGN KEY (aproveitamento_id) REFERENCES aproveitamento (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS cultivo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao text,
        arvore_id INTEGER,
        FOREIGN KEY (arvore_id) REFERENCES arvore (id) ON DELETE CASCADE
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS cuidados_especiais (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_cuidado text,
        descricao text,
        cultivo_id INTEGER,
        FOREIGN KEY (cultivo_id) REFERENCES cultivo (id) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    Alert.alert("Erro", "Erro ao inicializar banco de dados local. " + error);
  }
}
