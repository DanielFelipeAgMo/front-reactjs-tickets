import React from 'react';
import { Link } from 'react-router-dom';
import dominios from '../helpers/dominios.js';

const Menu = () => {
    return (
        <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
                <Link className="nav-link collapsed" to={"/menu-principal"}>
                    <i className="bi bi-grid" />
                    <span>Dashboard</span>
                </Link>
            </li>

            {
                localStorage.getItem("rol") === dominios.ROL_ADMIN_ID ?
                    <>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" data-bs-target="#config-nav" data-bs-toggle="collapse" to={"#"}>
                                <i className="bi bi-gear-fill" /><span>Configuración</span><i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul id="config-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li>
                                    <Link to={"/roles-admin"}>
                                        <i className="bi bi-circle" /><span>Roles</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={"/usuarios-admin"}>
                                        <i className="bi bi-circle" /><span>Usuarios</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link collapsed" data-bs-target="#tickets-nav" data-bs-toggle="collapse" to={"#"}>
                                <i className="bi bi-tools" /><span>Tickets</span><i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul id="tickets-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li>
                                    <Link to={"/categorias-admin"}>
                                        <i className="bi bi-circle" /><span>Categorias</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={"/tickets-admin"}>
                                        <i className="bi bi-circle" /><span>Tickets Admin</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </>
                    :
                    localStorage.getItem("rol") === dominios.ROL_CLIENTE_ID ?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" data-bs-target="#tickets-nav" data-bs-toggle="collapse" to={"#"}>
                                    <i className="bi bi-tools" /><span>Tickets</span><i className="bi bi-chevron-down ms-auto" />
                                </Link>
                                <ul id="tickets-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to={"/tickets-admin"}>
                                            <i className="bi bi-circle" /><span>Tickets Admin</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                        :
                        <>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" data-bs-target="#config-nav" data-bs-toggle="collapse" to={"#"}>
                                    <i className="bi bi-gear-fill" /><span>Configuración</span><i className="bi bi-chevron-down ms-auto" />
                                </Link>
                                <ul id="config-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to={"/usuarios-admin"}>
                                            <i className="bi bi-circle" /><span>Usuarios</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link collapsed" data-bs-target="#tickets-nav" data-bs-toggle="collapse" to={"#"}>
                                    <i className="bi bi-tools" /><span>Tickets</span><i className="bi bi-chevron-down ms-auto" />
                                </Link>
                                <ul id="tickets-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to={"/categorias-admin"}>
                                            <i className="bi bi-circle" /><span>Categorias</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to={"/tickets-admin"}>
                                            <i className="bi bi-circle" /><span>Tickets Admin</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
            }
        </ul>
    );
}

export default Menu;