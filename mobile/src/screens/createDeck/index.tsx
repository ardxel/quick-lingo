import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { DeckStackSreenProps, RootTabParamList } from "app/navigation";
import { Container } from "shared/ui";
import { CreateDeckForm } from "./createDeckForm";

type CreateDeckScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList>,
  DeckStackSreenProps<"CreateDeck">
>;

export default function CreateDeckScreen({}: CreateDeckScreenProps) {
  return (
    <Container>
      <CreateDeckForm />
    </Container>
  );
}
