function getTasklistPage(page) {
    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/getTasklist.php?page=' + page)
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            appendRowsPage(data, page);
        })
}

function appendRowsPage(data, page) {
    let tr, td_task, td_datum, td_tid, td_radera, td_desc;
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

        //skapar tid cell i raden
        td_desc = document.createElement('td');
        td_desc.innerHTML = tasks[i].description;
        
        //skapar radera cell i raden
        td_radera = document.createElement('td');
        td_radera.innerHTML = "X";

        //lägger till celler i raden och sen i tabellkroppen
        tr.appendChild(td_datum);
        tr.appendChild(td_tid);
        tr.appendChild(td_task);
        tr.appendChild(td_desc);
        tr.appendChild(td_radera);
        tablebody.appendChild(tr);
    }

    let ul, li_ff, li_f, li_n, li_nn;
    let pages = data.pages;
    console.log("page="+page+" and pages="+pages);

    let pagenav = document.getElementById("pagenav")
    pagenav.innerHTML="";
    ul = document.createElement('ul');

    if(page!=1&&page!=2){
        li_ff = document.createElement('li');
        li_ff.innerHTML="&lt;&lt;";
        li_ff.onclick=function(){getTasklistPage(1)};
        ul.appendChild(li_ff);
    }
    if(page!=1){
        li_f = document.createElement('li');
        li_f.innerHTML="&lt";
        li_f.onclick=function(){getTasklistPage(page-1)};
        ul.appendChild(li_f);
    }
    if(page!=pages){
        li_n = document.createElement('li');
        li_n.innerHTML="&gt;";
        li_n.onclick=function(){getTasklistPage(page+1)};
        ul.appendChild(li_n);
    }
    if(page!=pages&&page!=(pages-1)){
        li_nn = document.createElement('li');
        li_nn.innerHTML="&gt;&gt;";
        li_nn.onclick=function(){getTasklistPage(pages)};
        ul.appendChild(li_nn);
    }

    pagenav.appendChild(ul);

}

window.onload = function () {
    getTasklistPage(1);
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