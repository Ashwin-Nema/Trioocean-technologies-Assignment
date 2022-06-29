import {TaskDetailsForms} from '../task details form'
import {BASEURL} from '../../config'
export const AddTask = () => {
    return (
        <div>
        <div className="w-100 d-flex justify-content-center lead p-3 mb-3">
            Add new task
        </div>
        <TaskDetailsForms  buttonLabel="Add New Task" apiURL={BASEURL} apiMethod="POST"/>
    </div>
    )
}