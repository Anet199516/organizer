import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Response, Task} from "./date.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url = 'https://angular-practise-calenda-36657.firebaseio.com/';

  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment) {
    return this.http.get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) {
            return [];
          }
          return Object.keys(tasks).map((key) => ({...tasks[key], id: key}) )
        })
      )
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Response>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(
        map(res => {
          console.log('Response:', res);
          return {...task, id: res.name};
        })
      )
  }

  remove(task: Task): Observable<void> {
    return this.http.delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
  }
}
