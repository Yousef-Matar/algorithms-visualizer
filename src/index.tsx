import React from "react";
import ReactDOM from "react-dom/client";
import AlgorithmVisualizer from "./components/AlgorithmVisualizer/AlgorithmVisualizer";
import "./index.css";
const App = () => {
	return <AlgorithmVisualizer />;
};
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<App />);
