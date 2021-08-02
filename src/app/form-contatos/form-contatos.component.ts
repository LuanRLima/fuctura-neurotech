import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import{ Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
import { ContatosService } from '../service/contatos/contatos.service';

@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-contatos.component.html',
  styleUrls: ['./form-contatos.component.scss']
})
export class FormContatosComponent implements OnInit {

  formContatos = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, ])


  });
  

  constructor(private router: Router, public contatosService: ContatosService) { }

  ngOnInit(): void {
    this.contatosService.botaoEdit.subscribe(edit => {
      if(edit !== null){
        console.log(edit, 'valor do edit')
        this.formContatos.get('name').setValue(edit.name);
        this.formContatos.get('phone').setValue(edit.phone);
        this.formContatos.get('email').setValue(edit.email);
      }
      
    })
  }

  save(){
    if(this.formContatos.valid){
    Swal.fire({
      icon: 'success',
      title: 'Eeeba..',
      text:'Contato criado com sucesso!'
    });
    this.router.navigate(['/lista-contatos']);
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Ooooops',
      text: 'Cadastro não realizado'
    });
  }

  }

}
