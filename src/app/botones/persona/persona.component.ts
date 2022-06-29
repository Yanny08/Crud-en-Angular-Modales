import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
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
    persona:Persona= new Persona();
    closeResult: string;
    editForm: FormGroup;
    private deleteId: number;
    base64:String="";
    
  
  
    constructor(config: NgbModalConfig, 
      private modalService: NgbModal,
      private fb: FormBuilder,
      private PersonaService:PersonaService,
      public httpClient:HttpClient) {
      
      config.backdrop = 'static';
      config.keyboard = false;
    }
  
    
  
    ngOnInit(): void {
      this.PersonaService.getPersona().subscribe(data => {this.personas = data})
      this.editForm = this.fb.group({
        id: [''],
        nombre: [''],
        apellido: [''],
        img: [''],
        
      });
    }
    obtener(e: any) {     
    this.base64 = e[0].base64;   
  }
  
    //   public getPersona(){
    //   this.PersonaService.getPersona().subscribe(data => (this.personas = data))
    // }

 
  
    //  getPersona(){
    //   this.httpClient.get<any>('http://localhost:8080/personas/traer').subscribe(
    //      response =>{
    //       console.log(response);
    //       this.personas =response;
    //     }
    //   )
    // }
  
  
    onSubmit(f: NgForm) {
      console.log(f.form.value);
      const url = 'http://localhost:8080/personas/crear';
      this.httpClient.post(url, f.value)
        .subscribe((result) => {
          this.ngOnInit(); // reload the table
        });
      this.modalService.dismissAll(); // dismiss the modal
    }
  
    openEdit(targetModal, persona:Persona) {
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
  
  
  
    onSave() {
      this.editForm.value.img=this.base64;
      console.log (this.editForm.value);
      const editURL = 'http://localhost:8080/personas/' + 'editar/'  + this.editForm.value.id ;
      this.httpClient.put(editURL, this.editForm.value)
        .subscribe((results) => {
          this.ngOnInit();
          
        });
      
        this.modalService.dismissAll();

    }
  
    openDelete(targetModal, persona:Persona) {
      this.deleteId = persona.id;
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg'
      });
    }
  
    onDelete() {
      const deleteURL = 'http://localhost:8080/personas/' +  'borrar/'+ this.deleteId ;
      this.httpClient.delete(deleteURL)
        .subscribe((results) => {
          this.ngOnInit();
          this.modalService.dismissAll();
        });
    }
  
  
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  
  
  
  function next(next: any, arg1: (response: any) => void) {
    throw new Error('Function not implemented.');
  }

