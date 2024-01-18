import { useState } from "react";

export default function App(){
  
  const [items, setItems] = useState([]);

  const handleItem = (item) => {
    setItems((items)=> [...items, item]);
  }

  const deleteItem = (id) => {
    console.log(id)
    setItems(items=>items.filter(item=>item.id !== id))
  }

  const toggleItem = (id) => {
    setItems(items => items.map(item => item.id === id ? {...item,packed: !item.packed} : item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItem} />
      <PackingList items={items} onDeleteItem={deleteItem} toggleitem={toggleItem} />
      <Stats items={items} />
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
const PackingList = ({items,onDeleteItem,toggleitem}) =>{
  return(
    <div className="list">
      <ul>
        {items.map((e) => <Item item={e} onDeleteItem={onDeleteItem} toggleitem={toggleitem} key={e.id} />)}
      </ul>
    </div>
  )
}

const Item = ({item,onDeleteItem,toggleitem}) => {
  return (
    <li>
      <input type="checkbox" value={item.checked} onChange={()=>toggleitem(item.id)} />
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>{item.quantity} {item.description}</span>
      <button onClick={()=>onDeleteItem(item.id)}>❌</button>
    </li>
  )
}
const Stats = ({items}) => {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100)
  if(!items.length)
    return(
      <footer className="stats"><em>Start adding some times to your packing lists!</em></footer>
    )
  return(
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You got everything! Rrady to go' : `You have ${numItems} times on your list, and you already packed ${numPacked} (${percentage}%)`}
        </em>
    </footer>
  )
}