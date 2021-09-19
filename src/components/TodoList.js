import React, { useEffect, useState } from "react";
import Form from "./Form";
import BulkActionBox from "./BulkActionBox";
import SearchField from "./SearchField";

const getRandomId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

function TodoList() {
  const [selectedId, setSelectedId] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    const dataList = JSON.parse(localStorage.getItem("todoList")) || [];
    setTodoList(dataList);
  }

  const handleUpdateDataList = (data) => {
    let tasks = JSON.parse(localStorage.getItem("todoList")) || [];

    if (!data.id) {
      const obj = {
        ...data,
        id: getRandomId(),
      };
      tasks.unshift(obj);
    } else {
      const newArr = todoList.map((item) => {
        if (item.id === data.id) {
          return {
            ...data,
            id: data.id,
            name: data.name,
            description: data.description,
            dateTime: data.dateTime,
            priority: data.priority,
          };
        } else {
          return item;
        }
      });
      tasks = [...newArr];
    }

    tasks.sort((a, b) => {
      return new Date(a.dateTime) - new Date(b.dateTime);
    });

    localStorage.setItem("todoList", JSON.stringify(tasks));
    getData();
    setSelectedTask(null);
    setSelectedId(0);
  };

  const handleSearch = (keyword) => {
    if (keyword.trim()) {
      const dataList = JSON.parse(localStorage.getItem("todoList")) || [];
      const tasks = dataList.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      setTodoList(tasks);
    } else {
      getData();
    }
  };

  const handleUpdateTask = (data) => {
    setSelectedTask({
      ...data,
    });
    setSelectedId(data.id === selectedId ? 0 : data.id);
  };

  const handleRemoveTask = (id) => {
    const dataList = JSON.parse(localStorage.getItem("todoList"));
    const tasks = dataList.filter((item) => item.id !== id);
    localStorage.setItem("todoList", JSON.stringify(tasks));
    setTodoList(tasks);
  };

  const handleRemoveMulTask = () => {
    const dataList = JSON.parse(localStorage.getItem("todoList"));
    const newArr = [...todoList];
    const selectedItems = newArr
      .filter((item) => item.isCheck)
      .map((item) => item.id);
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedItems.length} công việc`
      )
    ) {
      const result = dataList.filter(
        (item) => !selectedItems.includes(item.id)
      );

      console.log(result);

      localStorage.setItem("todoList", JSON.stringify(result));
      setTodoList(result);
    }
  };

  const handleChangeCheckbox = (data) => {
    let arr = [...todoList];
    const convertedArr = arr.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          isCheck: !data.isCheck,
        };
      } else {
        return item;
      }
    });

    setTodoList(convertedArr);
  };

  return (
    <>
      <div className="container">
        <div className="flex_box">
          <div className="flex_items">
            <div className="pd-25px">
              <div className="form-data">
                <h2 className="text-center">Add to task</h2>
                <Form onSuccess={(data) => handleUpdateDataList(data)} />
              </div>
            </div>
          </div>
          <div className="flex_items table">
            <div className="pd-25px mb-2rem">
              <h2 className="text-center" style={{ marginTop: "2rem" }}>
                To do List
              </h2>
              <SearchField onSearch={(keyword) => handleSearch(keyword)} />
              <div>
                {todoList?.length > 0 ? (
                  todoList.map((item, index) => {
                    return (
                      <div className="box" key={item.id}>
                        <div
                          className="row item-task"
                          style={{
                            borderBottom: `${
                              selectedId === item.id ? "1px solid #000" : "none"
                            }`,
                          }}
                        >
                          <div className="mt-10">
                            <input
                              type="checkbox"
                              checked={item.isCheck}
                              onChange={() => handleChangeCheckbox(item)}
                            />
                          </div>
                          <div className="mt-10">{item.name}</div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => handleUpdateTask(item)}
                            >
                              Detail
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleRemoveTask(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        {selectedId === item.id && (
                          <div
                            className="form-data"
                            style={{ padding: "20px" }}
                          >
                            <Form
                              onSuccess={(data) => handleUpdateDataList(data)}
                              selectedTask={selectedTask}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <div className="text-center mt-21vh">Chưa có dữ liệu</div>
                  </div>
                )}
              </div>
            </div>
            <BulkActionBox
              onRemoveMulTask={() => handleRemoveMulTask()}
              dataList={todoList}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
