import React from 'react'
import { Link } from 'react-router-dom';

const PokeDex = ({ pokeInfo, shinyCheck, parentCallBack, selected }) => {
    const handleClick = (id, event) => {
        event.preventDefault();
        event.stopPropagation();
        window.open(`/pokemon/${id}`)
        //     // window.open(`https://google.com`)
        //     // return false
    }
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
                                <div  >
                                    <button type="default" className='btn' onClick={(event) => handleClick(poke.pokeDexId, event)}>
                                        Pokemon Info</button>
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