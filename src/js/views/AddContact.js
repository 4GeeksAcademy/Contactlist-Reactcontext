import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [newContact, setNewContact] = useState({
    full_name: "",
    email: "",
    agenda_slug: "", // Esta será la agenda seleccionada
    address: "",
    phone: ""
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = e => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Llama a la acción para crear un nuevo contacto utilizando newContact
    actions.createContact(newContact);
    setShowModal(true); // Abre el modal después de crear el contacto
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1>Añadir Nuevo Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">
            Nombre Completo
          </label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            name="full_name"
            value={newContact.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={newContact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="agenda_slug" className="form-label">
            Selecciona una Agenda
          </label>
          <select
            className="form-select"
            id="agenda_slug"
            name="agenda_slug"
            value={newContact.agenda_slug}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una Agenda</option>
            {store.agendas.map(agendaSlug => (
              <option key={agendaSlug} value={agendaSlug}>
                {agendaSlug}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={newContact.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={newContact.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Contacto
        </button>
      </form>
      <Link to="/">
        <button className="btn btn-secondary mt-3">Volver a la página principal</button>
      </Link>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡Su contacto ha sido creado con éxito!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { AddContact };