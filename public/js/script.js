// check and set/get sessionStorage items
if (!sessionStorage.getItem('currentPlace')) sessionStorage.setItem('currentPlace', 1);
if (!sessionStorage.getItem('smashOrPass')) sessionStorage.setItem('smashOrPass', '[]');
if (!sessionStorage.getItem('smashCount')) sessionStorage.setItem('smashCount', 0);
if (!sessionStorage.getItem('passCount')) sessionStorage.setItem('passCount', 0);

// set variables
const currentPlace = sessionStorage.getItem('currentPlace');
const smashPercentage = document.getElementById('smashPercentage');
const weeee = ['<3', 'owo', 'hi', 'spin.rip'];

// fetch the list of Pokemon names and set the image
fetch('/api/pokemon').then(res => res.json()).then(data => {
    sessionStorage.setItem('pokemon', JSON.stringify(data));
    sessionStorage.setItem('pokemonLength', data.length);
    updateImage(currentPlace, data[currentPlace - 1]);
});

// add names to the smash and pass categories
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

    smashPercentage.innerText = Math.round((smashCount / (smashCount + passCount)) * 100) + "% Smash";
}

// set click event listeners for smash and pass buttons
smash.addEventListener('click', (e) => {if(e.isTrusted)choice('smash')});
pass.addEventListener('click', (e) => {if(e.isTrusted)choice('pass')});

// listen for keypresses and check if it is P or S
document.onkeyup = function (e) {
    try {
        e = e || window.event;
        if (!e.isTrusted) return;
        if (e.keyCode == 115 || e.keyCode == 83) {
            // 115 or 83
            choice('smash');
        } else if (e.keyCode == 112 || e.keyCode == 80) {
            // 112 or 80
            choice('pass');
        } else {
            return;
        }
    } catch (err) {
        throwError(err);
    }
};

window.onload = showMain();