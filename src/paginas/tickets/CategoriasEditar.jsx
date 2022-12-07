import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../helpers/APIInvoke.js';
import { useNavigate, useParams } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/Mensajes.js';

const CategoriasEditar = () => {
    //parte dinamica
    const { id } = useParams();

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState({
        nombre: ''
    });

    const { nombre } = categoria;

    const categoriaGuardada = async () => {
        const response = await APIInvoke.invokeGET(`/api/categorias/${id}`);
        setCategoria({
            nombre: response.nombreCategoria
        });
    }

    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        categoriaGuardada();
        document.getElementById('nombre').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        editar();
    }

    const editar = async () => {
        const body = {
            nombreCategoria: categoria.nombre
        }

        const response = await APIInvoke.invokePUT(`/api/categorias/${id}`, body);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            navigate("/categorias-admin");
        } else {
            mensajeConfirmacion('error', response.msg);
        }
        setCategoria({
            nombre: ''
        });
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <ContentHeader
                titulo={"Categorias"}
                breadCrumb1={"Tickets"}
                breadCrumb2={"Listado Categorias"}
                breadCrumb3={"Editar Categorias"}
                ruta={"/categorias-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <h5 className="card-title">Editar Categorias</h5>

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

export default CategoriasEditar;