const pokemonImage = document.getElementById('pokemon');
const pokemonName = document.getElementById('pokemonName');
const smash = document.getElementById('smash');
const pass = document.getElementById('pass');
const smashPokemon = document.getElementById('smashPokemon');
const passPokemon = document.getElementById('passPokemon');
let smashCount = parseInt(sessionStorage.getItem('smashCount'));
let passCount = parseInt(sessionStorage.getItem('passCount'));

/**
 * Escape HTML
 * @returns {HTMLElement} - the element with the escaped HTML
 */
String.prototype.htmlEscape = function () {
    const span = document.createElement('span');
    const txt = document.createTextNode('');
    span.appendChild(txt);
    txt.data = this;
    return span.innerHTML;
};

/**
 * Checks if user has clicked "smash" or "pass" and then runs the appropriate code
 * @param {object} e - the event object
 * @param {string} value - the choice the user has made. Either "smash" or "pass"
 */
const choice = (e, value) => {
    if (!value || !e) return console.log('Invalid params passed to choice()');
    if (!e.isTrusted) return;
    if (smash.disabled || pass.disabled) return;

    if (parseInt(sessionStorage.getItem('currentPlace')) > parseInt(sessionStorage.getItem('pokemonLength'))) {
        return endDialog();
    }

    try {
        // disable buttons
        smash.disabled = true;
        pass.disabled = true;

        // set variables
        const pokemon = JSON.parse(sessionStorage.getItem('pokemon'));
        const pokemonName = pokemon[sessionStorage.getItem('currentPlace') - 1];
        const smashOrPass = JSON.parse(sessionStorage.getItem('smashOrPass'));
        let smashCount = JSON.parse(sessionStorage.getItem('smashCount'));
        let passCount = JSON.parse(sessionStorage.getItem('passCount'));

        // push to array
        smashOrPass.push(JSON.stringify({ type: value, name: pokemonName }));
        sessionStorage.setItem('smashOrPass', JSON.stringify(smashOrPass));

        // update count, current place, and image
        if (value === 'smash') {
            smashCount++
            smashPokemon.innerHTML += `<p><em>${pokemonName.htmlEscape()}</em></p>`;
            sessionStorage.setItem('smashCount', smashCount);
            smashNum.innerText = "Total: " + smashCount;
            smash.disabled = false;
            pass.disabled = false;
        } else if (value === 'pass') {
            passCount++;
            passPokemon.innerHTML += `<p><em>${pokemonName.htmlEscape()}</em></p>`;
            sessionStorage.setItem('passCount', passCount);
            passNum.innerHTML = "Total: " + passCount;
            smash.disabled = false;
            pass.disabled = false;
        } else {
            return throwError(new ReferenceError(`Invalid value passed to choice(). Value provided: ${value}`));
        }

        // update smash percentage
        smashPercentage.innerHTML = Math.round((smashCount / (smashCount + passCount)) * 100) + "% Smash";

        // update current place and image
        sessionStorage.setItem('currentPlace', parseInt(sessionStorage.getItem('currentPlace')) + 1);
        updateImage(sessionStorage.getItem('currentPlace'), pokemon[sessionStorage.getItem('currentPlace') - 1]);
    } catch (e) {
        smash.disabled = false;
        pass.disabled = false;
        throwError(e);
    }
}

/**
 * Update the pokemon image and alt attribute
 * @param {number} place - the new image src
 * @param {string} alt - the new image alt attribute
 */
const updateImage = (place, alt) => {
    if (!place || !alt) return console.log('Invalid params passed to updateImage()');

    try {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${place}.png`;
        pokemonImage.alt = alt ?? 'Pokemon Image';
        pokemonName.innerText = alt ?? 'N/A';
        console.log(place, parseInt(sessionStorage.getItem('pokemonLength')))
    } catch (e) {
        throwError(e);
    }
}

/**
 * Shows a dialog when the user has reached the end of the list.
 */
const endDialog = () => {
    const div = document.createElement('div');
    div.innerHTML = `<a class="p-1 px-4 rounded-2xl bg-cyan-500 drop-shadow-xl text-white" href="https://twitter.com/intent/tweet?text=I literally just went through all ${sessionStorage.getItem('pokemonLength')} Pokemon! I would smash ${sessionStorage.getItem('smashCount')} of them and I would pass ${sessionStorage.getItem('passCount')} of them.&url=${location.href}" target="_blank">Tweet about it</a>`;
    document.getElementById('tweetResults').appendChild(div);
    document.getElementsByTagName('figure')[0].setAttribute('style', 'opacity: 0;');
    smash.disabled = true;
    pass.disabled = true;
    const dialog = document.getElementById('endDialog');
    dialog.show();
}

/**
 * Returns an error in the DevConsole and an alert()
 * @param {*} e - the error that was thrown
 */
const throwError = (e) => {
    if (!e) return console.log('Invalid params passed to throwError()');

    alert('An error has occured. Check the developer console for more information.');
    console.error('Want to report this issue? Visit: https://github.com/spinfal/pokemon-smash-or-pass/issues\n', e);
    return console.info('%cPlease include a screenshot of this error when making an issue.', 'color: lightblue; font-size: 20px;');
}

/**
 * Unhides the main element when onload event is triggered and script files have loaded.
 */
const showMain = () => {
    document.getElementsByTagName('main')[0].classList.remove('hidden');
}