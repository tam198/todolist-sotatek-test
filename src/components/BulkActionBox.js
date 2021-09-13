import React from "react";

function BulkActionBox(props) {
  const { dataList, onRemoveMulTask } = props;

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
