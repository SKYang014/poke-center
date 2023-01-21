import React from 'react'
import { Link } from 'react-router-dom';

const PokeDex = ({ pokeInfo, shinyCheck, parentCallBack }) => {
    // const onTrigger = (event) => {
    //     event.preventDefault();
    //     parentCallBack(event.target.species.value)
    // }
    const returnedPhoto = shinyCheck ? "shinyPhoto" : "photo"
    return (
        <div>
            {pokeInfo &&
                pokeInfo.pokemons.map(poke => (
                    <div onClick={() => parentCallBack(poke.pokeDexId, `poke.${returnedPhoto}`, poke.description, poke.bigPhoto, poke.species)} key={poke.pokeDexId}>
                        {/* <input type="checkbox"
                            name="species"
                            value={poke.pokeDexId} /> */}
                        <div key={poke.pokeDexId} className='card mb-3'>
                            <p className='card-header'>
                                PokeDex No: {poke.pokeDexId} {poke.species}
                            </p>
                            {shinyCheck ?
                                (<img src={`${poke.shinyPhoto}`} alt={`a shiny ${poke.species}`} />) :
                                (<img src={`${poke.photo}`} alt={`a ${poke.species}`} />)
                            }
                            {/* <input type="submit" value="Choose" /> */}
                            <Link to={`/pokemon/${poke.pokeDexId}`} >
                                <button className='btn'>Pokemon Info</button>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    )
};

export default PokeDex;