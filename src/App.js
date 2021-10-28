import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import All from './Components/All';
import Active from './Components/Active';
import Completed from './Components/Completed';
export const Context = createContext(null);
const local = () => {
  const stored = localStorage.getItem("data");
  if (stored) {
    return JSON.parse(stored);
  }
  else {
    return [];
  }
}
const App = () => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [data, setData] = useState(local());
  const [value, setValue] = useState("");
  const len = data.length < 10 ? "0" + data.length : data.length;
  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, {
      id: Date.now(),
      word: word,
      translation: translation,
      completed: false
    }
    ]);
    setWord("");
    setTranslation("");
  }
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState(data.map((data) => data.word));
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("");
  const [trans, setTrans] = useState(data.map((data) => data.translation));
  const enterSubmit = (e) => {
    if (e.key === "Enter") {
      if (text === type[counter]) {
        setCounter(counter + 1);
        setText("");
        if (counter === type.length - 1) {
          alert("Typing Finished!");
          setToggle(!toggle);
        }
      }
    }
  }
  const count = counter + 1;
  return (
    <Router>
      <main>
        <header>
          <div className="logo">
            <h1>Any Words</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="word">
              <p>Insert Word</p>
              <input type="text" placeholder="Word..." value={word} onChange={e => setWord(e.target.value)} required />
            </div>
            <div className="translation">
              <p>Insert Translation</p>
              <textarea placeholder="Translation..." value={translation} onChange={e => setTranslation(e.target.value)} required></textarea>
            </div>
            <div className="btn">
              <button type="submit" title="Submit" style={{ boxShadow: "unset" }}>Submit</button>
            </div>
          </form>
        </header>
        <div className="err" style={{ display: data.length > 0 ? "none" : "flex" }}>
          <h3>Word Currently Empty!</h3>
          <p>Please insert Word and Translation.</p>
        </div>
        <section className="container" style={{ display: data.length > 0 ? "block" : "none" }}>
          <div className="search">
            <p>Words: {len}</p>
            <input type="text" placeholder="Search by word..." value={value} onChange={e => setValue(e.target.value)} />
          </div>
          <div className="filtered">
            <ul>
              <li><NavLink activeClassName="active" to="/" exact>All</NavLink></li>
              <li><NavLink activeClassName="active" to="/active" exact>Active</NavLink></li>
              <li><NavLink activeClassName="active" to="/completed" exact>Completed</NavLink></li>
            </ul>
          </div>
          <Switch>
            <Context.Provider value={{ data, setData, value }}>
              <Route path="/" exact component={All} />
              <Route path="/active" component={Active} />
              <Route path="/completed" component={Completed} />
            </Context.Provider>
          </Switch>
        </section>
        <div className="typing">
          <button onClick={() => {
            setToggle(!toggle)
            setCounter(0);
          }
          } style={{ display: data.length > 0 ? "block" : "none", boxShadow: "unset" }}>Go To Typing Words</button>
        </div>
        <section className="type" style={{ display: toggle ? "flex" : "none" }}>
          <div className="close">
            <button onClick={() => setToggle(!toggle)}>Close</button>
          </div>
          <h1>Words: {data.length < 10 ? "0" + data.length : data.length}</h1>
          <div className="infos">
            <p>⌨️: {type[counter]} / <span style={{ color: text === type[counter] ? "#57cc99" : "#ff0000" }}>{text}</span></p>
            <p>💡: {trans[counter]}</p>
          </div>
          <b>{count < 10 ? "0" + count : count} / {data.length < 10 ? "0" + data.length : data.length}</b>
          <input type="text" placeholder="Type word here..." onKeyPress={enterSubmit} value={text} onChange={e => setText(e.target.value)} />
          <i>Press "Enter" to Submit.</i>
        </section>
        <footer>
          <p>&copy; 2021 Any Words | made by <a href="https://github.com/Pagnavathcoding">Pagnavath</a>.</p>
        </footer>
      </main>
    </Router>
  )
}
export default App;