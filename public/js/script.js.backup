// i stayed up late to make this work and the later i stayed up the lower the code quality went down

const pokemonImage = document.getElementById('pokemon');
const pokemonName = document.getElementById('pokemonName');
const smash = document.getElementById('smash');
const pass = document.getElementById('pass');
const smashPokemon = document.getElementById('smashPokemon');
const passPokemon = document.getElementById('passPokemon');

fetch('/api/pokemon').then(res => res.json()).then(data => {
    if (!sessionStorage.getItem('pokemon')) sessionStorage.setItem('pokemon', JSON.stringify(data));
    if (!sessionStorage.getItem('smashOrPass')) sessionStorage.setItem('smashOrPass', '[]');
    if (!sessionStorage.getItem('smashCount')) sessionStorage.setItem('smashCount', 0);
    if (!sessionStorage.getItem('passCount')) sessionStorage.setItem('passCount', 0);
    sessionStorage.setItem('pokemonLength', data.length);
}).then(() => {
    const pokemon = JSON.parse(sessionStorage.getItem('pokemon'));
    const currentPokemon = sessionStorage.getItem('currentPokemon');

    fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon ?? pokemon[0]}`).then(res => res.json()).then(res => {
        pokemonName.innerText = currentPokemon ?? pokemon[0];
        sessionStorage.setItem('pokemon', JSON.stringify(pokemon));
        pokemonImage.src = res.sprites.other["official-artwork"].front_default;
        pokemonImage.alt = res.name;
    });
    
    if (sessionStorage.getItem('smashOrPass').length >= 0) {
        const smashOrPass = JSON.parse(sessionStorage.getItem('smashOrPass'));
        smashOrPass.forEach(item => {
            item = JSON.parse(item);
            item.type === 'smash' ? smashPokemon.innerHTML += `<em><p>${item.name}</p></em>` : passPokemon.innerHTML += `<em><p>${item.name}</p></em>`;
        })
    }
    // Get the smash count
    if (sessionStorage.getItem('smashCount') >= 0) {
        const smashCount = JSON.parse(sessionStorage.getItem('smashCount'));
        smashNum.innerHTML = "Total: " + smashCount;
    }
    // Get the pass count
    if (sessionStorage.getItem('passCount') >= 0) {
        const passCount = JSON.parse(sessionStorage.getItem('passCount'));
        passNum.innerHTML = "Total: " + passCount;
    }

    // Only calculate the percentage if a button has been pressed once
    if (sessionStorage.getItem('smashCount') + sessionStorage.getItem('passCount') > 0) { 
        const smashCount = JSON.parse(sessionStorage.getItem('smashCount'));
        const passCount = JSON.parse(sessionStorage.getItem('passCount'));

        smashPercentage.innerHTML = Math.round((smashCount / (smashCount + passCount)) * 100) + "% Smash";
    }
    
}).catch(err => {
    alert('An error has occurred. Check developer console for more details.');
    console.log(err);
});

// you would smash the pokemon
smash.addEventListener('click', (e) => {
    smash.disabled = true;
    const pokemon = JSON.parse(sessionStorage.getItem('pokemon'));
    const smashOrPass = JSON.parse(sessionStorage.getItem('smashOrPass'));
    const currentPokemon = sessionStorage.getItem('currentPokemon');
    let smashCount = JSON.parse(sessionStorage.getItem('smashCount'));
    let passCount = JSON.parse(sessionStorage.getItem('passCount'));

    if (e.isTrusted) {
        // push to array
        smashOrPass.push(JSON.stringify({type: "smash", name: sessionStorage.getItem('currentPokemon') ?? 'bulbasaur'}));
        // add to counter
        smashCount++;
        // add to list
        smashPokemon.innerHTML += `<em><p>${sessionStorage.getItem('currentPokemon') ?? 'bulbasaur'}</p></em>`;
        // add to displayed number
        smashNum.innerHTML = "Total: " + smashCount;

        // Display the percentage
        smashPercentage.innerHTML = Math.round((smashCount / (smashCount + passCount)) * 100) + "% Smash";

        // if current pokemon is the same or doesn't exist
        if (currentPokemon === pokemon[0] || currentPokemon === null) pokemon.shift();
        // set session storage for current pokemon
        sessionStorage.setItem('currentPokemon', pokemon[0]);
        pokemonName.innerText = sessionStorage.getItem('currentPokemon');
        // set session storage for smash or pass
        sessionStorage.setItem('smashOrPass', JSON.stringify(smashOrPass));
        sessionStorage.setItem('smashCount', smashCount);
        // fetch next pokemon
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.shift()}`).then(res => res.json()).then(res => {
            sessionStorage.setItem('pokemon', JSON.stringify(pokemon));
            pokemonImage.src = res.sprites.other["official-artwork"].front_default;
            pokemonImage.alt = res.name;
        }).then(() => {
            smash.disabled = false;
        });
    }
});

// you would not smash the pokemon
pass.addEventListener('click', (e) => {
    pass.disabled = true;
    const pokemon = JSON.parse(sessionStorage.getItem('pokemon'));
    const smashOrPass = JSON.parse(sessionStorage.getItem('smashOrPass'));
    const currentPokemon = sessionStorage.getItem('currentPokemon');
    let passCount = JSON.parse(sessionStorage.getItem('passCount'));
    let smashCount = JSON.parse(sessionStorage.getItem('smashCount'));

    if (e.isTrusted) {
        // push to array
        smashOrPass.push(JSON.stringify({type: "pass", name: sessionStorage.getItem('currentPokemon') ?? 'bulbasaur'}));
        // add to counter
        passCount++;
        // add to list
        passPokemon.innerHTML += `<em><p>${sessionStorage.getItem('currentPokemon') ?? 'bulbasaur'}</p></em>`;
        // add to displayed number
        passNum.innerHTML = "Total: " + passCount;

        // Display the percentage
        smashPercentage.innerHTML = Math.round((smashCount / (smashCount + passCount)) * 100) + "% Smash";

        // if current pokemon is the same or doesn't exist
        if (currentPokemon === pokemon[0] || currentPokemon === null) pokemon.shift();
        // set session storage for current pokemon
        sessionStorage.setItem('currentPokemon', pokemon[0]);
        pokemonName.innerText = sessionStorage.getItem('currentPokemon');
        // set session storage for smash or pass
        sessionStorage.setItem('smashOrPass', JSON.stringify(smashOrPass));
        sessionStorage.setItem('passCount', passCount);
        // fetch next pokemon
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.shift()}`).then(res => res.json()).then(res => {
            sessionStorage.setItem('pokemon', JSON.stringify(pokemon));
            pokemonImage.src = res.sprites.other["official-artwork"].front_default;
            pokemonImage.alt = res.name;
        }).then(() => {
            pass.disabled = false;
        });
    }
});


// i cant tell if i like this code or hate it
