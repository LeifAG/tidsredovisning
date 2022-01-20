//skapar formulär för ny task
function makeTaskForm() {
    let form = document.createElement("form");
    //form.onsubmit="saveTask();return false";
    let formfield = document.createElement("fieldset");

    let legend = document.createElement("legend");
    legend.innerHTML = "Ny Uppgift";
    legend.id = "taskformlegend";
    formfield.appendChild(legend);

    let label = document.createElement("label");
    label.for = "activityinput";
    label.innerHTML = "Kategori:";
    formfield.appendChild(label);
    let selectinput = document.createElement("select");
    selectinput.name = "activityinput";
    selectinput.id = "activityinput";
    formfield.appendChild(selectinput);

    let label2 = document.createElement("label");
    label2.for = "dateinput";
    label2.innerHTML = "Date:";
    formfield.appendChild(label2);
    let dateinput = document.createElement("input");
    dateinput.name = "dateinput";
    dateinput.id = "dateinput";
    dateinput.type = "date";
    dateinput.setAttribute("required", "");
    formfield.appendChild(dateinput);

    let label3 = document.createElement("label");
    label3.for = "timeinput";
    label3.innerHTML = "Time:";
    formfield.appendChild(label3);
    let timeinput = document.createElement("input");
    timeinput.name = "timeinput";
    timeinput.id = "timeinput";
    timeinput.type = "time";
    timeinput.setAttribute("required", "");
    formfield.appendChild(timeinput);

    let label4 = document.createElement("label");
    label4.for = "commentinput";
    label4.innerHTML = "Anteckning:";
    formfield.appendChild(label4);
    let commentinput = document.createElement("input");
    commentinput.name = "commentinput";
    commentinput.id = "commentinput";
    commentinput.type = "text";
    formfield.appendChild(commentinput);

    let saveButton = document.createElement("button");
    saveButton.innerHTML = "Spara uppgift";
    saveButton.type = "button";
    saveButton.onclick = function () { saveTask(); };
    formfield.appendChild(saveButton);

    form.appendChild(formfield);
    document.getElementById("edittask").appendChild(form);

    fillDropdown();
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
            console.log(activities);
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
    const FD = new FormData();
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

    function handleResponse(response) {
        return response.json()
            .then((json) => {
                if (!response.ok) {
                    const error = Object.assign({}, json, {
                        status: response.status,
                        statusText: response.statusText,
                    });

                    return Promise.reject(error);
                }
                document.getElementById("dateinput").value="";
                document.getElementById("timeinput").value="";
                document.getElementById("commentinput").value="";
                return json;
            });
    }

    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/saveTask.php' + getText, {
        method: 'post',
        body: FD
    })
        .then(handleResponse)
        .catch(error => {
            alert(error.error[1]);
        });

}