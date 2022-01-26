//hämtar compilation baserat på datum
function getCompilation() {
    let startDate = document.getElementById("startDate").value;
    let stopDate = document.getElementById("stopDate").value;

    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/getCompilation.php?from=' + startDate + "&to=" + stopDate)
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            appendRows(data);
        })
}

//lägger till rader av tasks till tabell på sidan
function appendRows(data) {
    let tablebody, tr, td_task, td_tid, tasks;

    //skapar tasks array från hämtningen data
    tasks = data.tasks;

    //hämtar tabellkroppen och tömmer den
    tablebody = document.getElementById("compilationtablebody")
    tablebody.innerHTML = "";

    //loppar genom tasks arrayn och skapar rader
    for (let i = 0; i < tasks.length; i++) {

        //skapa tabellrad med id row# för elementet
        tr = document.createElement('tr');

        //skapar uppgift cell i raden
        td_task = document.createElement('td');
        td_task.innerHTML = tasks[i].activity;

        //skapar tid cell i raden
        td_tid = document.createElement('td');
        td_tid.innerHTML = tasks[i].time;

        //lägger till celler i raden och sen i tabellkroppen
        tr.appendChild(td_task);
        tr.appendChild(td_tid);
        tablebody.appendChild(tr);
    }
}

//sätter default värden på datumfälten på sidan, dagens datum och ett datum bakåt i tiden
function setDates() {
    let date = new Date();
    document.getElementById("stopDate").value = date.toISOString().split('T')[0];
    date.setDate(date.getDate() - 400)
    document.getElementById("startDate").value = date.toISOString().split('T')[0];
}

//när sidan laddats startas js funtioner
window.onload = function () {
    setDates();
    getCompilation();
    document.getElementById("dateGet").addEventListener("click",function(){getCompilation()});
}