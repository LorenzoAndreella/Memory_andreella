let mat = [];
let primaCarta = null;
let valprimaCarta = null;
let blocco = false;

function controllo(d) { 
    let par = document.getElementById('par'); 
    let diff = parseInt(d); 
    if (diff == 0) {
        par.innerText = "Seleziona una difficoltà"; 
        return; 
    } 

    document.getElementById('invia').disabled = true; 
    document.getElementById('diff').disabled = true; 
    mat = matr(diff);
    tabel(diff); 
    
} 

function tabel(diff) { 
    let formm = document.getElementById('formm');
    let tabella = document.createElement('div'); 

    tabella.style.display = "grid";
    tabella.style.gridTemplateColumns = `repeat(${diff}, 100px)`; 
    tabella.style.gap = "10px";
    tabella.style.margin = "20px auto";

    for (let i=0; i<diff; i++) {
        for (let j=0; j<diff; j++) {
            let divv = document.createElement('div'); 
            divv.classList.add("carta");
            divv.dataset.riga = i;
            divv.dataset.colonna = j;

            divv.style.width = "100px";
            divv.style.height = "120px";
            divv.style.backgroundImage = "url('Img/ignoto.png')";
            divv.style.backgroundSize = "cover";
            divv.style.backgroundPosition = "center";

            divv.onclick = () => giraCarta(divv);
            tabella.appendChild(divv); 
        }
    }
    formm.appendChild(tabella); 
}


function matr(diff) {
    let vet = [];
    for (let i=0; i<18; i++) {
        vet.push("img" + i + ".png");
        vet.push("img" + i + ".png");
    }
    
    for (let i=0; i<diff; i++) {
        mat[i] = [];
        for (let j=0; j<diff; j++) {
            let indice = Math.floor((Math.random() * vet.length));
            mat[i].push(vet[indice]);
            vet.splice(indice, 1);
        }
    }
    return mat;
}

function giraCarta(divv) {
    if (blocco || divv.classList.contains("scoperta") || divv == primaCarta) return;

    let r = divv.dataset.riga;
    let c = divv.dataset.colonna;
    
    let valore = mat[r][c];

    divv.style.backgroundImage = `url('Img/${valore}')`;
    divv.style.backgroundSize = "cover";
    divv.style.backgroundPosition = "center";

    if (!primaCarta) {
     
        primaCarta = divv;
        valprimaCarta = valore;
        return;
    }

  
    blocco = true;
    if (valore === valprimaCarta) {
    
        divv.classList.add('scoperta');
        primaCarta.classList.add('scoperta');
        resetTurno();

    } else {
      
        setTimeout(() => {
            divv.style.backgroundImage = `url('Img/ignoto.png')`;
            primaCarta.style.backgroundImage = `url('Img/ignoto.png')`;
            resetTurno();
        }, 1000);
    }

}

function resetTurno() {
    primaCarta = null;
    valprimaCarta = null;
    blocco=false;
}