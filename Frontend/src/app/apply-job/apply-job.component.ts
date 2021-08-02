import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {

  
  constructor(private _job:JobService,private routes:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  data1 = localStorage.getItem("jobId");
  data2 = localStorage.getItem("jobemail");
  

  signupForm = this.fb.group({
    uname:['',[Validators.required]],
    Uemail:['',[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    Cemail:[this.data2],
    hq:['',Validators.required],
    phoneno:['',[Validators.required,Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]],
    skill:['',Validators.required],
    experience:['',Validators.required],
    job_id:[this.data1],


  })  

  get signupFormControl() {
    return this.signupForm.controls;
  }
  signupUser() {
    console.log(this.data1) ;
    console.log(this.data2) 
    this._job.applyjob(this.signupForm.value).subscribe(
      res =>{
        
        Swal.fire("User sucessfully added");
        this.ngOnInit();
        
      },
      err =>{
         if(err.error.code === 11000){
          Swal.fire("email already in use");
         }else{
          Swal.fire("somting Went Worng");
           
           console.log(err);
           
         }
      } 
    )
    
  }



}
