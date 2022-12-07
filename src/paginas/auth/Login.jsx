import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from '../../helpers/APIInvoke.js';
import mensajeConfirmacion from '../../helpers/Mensajes.js';

const Login = () => {

    //para redireccionar a un componente tipo pagina
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        usu: '',
        cla: ''
    });

    const { usu, cla } = login;

    const onChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        document.getElementById('usu').focus();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }

    const iniciarSesion = async () => {
        const body = {
            usuarioAcceso: login.usu,
            claveAcceso: login.cla
        }

        const response = await APIInvoke.invokePOST(`/api/usuarios/login`, body);

        if (response.ok === "NO_EXISTE") {
            mensajeConfirmacion('error', response.msg);
        } else if (response.ok === "CLAVE_ERRONEA") {
            mensajeConfirmacion('error', response.msg);
        } else {
            //eliminar todos los datos del localstore
            localStorage.removeItem("token");
            localStorage.removeItem("iduser");
            localStorage.removeItem("username");
            localStorage.removeItem("rol");

            //obtener el token
            const token = response.tokenJwt;

            //obtenemos otros datos adicionales
            const idUsuario = response._id;
            const nombreUsuario = response.nombresUsuario;
            const rolUsuario = response.idRol;

            //guardar informacion en localstore de html5
            localStorage.setItem("token", token);
            localStorage.setItem("iduser", idUsuario);
            localStorage.setItem("username", nombreUsuario);
            localStorage.setItem("rol", rolUsuario);

            //redireccionar al menu principal
            navigate("/menu-principal");
        }
    }

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                {/*<div className="d-flex justify-content-center py-4">
                                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                                        <img src="assets/img/logo.png" alt />
                                        <span className="d-none d-lg-block">NiceAdmin</span>
                                    </a>
                                </div>*/}
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Iniciar Sesión</h5>
                                            <p className="text-center small">Bienvenido, ingrese sus credenciales</p>
                                        </div>
                                        <form className="row g-3 needs-validation" onSubmit={onSubmit}>

                                            <div className="col-12">
                                                <label htmlFor="usu" className="form-label">Usuario</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                    <input type="email"
                                                        className="form-control"
                                                        id="usu"
                                                        name="usu"
                                                        value={usu}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Please enter your username.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="cla" className="form-label">Contraseña</label>
                                                <input type="password"
                                                    className="form-control"
                                                    id="cla"
                                                    name="cla"
                                                    value={cla}
                                                    onChange={onChange}
                                                    required
                                                />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>

                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">Ingresar</button>
                                            </div>
                                            <div className="col-12">
                                                <p className="small mb-0">No tiene una cuenta?
                                                    <Link to={"/crear-cuenta"}> Crear Cuenta</Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;
