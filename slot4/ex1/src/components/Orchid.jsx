import { useState } from "react";
import Container from "react-bootstrap/Container";
import ConfirmModal from "./ConfirmModal";
import ListOfOrchids from "./ListOfOrchids";
function Orchid({ orchidList }) {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };
  const handleConfirm = () => {
    console.log("Đã xác nhận: ", selectedOrchid?.orchidName);
    setShow(false);
  };
  return (
    <div>
      <Container className="py-5">
        <ListOfOrchids orchidList={orchidList} onShowModal={handleShow} />
        {selectedOrchid && (
          <ConfirmModal
            show={show}
            handleClose={handleClose}
            title={selectedOrchid.orchidName}
            onConfirm={handleConfirm}
            body={
              <div>
                <img
                  src={selectedOrchid.image}
                  alt={selectedOrchid.orchidName}
                  className="img-fluid mb-3 rounded"
                  style={{ width: "100%" }}
                />
                <p>
                  <strong>Description:</strong> {selectedOrchid.description}
                </p>
                <p>
                  <strong>Category:</strong> {selectedOrchid.category}
                </p>
                <p>
                  <strong>Price:</strong> ${selectedOrchid.price || 0}
                </p>
                {selectedOrchid.isSpecial && (
                  <p className="text-danger fw-bold">★ Special Item</p>
                )}
              </div>
            }
          />
        )}
      </Container>
    </div>
  );
}

export default Orchid;
