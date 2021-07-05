import React from 'react';

const Paginacao =({postPorPagina, totalPost, pagina}) =>{
  const numeracaoPagina =[];

  for (var i = 1; i <= Math.ceil(totalPost/postPorPagina) ; i++) {
    numeracaoPagina.push(i);
  }

  return(
    <nav>
      <ul className = 'pagination'>
        {numeracaoPagina.map(numero =>(
          <li key={numero} className = 'page-item'>
            <a onClick={() => pagina(numero)} href='!#' className = 'page-link'>
              {numero}
            </a>
          </li>
        ))}
      </ul>
    </nav>

  )


}


export default Paginacao;
