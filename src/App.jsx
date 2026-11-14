import { useState } from "react";

function App() {
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState(1);

  const [shoppingList, setShoppingList] = useState([
    { name: "牛乳", qty: 1 },
    { name: "卵", qty: 1 },
  ]);

  const [stockList, setStockList] = useState([
    { name: "卵", qty: 6 },
    { name: "牛乳", qty: 1 },
  ]);

  const addShoppingItem = () => {
    if (!itemName.trim()) {
      alert("商品名を入力してください");
      return;
    }

    if (
      !Number.isInteger(itemQty) ||
      itemQty <= 0
    ) {
      alert("数量は1以上の整数を入力してください");
      return;
    }

    setShoppingList([
      ...shoppingList,
      {
        name: itemName.trim(),
        qty: itemQty,
      },
    ]);

    setItemName("");
    setItemQty(1);
  };

  const buyItem = (index) => {
    const item = shoppingList[index];

    const stockIndex = stockList.findIndex(
      (stock) => stock.name === item.name
    );

    if (stockIndex >= 0) {
      const newStock = [...stockList];

      newStock[stockIndex].qty += item.qty;

      setStockList(newStock);
    } else {
      setStockList([
        ...stockList,
        {
          name: item.name,
          qty: item.qty,
        },
      ]);
    }

    setShoppingList(
      shoppingList.filter(
        (_, i) => i !== index
      )
    );
  };

  const increaseStock = (index) => {
    const newStock = [...stockList];

    newStock[index].qty += 1;

    setStockList(newStock);
  };

  const decreaseStock = (index) => {
    const newStock = [...stockList];

    if (newStock[index].qty > 0) {
      newStock[index].qty -= 1;
    }

    setStockList(newStock);
  };

  const deleteStock = (index) => {
    setStockList(
      stockList.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div>
      <h1>うちの冷蔵庫</h1>

      <hr />

      <h2>🛒 買い物リスト</h2>

      <input
        type="text"
        placeholder="商品名"
        value={itemName}
        onChange={(e) =>
          setItemName(e.target.value)
        }
      />

      <input
        type="number"
        min="1"
        step="1"
        placeholder="数量"
        value={itemQty}
        onChange={(e) =>
          setItemQty(Number(e.target.value))
        }
        style={{ marginLeft: "5px" }}
      />

      <button
        style={{ marginLeft: "5px" }}
        onClick={addShoppingItem}
      >
        追加
      </button>

      <ul>
        {shoppingList.map((item, index) => (
          <li key={index}>
            {item.name} × {item.qty}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() =>
                buyItem(index)
              }
            >
              購入
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>🧊 在庫</h2>

      <ul>
        {stockList.map((stock, index) => (
          <li key={index}>
            {stock.name} × {stock.qty}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() =>
                increaseStock(index)
              }
            >
              ＋
            </button>

            <button
              style={{ marginLeft: "5px" }}
              onClick={() =>
                decreaseStock(index)
              }
            >
              －
            </button>

            <button
              style={{ marginLeft: "5px" }}
              onClick={() =>
                deleteStock(index)
              }
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;