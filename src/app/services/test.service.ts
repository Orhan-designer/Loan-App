import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    loansList: any[] = [
        { loanName: 'Test', firstPerson: { name: 'Andrey', id: 1 }, secondPerson: { name: 'Andrey', id: 1 }, howMuch: '50', reason: 'party', date: '11/10/2022' },
        { loanName: 'loan', firstPerson: { name: 'Andrey', id: 1 }, secondPerson: { name: 'Orhan', id: 2 }, howMuch: '150', reason: 'home', date: '12/10/2022' }
    ];

    user: any = {
        friends: [1, 3]
    }

    usersList: any[] = [
        { name: 'Andrey', id: 1 },
        { name: 'Orhan', id: 2 },
        { name: 'Valeh', id: 3 },
        { name: 'Dima', id: 4 },
        { name: 'Nikita', id: 5 },
    ];

    get loans() {
        return this.loansList;
    }

    get users() {
        return this.usersList;
    }

    constructor() { }

    addLoan(loan: any): void {
        this.loansList.push(loan); //call api post
    }

    getFriends() {
        return this.users.filter((el) => this.user.friends.includes(el.id)) //call api to get friends
        //коллекция юзеров
        //твой профиль-друзья
        //фильтруешь
    }
}
