import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../helpers/APIInvoke.js';
import { useNavigate, useParams } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/Mensajes.js';
import Form from 'react-bootstrap/Form';

const RolesEditar = () => {
    //parte dinamica
    const { id } = useParams();

    const navigate = useNavigate();

    const [rol, setRol] = useState({
        nombre: '',
        estado: ''
    });

    const { nombre, estado } = rol;

    const filaRolGuardado = async () => {
        const response = await APIInvoke.invokeGET(`/api/roles/${id}`);
        //console.log(response);
        setRol({
            nombre: response.nombreRol,
            estado: response.estadoRol
        });
    }

    const onChange = (e) => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        document.getElementById('nombre').focus();
        filaRolGuardado();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        editar();
    }

    const editar = async () => {
        const body = {
            nombreRol: rol.nombre,
            estadoRol: rol.estado
        }

        const response = await APIInvoke.invokePUT(`/api/roles/${id}`, body);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            setRol({
                nombre: '',
                estado: ''
            });
            navigate("/roles-admin");
        } else {
            mensajeConfirmacion('error', response.msg);
            setRol({
                nombre: '',
                estado: rol.estado
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
                breadCrumb3={"Editar Roles"}
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

                                    <div className="row mb-3">
                                        <label htmlFor="estado" className="col-sm-2 col-form-label">Seleccione el estado</label>
                                        <div className="col-sm-10">
                                            <Form.Select aria-label="Seleccione el estado"
                                                style={{cursor: 'pointer'}}
                                                className="form-control"
                                                id="estado"
                                                name="estado"
                                                value={estado}
                                                onChange={onChange}
                                            >
                                                <option value="1">Activo</option>
                                                <option value="2">Inactivo</option>
                                            </Form.Select>
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

export default RolesEditar;