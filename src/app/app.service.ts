import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private http: HttpClient
    ) { }

    insertPersonPhone(model?: any): Observable<any> {
        return this.http.post(environment.baseUrl + 'InsertPersonPhone', model);
    }

    updatePersonPhone(model?: any): Observable<any> {
        return this.http.put(environment.baseUrl + 'UpdatePersonPhone', model);
    }

    deletePersonPhone(model?: any): Observable<any> {
        return this.http.delete(environment.baseUrl + 'DeletePersonPhone', model);
    }

    selectPersonPhone(model?: any): Observable<any> {
        return this.http.get(environment.baseUrl + 'SelectPersonPhone', model);
    }

    selectAllPersonPhone(model?: any): Observable<any> {
        return this.http.get(environment.baseUrl + 'SelectAllPersonPhone', model);
    }
}
