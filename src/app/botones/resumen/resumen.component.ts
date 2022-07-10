import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Resumen} from 'src/app/Models/resumen.model';
import { ResumenService } from 'src/app/Services/resumen.service';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
    
    resumen: Resumen[];
    Resumen = new Resumen();
    closeResult: string;
    editForm: FormGroup;
    private deleteId: number;
    
  
  
    constructor(config: NgbModalConfig, 
      private modalService: NgbModal,
      private form: FormBuilder,
      private ResumenService:ResumenService,
      public httpClient:HttpClient) {
     
      config.backdrop = 'static';
      config.keyboard = false;
    }
  
    
  
    ngOnInit(): void {
      this.ResumenService.getResumen().subscribe(data => {this.resumen = data})
      this.editForm = this.form.group({
        id: [''],
        puesto: [''],
        organismo: [''],
        fechaIni: [''],
        fechaFin: [''],
        descripcion: [''],
        
      });
    }

    modalAgregar(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    guardar(){
      const url = 'http://localhost:8080/resumen/crear';
      console.log(this.editForm.value);
       this.httpClient.post(url, this.editForm.value).subscribe(res=>{this.resumen!=res,
      this.ngOnInit();
      this.modalService.dismissAll();
    })
    }
  

  
    modalEdit(targetModal, resumen:Resumen) {
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
        size: 'lg'
      });
      this.editForm.patchValue( {
        id: resumen.id,
        puesto: resumen.puesto,
        organismo: resumen.organismo,
        fechaIni: resumen.fechaIni,
        fechaFin: resumen.fechaFin,
        descripcion: resumen.descripcion,
      });
     }

   
    editar() {
      const editURL = 'http://localhost:8080/resumen/' + 'editar/'  + this.editForm.value.id ;
      this.httpClient.put(editURL, this.editForm.value)
        .subscribe((results) => {
          this.ngOnInit();
          this.modalService.dismissAll();
        });
    }
  
    borrar(targetModal, resumen:Resumen) {
      this.deleteId = resumen.id;
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg'
      });
    }
  
    modalBorrar() {
      const deleteURL = 'http://localhost:8080/resumen/' +  'borrar/'+ this.deleteId ;
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
  

