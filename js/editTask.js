//skapar formulär för ny task
function resetTaskForm() {
    console.log("reset");
    fillDropdown();
    document.getElementById("dateinput").value = "";
    document.getElementById("timeinput").value = "";
    document.getElementById("commentinput").value = "";
}

//Fyller kategori dropdown menyn i formuläret med värden
function fillDropdown(activityId = -1) {

    let dropdown = document.getElementById('activityinput');
    dropdown.innerHTML = "";

    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/getActivityList.php')
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            let activities = data.activities;
            for (let i = 0; i < activities.length; i++) {
                let option = document.createElement('option');
                option.value = activities[i].id;
                option.innerHTML = activities[i].activity;
                if (activityId != -1 && activities[i].id == uppgiftid) {
                    option.selected = true;
                }
                dropdown.appendChild(option);
            }
        });
}

//Sparar eller Redigerar en uppgift mot databasen
function saveTask(id = -1) {

    let activityId = document.getElementById("activityinput").value;
    let date = document.getElementById("dateinput").value;
    let time = document.getElementById("timeinput").value;
    let comment = document.getElementById("commentinput").value;

    //Lägger till uppgift information i ett formdata objekt
    let FD = new FormData();
    FD.append("activityId", activityId);
    FD.append("date", date);
    FD.append("time", time);
    FD.append("description", comment);

    //Lägger till get-data om det är en befintlig uppgift som skall redigeras
    let getText;
    if (document.getElementById("taskformlegend").innerHTML == "Redigera Uppgift") {
        getText = "?id=" + id;
    } else {
        getText = "";
    }

    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/saveTask.php' + getText, {
        method: 'post',
        body: FD
    })
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            } 
            else { 
                throw (error); 
            }
        })
        .then(function (data) {
            resetTaskForm();
        })
}

function editTask(){

}

function deleteTask(){

}