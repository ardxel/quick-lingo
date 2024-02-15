import { useState } from "react";
import { Container } from "shared/ui";
import { HomeDeckListHeader } from "./header";

export default function HomeDeckListScreen() {
  const [decks, setDecks] = useState([]);

  return (
    <Container>
      <HomeDeckListHeader />
    </Container>
  );
}
