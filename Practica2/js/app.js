console.log("Conectado a JS")

const getRandom = (min,max) =>{
    return Math.floor(Math.random() *(max-min)) + min
}

document.addEventListener('DOMContentLoaded',()=>{
    const idPokemon = getRandom(1,152)
    fetchData(idPokemon)
})

const fetchData = async (id) =>{
    try {
        const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/'+id)
        const data = await  pokemon.json()
       // console.log(data)
        const jugador ={
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            imgJuego: data.sprites.front_default,
            imgCvg: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            experiencia: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa:data.stats[2].base_stat,
            especial: data.stats[3].base_stat
        }
        pintarCard(jugador)
    }catch (e) {
        console.log(e)
    }
}

const pintarCard=(pokemon)=>{
    const flex = document.querySelector('.flex')
    const teample = document.getElementById('card').content
    const clone = teample.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute("src",pokemon.imgCvg)
    clone.querySelector('.card-body-title').innerHTML =`
        ${pokemon.nombre} <span>${pokemon.hp}</span>
    `
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia +" exp"
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque+"K"
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial+"K"
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa+"K"

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}
