import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/Models/persona.model';
import { PersonaService } from 'src/app/Services/persona.service';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas: Persona[];
  Persona = new Persona();
  closeResult: string;
  editForm!: FormGroup;
  private deleteId: number;
  base64:string="";
  


  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private form: FormBuilder,
    private PersonaService: PersonaService,
    public httpClient:HttpClient) {
   
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.PersonaService.getPersona().subscribe(data => {this.personas = data})
    this.editForm = this.form.group({
      id: [''],
      nombre: [''],
      apellido: [''],
      img: [''],
      
    });
  }
  

obtener($event:any){
  this.base64=$event[0].base64;
  this.editForm.value.img=this.base64;
 }

 modalAgregar(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

 guardar(){
   const url = 'http://localhost:8080/personas/crear';
   console.log(this.editForm.value);
    this.httpClient.post(url, this.editForm.value).subscribe(res=>{this.personas!=res,
   this.ngOnInit();
   this.modalService.dismissAll();
 })
 }
 
 

 modalEdit(targetModal, persona:Persona) {
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: persona.id,
    nombre: persona.nombre,
    apellido: persona.apellido,
    img: persona.img,
  
  });

 }

 editar() {
  const editURL = 'http://localhost:8080/personas/' + 'editar/'  + this.editForm.value.id ;
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  

  borrar(targetModal, persona:Persona) {
    this.deleteId= persona.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  modalBorrar() {
    const deleteURL = 'http://localhost:8080/personas/' +  'borrar/'+ this.deleteId ;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
  

