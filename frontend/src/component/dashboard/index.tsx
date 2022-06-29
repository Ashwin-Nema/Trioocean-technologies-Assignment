import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { BASEURL } from '../../config'
import { useNavigate } from 'react-router-dom'
import { AlertModal } from '../modal'
import {openModalWithVariantAndMessage} from '../../utility'

export const Dashboard = () => {
    const [listData, setlistData] = useState([])
    const [count, setCount] = useState(0)
    const [modalVariant, setModalVariant] = useState("success")
    const [modalMessage, setModalMessage] = useState("")
    const [modal, showModal] = useState(false)

    const fixedModalParameters = [showModal, setModalMessage, setModalVariant]
    const navigate = useNavigate();
  

    const getListData = () => {
        fetch(`${BASEURL}`).then(res => res.json()).then((res) => {
            const { count, data } = res
            setCount(Number(count))
            setlistData(data)
        })
    }



    const deleteTask = (id: Number) => {
        fetch(`${BASEURL}/${id}`, { method: 'DELETE' }).then(res => res.json()).then((res) => {
            const { code, message } = res
            if (code === 200) {
                openModalWithVariantAndMessage(message, "success", fixedModalParameters)
                getListData()
            }
        }).catch(() => {
            // openModalWithVariantAndMessage("Sorry something went wrong!", "danger", fixedModalParameters)
        })
    }

    useEffect(() => {
        getListData()
    }, [])

    const navigateToListItemDetails = (id: Number) => {
        navigate(`/task/${id}`)
    }

    return (
        <>
            <AlertModal variant={modalVariant} message={modalMessage} onhide={showModal} showmodal={modal} />
            <div>
                <div className="d-flex justify-content-center my-3">
                    <strong className="fs-3">Dashboard</strong>
                </div>

                <div className="d-flex justify-content-end mb-3 me-3 ">
                    <Link to='/addtodo'>Add New Task</Link>
                </div>

                {
                    listData.map((item: any) => {
                        return (
                            <div className='m-3 border p-2  d-flex justify-content-between' key={item.id}>
                                <div onClick={() => navigateToListItemDetails(item.id)} className='text-break hover'>
                                    {item.title}
                                </div>

                                <div>
                                    <i onClick={() => deleteTask(item.id)} className='bi bi-trash3 hover'></i>
                                </div>
                            </div>
                        )
                    })
                }






                {
                    count === 0 && <div className="d-flex justify-content-center mt-5 lead">
                        You have not added any task. Please add task
                    </div>
                }

            </div>
        </>
    );
}