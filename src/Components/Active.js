import React, { useContext } from 'react';
import { Context } from '../App';
const Active = () => {
    const { data, setData, value } = useContext(Context);
    const active = data.filter((data) => {
        return data.completed === false;
    })
    const completedItem = (id) => {
        setData(data.map((data) => {
            return data.id === id ? {
                ...data, completed: !data.completed
            } : data;
        }))
    }
    const removeItem = (id) => {
        setData(data.filter((data) => {
            return data.id !== id;
        }))
    }
    const filtered = active.filter((data) => {
        return data.word.toLowerCase().includes(value.toLowerCase().trim());
    })
    return (
        <section className="active">
            <h1>Active: {active.length < 10 ? "0" + active.length : active.length}</h1>
            <p style={{ display: filtered.length > 0 ? "none" : "block", padding: "0.5em 0", fontSize: "16px", color: "#ff0000", opacity: active.length > 0 ? "1" : "0" }}>Your search "{value}" has not found!</p>
            <div className="data">
                {
                    filtered.map((data) => {
                        return (
                            <div className="item" style={{ borderLeft: data.completed ? "0.2em solid #57cc99" : "" }}>
                                <h3>{data.word.length > 25 ? data.word.slice(0, 25) + "..." : data.word}</h3>
                                <p>{data.translation.length > 30 ? data.translation.slice(0, 30) + "..." : data.translation}</p>
                                <button onClick={() => {
                                    alert(`Word: ${data.word}\n\nTranslation: ${data.translation}`)
                                }}>Read More</button>
                                <div className="todos">
                                    <button title="Completed" onClick={() => completedItem(data.id)}>✔️</button>
                                    <button title="Remove" onClick={() => removeItem(data.id)}>🗑️</button>
                                </div>
                                <i>Date: {new Date(data.id).toString().slice(0, 15)}</i>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}
export default Active;
