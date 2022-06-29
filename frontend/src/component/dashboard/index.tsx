import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { BASEURL } from '../../config'
import { useNavigate } from 'react-router-dom'
import { AlertModal } from '../modal'
import { openModalWithVariantAndMessage } from '../../utility'
import TablePagination from '@mui/material/TablePagination';
import React from 'react'

interface DashboardListData {
    id: Number,
    title: string
}

export const Dashboard = () => {
    const [listData, setlistData] = useState<DashboardListData[]>([])
    const [count, setCount] = useState<number>(0)
    const [modalVariant, setModalVariant] = useState<string>("success")
    const [modalMessage, setModalMessage] = useState<string>("")
    const [modal, showModal] = useState<boolean>(false)

    const fixedModalParameters = [showModal, setModalMessage, setModalVariant]
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
        setPage(page);
        getListData(undefined, page)
    };

    const handleChangeRowsPerPage = (event: any) => {
        const limit = parseInt(event.target.value, 10)
        setRowsPerPage(limit);
        setPage(0);
        getListData(limit, 0)
    };

    const getListData = (limit?:number, offset?:number) => {
        const queryLimit = typeof limit == "number" ? limit :rowsPerPage
        const queryOffset = (typeof offset == "number" ? offset  : page) * queryLimit

        fetch(`${BASEURL}?limit=${rowsPerPage}&offset=${queryOffset}`).then(res => res.json()).then((res) => {
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
            openModalWithVariantAndMessage("Sorry something went wrong!", "danger", fixedModalParameters)
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

                {
                    count > 0 &&
                    <div className='dashboardPaginationTable'>
                        <TablePagination
                            component="div"
                            count={count}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                }

            </div>
        </>
    );
}