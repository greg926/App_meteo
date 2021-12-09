import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

//console.log("DEPUIS MAIN JS:" + tabJoursEnOrdre);

const CLEFAPI = 'd5879cc9e423f0d25d27a62bd5c6ddb1';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

// Géolocalisation
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuiller l'activer`)
    })

}

function AppelAPI(long, lat) {
    
    //console.log(long, lat);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        //console.log(data);

        resultatsAPI = data;
        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}° `
        localisation.innerText = resultatsAPI.timezone;


        // Les heures par tranche de trois, avec leurs températures.

        let heureActuelle = new Date ().getHours();

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            }else if(heureIncr === 24){
                heure[i].innerText = `OO h`
            }else
                heure[i].innerText = `${heureIncr} h`;
        }

        // Temp pour 3h
        for(let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
        }

        // Trois premières lettres des jours 

        for(let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
        }


        // Température par jour
        for(let m = 0; m < 7; m++) {
            tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
        }


        // Icone dynamique
        if(heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        }else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparation')

    })

}