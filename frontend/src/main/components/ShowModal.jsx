import React, { useState } from "react";

const ShowModal = () => {
  const [openModal, setOpenModal] = useState({ show: false, image: null });

  return (
    <>
      {openModal.show && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setOpenModal({ show: false, image: null })}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <img
              src={openModal.image}
              alt="Modal"
              className="max-w-full max-h-[80vh] rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowModal;
