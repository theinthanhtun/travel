export const Stats = ({ items }) => {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some times to your packing lists!</em>
      </footer>
    );
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Rrady to go"
          : `You have ${numItems} times on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
};
