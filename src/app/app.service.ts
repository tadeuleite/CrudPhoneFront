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
        return this.http.post(environment.baseUrl + 'PersonPhone/InsertPersonPhone', model);
    }

    updatePersonPhone(model?: any): Observable<any> {
        return this.http.put(environment.baseUrl + 'PersonPhone/UpdatePersonPhone', model, { params: {newPhoneNumber: '123'} });
    }

    deletePersonPhone(model?: any): Observable<any> {
        return this.http.delete(environment.baseUrl + 'PersonPhone/DeletePersonPhone', { params: model });
    }

    selectPersonPhone(model?: any): Observable<any> {
        return this.http.get(environment.baseUrl + 'PersonPhone/SelectPersonPhone', { params: model });
    }

    selectAllPersonPhone(model?: any): Observable<any> {
        return this.http.get(environment.baseUrl + 'PersonPhone/SelectAllPersonPhone', { params: model });
    }
}
