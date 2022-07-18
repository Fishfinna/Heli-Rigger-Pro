import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  forms: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  input: {
    margin: 10,
    borderWidth: 1,
    minWidth: 100,
    maxWidth: 100,
    borderColor: "#CCCCCC",
    padding: 10,
    fontSize: 18,
    overflow: "scroll",
  },

  inputField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    fontSize: 24,
    color: "#FFFFFF",
    backgroundColor: "#F78D6C",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  card: {
    backgroundColor: "#f9f4f4",
    padding: 10,
    borderRadius: 30,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  numCard: {
    padding: 10,
    backgroundColor: "#f9f4f4",
    borderRadius: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "45%",
    marginTop: 10,
    height: 100,
    paddingTop: 25,
  },

  subscript: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  cancel: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 35,
  },

  cancelText: {
    color: "#434A5D",
    fontSize: 20,
  },

  title: {
    display: "flex",
    textAlign: "center",
    flexDirection: "row",
    color: "#434A5D",
    fontSize: 20,
    textTransform: "uppercase",
    margin: 10,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#434A5D",
    fontSize: 17,
    textAlign: "center",
  },
  densityBody: {
    padding: 20,
    paddingTop: 30,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lineSeparator: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    width: 300,
    alignSelf: "center",
    margin: 15,
    backgroundColor: "#CCCCCC",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 10,
    width: "100%",
  },
  convertSelection: {
    display: "flex",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: "15%",
    paddingVertical: "10%",
    backgroundColor: "#333A4D",
    borderRadius: 5,
  },
});
