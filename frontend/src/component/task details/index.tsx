import { TaskDetailsForms } from '../task details form'
import { BASEURL } from '../../config'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { openModalWithVariantAndMessage } from '../../utility'
import { AlertModal } from '../modal'
import { useNavigate } from 'react-router-dom'
export const TaskDetails = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [title, setttitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [taskDate, setTaskDate] = useState<Date | null>(null)
    const [modalVariant, setModalVariant] = useState<string>("success")
    const [modalMessage, setModalMessage] = useState<string>("")
    const [modal, showModal] = useState<boolean>(false)
    
    const fixedModalParameters = useMemo(() => {
        return [showModal, setModalMessage, setModalVariant]
    }, [])
     
    
    const showErrorMessageAndRredirect  = useCallback(() => {
        openModalWithVariantAndMessage("Sorry no data found for the given id", "danger", fixedModalParameters)
        setTimeout(() => {
            navigate("/")
        }, 2000);
    }, [fixedModalParameters, navigate])


    useEffect(() => {
        const { id } = params
        fetch(`${BASEURL}/${id}`).then(res => res.json()).then((res) => {
            const {code, data} = res
            if (code === 200 && data.length === 1) {
                setttitle(data[0].title)
                setDescription(data[0].description)
                setTaskDate(data[0].due_date)
                return
            } 
            showErrorMessageAndRredirect()
        }).catch(() => {
            showErrorMessageAndRredirect()
        })
    }, [showErrorMessageAndRredirect, params])
    return (
        <>
            <AlertModal variant={modalVariant} message={modalMessage} onhide={showModal} showmodal={modal} />
            <div>
                <div className="w-100 d-flex justify-content-center lead p-3 mb-3">
                    Task Details
                </div>
                {  <TaskDetailsForms title={title} description={description} date={taskDate} buttonLabel="Update Task Details" apiURL={`${BASEURL}/${params.id}`} apiMethod="PUT" />}
            </div>
        </>
    )
}