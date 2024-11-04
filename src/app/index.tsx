import Arvore from "@/components/Arvore";
import { ArvoreDatabase, useDatabase } from "@/database/useDatabase";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";

export default function Home() {
  const [arvores, setArvores] = useState<ArvoreDatabase[] | null>(null);
  const { create, listAll } = useDatabase();

  async function listarArvores() {
    try {
      const response = await listAll();
      setArvores(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarArvores();
  }, []);

  async function insert() {
    try {
      await create({ nome: "Arvore1" });
      await create({ nome: "Arvore2" });
      await create({ nome: "Arvore3" });
      await create({ nome: "Arvore4" });
      await create({ nome: "Arvore5" });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View className="h-full w-full px-2 bg-verde-claro">
      <FlatList
        data={arvores}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Arvore data={item} />}
        contentContainerStyle={{ gap: 8 }}
      />

      {/* <Button title="insert" onPress={insert} /> */}
    </View>
  );
}
