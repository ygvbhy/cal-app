import "./App.css";
import { useState, useEffect } from "react";
import iziToast from "izitoast";
import "./assets/izitoast.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log(123);

    const price = expenses.reduce((acc, cur) => (acc += +cur.price), 0);
    setTotalPrice(price);
  }, [expenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      id: new Date(),
      title,
      price,
    };

    setExpenses((prev) => [...prev, newExpense]);
    setTitle("");
    setPrice("");
    iziToast.success({
      position: "bottomRight",
      title: "추가에 성공했습니다.",
      displayMode: 2,
      timeout: 2000,
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleRemoveAll = () => {
    setExpenses([]);
    iziToast.error({
      position: "bottomRight",
      title: "삭제에 성공 했습니다.",
      displayMode: 2,
      timeout: 2000,
    });
  };

  const handleRemove = (id) => {
    const newList = expenses.filter((data) => data.id !== id);
    setExpenses(newList);
  };

  return (
    <div className="m-5">
      <div className="relative w-full h-full py-40 min-h-screen">
        <h1 className="text-4xl mb-3 font-bold">예산 계산기</h1>
        <div className="bg-white rounded p-4">
          <Form
            title={title}
            price={price}
            handleAddExpense={handleAddExpense}
            handleTitleChange={handleTitleChange}
            handlePriceChange={handlePriceChange}
          />
          <div className="mt-3">
            <div>
              <Lists
                setExpenses={setExpenses}
                expenses={expenses}
                handleRemove={handleRemove}
              />
            </div>
            <div>
              <button
                onClick={handleRemoveAll}
                className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
              >
                모두 삭제
              </button>
              <div className="float-right text-3xl">
                총 지출 :{totalPrice}원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
