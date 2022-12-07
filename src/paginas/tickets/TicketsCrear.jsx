import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../helpers/APIInvoke.js';
import { useNavigate } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/Mensajes.js';
import Form from 'react-bootstrap/Form';
import dominios from '../../helpers/dominios.js';

const TicketsCrear = () => {
    //parte dinamica

    const navigate = useNavigate();

    const [ticket, setTicket] = useState({
        categoria: '-8',
        cliente: localStorage.getItem("iduser"),
        hora: '',
        fecha: '',
        asunto: '',
        descripcion: '',
        numero: '',
        correo: '',
        estado: dominios.ESTADO_TICKET_ABIERTO
    });

    const { categoria, asunto, descripcion, correo } = ticket;

    const [arregloCategorias, setArregloCategorias] = useState([]);

    const comboCategorias = async () => {
        const response = await APIInvoke.invokeGET(`/api/categorias`);
        setArregloCategorias(response);
    }

    const onChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        comboCategorias();
        document.getElementById('categoria').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        //crear();
    }

    /*const crear = async () => {
        const body = {
            nombreCategoria: categoria.nombre
        }

        const response = await APIInvoke.invokePOST(`/api/categorias`, body);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            navigate("/categorias-admin");
        } else {
            mensajeConfirmacion('error', response.msg);
        }
        setCategoria({
            nombre: ''
        });
    }*/

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <ContentHeader
                titulo={"Tickets"}
                breadCrumb1={"Tickets"}
                breadCrumb2={"Listado Tickets"}
                breadCrumb3={"Crear Tickets"}
                ruta={"/tickets-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <h5 className="card-title">Crear Ticket</h5>

                                    <div className="row mb-3">
                                        <label htmlFor="categoria" className="col-sm-2 col-form-label">Seleccione una categoria</label>
                                        <div className="col-sm-10">
                                            <Form.Select aria-label="Default select example"
                                                style={{ cursor: 'pointer' }}
                                                id="categoria"
                                                name="categoria"
                                                value={categoria}
                                                onChange={onChange}
                                            >
                                                <option value="-8">Seleccione</option>
                                                {
                                                    arregloCategorias.map(
                                                        opcion =>
                                                            <option value={opcion._id}>{opcion.nombreCategoria}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="correo" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email"
                                                className="form-control"
                                                id="correo"
                                                name="correo"
                                                value={correo}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="asunto" className="col-sm-2 col-form-label">Asunto</label>
                                        <div className="col-sm-10">
                                            <input type="text"
                                                className="form-control"
                                                id="asunto"
                                                name="asunto"
                                                value={asunto}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="descripcion" className="col-sm-2 col-form-label">Descripción</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                className="form-control"
                                                id="descripcion"
                                                name="descripcion"
                                                value={descripcion}
                                                onChange={onChange}
                                                rows='10'
                                                required
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                    <button type="reset" className="btn btn-default float-right">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default TicketsCrear;