import { useState } from "react";

export default function App(){
  
  const [items, setItems] = useState([]);
  
  const handleItem = (item) => {
    setItems((items)=> [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItem} />
      <PackingList items={items} />
      <Stats />
    </div>
  )
}
const Logo = () => {
  return (<h1>Far Away</h1>)
}
const Form = ({onAddItems}) => {

  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!description) return;
    const newItem = {description,quantity,packed:false, id: Date.now()};
    console.log(newItem);
    onAddItems(newItem);
    setDescription('')
    setQuantity(1)
  }

  return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {Array.from({length:20}, (_,i) => i + 1).map(num=><option value={num} key={num}>{num}</option>)}
        </select>
        <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
        <button>Add</button>
      </form>
  )
}
const PackingList = ({items}) =>{
  return(
    <div className="list">
      <ul>
        {items.map((e) => <Item item={e} key={e.id} />)}
      </ul>
    </div>
  )
}

const Item = ({item}) => {
  return (
    <li>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>{item.id} {item.description}</span>
      <button>❌</button>
    </li>
  )
}
const Stats = () => {
  return(
    <footer className="stats">
      <em>aYou have x times on your list, and you already packed X (X%)</em>
    </footer>
  )
}