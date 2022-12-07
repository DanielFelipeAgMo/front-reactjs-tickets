import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../helpers/APIInvoke.js';
import { Link } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/Mensajes.js';

const CategoriasAdmin = () => {

    const [arregloCategorias, setArregloCategorias] = useState([]);

    const listadoCategorias = async () => {
        const response = await APIInvoke.invokeGET(`/api/categorias`);
        setArregloCategorias(response);
        //console.log(response)
    }

    useEffect(() => {
        listadoCategorias();
    }, []);

    const borrar = async (e, id) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/categorias/${id}`);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            listadoCategorias();
        } else {
            mensajeConfirmacion('error', response.msg);
        }
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <ContentHeader
                titulo={"Categorias"}
                breadCrumb1={"Tickets"}
                breadCrumb2={"Listado Categorias"}
                breadCrumb3={""}
                ruta={"/categorias-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listado Categorias</h5>
                                <div className='row mb-3'>
                                    <div className='col-lg-12'>
                                        <Link to={"/categorias-crear"} className='btn btn-primary'>Crear</Link>
                                    </div>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%', textAlign: 'center' }}>Id</th>
                                            <th style={{ width: '75%', textAlign: 'center' }}>Categoria</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arregloCategorias.map(
                                                elemento =>
                                                    <tr key={elemento._id}>
                                                        <td style={{ textAlign: 'center' }}>{elemento._id}</td>
                                                        <td>{elemento.nombreCategoria}</td>
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

export default CategoriasAdmin;