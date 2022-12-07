import React from 'react';
import ContentHeader from '../componentes/ContentHeader';
import Navbar from '../componentes/Navbar';
import SidebarContainer from '../componentes/SidebarContainer';
import { Link } from 'react-router-dom';

const DashBoard = () => {
    return (
        <>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <main id="main" className="main">
                <ContentHeader
                    titulo={"DashBoard"}
                    breadCrumb1={"DashBoard"}
                    breadCrumb2={""}
                    breadCrumb3={""}
                    ruta={"/menu-principal"}
                />

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">

                                <div className="col-xxl-3 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body">
                                            <h5 className="card-title"><span>.....</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-person-fill" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>Roles</h6>
                                                    <span className="text-muted small pt-2 ps-1"><Link to={"/roles-admin"}>Listado Roles</Link></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xxl-3 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body">
                                            <h5 className="card-title"><span>.....</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-person-fill" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>Roles</h6>
                                                    <span className="text-muted small pt-2 ps-1"><Link to={"/roles-admin"}>Listado Roles</Link></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xxl-3 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body">
                                            <h5 className="card-title"><span>.....</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-person-fill" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>Roles</h6>
                                                    <span className="text-muted small pt-2 ps-1"><Link to={"/roles-admin"}>Listado Roles</Link></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xxl-3 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body">
                                            <h5 className="card-title"><span>.....</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-person-fill" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>Roles</h6>
                                                    <span className="text-muted small pt-2 ps-1"><Link to={"/roles-admin"}>Listado Roles</Link></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}

export default DashBoard;