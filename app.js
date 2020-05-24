// Variables globales

let compteur = 0; // Compteur qui permettra de savoir sur quelle slide nous sommes
let timer, elements, slides, slideWidth;

const apiURL = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api';        
const picturesURL = 'http://localhost/WebDevProject01/Caviste/images/pics/';
let wines;

    window.onload = () => {
        // On récupère le conteneur principal du diaporama
        const diapo = document.querySelector(".diapo");

        // On récupère le conteneur de tous les éléments
        elements = document.querySelector(".elements");

        // On récupère un tableau contenant la liste des diapos
        slides = Array.from(elements.children);

        // On calcule la largeur visible du diaporama
        slideWidth = diapo.getBoundingClientRect().width;

        // On récupère les deux flèches
        let next = document.querySelector("#nav-droite");
        let prev = document.querySelector("#nav-gauche");

        // On met en place les écouteurs d'évènements sur les flèches
        next.addEventListener("click", slideNext);
        prev.addEventListener("click", slidePrev);

        // Automatiser le diaporama
        timer = setInterval(slideNext, 4000);

        // Gérer le survol de la souris
        diapo.addEventListener("mouseover", stopTimer);
        diapo.addEventListener("mouseout", startTimer);

        // Mise en oeuvre du "responsive"
        window.addEventListener("resize", () => {
            slideWidth = diapo.getBoundingClientRect().width;
            slideNext();
        })
    

    /**
     * Cette fonction fait défiler le diaporama vers la droite
     */
    function slideNext(){
        // On incrémente le compteur
        compteur++;

        // Si on dépasse la fin du diaporama, on "rembobine"
        if(compteur == slides.length){
            compteur = 0;
        }

        // On calcule la valeur du décalage
        let decal = -slideWidth * compteur;
        elements.style.transform = `translateX(${decal}px)`;
    }

    /**
     * Cette fonction fait défiler le diaporama vers la gauche
     */
    function slidePrev(){
        // On décrémente le compteur
        compteur--;

        // Si on dépasse le début du diaporama, on repart à la fin
        if(compteur < 0){
            compteur = slides.length - 1;
        }

        // On calcule la valeur du décalage
        let decal = -slideWidth * compteur;
        elements.style.transform = `translateX(${decal}px)`;
    }

    /**
     * On stoppe le défilement
     */
    function stopTimer(){
        clearInterval(timer);
    }

    /**
     * On redémarre le défilement
     */
    function startTimer(){
        timer = setInterval(slideNext, 4000);
    }

        const options = {
            'method':'GET'
        };
        
        fetch(apiURL + '/wines', options).then(function(response) {
            if(response.ok) {
                response.json().then(function(data){
                    wines = data;
                    
                    //Afficher la liste des vins dans UL liste
                    showListe(wines);
                });
            }
        });

        const xhr = new XMLHttpRequest();       
        
        xhr.onreadystatechange = function() {
            if(xhr.readyState==4 && xhr.status==200) {
                let data = xhr.responseText;        
                
                wines = JSON.parse(data);  			
                
                //Afficher la liste des vins dans UL liste
                showListe(wines);
            }     
        };
        
        xhr.open('GET','js/wines.json',true);
        xhr.send();
        

        //Configuration des boutons
        let btSearch = document.getElementById('btSearch');
        btSearch.addEventListener('click', search); 
        
        /* let btNewWine = document.getElementById('btNewWine');
        btNewWine.addEventListener('click', newWine); */
        
        /* let btSave = document.getElementById('btSave');
        btSave.addEventListener('click', saveWine); */
        
        let btDelete = document.getElementById('btDelete');
        btDelete.addEventListener('click', deleteWine);
        
        let btImgChange = document.getElementById('btImgChange');
        btImgChange.addEventListener('click', chgImg);  

        let btLike = document.getElementById('btLike');
        btLike.addEventListener('click', like);

        let btnLike = document.getElementById('btnLike');
        btLike.addEventListener('click', nonLike);   

        let btAddComments = document.getElementById('btAddComments');
        btAddComments.addEventListener('click', addComments);
        
};
   
  //Fonction pour charger l'image->chImg()
function chgImg(){
	let pictureFile = document.getElementById('pictureFile');
	pictureFile.click(); 
} 

