import React from "react";
import Modal from "react-modal";

const ConfirmModal = (props) => (
  <Modal
    isOpen={props.modalIsOpen}
    contentLabel="Confirm"
    className="modal"
  >
    <h3 className="modal__title">Are you sure you want to remove this {props.type}?</h3> 
    <button className="button button--modal" onClick={props.onCloseModal}>Cancel</button>
    <button className="button button--modal" onClick={props.onRemove}>Remove</button>
  </Modal>
);

export default ConfirmModal;