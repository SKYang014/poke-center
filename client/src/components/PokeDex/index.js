import React from 'react'
import { Link } from 'react-router-dom';

const PokeDex = ({ pokeInfo, shinyCheck, parentCallBack, selected, newWin }) => {
    // const handleClick = (id) => {
    //     // event.preventDefault();
    //     window.open(`/pokemon/${id}`)
    //     // window.open(`https://google.com`)
    //     // return false
    // }
    return (
        <div className='flex-row justify-space-between w-100'>
            {pokeInfo &&
                pokeInfo.pokemons.map(poke => (
                    <div onClick={() => parentCallBack(poke.pokeDexId, `${shinyCheck ? poke.shinyPhoto : poke.photo}`, poke.description, poke.bigPhoto, poke.species)} key={poke.pokeDexId}>
                        {/* <input type="checkbox"
                            name="species"
                            value={poke.pokeDexId} /> */}
                        <div key={poke.pokeDexId} className='card m-3'>
                            <p className='card-header'>
                                PokeDex No: {poke.pokeDexId} {poke.species}
                            </p>
                            <div className={`flex-column align-center 
                            ${selected === poke.pokeDexId ? "bg-primary" : ""}`}>
                                {shinyCheck ?
                                    (<img src={`${poke.shinyPhoto}`} alt={`a shiny ${poke.species}`} />) :
                                    (<img src={`${poke.photo}`} alt={`a ${poke.species}`} />)
                                }
                                <div onClick={() => newWin(poke.pokeDexId)} >
                                    <button className='btn'>Pokemon Info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
};

export default PokeDex;