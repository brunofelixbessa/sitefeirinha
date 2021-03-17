// Menu responsivo
let show = true;
const menuSection = document.getElementById("header-id");
menuSection.addEventListener("click", () => {

    document.body.style.overflow = show ? "hidden" : "initial";

    menuSection.classList.toggle("on", show);
    show = !show;
});

// Firebase
function storeData() {

    var inputPun = document.getElementById("txtAviso").value;

    firebase.firestore().collection("posts").add({
            aviso: inputPun,
            likes: 0
        })
        .then(function () {
            readData();
            console.log("Doc successful");
        })
        .catch(function (error) {
            console.error("Error writing doc", error);
        });
}

function readData() {
    const todosPosts = firebase.firestore().collection("posts")
    document.getElementById("postsLista").innerHTML = "";
    todosPosts.get().then(result => {
        result.forEach(element => {
            addPost(element);
        });
    });
}

function addPost(element) {

    const postTemplate = `<li id=${element.id}>
        ${element.data().aviso} <strong> ${element.data().likes} </strong>
    <li>`

    document.getElementById("postsLista").innerHTML += postTemplate;

}

function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();