//Afficher la liste des vins->showListe()
function showListe(wines) {
    //Sélectionner la liste des vins
    let listeUL = document.getElementById('liste');
    let strLIs = '';
       
    //Pour chaque vin, créer un LI
    wines.forEach(function(wine) {
        let idWine = wine.id;

        strLIs += '<li data-id="'+idWine+'" class="list-group-item">'+wine.name+'</li>';
    });


    //Insérer tous les LIs dans la liste UL des vins
    listeUL.innerHTML = strLIs;

    //Récupérer tous les LIs
    let nodeLIs = listeUL.getElementsByTagName('li');

    //Ajouter un gestionnaire d'événement sur chaque LI
    for(let li of nodeLIs) {
        li.addEventListener('click',function() { 
            getWine(this.dataset.id, wines, false);            

            //Affichage de la description
            let desriOut = document.querySelector('div#nav-44518-content-1');
            let descriIN = document.getElementById('description');
            desriOut.innerHTML = descriIN.value;

            //Tableau des users
            let tabUsers = [
                {
                    'id_user':'1',
                    'name':'Ced'
                },
                {
                    'id_user':'2',
                    'name':'Bob'
                },
                {
                    'id_user':'3',
                    'name':'Radad'
                },
                {
                    'id_user':'4',
                    'name':'Adam'
                },
                {
                    'id_user':'5',
                    'name':'Alain'
                },
                {
                    'id_user':'6',
                    'name':'Amin'
                },
                {
                    'id_user':'7',
                    'name':'Amine'
                },
                {
                    'id_user':'8',
                    'name':'Angeline'
                },
                {
                    'id_user':'9',
                    'name':'Badreddine'
                },
                {
                    'id_user':'10',
                    'name':'Belkacem'
                },
                {
                    'id_user':'11',
                    'name':'Gregory'
                },
                {
                    'id_user':'12',
                    'name':'Ismail'
                },
                {
                    'id_user':'13',
                    'name':'Appolinaire'
                },
                {
                    'id_user':'14',
                    'name':'Kwasi'
                },
                {
                    'id_user':'15',
                    'name':'Manuel'
                },
                {
                    'id_user':'16',
                    'name':'Maxime'
                },
                {
                    'id_user':'17',
                    'name':'Myriam'
                },
                {
                    'id_user':'18',
                    'name':'Nathalie'
                },
                {
                    'id_user':'19',
                    'name':'Mamadou'
                },
                {
                    'id_user':'20',
                    'name':'Rachida'
                },
                {
                    'id_user':'21',
                    'name':'Simon'
                },
                {
                    'id_user':'22',
                    'name':'Thomas'
                },
                {
                    'id_user':'23',
                    'name':'Youssef'
                },
                {
                    'id_user':'24',
                    'name':'Nathan'
                }
            ];

            //Retrouver les comments d'un vin par son Id
            
                const commeId = document.getElementById('idWine').value;
                const options = {
                    'method': 'GET',
                    'mode': 'cors',
                    'headers': {
                        'content-type': 'application/json; charset=utf-8',
                    }
                };
                let comme,idUser, output='';
                const fetchURL = '/wines/'+commeId+'/comments';
                
                fetch(apiURL + fetchURL, options).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(data){
                            console.log(data);
                            Object.values(data).forEach(function(c){
                                comme = c.content;
                                idUser =  c.user_id;
                                console.log(comme);
                                tabUsers.forEach(function(u,i){
                                    console.log(u);
                                    if(u.id_user===idUser){
                                     output += `<p class="mt-2" contenteditable="true"><em> ${comme} (<strong> ${u.name}</strong>)</em>  <i class="fas fa-edit ml-2 ruddy-brown"></i> <i class="fas fa-trash-alt ml-2 ruddy-brown"></i> </p>`;
                                    }                                  
                                    
                                })  
                                let affComments = document.querySelector('div#nav-44518-content-2');                                
                                affComments.innerHTML = output;
                             })
                        });
                    }
                });
        });
    }  
}

//getWine()
function getWine(id, wines) {
    let wine = wines.find(wine => wine.id == id);
    
    let input = document.getElementById('idWine');
    input.value = wine.id;

    input = document.getElementById('name');
    input.value = wine.name;

    input = document.getElementById('grapes');
    input.value = wine.grapes;

    input = document.getElementById('country');
    input.value = wine.country;

    input = document.getElementById('region');
    input.value = wine.region;

    input = document.getElementById('year');
    input.value = wine.year;

    input = document.getElementById('description');
    input.value = wine.description;
	
	input = document.getElementById('price');
    input.value = wine.price;
	
	input = document.getElementById('capacity');
    input.value = wine.capacity;
	
	input = document.getElementById('color');
    input.value = wine.color;
	
	input = document.getElementById('extra');
    input.value = wine.extra;

    let imgWine = document.getElementById('picture');	
    imgWine.src = wine.picture!='' ? picturesURL + wine.picture : 'images/pics/No_picture_available.png';	
    imgWine.alt = wine.picture;	
}

