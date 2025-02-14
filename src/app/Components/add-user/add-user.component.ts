import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

// ESTO SE USO PARA AGREGAR EL FORMSMODULE EN EL IMPORT...
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  url:string = 'https://usercontrol.somee.com/api/UserControl/';
  User:any = {
    userId:0,
    username:'',
    passControl:'',
    email:'',
    stateUser:''
  }

  // MENSAJES DE ERROR...
  Mess:string = "";

  http = inject(HttpClient);

  onSave() {
    if (this.User.username !== '' && this.User.passControl !== '' && this.User.email !== '' && this.User.stateUser !== '') {
      this.http.post(this.url, this.User).subscribe((res:any) => {
        if (!res.result) {
          location.reload();
        }else{
          alert(res.message);
        }
      })
    }else{
      this.Mess = "All fields are required...";
      setTimeout(() => {
        this.Mess = "";
      }, 5000);
    }
  }

}
