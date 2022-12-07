import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../helpers/APIInvoke.js';
import { useNavigate } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/Mensajes.js';
import config from '../../config';
import Form from 'react-bootstrap/Form';

const UsuariosCrear = () => {
    //parte dinamica

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        idrol: '-8',
        nombre: '',
        celular: '',
        correo: '',
        direccion: '',
        nombreusuario: '',
        clave: '',
        estado: config.api.estadoUsuarioActivo
    });

    const { idrol, nombre, celular, correo, direccion, nombreusuario, clave } = usuario;

    const [arregloRoles, setArregloRoles] = useState([]);

    const comboRoles = async () => {
        const response = await APIInvoke.invokeGET(`/api/roles/combo-roles`);
        //console.log(response);
        setArregloRoles(response);
    }

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        comboRoles();
        document.getElementById('nombre').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (usuario.idrol === "-8") {
            mensajeConfirmacion('error', 'Debe seleccionar un rol.');
        } else {
            crear();
        }
    }

    const crear = async () => {
        const body = {
            idRol: usuario.idrol,
            nombresUsuario: usuario.nombre,
            celularUsuario: usuario.celular,
            correoUsuario: usuario.correo,
            direccionUsuario: usuario.direccion,
            usuarioAcceso: usuario.nombreusuario,
            claveAcceso: usuario.clave,
            estadoUsuario: usuario.estado
        }

        const response = await APIInvoke.invokePOST(`/api/usuarios`, body);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            navigate("/usuarios-admin");
        } else {
            mensajeConfirmacion('error', response.msg);
        }

        setUsuario({
            idrol: '-8',
            nombre: '',
            celular: '',
            correo: '',
            direccion: '',
            nombreusuario: '',
            clave: '',
            estado: config.api.estadoUsuarioActivo
        });
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <ContentHeader
                titulo={"Usuarios"}
                breadCrumb1={"Configuración"}
                breadCrumb2={"Listado Usuarios"}
                breadCrumb3={"Crear Usuarios"}
                ruta={"/usuarios-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <h5 className="card-title">Crear Usuarios</h5>

                                    <div className="row mb-3">
                                        <label htmlFor="idrol" className="col-sm-2 col-form-label">Seleccione un rol</label>
                                        <div className="col-sm-10">
                                            <Form.Select aria-label="Default select example"
                                                style={{ cursor: 'pointer' }}
                                                id="idrol"
                                                name="idrol"
                                                value={idrol}
                                                onChange={onChange}
                                            >
                                                <option value="-8">SELECCIONE</option>
                                                {
                                                    arregloRoles.map(
                                                        opcion =>
                                                            <option value={opcion._id} key={opcion._id}>{opcion.nombreRol}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                                        <div className="col-sm-10">
                                            <input type="text"
                                                className="form-control"
                                                id="nombre"
                                                name="nombre"
                                                value={nombre}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="celular" className="col-sm-2 col-form-label">Celular</label>
                                        <div className="col-sm-10">
                                            <input type="number"
                                                className="form-control"
                                                id="celular"
                                                name="celular"
                                                value={celular}
                                                onChange={onChange}
                                                required
                                            />
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
                                        <label htmlFor="direccion" className="col-sm-2 col-form-label">Dirección</label>
                                        <div className="col-sm-10">
                                            <input type="text"
                                                className="form-control"
                                                id="direccion"
                                                name="direccion"
                                                value={direccion}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="nombreusuario" className="col-sm-2 col-form-label">Usuario Acceso</label>
                                        <div className="col-sm-10">
                                            <input type="email"
                                                className="form-control"
                                                id="nombreusuario"
                                                name="nombreusuario"
                                                value={nombreusuario}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="clave" className="col-sm-2 col-form-label">Clave Acceso</label>
                                        <div className="col-sm-10">
                                            <input type="password"
                                                className="form-control"
                                                id="clave"
                                                name="clave"
                                                value={clave}
                                                onChange={onChange}
                                                required
                                            />
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

export default UsuariosCrear;