//Rechercher un vin dans la liste->search()
function search(){
    let inputKeyword = document.getElementById('keyword');
    let keyword = inputKeyword.value;
    let reg = new RegExp(keyword, 'i');
    console.log(keyword.length);
    let filteredWines = [];
    Object.values(wines).forEach(function(wine){
       if(wine.name.search(reg) != -1){
            filteredWines.push(wine);
        }
        else if((keyword == 1) && (wine.id.search(reg) != -1)){
            filteredWines.push(wine);
        }
        else if((keyword.length == 2) && (wine.id.search(reg) != -1)){
            filteredWines.push(wine);            
        }
        else if((keyword.length == 4) && (wine.year.search(reg) != -1)){
            filteredWines.push(wine);
        }        
    })
    let tabLi = document.querySelector('li.list-group-item');
   /*  tabLi.forEach(function(li){
        console.log(li);
    }) */
    console.log(filteredWines);
    showListe(filteredWines);
} 
//Ajouter un vin->newWine()
function newWine() {
    //Vider le formulaire
    let input = document.getElementById('idWine');
    input.value = '';

    let inputName = document.getElementById('name');
    inputName.value = '';

    input = document.getElementById('grapes');
    input.value = '';

    input = document.getElementById('country');
    input.value = '';

    input = document.getElementById('region');
    input.value = '';

    input = document.getElementById('year');
    input.value = '';
	
	input = document.getElementById('price');
    input.value = '';
	
	input = document.getElementById('color');
    input.value = '';

    input = document.getElementById('capacity');
    input.value = '';
	
	input = document.getElementById('extra');
    input.value = '';
	
	input = document.getElementById('description');
    input.value = '';

    let imgWine = document.getElementById('picture');
    imgWine.src = 'images/pics/generic.jpg';
    
    //Mettre le curseur dans le champ name
    inputName.focus();
}

//Sauver une modification->saveWine()
function saveWine() {
    //Création d'un objet wine
    let wine = {};
    
    //Récupérer les données du formulaire et les transférer à l'objet wine
    let input = document.getElementById('idWine');
    wine.id = input.value;
	
    input = document.getElementById('name');
    wine.name = input.value;

    input = document.getElementById('grapes');
    wine.grapes = input.value;

    input = document.getElementById('country');
    wine.country = input.value;

    input = document.getElementById('region');
    wine.region = input.value;

    input = document.getElementById('year');
    wine.year = input.value;

    input = document.getElementById('description');
    wine.description = input.value;

    input = document.getElementById('price');
    wine.price = input.value;
	
	input = document.getElementById('capacity');
    wine.capacity = input.value;
	
	input = document.getElementById('color');
    wine.color = input.value;
	
	input = document.getElementById('extra');
    wine.extra = input.value;
	
	let imgWine = document.getElementById('picture');
    wine.picture = imgWine.src;
	
    console.log(wine.picture);
	
    //Envoyer l'objet wine à l'API en POST ou en PUT
    let method = (wine.id=='') ?'POST':'PUT';
 	
    const options = {
        'method': method,
        'body': JSON.stringify(wine),
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8'
        }
    };
    console.log(options.method);
	
    const fetchURL = method=='PUT' ? '/wines':'/wines/'+wine.id; 
    
	console.log(fetchURL);
    
	fetch(apiURL + fetchURL, options).then(function(response) {        
		
		console.log(response.ok);
		
		if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                
                //Mettre à jour la liste des vins (soit ajouter, soit modifier)
                wines = wines.filter(wine => wine.id != wine.id);
                
                if(method=='POST') {
                    //Récupérer l'id du vin créé
                    wine.id = data.id;

                    //Afficher l'id du nouveau vin dans le formulaire
                    let input = document.getElementById('idWine');
                    input.value = wine.id;
                }
                
                //Ajouter le nouveau vin dans la liste
                wines.push(wine);
                
                //Réafficher la liste des vins
                showListe(wines);
            });
			
			console.log("OK");
			
        }else{
			console.log("NOT OK");
			console.log(wine);
		}
    });
}


//Supprimer un vin->deleteWine()
function deleteWine() {
    //Récupérer les données du formulaire et les transférer l'objet wine
    let idWine = document.getElementById('idWine').value;
 
    const options = {
        'method': 'DELETE',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8'
        }
    };
    
    const fetchURL = '/wines/'+idWine;
    
    fetch(apiURL + fetchURL, options).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                
                //Mettre à jour la liste des vins
                wines = wines.filter(wine => wine.id != idWine);
                
                //Réafficher la liste des vins
                showListe(wines);
                
                //Réinitialiser le formulaire
                newWine();
            });
        }
    });
}   

