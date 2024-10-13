import iziToast from "izitoast";
import PropTypes from "prop-types";
import { useState } from "react";

const List = ({
  provided,
  index,
  data,
  handleRemove,
  expenses,
  id,
  setExpenses,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(data.title);
  const [editingPrice, setEditingPrice] = useState(data.price);

  const handleChangeTitle = (e) => {
    console.log(e.target.value);

    setEditingTitle(e.target.value);
  };
  const handleChangePrice = (e) => {
    setEditingPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpenses = expenses.map((item) => {
      if (item.id.toString() === id) {
        item.title = editingTitle;
        item.price = editingPrice;
      }
      return item;
    });

    setExpenses(newExpenses);
    // setEditingTitle("");
    // setEditingPrice("");
    setIsEditing(false);
    iziToast.info({
      position: "bottomRight",
      title: "수정되었습니다.",
      displayMode: 2,
      timeout: 2000,
    });
  };

  if (isEditing) {
    return (
      <div
        className="flex justify-between rounded border-2 border-gray-100 p-2 mb-3"
        key={index}
      >
        <form action="handleSubmit">
          <div className="flex">
            <input
              type="text"
              value={editingTitle}
              className="px-3 py-2 mr-4 text-gray-500 rounded"
              onChange={handleChangeTitle}
            />
            <input
              type="number"
              value={editingPrice}
              onChange={handleChangePrice}
              className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
            />
          </div>
        </form>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            완료
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            취소
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className="flex justify-between rounded border-2 border-gray-100 p-2 mb-3"
        key={index}
      >
        <div className="flex justify-center items-center">{data.title}</div>
        <div className="flex justify-center items-center">{data.price}</div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
          <button
            type="button"
            onClick={() => handleRemove(data.id)}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            삭제
          </button>
        </div>
      </div>
    );
};

List.propTypes = {
  provided: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  setExpenses: PropTypes.func.isRequired,
};

export default List;
