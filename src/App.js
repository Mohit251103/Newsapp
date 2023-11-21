import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Helmet } from 'react-helmet';
import LoadingBar from 'react-top-loading-bar';


const App = () => {

  const apikey = process.env.REACT_APP_API_KEY

  const [mode, setMode] = useState('light')
  const [btnText, setBtnText] = useState('Enable DarkMode')
  const [text, setText] = useState('dark')
  const [bodyStyle, setBodyStyle] = useState({})
  const [style, setStyle] = useState({})

  const handleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      setBtnText('Enable LightMode')
      setText('light')
      setStyle({
        color: 'white',
        background: 'black',
        border: '2px solid white'
      })
      setBodyStyle({
        style: `background-color : black;color: white`
      })
    }
    else {
      setMode('light')
      setBtnText('Enable DarkMode')
      setText('dark')
      setStyle({
        color: 'black',
        background: 'white'
      })
      setBodyStyle({
        style: `background-color : white;color: black`
      })
    }
  }

  const [progress, setProgress] = useState(0)

  return (
    <>
      <Router basename='/newsapp'>
        <Helmet bodyAttributes={bodyStyle} />
        <Navbar handleMode={handleMode} btnText={btnText} mode={mode} text={text} />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/newsapp" element={<News apikey={apikey} setProgress={setProgress} key="general" country="in" category="general" style={style} text={text} />}></Route>
          <Route exact path="/business" element={<News apikey={apikey} setProgress={setProgress} key="business" country="in" category="business" style={style} text={text} />}></Route>
          <Route exact path="/entertainment" element={<News apikey={apikey} setProgress={setProgress} key="entertainment" country="in" category="entertainment" style={style} text={text} />}></Route>
          <Route exact path="/health" element={<News apikey={apikey} setProgress={setProgress} key="health" country="in" category="health" style={style} text={text} />}></Route>
          <Route exact path="/science" element={<News apikey={apikey} setProgress={setProgress} key="science" country="in" category="science" style={style} text={text} />}></Route>
          <Route exact path="/sports" element={<News apikey={apikey} setProgress={setProgress} key="sports" country="in" category="sports" style={style} text={text} />}></Route>
          <Route exact path="/technology" element={<News apikey={apikey} setProgress={setProgress} key="technology" country="in" category="technology" style={style} text={text} />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
