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

  totalCard: {
    alignSelf: "center",
    backgroundColor: "#EEEEEE",
    Width: 140,
    minWidth: 140,
    maxWidth: "40%",
    margin: 10,
    borderRadius: 3,
    fontSize: 14,
    fontWeight: "bold",
    padding: 2,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 50,
    overflow: "hidden",
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
    marginBottom: 10,
  },

  totalWeight: {
    backgroundColor: "#EEEEEE",
    width: 320,
    maxWidth: "80%",
    margin: 2,
    borderRadius: 3,
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
