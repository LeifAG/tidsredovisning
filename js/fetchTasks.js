function getTasklist(page) {
    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/getTasklist.php?page=' + page)
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            appendRows(data);
        })
}

function appendRows(data) {
    let tr, td_task, td_datum, td_tid, td_radera;
    let tasks = data.tasks;

    //hämtar tabellkroppen och tömmer den
    let tablebody = document.getElementById("tasktablebody")
    tablebody.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        //skapa tabellrad med id row# för elementet
        tr = document.createElement('tr');
        tr.id = 'row' + tasks[i].id;

        //skapar uppgift cell i raden
        td_task = document.createElement('td');
        td_task.innerHTML = tasks[i].activity;

        //skapar datum cell i raden
        td_datum = document.createElement('td');
        td_datum.innerHTML = tasks[i].date;

        //skapar tid cell i raden
        td_tid = document.createElement('td');
        td_tid.innerHTML = tasks[i].time;
        
        //skapar radera cell i raden
        td_radera = document.createElement('td');
        td_radera.innerHTML = "Radera";

        //lägger till celler i raden och sen i tabellkroppen
        tr.appendChild(td_datum);
        tr.appendChild(td_task);
        tr.appendChild(td_tid);
        tr.appendChild(td_radera);
        tablebody.appendChild(tr);
    }
}

window.onload = function () {
    getTasklist(1);
}

/*
function loadDates() {
    let date = new Date();
    document.getElementById("stopdate").value = date.toISOString().split('T')[0];
    date.setDate(date.getDate() - 30)
    document.getElementById("startdate").value = date.toISOString().split('T')[0];

    updateTasklist();
}

function updateTasklist() {
    let startDate = document.getElementById("startdate").value;
    let stopDate = document.getElementById("stopdate").value;

    fetch('https://www.datanom.ax/~kjell/getTasklist.php?from=' + startDate + '&to=' + stopDate)
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            } else {
                throw { status: response.status, message: response.json() };
            }
        })
        .then(function (data) {
            appendRows(data);
        })
        .catch(function (error) {
            alert(error);
        });
}
*/