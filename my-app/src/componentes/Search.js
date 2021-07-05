import React, {useState} from 'react';

const Search =({search}) =>{
  const [text, setText]= useState('');

  const onSearch=(nome)=>{
    setText(nome);
    search(nome);
  }

  return(
    <section className='search'>
      <form>
        <input type='text'
        className='form-control'
        placeholder= 'Search'
        autoFocus
        onChange={(e)=> onSearch(e.target.value)}
        value={text}/>
      </form>
    </section>

  )


}


export default Search;