//Afficher la liste des pays->showCountry()
const options = {
    'method': 'GET',
    'mode': 'cors',
    'headers': {
        'content-type': 'application/json; charset=utf-8',
    }
};
let affPays, listePays, output='';
let strPays= '';
const fetchURL = '/wines/countries';

fetch(apiURL + fetchURL, options).then(function(response) {
    if(response.ok) {
        response.json().then(function(data){
            //console.log(data);
            Object.values(data).forEach(function(c){
                listePays = c.country;
                //console.log(listePays);

                output += `<em class="mt-2"><b> ${listePays}</b></em>`; 
                strPays += `<li data-id="${c.id}" ><a href="./" class="dropdown-item a-block">${c.country}</a></li>`;
                    
                })  
                let affPays = document.querySelector('div#nav-44518-content-4');  
                // let divPays = document.getElementById('pays');                              
                affPays.innerHTML = `<p class="mt-2"><em>Voici la liste des pays producteurs de nos vins:</em></p>` + output;
                /* divPays.innerHTML =  strPays; */
        });
    }
});
//Les vins préférés de l'utilistaeurs 5
let affVinPref, listeVins, outputVinPref = '';
const fetchURL5 = '/users/5/likes/wines';

fetch(apiURL + fetchURL5, options).then(function(response) {
    if(response.ok) {
        response.json().then(function(data){
            //console.log(data);
            Object.values(data).forEach(function(c){
                listeVins = c.name;
                //console.log(listeVins);

                outputVinPref += `<em class="mt-2"><b> ${listeVins}</b></em>`; 
                    
                })  
                let affVinPref = document.querySelector('div#nav-44518-content-5');                                
                affVinPref.innerHTML = `<p class="mt-2"><em>Voici la liste des vins préférés de l'utilisateur 5:</em></p>` + outputVinPref;
        });
    }
});

//Liker un vin
function like(){
    const likeId = document.getElementById('idWine').value;
	const options = {
        'method': 'PUT',
        'body': { "like" : true},	
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8'	
        }
    };
    
    const fetchURL = '/wines/'+likeId+'/like';
    
    fetch(apiURL + fetchURL, options).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
            });
        }
    });
}

//Non Liker un vin
function nonLike(){
    const nLikeId = document.getElementById('idWine').value;
	const options = {
        'method': 'PUT',
        'body': { "like" : false},	
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8'	
        }
    };
    
    const fetchURL = '/wines/'+nLikeId+'/like';
    
    fetch(apiURL + fetchURL, options).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
            });
        }
    });
}
//Ajouter un commentaire
function addComments(){
    console.log('Ok');
    const wineId = document.getElementById('idWine').value;
    const commentaire = document.getElementById('exampleFormControlTextarea1').value
	const options = {
        'method': 'POST',
        'body': { "content" : commentaire },	
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8'
        }
    };
    
    const fetchURL = '/wines/'+wineId+'/comments';
    
    fetch(apiURL + fetchURL, options).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
            });
        }
        console.log('Not ok');
    });
}

//Statistique -> Camember
let dataWines ;
let nbWineArgentina,nbWineFrance,nbWinesItaly,nbWineSpain,nbWineUSA  ;
let cptWineArg = 0;
let cptWineFr = 0; 
let cptWineIta = 0;
let cptWineSpa = 0;
let cptWineUs = 0;
fetch(apiURL+'/wines')
    .then(function(response){
        return response.json();
    })
    .then(function(dataList){
        //console.log(dataList);
        dataWines = dataList;
        Object.values(dataWines).forEach(function(wine){
            if(wine.country=="Argentina"){
                cptWineArg++;
            }
            if(wine.country=="France"){
                cptWineFr++;
            }
            if(wine.country=="Italy"){
                cptWineIta++;
            }
            if(wine.country=="Spain"){
                cptWineSpa++;
            }
            if(wine.country=="USA"){
                cptWineUs++;
            }
        })
        nbWineArgentina = cptWineArg;
        // console.log(cptWineArg);
        nbWineFrance = cptWineFr;
        //console.log(cptWineFr);
        nbWinesItaly = cptWineIta;
        //console.log(cptWineIta);
        nbWineSpain = cptWineSpa;
        //console.log(cptWineSpa);
        nbWineUSA = cptWineUs;
        //console.log(cptWineUs);

        // creation of the charts 
        let myLabel = ['Argentina','France','Italy','Spain','USA'];
        let myData = [nbWineArgentina,nbWineFrance,nbWinesItaly,nbWineSpain,nbWineUSA];

        // Definition of the wine production's charts
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: myLabel,
                datasets: [{
                    label: 'Productions of wine by countries',
                    // data: [12, 19, 3, 5, 2, 3],
                    data: myData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
.catch(function(err){
    //console.log(err);
})