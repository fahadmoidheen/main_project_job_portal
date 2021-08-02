import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }


postjob(user:any){
  return this.http.post<any>("http://localhost:3000/postjob",user)
}

getjobs(){
  return this.http.get("http://localhost:3000/getjobs")
}
applyjob(data:any){
  return this.http.post("http://localhost:3000/applyjob",data)
}

newJobPost(item:any){
  return this.http.post<any>('http://localhost:3000/postJob',item)
  .subscribe(data=>{console.log(data)})
}

deletejobpost(data:any){
  return this.http.delete("http://localhost:3000/deletejobpost/"+data)
}

getJobs(){
  return this.http.get("http://localhost:3000/jobs");
}

applyJobget(applyjobdetails:any){
  return this.http.post<any>("http://localhost:3000/applyjob",applyjobdetails)
  .subscribe(data=>{console.log(data)})
}

applicantdata(data:any){
  console.log(data)
  return this.http.get("http://localhost:3000/applicant/"+data)
}

verifyalumni(alumni:any){
  console.log(alumni);
 return this.http.put("http://localhost:3000/verifyalumni/save",alumni)
 .subscribe(data =>{console.log(data)})
}


deleteapplicant(appdelete:any){
 
 return this.http.delete("http://localhost:3000//deleteapplicant/"+appdelete)
}

}
