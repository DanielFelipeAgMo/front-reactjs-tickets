import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../helpers/APIInvoke.js';
import { Link } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/Mensajes.js';

const UsuariosAdmin = () => {

    const [arregloUsuarios, setArregloUsuarios] = useState([]);

    const listadoUsuarios = async () => {
        const response = await APIInvoke.invokeGET(`/api/usuarios`);
        setArregloUsuarios(response);
        //console.log(response)
    }

    useEffect(() => {
        listadoUsuarios();
    }, []);

    const borrar = async (e, id) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/usuarios/${id}`);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            listadoUsuarios();
        } else {
            mensajeConfirmacion('error', response.msg);
        }
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <ContentHeader
                titulo={"Usuarios"}
                breadCrumb1={"Configuración"}
                breadCrumb2={"Listado Usuarios"}
                breadCrumb3={""}
                ruta={"/usuarios-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listado Usuarios</h5>
                                <div className='row mb-3'>
                                    <div className='col-lg-12'>
                                        <Link to={"/usuarios-crear"} className='btn btn-primary'>Crear</Link>
                                    </div>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%', textAlign: 'center' }}>Id</th>
                                            <th style={{ width: '15%', textAlign: 'center' }}>Rol</th>
                                            <th style={{ width: '25%', textAlign: 'center' }}>Nombre</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Celular</th>
                                            <th style={{ width: '15%', textAlign: 'center' }}>Usuario</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Estado</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arregloUsuarios.map(
                                                elemento =>
                                                    <tr key={elemento._id}>
                                                        <td style={{ textAlign: 'center' }}>{elemento._id}</td>
                                                        <td style={{ textAlign: 'center' }}>{elemento.idRol.nombreRol}</td>
                                                        <td>{elemento.nombresUsuario}</td>
                                                        <td style={{ textAlign: 'center' }}>{elemento.celularUsuario}</td>
                                                        <td style={{ textAlign: 'center' }}>{elemento.usuarioAcceso}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {elemento.estadoUsuario === 1 ? <span className="text-success">Activo</span> : <span className="text-danger">Inactivo</span>}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <Link to={`/usuarios-editar/${elemento._id}`} className="btn btn-primary btn-sm">
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

export default UsuariosAdmin;