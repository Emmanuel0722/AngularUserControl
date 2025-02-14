import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  
})
export class UserListComponent {

  datos:any = [];
  // apiUrl:string = 'http://localhost:3000/';
  apiUrl:string = 'https://usercontrol.somee.com/api/UserControl';
  query:any
  
  UserUpdate:any = {
    userId:0,
    username:'',
    passControl:'',
    email:'',
    stateUser:''
  }

  Mess:string = "";

  currentPage:number = 1;
  recordsPerPage:number = 5;
  lastIndex:number = this.currentPage * this.recordsPerPage;
  firstIndex:number = this.lastIndex - this.recordsPerPage;
  record:any[] = [];
  npage:number = 0;
  numbers:any[] = [];

  nPPage:number = 5;
  pPPage:number = 0;

  constructor(private http: HttpClient) {
    this.getData().subscribe(
      (resp) => {
        
        this.datos = resp;
        this.record = this.datos.slice(this.firstIndex, this.lastIndex);
        this.npage = Math.ceil(this.datos.length / this.recordsPerPage);
        this.numbers = [...Array(this.npage + 1).keys()].slice(1);

      }
    )
  }
  
  test(): any {
    return console.table(this.record);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteData(userId:number) {
    //debugger
    if (confirm("Are you sure you want to delete this user?")) {
      this.http.delete(this.apiUrl + 'DeleteUser/' + userId)
      .subscribe((res:any) => {
        location.reload();
      })
    }else{
      const value:any = console.log("You didn't delete it...");
      return value;
    }
  }

  updateData(user:any){

    this.UserUpdate.userId = user.userId
    this.UserUpdate.username = user.username
    this.UserUpdate.passControl = user.passControl
    this.UserUpdate.email = user.email
    this.UserUpdate.stateUser = user.stateUser
  }

  Update() {
    if (this.UserUpdate.username !== '' && this.UserUpdate.passControl !== '' && this.UserUpdate.email !== '' && this.UserUpdate.stateUser !== '') {
      
      this.http.put(this.apiUrl, this.UserUpdate).subscribe((res:any) => {
        if (!res.result) {
          location.reload();
        }else{
          alert(res.message);
        }
      });
      

    }else{
      this.Mess = "All fields are required...";
      setTimeout(() => {
        this.Mess = "";
      }, 5000);
    }
  }

  prePage() {
    if (this.currentPage !== 1) {
      this.currentPage = this.currentPage -= 1;
      this.lastIndex = this.currentPage * this.recordsPerPage;
      this.firstIndex = this.lastIndex - this.recordsPerPage;
      this.record = this.datos.slice(this.firstIndex, this.lastIndex);
    }
  }

  changeCpage = (id:number) => {
    this.currentPage = id;
    this.lastIndex = this.currentPage * this.recordsPerPage;
    this.firstIndex = this.lastIndex - this.recordsPerPage;
    this.record = this.datos.slice(this.firstIndex, this.lastIndex);

  }

  nextPage() {
    if (this.currentPage !== this.npage) {
      this.currentPage = this.currentPage += 1;
      this.lastIndex = this.currentPage * this.recordsPerPage;
      this.firstIndex = this.lastIndex - this.recordsPerPage;
      this.record = this.datos.slice(this.firstIndex, this.lastIndex);
    }
  }

  pPage(){
    if (this.pPPage > 0) {      
      this.nPPage = this.nPPage -= 5;
      this.pPPage = this.pPPage -= 5;
    }
  }

  nPage(){
    if (this.nPPage < this.numbers.length) {      
      this.nPPage = this.nPPage += 5;
      this.pPPage = this.pPPage += 5;
    }
  }

}