// Cela va nous servir à avoir un tableau avec les jours de la semaine dans l'ordre à partir du jour où l'utilisateur est connecté et regarde l'application météo avec des exports et imports
const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


let ajd = new Date();
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
//console.log(jourActuel, ajd);

jourActuel = jourActuel.charAt(0).toLocaleUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
//console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre