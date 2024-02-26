import { color, font } from "shared/vars";
import { StyleSheet } from "react-native";

export const header = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  counter: {
    alignSelf: "flex-end",
  },
  counterParagraph: {
    fontFamily: font.Montserrat.medium,
    fontSize: 30,
  },
});

export const answer = StyleSheet.create({
  displayAnswer: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: color.chocolate,
  },
  translatedText: {
    fontFamily: font.Montserrat.regular,
    fontSize: 22,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonAnswer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: color.chocolate,
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    backgroundColor: color.lightgrey,
  },
  buttonShowAnswerText: {
    fontSize: 20,
    color: "black",
    fontFamily: font.Montserrat.medium,
  },
  buttonEasy: {
    backgroundColor: "green",
    minWidth: "25%",
  },
  buttonMedium: {
    backgroundColor: color.burlywood,
    minWidth: "25%",
  },
  buttonHard: {
    backgroundColor: "tomato",
    minWidth: "25%",
  },
});

export const root = StyleSheet.create({
  main: {
    marginTop: "20%",
    width: "100%",
    flexDirection: "column",
    rowGap: 30,
    padding: 10,
  },
  title: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 5,
  },
  currentCardText: {
    fontFamily: font.Montserrat.medium,
    fontSize: 26,
    textAlign: "center",
  },
});
