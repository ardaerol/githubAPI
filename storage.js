class Storage{
    static getSearchedUserFromStorage(){
        // Tüm kullanıcıları al

        let users;

        if(localStorage.getItem("searched") === null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearchedUserToStorage(username){
        // kullanıcı ekle
        let users = this.getSearchedUserFromStorage();

        // indexof

        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }

    static clearAllSearchedUsersFromStorage(){
        // Tüm kullanıcıları sil

        localStorage.removeItem("searched");
    }
}