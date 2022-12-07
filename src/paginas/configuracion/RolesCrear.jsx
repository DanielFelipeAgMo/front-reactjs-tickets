import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../helpers/APIInvoke.js';
import { useNavigate } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/Mensajes.js';

const RolesCrear = () => {
    //parte dinamica

    const navigate = useNavigate();

    const [rol, setRol] = useState({
        nombre: '',
        estado: 1
    });

    const { nombre } = rol;

    const onChange = (e) => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        document.getElementById('nombre').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        crear();
    }

    const crear = async () => {
        const body = {
            nombreRol: rol.nombre,
            estadoRol: rol.estado
        }

        const response = await APIInvoke.invokePOST(`/api/roles`, body);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            setRol({
                nombre: ''
            });
            navigate("/roles-admin");
        } else {
            mensajeConfirmacion('error', response.msg);
            setRol({
                nombre: '',
                estado: 1
            });
        }
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <ContentHeader
                titulo={"Roles"}
                breadCrumb1={"Configuración"}
                breadCrumb2={"Listado Roles"}
                breadCrumb3={"Crear Roles"}
                ruta={"/roles-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <h5 className="card-title">Crear Roles</h5>

                                    <div className="row mb-3">
                                        <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                                        <div className="col-sm-10">
                                            <input type="text"
                                                className="form-control"
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Ingrese el nombre del rol."
                                                value={nombre}
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

export default RolesCrear;