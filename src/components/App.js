import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  const handleItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const deleteItem = (id) => {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClear = () => {
    const confirmed = window.confirm("Are you sure to delete all items?");
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItem} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        toggleitem={toggleItem}
        onClearList={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}
