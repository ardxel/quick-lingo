import { ScrollView, StyleSheet, View } from "react-native";
import { Container } from "shared/ui";
import {
  SelectBasicDeckOption,
  ShowCardsCountOption,
  ShowExamplesHelpesOption,
  ShowSynonymsHelperOption,
  SortCardsOption,
  TotalCardsInSessionOption,
} from "./options";
import { useLingoSettings } from "entities/settings";

export default function SettingScreen() {
  const { settings, update, isLoading } = useLingoSettings();

  if (isLoading || !settings) return null;

  return (
    <Container>
      <View style={s.view}>
        <ScrollView>
          <SelectBasicDeckOption
            value={settings.basicDeck}
            onSelectBasicDeck={(deckName) =>
              update((settings) => {
                settings.basicDeck = deckName;
                return settings;
              })
            }
          />
          <View style={{ marginTop: 20 }}>
            <SortCardsOption
              value={settings.sortTypeInSession}
              onSelectSortOption={(sortOpt) =>
                update((settings) => {
                  settings.sortTypeInSession = sortOpt;
                  return settings;
                })
              }
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <TotalCardsInSessionOption
              value={settings.cardsInSession}
              onSelectCardInSessionOption={(opt) =>
                update((settings) => {
                  settings.cardsInSession = opt;
                  return settings;
                })
              }
            />
          </View>
          <View style={{ width: "100%", height: 20 }}></View>

          <View style={{ marginTop: 20 }}>
            <ShowCardsCountOption
              value={settings.showCardsCount}
              onChange={(value) =>
                update((settings) => {
                  settings.showCardsCount = value;
                  return settings;
                })
              }
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <ShowSynonymsHelperOption
              value={settings.showSynonymsHelper}
              onChange={(value) =>
                update((settings) => {
                  settings.showSynonymsHelper = value;
                  return settings;
                })
              }
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <ShowExamplesHelpesOption
              value={settings.showExamplesHelper}
              onChange={(value) =>
                update((settings) => {
                  settings.showExamplesHelper = value;
                  return settings;
                })
              }
            />
          </View>
        </ScrollView>
      </View>
    </Container>
  );
}

const s = StyleSheet.create({
  view: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    rowGap: 20,
  },
});
