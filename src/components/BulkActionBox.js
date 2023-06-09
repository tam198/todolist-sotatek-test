import React, { useState } from "react";

function BulkActionBox(props) {
  const { dataList, onRemoveMulTask } = props;

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(0);

  return (
    <>
      {dataList.filter((item) => item.isCheck).length > 0 && (
        <div className="footer">
          <div className="container">
            <div className="row">
              <p>Bulk Action</p>
              <div>
                <button type="button" className="btn btn-success">
                  Done
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onRemoveMulTask()}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default BulkActionBox;
