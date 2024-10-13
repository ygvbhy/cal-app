import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
const Lists = ({ expenses, handleRemove, setExpenses }) => {
  const handleEnd = (result) => {
    if (!result.destination) return;

    const newExpenses = expenses;

    const [reorderedItem] = newExpenses.splice(result.source.index, 1);

    newExpenses.splice(result.destination.index, 0, reorderedItem);
    setExpenses(newExpenses);
    localStorage.setItem(
      "todoData",
      JSON.stringify([...expenses, newExpenses])
    );
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="expenses">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {expenses.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <List
                      provided={provided}
                      index={index}
                      data={data}
                      id={data.id.toString()}
                      handleRemove={handleRemove}
                      expenses={expenses}
                      setExpenses={setExpenses}
                    />
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

Lists.propTypes = {
  expenses: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,
};

export default Lists;
