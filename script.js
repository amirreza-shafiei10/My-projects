// ==========================================
// EXERCICE 1
// ==========================================

function isAnneeBissextile(annee) {
    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return true;
    }
    return false;
}

// Ensure the HTML is loaded before running
document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIC EX 1 ---
    const btnAnnee = document.getElementById('btn-verifier-annee');
    const spanResultat = document.getElementById('resultat-annee');

    if (btnAnnee) {
        btnAnnee.addEventListener('click', function() {
            let saisie = prompt("Saisissez une année : ");
            
            // Regex: 1 to 4 digits
            const regex = /^\d{1,4}$/;

            if (regex.test(saisie)) {
                let annee = parseInt(saisie);
                let resultat = isAnneeBissextile(annee);

                if (resultat) {
                    spanResultat.innerText = annee + " est une année bissextile";
                    spanResultat.style.color = "green";
                } else {
                    spanResultat.innerText = annee + " n'est pas une année bissextile";
                    spanResultat.style.color = "#002b5c";
                }
            } else {
                alert("Erreur : Veuillez saisir une année valide (1 à 4 chiffres).");
            }
        });
    }

    // --- LOGIC EX 2 ---
    const btnEnvoyer = document.getElementById('btn-envoyer-client');

    if (btnEnvoyer) {
        btnEnvoyer.addEventListener('click', function() {
            // Get values
            const civ = document.getElementById('civilite').value;
            const nom = document.getElementById('nom').value;
            const prenom = document.getElementById('prenom').value;
            const email = document.getElementById('email').value;
            const tel = document.getElementById('telephone').value;

            // Create Object
            const client = {
                civilite: civ,
                nom: nom,
                prenom: prenom,
                email: email,
                telephone: tel,
                presentation: function() {
                    alert("Bonjour, je suis " + this.civilite + " " + this.prenom + " " + this.nom + 
                          ", vous pouvez me contacter sur " + this.email + " ou au " + this.telephone);
                }
            };

            client.presentation();
        });
    }

    // --- LOGIC EX 3 ---
    const inputPrenom = document.getElementById('prenom-ls');
    const btnAjouter = document.getElementById('btn-ajouter-ls');
    const ulListe = document.getElementById('liste-prenoms');
    const btnEffacer = document.getElementById('btn-effacer-tout');

    // Function to render list
    function afficherListe() {
        if(!ulListe) return;
        ulListe.innerHTML = ''; 
        let prenoms = JSON.parse(localStorage.getItem('prenomsList')) || [];

        prenoms.forEach((p, index) => {
            let li = document.createElement('li');
            li.textContent = p;

            let croix = document.createElement('span');
            croix.textContent = " X";
            croix.className = "delete-btn";
            croix.onclick = function() {
                prenoms.splice(index, 1);
                localStorage.setItem('prenomsList', JSON.stringify(prenoms));
                afficherListe();
            };

            li.appendChild(croix);
            ulListe.appendChild(li);
        });
    }

    if (btnAjouter) {
        btnAjouter.addEventListener('click', function() {
            const val = inputPrenom.value;
            if (val) {
                let prenoms = JSON.parse(localStorage.getItem('prenomsList')) || [];
                prenoms.push(val);
                localStorage.setItem('prenomsList', JSON.stringify(prenoms));
                inputPrenom.value = '';
                afficherListe();
            }
        });
    }

    if (btnEffacer) {
        btnEffacer.addEventListener('click', function() {
            localStorage.removeItem('prenomsList');
            afficherListe();
        });
    }

    // Init list
    afficherListe();

});
