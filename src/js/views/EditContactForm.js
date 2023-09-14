import React, { useState } from "react";

const EditContactForm = ({ contact, cancelEdit, updateContacts }) => {
  const [editedContact, setEditedContact] = useState(contact);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedContact({
      ...editedContact,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Llama a la función para editar el contacto
    await updateContact(editedContact);

    // Cancela la edición
    cancelEdit();
  };

  const updateContact = async updatedContact => {
    try {
      const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${updatedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (response.ok) {
        // Si la actualización fue exitosa, actualiza el estado local
        updateContacts(prevContacts =>
          prevContacts.map(contact =>
            contact.id === updatedContact.id ? updatedContact : contact
          )
        );
      } else {
        console.error('Error al editar el contacto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al editar el contacto:', error);
    }
  };

  return (
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
          value={editedContact.full_name}
          onChange={handleInputChange}
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
          value={editedContact.email}
          onChange={handleInputChange}
          required
        />
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
          value={editedContact.address}
          onChange={handleInputChange}
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
          value={editedContact.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Guardar Cambios
      </button>
      <button type="button" className="btn btn-secondary ml-2" onClick={cancelEdit}>
        Cancelar
      </button>
    </form>
  );
};

export { EditContactForm };