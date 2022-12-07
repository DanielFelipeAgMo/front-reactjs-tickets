import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../helpers/APIInvoke.js';
import { Link } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/Mensajes.js';

const TicketsAdmin = () => {

    const [arregloTickets, setArregloTickets] = useState([]);

    const listadoTickets = async () => {
        const response = await APIInvoke.invokeGET(`/api/tickets`);
        setArregloTickets(response);
        //console.log(response)
    }

    useEffect(() => {
        listadoTickets();
    }, []);

    const borrar = async (e, id) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/categorias/${id}`);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            listadoTickets();
        } else {
            mensajeConfirmacion('error', response.msg);
        }
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <ContentHeader
                titulo={"Tickets"}
                breadCrumb1={"Tickets"}
                breadCrumb2={"Listado Tickets"}
                breadCrumb3={""}
                ruta={"/tickets-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listado Tickets</h5>
                                <div className='row mb-3'>
                                    <div className='col-lg-12'>
                                        <Link to={"/tickets-crear"} className='btn btn-primary'>Crear</Link>
                                    </div>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%', textAlign: 'center' }}>Nro Ticket</th>
                                            <th style={{ width: '25%', textAlign: 'center' }}>Cliente</th>
                                            <th style={{ width: '5%', textAlign: 'center' }}>Fecha</th>
                                            <th style={{ width: '5%', textAlign: 'center' }}>Hora</th>
                                            <th style={{ width: '30%', textAlign: 'center' }}>Categoria</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Estado</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arregloTickets.map(
                                                elemento =>
                                                    <tr key={elemento._id}>
                                                        <td style={{ textAlign: 'center' }}>{elemento._id}</td>
                                                        <td>{elemento.idCliente.nombresUsuario}</td>
                                                        <td>{elemento.fechaTicket}</td>
                                                        <td>{elemento.horaTicket}</td>
                                                        <td>{elemento.idCategoria.nombreCategoria}</td>
                                                        <td>{elemento.estadoTicket}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <Link to={`/categorias-editar/${elemento._id}`} className="btn btn-primary btn-sm">
                                                                <i className="bi bi-pencil-square" title="Editar"></i>
                                                            </Link>&nbsp;
                                                            <button onClick={(e) => borrar(e, elemento._id)} className="btn btn-danger btn-sm">
                                                                <i className="bi bi-trash-fill" title="Borrar"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default TicketsAdmin;