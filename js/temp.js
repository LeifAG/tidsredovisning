function loadDates(){
    let date= new Date();
    document.getElementById("stopdate").value=date.toISOString().split('T')[0];
    date.setDate(date.getDate()-30)
    document.getElementById("startdate").value=date.toISOString().split('T')[0];
  
    updateTasklist();
  }
  
  function updateTasklist(){
    let startDate=document.getElementById("startdate").value;
    let stopDate=document.getElementById("stopdate").value;
  
    fetch('https://www.datanom.ax/~kjell/getTasklist.php?from='+startDate+'&to='+stopDate)
        .then(function(response){
            if(response.status==200){
              return response.json();
            }else{
              throw{status:response.status,message:response.json()};
            } 
        })
        .then(function(data){
          appendRows(data);
        })
        .catch(function(error){
          alert(error);
        });
    }
  
  function appendRows(data){
  
    let tasks=data.tasks;
  
    const parent = document.getElementById("uppgifter")
    while (parent.firstChild) {
      parent.firstChild.remove()
    }
  
    for (let i = 0; i < tasks.length; i++) {
      let tr, td_task, td_datum, td_tid, td_radera;
      tr=document.createElement('tr');
      tr.id='rad'+tasks[i].id;
      td_task=document.createElement('td');
      td_task.onclick=function(){
        editTask(tasks[i].id);
      };
      td_task.innerHTML=tasks[i].uppgift;
      td_datum=document.createElement('td');
      td_datum.innerHTML=tasks[i].datum;
      td_tid=document.createElement('td');
      td_tid.innerHTML=tasks[i].tid;
      td_radera=document.createElement('td');
      td_radera.innerHTML="Radera";
      td_radera.onclick=function(){
        deleteTask(tasks[i].id);
      };
      tr.appendChild(td_task);
      tr.appendChild(td_datum);
      tr.appendChild(td_tid);
      tr.appendChild(td_radera);
      document.getElementById('uppgifter').appendChild(tr);
    }
  }
  
  function deleteTask(id){
    if(confirm("Vill du radera denna uppgift?")){
      const FD = new FormData();
      FD.append("id",id);
      
      fetch('https://www.datanom.ax/~kjell/deleteTask.php',{
        method: 'post',
        body: FD
        })
        .then(function(response){
          if(response.status==200){
            return response.json();
          }else{
            throw{status:response.status,message:response.json()};
          } 
        })
        .then(function(text){
          //let tabellRad = document.getElementById("rad"+id);
          //tabellRad.remove();
          updateTasklist();
        })
        .catch(function(error){
          alert(error);
        });
    }
  }
  
  function saveTask(){
    let duty = document.getElementById("duties").value;
    let time = document.getElementById("time").value;
    let date = document.getElementById("date").value;
  
    const FD = new FormData();
    FD.append("id", duty);
    FD.append("datum", time);
    FD.append("tid", time);
  
    fetch('https://www.datanom.ax/~kjell/deleteTask.php',{
      method: 'post',
      body: FD
      })
      .then(function(response){
        if(response.status==200){
          return response.json();
        }else{
          throw{status:response.status,message:response.json()};
        } 
      })
      .then(function(text){
        let tabellRad = document.getElementById("rad"+id);
        tabellRad.remove();
      })
      .catch(function(error){
        alert(error);
      });
  }
  
  function editTask(id){
    fetch('https://www.datanom.ax/~kjell/getTasklist.php?from='+startDate+'&to='+stopDate)
        .then(function(response){
            if(response.status==200){
              return response.json();
            }else{
              throw{status:response.status,message:response.json()};
            } 
        })
        .then(function(data){
          appendRows(data);
        })
        .catch(function(error){
          alert(error);
        });
  }
  
  function dropdown(){
  
  }