import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrearCuenta from './paginas/auth/CrearCuenta';
import Login from './paginas/auth/Login';
import RolesAdmin from './paginas/configuracion/RolesAdmin';
import RolesCrear from './paginas/configuracion/RolesCrear';
import RolesEditar from './paginas/configuracion/RolesEditar';
import UsuariosAdmin from './paginas/configuracion/UsuariosAdmin';
import UsuariosCrear from './paginas/configuracion/UsuariosCrear';
import UsuariosEditar from './paginas/configuracion/UsuariosEditar';
import DashBoard from './paginas/DashBoard';
import CategoriasAdmin from './paginas/tickets/CategoriasAdmin';
import CategoriasCrear from './paginas/tickets/CategoriasCrear';
import CategoriasEditar from './paginas/tickets/CategoriasEditar';
import TicketsAdmin from './paginas/tickets/TicketsAdmin';
import TicketsCrear from './paginas/tickets/TicketsCrear';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/crear-cuenta' exact element={<CrearCuenta />} />
          <Route path='/menu-principal' exact element={<DashBoard />} />
          <Route path='/roles-admin' exact element={<RolesAdmin />} />
          <Route path='/roles-crear' exact element={<RolesCrear />} />
          <Route path='/roles-editar/:id' exact element={<RolesEditar />} />
          <Route path='/usuarios-admin' exact element={<UsuariosAdmin />} />
          <Route path='/usuarios-crear' exact element={<UsuariosCrear />} />
          <Route path='/usuarios-editar/:id' exact element={<UsuariosEditar />} />
          <Route path='/categorias-admin' exact element={<CategoriasAdmin />} />
          <Route path='/categorias-crear' exact element={<CategoriasCrear />} />
          <Route path='/categorias-editar/:id' exact element={<CategoriasEditar />} />
          <Route path='/tickets-admin' exact element={<TicketsAdmin />} />
          <Route path='/tickets-crear' exact element={<TicketsCrear />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
