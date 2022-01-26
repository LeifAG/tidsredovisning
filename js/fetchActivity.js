//hämtar lista med tasks sidvis
function getActivitylist() {
    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/getActivityList.php')
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
    let tablebody, tr, td_activity, td_radera, activities;

    //skapar activities array från hämtningen data
    activities = data.activities;

    //hämtar tabellkroppen och tömmer den
    tablebody = document.getElementById("activitytablebody")
    tablebody.innerHTML = "";

    //loppar genom tasks arrayn och skapar rader
    for (let i = 0; i < activities.length; i++) {

        //skapa tabellrad med id row# för elementet
        tr = document.createElement('tr');
        tr.id = 'row' + activities[i].id;

        //skapar uppgift cell i raden
        td_activity = document.createElement('td');
        td_activity.innerHTML = activities[i].activity;
        td_activity.onclick=function(){editActivity(activities[i].id)}

        //skapar radera cell i raden
        td_radera = document.createElement('td');
        td_radera.innerHTML = "X";
        td_radera.onclick=function(){
            if(confirm("Vill du radera detta kategori?")){
                deleteActivity(activities[i].id)}}

        //lägger till celler i raden och sen i tabellkroppen
        tr.appendChild(td_activity);
        tr.appendChild(td_radera);
        tablebody.appendChild(tr);
    }
}

//när sidan laddats startas js funtioner
window.onload = function () {
    getActivitylist();
}