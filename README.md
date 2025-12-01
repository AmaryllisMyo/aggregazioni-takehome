# aggregazioni-takehome
Web Application - Take Home

ISTRUZIONI PER BUILDARE:
Da CLI: $
cd LATUACARTELLA/aggregazioni-takehome/my-app
npm run start:prod

DEFINIZIONE REQUISITI (dal pdf)

- Problema:

In azienda abbiamo un sistema di raccolta dei dati relativi alle ore lavorative spese da ogni impiegato sui progetti. 
Si vuole realizzare una pagina web che recuperi questi dati e ne permetta l’aggregazione su uno o più campi contemporaneamente al fine di effettuare delle analisi.

- Input:
Il database restituisce una lista di registrazioni di attività. Ogni attività presenta il progetto di afferenza, l’impiegato che la ha svolta, la data e il numero di ore dedicate.

Esempio di payload: 

[
{
"project": { "id": 1, "name": "Mars Rover" },
"employee": { "id": 1, "name": "Mario" },
"date": "2021-08-26T22:00:00.000Z",
"hours": 5
},
{
"project": { "id": 2, "name": "Manhattan" },
"employee": { "id": 2, "name": "Giovanni" },
"date": "2021-08-30T22:00:00.000Z",
"hours": 3
},
{
"project": { "id": 1, "name": "Mars Rover" },
"employee": { "id": 1, "name": "Mario" },
"date": "2021-08-31T22:00:00.000Z",
"hours": 3
},
{
"project": { "id": 1, "name": "Mars Rover" },
"employee": { "id": 3, "name": "Lucia" },
"date": "2021-08-31T22:00:00.000Z",
"hours": 3
},
{
"project": { "id": 2, "name": "Manhattan" },
"employee": { "id": 1, "name": "Mario" },
"date": "2021-08-26T22:00:00.000Z",
"hours": 2
},
{
"project": { "id": 2, "name": "Manhattan" },
"employee": { "id": 2, "name": "Giovanni" },
"date": "2021-08-31T22:00:00.000Z",
"hours": 4
}
]

- Output:
La pagina web consente di aggregare per uno o più campi tra:
	- progetto
	- impiegato
	- data
Quando l’utente sceglie una aggregazione il numero di ore delle attività aggregate si somma.
È importante considerare che l’ordine con cui vengono scelti i campi per l’aggregazione produce risultati diversi nell’ordinamento di colonne e righe.

- Vincoli:
1. Sviluppare una applicazione web client-server sfruttando la tecnologia che si preferisce.
2. Il database può essere simulato con una variabile in memoria.


- Tecnologie usate:

- React.js + Vite + Axios API (Frontend)
	- Bootstrap (base tabella)
- Express, Nodemon, Concurrently (Backend)
- Typescript
- CSS
- HTML5

Fonti:
Vite:
- https://vite.dev/guide/
- https://vite.dev/guide/static-deploy

React:
- https://react.dev/learn/managing-state
- https://react.dev/learn/adding-interactivity

Express:
- https://expressjs.com/en/starter/installing.html
- https://expressjs.com/en/guide/using-middleware.html
- https://expressjs.com/en/guide/routing.html
- https://medium.com/@finnkumar6/understanding-router-in-express-js-a-complete-guide-7d2cece2b757

Axios API:
- https://axios-http.com/docs/intro

Bootstrap:
- https://getbootstrap.com/docs/4.0/content/tables/

