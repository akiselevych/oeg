//libs
import ReactDOM from "react-dom/client"
import App from "components/App/App"
import { Provider } from "react-redux"
import setupLocatorUI from "@locator/runtime"
//redux
import { store } from "reduxFolder/store"
// Styles
import "./styles/index.scss"
import { BrowserRouter as Router } from "react-router-dom"

if (process.env.NODE_ENV === "development") {
  setupLocatorUI()
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
