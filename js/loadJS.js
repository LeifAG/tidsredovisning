//när sidan laddats startas js funtioner
window.onload = function () {
    setDates();
    fillDropdown();
    getTasklistPages(1);
    document.getElementById("dateGet").addEventListener("click",function(){getTasklistDates()});
    document.getElementById("pageGet").addEventListener("click",function(){getTasklistPages(1)});
}