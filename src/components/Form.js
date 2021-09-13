import React, { useState, useEffect } from "react";
import moment from "moment";

function Form(props) {
  const { selectedTask, onSuccess } = props;

  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    description: "",
    dateTime: moment(new Date()).format("YYYY-MM-DD"),
    priority: 1,
  });

  useEffect(() => {
    if (selectedTask) {
      setFormValue({
        ...selectedTask,
        id: selectedTask.id,
        name: selectedTask.name,
        description: selectedTask.description,
        dateTime: selectedTask.dateTime,
        priority: selectedTask.priority,
      });
    }
  }, [selectedTask]);

  const onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!formValue.name) {
      alert("Vui lòng nhập tên công việc!");
    } else {
      // if (!selectedTask) {
      formValue.isCheck = false;
      // }
      onSuccess(formValue);
      setFormValue({
        id: "",
        name: "",
        description: "",
        dateTime: moment(new Date()).format("YYYY-MM-DD"),
        priority: 1,
      });
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <input
          type="text"
          className="form-control"
          name="name"
          onChange={(e) => onChange(e)}
          value={formValue.name}
          placeholder="Add new Task"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          rows={12}
          placeholder="Description"
          cols="50"
          value={formValue.description}
          onChange={(e) => onChange(e)}
        ></textarea>
      </div>

      <div className="row">
        <div className="col-6">
          <label>Due Date</label>
          <input
            className="form-control"
            type="date"
            id="dateTime"
            name="dateTime"
            value={formValue.dateTime}
            min={moment(new Date()).format("YYYY-MM-DD")}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="col-6">
          <label>Priority</label>
          <select
            className="form-select"
            name="priority"
            onChange={(e) => onChange(e)}
            value={formValue.priority}
          >
            <option value={0}>Low</option>
            <option value={1}>Normal</option>
            <option value={2}>High</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-success btn-form w-100">
        {selectedTask ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default Form;
