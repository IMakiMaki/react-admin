import React from "react";
import "./App.css";
import { Loading } from "./components/Loading";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<Loading>页面加载中...</Loading>}>
        <Routes />
      </React.Suspense>
    </div>
  );
}

export default App;
