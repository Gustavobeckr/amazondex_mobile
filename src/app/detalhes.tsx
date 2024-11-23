import Collapsible from "@/components/Collapsible";
import DetalhesView from "@/components/DetalhesView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Detalhes() {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <ScrollView className="w-screen h-auto bg-verde-claro">
      <View className="flex flex-col mx-2 mb-2 p-3 gap-3 bg-verde-escuro rounded-xl">
        <Stack.Screen
          options={{
            title: params.nomeArvore as string,
          }}
        />
        <DetalhesView
          color={"bg-verde-claro"}
          title="Teste1"
          contentTextHtml={{
            html: `<h2 class=\"text-lg font-bold\" levels=\"2\">dsdadasad</h2><p></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare sed nisi vel faucibus. Praesent accumsan, est in rutrum consequat, ipsum mi sollicitudin neque, aliquet consequat diam tortor nec lorem. Nulla a eros tempus, porttitor magna sit amet, suscipit dui. Sed tincidunt sed metus eget ultricies. Donec nulla neque, molestie sit amet velit eget, maximus semper sapien. In hac habitasse platea dictumst. Etiam luctus ultrices felis sit amet egestas. Phasellus magna felis, congue sed orci in, tristique porttitor risus. Nunc at odio et ex accumsan semper ac id lacus. Proin quam tellus, sodales a elit a, suscipit varius arcu. Cras a ligula neque. Maecenas gravida arcu ante. Sed posuere quam diam, et eleifend arcu gravida eu.
Nulla nibh lectus, varius ac blandit vel, commodo a felis. Mauris posuere elementum nibh, ac maximus orci euismod nec. Quisque sed mi eget velit consequat porttitor tempus eget dui. Vestibulum aliquet pellentesque leo. Donec quis aliquet nibh. Vivamus pulvinar velit vitae odio scelerisque, tristique hendrerit erat consectetur. Nulla ac libero gravida, rutrum nulla non, luctus quam. In mauris sem, posuere non tincidunt eget, ornare tristique velit.
Aliquam suscipit ipsum a orci cursus lacinia. In hendrerit ex ut ullamcorper venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris ultrices elementum velit vel molestie. Suspendisse vulputate sit amet tortor tempus consectetur. Pellentesque malesuada finibus auctor. </p>`,
          }}
        />
        <Collapsible
          color={"bg-verde-claro"}
          title="Teste"
          contentTextHtml={{
            html: `<h2 class=\"text-lg font-bold\" levels=\"2\">dsdadasad</h2><p></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare sed nisi vel faucibus. Praesent accumsan, est in rutrum consequat, ipsum mi sollicitudin neque, aliquet consequat diam tortor nec lorem. Nulla a eros tempus, porttitor magna sit amet, suscipit dui. Sed tincidunt sed metus eget ultricies. Donec nulla neque, molestie sit amet velit eget, maximus semper sapien. In hac habitasse platea dictumst. Etiam luctus ultrices felis sit amet egestas. Phasellus magna felis, congue sed orci in, tristique porttitor risus. Nunc at odio et ex accumsan semper ac id lacus. Proin quam tellus, sodales a elit a, suscipit varius arcu. Cras a ligula neque. Maecenas gravida arcu ante. Sed posuere quam diam, et eleifend arcu gravida eu.
Nulla nibh lectus, varius ac blandit vel, commodo a felis. Mauris posuere elementum nibh, ac maximus orci euismod nec. Quisque sed mi eget velit consequat porttitor tempus eget dui. Vestibulum aliquet pellentesque leo. Donec quis aliquet nibh. Vivamus pulvinar velit vitae odio scelerisque, tristique hendrerit erat consectetur. Nulla ac libero gravida, rutrum nulla non, luctus quam. In mauris sem, posuere non tincidunt eget, ornare tristique velit.
Aliquam suscipit ipsum a orci cursus lacinia. In hendrerit ex ut ullamcorper venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris ultrices elementum velit vel molestie. Suspendisse vulputate sit amet tortor tempus consectetur. Pellentesque malesuada finibus auctor. </p>`,
          }}
        />
        <Collapsible
          color={"bg-verde"}
          title="Teste"
          contentTextHtml={{
            html: `<h2 class=\"text-lg font-bold\" levels=\"2\">dsdadasad</h2><p></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare sed nisi vel faucibus. Praesent accumsan, est in rutrum consequat, ipsum mi sollicitudin neque, aliquet consequat diam tortor nec lorem. Nulla a eros tempus, porttitor magna sit amet, suscipit dui. Sed tincidunt sed metus eget ultricies. Donec nulla neque, molestie sit amet velit eget, maximus semper sapien. In hac habitasse platea dictumst. Etiam luctus ultrices felis sit amet egestas. Phasellus magna felis, congue sed orci in, tristique porttitor risus. Nunc at odio et ex accumsan semper ac id lacus. Proin quam tellus, sodales a elit a, suscipit varius arcu. Cras a ligula neque. Maecenas gravida arcu ante. Sed posuere quam diam, et eleifend arcu gravida eu.
Nulla nibh lectus, varius ac blandit vel, commodo a felis. Mauris posuere elementum nibh, ac maximus orci euismod nec. Quisque sed mi eget velit consequat porttitor tempus eget dui. Vestibulum aliquet pellentesque leo. Donec quis aliquet nibh. Vivamus pulvinar velit vitae odio scelerisque, tristique hendrerit erat consectetur. Nulla ac libero gravida, rutrum nulla non, luctus quam. In mauris sem, posuere non tincidunt eget, ornare tristique velit.
Aliquam suscipit ipsum a orci cursus lacinia. In hendrerit ex ut ullamcorper venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris ultrices elementum velit vel molestie. Suspendisse vulputate sit amet tortor tempus consectetur. Pellentesque malesuada finibus auctor. </p>`,
          }}
        />
      </View>
    </ScrollView>
  );
}
