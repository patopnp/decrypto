import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
        <nav class="navbar navbar-dark navbar-expand-sm bg-dark">

          <div class="container-fluid">
          
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/comitentes">Comitentes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/mercados">Mercados</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/paises">Paises</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/stats">Estadisticas</a>
              </li>
            </ul>
          </div>

        </nav>
        </header>
    </div>
  )
}

export default HeaderComponent