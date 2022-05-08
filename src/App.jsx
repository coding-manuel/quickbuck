import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Layout from './layout'
import {changeFavicon} from './utils/faviconChange'


function App() {
  setInterval(() => {
    changeFavicon()
  }, 1000);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default App
