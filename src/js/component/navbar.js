import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const [newAgendaName, setNewAgendaName] = useState("");

    const handleCreateAgenda = () => {
        actions.createAgenda(newAgendaName);
        setNewAgendaName(""); // Limpia el campo de texto después de crear la agenda
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <span className="navbar-brand mb-0 fs-3 ms-5">Free Agendas!</span>
            </Link>
            <div className="d-flex gap-3 ms-auto w-50">
                <Link to="/add-contact">
                    <button className="btn btn-primary">Agregar Nuevo Contacto</button>
                </Link>
                <input
                    type="text"
                    className="form-control"
					style={{ width: "40%" }} 
                    placeholder="Nombre de la nueva agenda"
                    value={newAgendaName}
                    onChange={(e) => setNewAgendaName(e.target.value)}
                />
                <button
                    className="btn btn-success"
                    onClick={handleCreateAgenda}
                >
                    Crear Nueva Agenda
                </button>
            </div>
        </nav>
    );
};
