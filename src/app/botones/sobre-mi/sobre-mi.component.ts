import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SobreMi } from 'src/app/Models/sobreMi.model';
import { SobreMiService } from 'src/app/Services/sobre-mi.service';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})

export class SobreMiComponent implements OnInit {

  sobreMi: SobreMi[];
  SobreMi:SobreMi= new SobreMi();
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  base64:String="";
  


  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    private SobreMiService: SobreMiService,
    public httpClient:HttpClient) {
   
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.SobreMiService.getSobreMi().subscribe(data => {this.sobreMi = data})
    this.editForm = this.fb.group({
      id: [''],
      linkGit: [''],
      linkDisc: [''],
      linkLinke: [''],
      descripcion: [''],
      img: [''],
      
    });
  }
  obtener(e: any) {     
  this.base64 = e[0].base64;   
}

openModal(targetModal: any) {
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'

  });
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
 

  // onSubmit(f: NgForm) {
  //   console.log(f.form.value);
  //   const url = 'http://localhost:8080/habilidades/crear';
  //   this.httpClient.post(url, f.value)
  //     .subscribe((result) => {
  //       this.habilidad!=result
  //       this.ngOnInit(); // reload the table
  //     });
  //   this.modalService.dismissAll(); // dismiss the modal
  // }

  Submit(){
    console.log(this.editForm.value);
  }


  guardar(){
    const url = 'http://localhost:8080/sobreMi/crear';
    this.editForm.value.img=this.base64;
    console.log(this.editForm.value);
     this.httpClient.post(url, this.editForm.value).subscribe(res=>{this.SobreMi!=res,
    this.ngOnInit();
  })
    this.modalService.dismissAll();
  }
  
  openEdit(targetModal, sobreMi: SobreMi) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: sobreMi.id,
      linkGit: sobreMi.linkGit,
      linkDisc: sobreMi.linkDisc,
      linkLinke: sobreMi.linkLinke,
      img: sobreMi.img,
    
    });
   }



  // onSave() {
  //   this.editForm.value.img=this.base64;
  //   console.log (this.editForm.value);
  //   const editURL = 'http://localhost:8080/habilidades/' + 'editar/'  + this.editForm.value.id ;
  //   this.httpClient.put(editURL, this.editForm.value)
  //     .subscribe((results) => {
  //       this.ngOnInit();
        
  //     });
    
  //     this.modalService.dismissAll();

  // }
  editar(){
    this.editForm.value.img=this.base64;
    console.log (this.editForm.value);
    const editURL = 'http://localhost:8080/sobreMi/' + 'editar/'  + this.editForm.value.id ;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.SobreMi!=results,
        this.ngOnInit();
        
      });
    
      this.modalService.dismissAll();
  
  }

  openDelete(targetModal, sobreMi:SobreMi) {
    this.deleteId= sobreMi.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/sobreMi/' +  'borrar/'+ this.deleteId ;
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


