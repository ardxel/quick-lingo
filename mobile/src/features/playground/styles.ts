import { color, font } from "shared/vars";
import { StyleSheet } from "react-native";

export const header = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    height: 100,
  },
  buttonReload: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderWidth: 3,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: color.whitesmoke,
  },
  counter: {},
  counterParagraph: {
    fontFamily: font.Montserrat.medium,
    fontSize: 30,
  },
});

export const answer = StyleSheet.create({
  displayAnswer: {
    height: "55%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: color.chocolate,
    position: "relative",
    overflow: "hidden",
  },
  translatedText: {
    textAlign: "left",
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
  helpMenu: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  helpButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    backgroundColor: color.burlywood,
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    borderRadius: 10,
    height: 40,
    margin: 4,
    elevation: 10,
  },
  helpButtonText: {
    fontFamily: font.Montserrat.regular,
    fontSize: 18,
  },
});
