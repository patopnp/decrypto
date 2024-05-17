import React from 'react'

//Barra de navegacion superior
const HeaderComponent = () => {
  return (
    <div>
        <header>
        <nav className="navbar navbar-dark navbar-expand-sm bg-dark">

          <div className="container-fluid">
          
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/comitentes">Comitentes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mercados">Mercados</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/paises">Paises</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stats">Estadisticas</a>
              </li>
            </ul>
          </div>

        </nav>
        </header>
    </div>
  )
}

export default HeaderComponent