//skapar formulär för ny task
function resetActivityForm() {
    document.getElementById("activityformlegend").innerHTML="Ny Kategori";
    document.getElementById("activityinput").value = "";
    document.getElementById("sendActivity").onclick=function(){
        saveActivity();
    }
}

//Sparar eller Redigerar en uppgift mot databasen
function saveActivity(id = -1) {
    //hämta input från formulär
    let activity = document.getElementById("activityinput").value;

    //skapa ett formdata objekt
    let FD = new FormData();
    FD.append("activity", activity);

    let getText="";
    if(id!=-1){
        getText="?id="+id;
    }

    //Sparar via fetch med post data
    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/saveActivity.php'+getText,
        {
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
            resetActivityForm();
            getActivitylist()
        })
}

function editActivity(id) {
    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/getActivity.php?id=' + id)
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            document.getElementById("activityformlegend").innerHTML="Redigera Kategori";
            document.getElementById("activityinput").value = data.activity;
            document.getElementById("sendActivity").onclick=function(){
                saveActivity(data.id);
            }
        })
}

function deleteActivity(id) {
    //skapa ett formdata objekt
    let FD = new FormData();
    FD.append("id", id);

    //Sparar via fetch med post data
    fetch('https://www.datanom.ax/~kjell/Tidsredovisning/deleteActivity.php',
        {
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
            getActivitylist()
        })
}