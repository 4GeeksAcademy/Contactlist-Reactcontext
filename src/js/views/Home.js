import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Cargar las agendas cuando el componente se monta
        actions.loadAgendas();
    }, [actions]);

    return (
        <Container>
            <Row className="justify-content-center align-items-center">
                <h1 className="display-4 text-center">Agendas Disponibles:</h1>
                {store.agendas.map(agendaSlug => (
                    <Col key={agendaSlug} sm={6} md={4} lg={3} className="mb-4">
                        <Card>
                            <Card.Body className="text-center">
                                <Link to={`/agenda/${agendaSlug}`} className="custom-link fw-bold fs-4 text-center">{agendaSlug}</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export { Home };