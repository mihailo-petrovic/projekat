function deleteUser(){
    let c = confirm("Are you sure?");
    if(c == false) {
        return;
    } else {
        let users = JSON.parse(localStorage.getItem("projectTMDBUsers"));
        let username = JSON.parse(localStorage.getItem("loggedInTMDBUser"));
        let index = users.findIndex(u => u.username === username);
        users.splice(index, 1);
        localStorage.setItem("projectTMDBUsers", JSON.stringify(users));
        window.location = "index.html";
    }
}

export default deleteUser;