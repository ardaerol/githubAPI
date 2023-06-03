// elementeri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");



// elementler bititi

// nesneleri oluşturma
const github = new Github();
const ui = new UI();

// -------------
eventListener();

function eventListener(){
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    // inputa girilen ismin değerini username atıyo 
    // bu username i github classında ki getgithubdata fonksiyonuna yollayarak işlemleri yapıyo
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen kullanıcı adını giriniz.");
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
               ui.showError("Kullanıcı bulunamadı","danger");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }
    
    ui.clearInput(); // input değerini temizleme
    e.preventDefault();
}

function clearAllSearched(){
    
    // Tüm arananları silicek

    if(confirm("Emin misiniz?")){
        ui.clearAllSearchedFromUI();
        Storage.clearAllSearchedUsersFromStorage();
        ui.showError("Son aramalar silindi","success")
    }
}

function getAllSearched(){
    //storageden alcak arananları
  let users = Storage.getSearchedUserFromStorage();

    let result = "";
  users.forEach(user => {

    result += `
    <li class="list-group-item">${user} </li>
    `;

  })

  lastUsers.innerHTML = result;
}