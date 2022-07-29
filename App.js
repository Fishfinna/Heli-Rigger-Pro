import * as React from "react";
import MainController from "./routes/MainController";

export default function App() {
  try {
    return <MainController />;
  } catch {
    return <MainController />;
  }
}
