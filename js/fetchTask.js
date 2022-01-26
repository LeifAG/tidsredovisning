//hämtar lista med tasks sidvis
function getTasklistPages(page) {
    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/getTasklist.php?page=' + page)
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            appendRows(data, page);
        })
}

//hämtar lista med tasks baserat på datum
function getTasklistDates() {
    let startDate = document.getElementById("startDate").value;
    let stopDate = document.getElementById("stopDate").value;

    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/getTasklist.php?from=' + startDate + "&to=" + stopDate)
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
function appendRows(data, page = 0) {
    let tablebody, pagenav, tr, td_task, td_datum, td_tid, td_radera, td_desc, pages, tasks;

    //skapar tasks array från hämtningen data
    tasks = data.tasks;

    //laggrar antalet sidor om hämtningen är med sidor
    if (page != 0) { pages = data.pages; }

    //tömmer sidnav div
    pagenav = document.getElementById("pagenav");
    pagenav.innerHTML = "";

    //hämtar tabellkroppen och tömmer den
    tablebody = document.getElementById("tasktablebody")
    tablebody.innerHTML = "";

    //loppar genom tasks arrayn och skapar rader
    for (let i = 0; i < tasks.length; i++) {

        //skapa tabellrad med id row# för elementet
        tr = document.createElement('tr');
        tr.id = 'row' + tasks[i].id;

        //skapar uppgift cell i raden
        td_task = document.createElement('td');
        td_task.innerHTML = tasks[i].activity;
        td_task.onclick=function(){editTask(tasks[i].id)}

        //skapar datum cell i raden
        td_datum = document.createElement('td');
        td_datum.innerHTML = tasks[i].date;

        //skapar tid cell i raden
        td_tid = document.createElement('td');
        td_tid.innerHTML = tasks[i].time;

        //skapar tid cell i raden
        td_desc = document.createElement('td');
        td_desc.innerHTML = tasks[i].description;

        //skapar radera cell i raden
        td_radera = document.createElement('td');
        td_radera.innerHTML = "X";
        td_radera.onclick=function(){
            if(confirm("Vill du radera detta kategori?")){
                deleteTask(tasks[i].id)}}

        //lägger till celler i raden och sen i tabellkroppen
        tr.appendChild(td_datum);
        tr.appendChild(td_tid);
        tr.appendChild(td_task);
        tr.appendChild(td_desc);
        tr.appendChild(td_radera);
        tablebody.appendChild(tr);
    }

    //kallar på sidnav function om hämtningen är av typen sidor
    if (page != 0) { appendPageNav(pagenav, page, pages); }

}

//skapar sidnavigering bland tasks
function appendPageNav(pagenav, page, pages) {
    let ul, li_ff, li_f, li_n, li_nn;

    ul = document.createElement('ul');

    //lägger till olika fram och bakåt knappar beroende på vilken sida man är på
    if (page != 1 && page != 2) {
        li_ff = document.createElement('li');
        li_ff.innerHTML = "&lt;&lt;";
        li_ff.onclick = function () { getTasklistPages(1) };
        ul.appendChild(li_ff);
    }
    if (page != 1) {
        li_f = document.createElement('li');
        li_f.innerHTML = "&lt";
        li_f.onclick = function () { getTasklistPages(page - 1) };
        ul.appendChild(li_f);
    }
    if (page != pages) {
        li_n = document.createElement('li');
        li_n.innerHTML = "&gt;";
        li_n.onclick = function () { getTasklistPages(page + 1) };
        ul.appendChild(li_n);
    }
    if (page != pages && page != (pages - 1)) {
        li_nn = document.createElement('li');
        li_nn.innerHTML = "&gt;&gt;";
        li_nn.onclick = function () { getTasklistPages(pages) };
        ul.appendChild(li_nn);
    }

    pagenav.appendChild(ul);
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
    fillDropdown();
    getTasklistPages(1);
    document.getElementById("dateGet").addEventListener("click",function(){getTasklistDates()});
    document.getElementById("pageGet").addEventListener("click",function(){getTasklistPages(1)});
}