import { BehaviorSubject, combineLatest, from } from 'rxjs'
import { debounceTime, switchMap, tap } from 'rxjs/operators'

const TodoApi: any = {
  requestList: () => {
    return [
      [
        { name: 'A', done: false },
        { name: 'B', done: false },
        { name: 'C', done: false },
        { name: 'D', done: false },
        { name: 'E', done: false },
        { name: 'F', done: false },
      ],
    ]
  },
}

class TodoService {
  // 用$标记一个 Observable
  private refresh$ = new BehaviorSubject(0)
  private loadingSource$ = new BehaviorSubject(false)
  loading$ = this.loadingSource$.asObservable()
  todoList$ = combineLatest(this.refresh$).pipe(
    debounceTime(250),
    tap(() => {
      this.loadingSource$.next(true)
    }),
    switchMap(() => {
      return from(TodoApi.requestList())
    }),
    tap(() => {
      this.loadingSource$.next(false)
    }),
  )
  refresh() {
    this.refresh$.next(Math.random())
  }
}

export default TodoService
