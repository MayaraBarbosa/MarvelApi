import './App.css';
import axios from 'axios'
import Search from './componentes/Search'
import Header from './componentes/Header'
import Paginacao from './componentes/Paginacao'
import {useState, useEffect} from 'react'
//URL  https://gateway.marvel.com:443/v1/public/characters?apikey=

// public key e96f74768944fd2e0326f955e87af5c0
// private key 8e7925d165cae75fa0e90f3c73d9add5ed186b98
//TS 1
//18e7925d165cae75fa0e90f3c73d9add5ed186b98e96f74768944fd2e0326f955e87af5c0
//HASH d2bbc6daa044c3046520ad52f082fa64

function App() {


  const [personagens, setPersonagens]=useState([])
  const [series, setSeries]=useState([])
  const [primeiraPagina, setprimeiraPagina] = useState(1);
  const [postPorPagina, setpostPorPagina] = useState(10);

  const [query, setQuery] = useState('')

  useEffect(() =>{
    const fetch = async()=>{
      if(query === ''){
        await axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=e96f74768944fd2e0326f955e87af5c0&hash=d2bbc6daa044c3046520ad52f082fa64').then(res=>{
            setPersonagens(res.data.data.results);
            console.log(res.data.data.results)

        }).catch(error=>console.log(error))
      }else{
          await axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=e96f74768944fd2e0326f955e87af5c0&hash=d2bbc6daa044c3046520ad52f082fa64`).then(res=>{
          setPersonagens(res.data.data.results);
        }).catch(error=>console.log(error))
      }
    }

    fetch();
  },[query])

  const index = primeiraPagina * postPorPagina;
  const indexPaginaInicial = index - postPorPagina;
  const personagensPaginaAtual = personagens.slice(indexPaginaInicial,index);

  const pagina = (numero) => setprimeiraPagina(numero)

  return (

    <div className="App">
      <Header></Header>
      <Search search={(nome)=> setQuery(nome)}></Search>
      <div>

        <div id= "herois">
          {personagensPaginaAtual.map(personagem =>(

              <div class="card" key={personagem.id}>
                <img src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`}></img>
                <h1 class="card-text">{personagem.name}</h1>

                <div class="card-body">
                  <p class="card-text">{personagem.description}</p>
                </div>
              </div>

          ))

        }
      </div>

      <Paginacao postPorPagina={postPorPagina} totalPost={personagens.length} pagina={pagina}/>

      </div>
    </div>

  );
}

export default App;
