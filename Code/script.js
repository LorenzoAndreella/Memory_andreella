function controllo(diff) {
    let d = diff;
    let formm = document.getElementById('formm');
    let p = document.createElement('p');
    formm.appendChild(p);
    p.innerText = "";

    if (d !== "a" && d !== "b" && d !== "c") {
        p.innerText = "Seleziona una difficoltà";
        document.getElementById("invia").disabled = true;
        document.getElementById("diff").disabled = true;
        return;
    }

    switch (d) {
        case "a": d = 2; break;
        case "b": d = 4; break;
        case "c": d = 6; break;
    }

    let mazzo = funzionecarte(formm, d);
    tabella(d, formm, mazzo); 
    pulsanti(formm, mazzo, d);
}



function tabella(d, formm, mazzo) {
    document.getElementById("invia").disabled = true;
    document.getElementById("diff").disabled = true;
    let tabel = document.createElement("table");
    let c = 0;

    for (let i = 0; i < d; i++) {
        let tr = document.createElement("tr"); // righe
        tabel.appendChild(tr);

        for (let j = 0; j < d; j++) {
            c++;
            let td = document.createElement("td");
            tr.appendChild(td); // celle

            let bottone = document.createElement("button");
            bottone.type = "button"; // pulsanti

            // immagine retro
            let ign = document.createElement("img");
            ign.src = "Img/ignoto.png";
            ign.alt = "carta" + c;


            bottone.appendChild(ign);

            bottone.id = c; // contatore
            td.appendChild(bottone);
        }
    }

    formm.appendChild(tabel);
    tabel.style.margin = "auto"; // centrare
}



function funzionecarte(formm, d) {
    let carte = [];
    for (let i = 0; i < 18; i++) {  //array carte disponibili
        carte.push("Img/img1 copia " + (i + 1) + ".jpg.png");
    }

    let selezione = [];
    let tempCarte = [];
    for (let i = 0; i < carte.length; i++) tempCarte.push(carte[i]);

    for (let i = 0; i < d*d/2; i++) {    //creiamo una parte della coppia
        let carta = Math.floor(Math.random() * tempCarte.length);
        selezione.push(tempCarte[carta]);
        tempCarte.splice(carta, 1);
    }

    let mazzo = []; //uniamo le coppie
    for (let i = 0; i < selezione.length; i++) mazzo.push(selezione[i]);    
    for (let i = 0; i < selezione.length; i++) mazzo.push(selezione[i]);


    for (let i = mazzo.length - 1; i > 0; i--) {    //disordiniamo il mazzo
        let j = Math.floor(Math.random() * (i + 1));
        let temp = mazzo[i];
        mazzo[i] = mazzo[j];
        mazzo[j] = temp;
    }

    return mazzo;
}

function pulsanti(formm, mazzo, d) {
    for (let i = 1; i <= d*d; i++) {
        let bottone1 = document.getElementById(i);
        //tutti i pulsanti
        
        bottone1.onclick = () => memory(bottone1, mazzo);
    }
}


let click1Bottone = 0;
let click2Bottone = 0;

function memory(bottone, mazzo) {
    let i = bottone.id - 1; // id come indice del mazzo

    // se la carta è già disattivata, esci
    if (bottone.disabled) return;

    // se ci sono già due carte girate e non combaciano, le richiudo
    if (click1Bottone !== 0 && click2Bottone !== 0) {
        let i1 = click1Bottone.id - 1;
        let i2 = click2Bottone.id - 1;

        if (mazzo[i1] !== mazzo[i2]) {
            click1Bottone.innerHTML = '<img src="Img/ignoto.png">';
            click2Bottone.innerHTML = '<img src="Img/ignoto.png">';
        }

        click1Bottone = 0;
        click2Bottone = 0;
    }

    // mostra la carta reale dal mazzo
    bottone.innerHTML = `<img src="${mazzo[i]}">`;

    // primo click
    if (click1Bottone == 0) {
        click1Bottone = bottone;
        return;
    }

    // secondo click
    if (click2Bottone == 0 && bottone !== click1Bottone) {
        click2Bottone = bottone;

        let i1 = click1Bottone.id - 1;
        let i2 = click2Bottone.id - 1;

        // se combaciano, disabilita entrambe le carte
        if (mazzo[i1] === mazzo[i2]) {
            click1Bottone.disabled = true;
            click2Bottone.disabled = true;

            click1Bottone.style.backgroundColor = "green";
            click2Bottone.style.backgroundColor = "green";

            click1Bottone = 0;
            click2Bottone = 0;
        }
    }
}


