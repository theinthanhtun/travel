export const Item = ({ item, onDeleteItem, toggleitem }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.checked}
        onChange={() => toggleitem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};
