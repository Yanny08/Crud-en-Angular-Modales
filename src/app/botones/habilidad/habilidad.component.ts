import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,} from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/Models/habilidad.model';
import { HabilidadService } from 'src/app/Services/habilidad.service';


@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit {

  habilidades: Habilidad[];
  Habilidad= new Habilidad();
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  base64:String="";
  


  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private form: FormBuilder,
    private  HabilidadService: HabilidadService,
    public httpClient:HttpClient) {
   
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.HabilidadService.getHabilidad().subscribe(data => {this.habilidades = data})
    this.editForm = this.form.group({
      id: [''],
      img: [''],
      tecnologia: [''],
      porcentaje: [''],
      
    });
  }

openModal(targetModal: any) {
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'

  });
}

obtener(e: any) {     
  this.base64 = e[0].base64; 
  this.editForm.value.img=this.base64;  
}

openEdit(targetModal, habilidad: Habilidad) {
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: habilidad.id,
    img: habilidad.img,
    tecnologia: habilidad.tecnologia,
    porcentaje: habilidad.porcentaje,
    
  
  });
 }

  guardar(){
    const url = 'http://localhost:8080/habilidades/crear';
    console.log(this.editForm.value);
     this.httpClient.post(url, this.editForm.value).subscribe(res=>{this.Habilidad!=res,
    this.ngOnInit();
  })
    this.modalService.dismissAll();
  }
  
  



  openDelete(targetModal, habilidad:Habilidad) {
    this.deleteId= habilidad.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/habilidades/' +  'borrar/'+ this.deleteId ;
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

