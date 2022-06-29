import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { AlertModal } from '../modal'
import { useNavigate } from 'react-router-dom'
import { openModalWithVariantAndMessage } from '../../utility'

interface TaskDetailsFormProps {
    title?: string, description?: string, date?: Date | null, buttonLabel: string, apiURL: string, apiMethod: string
}

export const TaskDetailsForms = (props: TaskDetailsFormProps) => {
    const navigate = useNavigate();
    const [title, setttitle] = useState<string>("")
    const [titleError, setTitleError] = useState<boolean>(false)
    const [description, setDescription] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<boolean>(false)
    const [taskDate, setTaskDate] = useState<Date | null>(null)
    const { buttonLabel } = props
    const [modalVariant, setModalVariant] = useState<string>("success")
    const [modalMessage, setModalMessage] = useState<string>("")
    const [modal, showModal] = useState<boolean>(false)
    const [dateError, setDateError] = useState<boolean>(false)
    const [dateErrorMessage, setDateErrorMessage] = useState<string>("")
    const fixedModalParameters = [showModal, setModalMessage, setModalVariant]
    const setSelectedTaskDate = (newTaskDate: Date | null) => {
        setTaskDate(newTaskDate)
    }

    useEffect(() => {
        const {title, description, date} = props
        if (title) {
            setttitle(title)
        }

        if (description) {
            setDescription(description)
        }
        if (date) {
            setTaskDate(date)
        }
    }, [props])
    const unSelectDate = () => {
        setDateError(false)
        setTaskDate(null)
    }



    const saveTaskDetails = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { apiURL, apiMethod } = props
        const trimmedTitle = title.trim()
        const trimmedDescription = description.trim()
        const titleIsEmptyString = trimmedTitle === ""
        const DescriptionIsEmptyString = trimmedDescription === ""

        if (DescriptionIsEmptyString) {
            setDescriptionError(true)
        }

        if (titleIsEmptyString) {
            setTitleError(true)
        }

        const errorInForm = titleIsEmptyString || DescriptionIsEmptyString || dateError

        if (errorInForm) {
            return
        }

        const dataToSave = { description: trimmedDescription, title: trimmedTitle, due_date: taskDate }
        fetch(apiURL, {
            method: apiMethod, body: JSON.stringify(dataToSave), headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then((res) => {
            const { code, message } = res
            if (code === 200) {
                openModalWithVariantAndMessage(message, "success", fixedModalParameters)
                setTimeout(() => {
                    navigate(`/`)
                }, 2000);
            }
        }).catch(() => {
            openModalWithVariantAndMessage("Sorry something went wrong!", "danger", fixedModalParameters)
        })
    }

    return (
        <>
            <AlertModal variant={modalVariant} message={modalMessage} onhide={showModal} showmodal={modal} />
            <div className='d-flex justify-content-center'>
                <div>
                    <form onSubmit={saveTaskDetails} className='d-flex flex-column'>
                        <TextField
                            error={titleError}
                            className='my-3'
                            id="outlined-error"
                            label="Title"
                            value={title}
                            helperText={`${titleError ? 'Title is required' : ''}`}
                            onChange={(e) => {
                                const newTitleValue = e.target.value
                                if (newTitleValue.length > 250) return
                                setttitle(e.target.value)
                                if (newTitleValue.trim() === "") {
                                    setTitleError(true)
                                } else {
                                    setTitleError(false)
                                }
                            }}
                        />
                        <div className='position-relative my-3'>
                            <TextareaAutosize
                                value={description}

                                onChange={(e) => {
                                    const newDescriptionValue = e.target.value

                                    setDescription(e.target.value)
                                    if (newDescriptionValue.trim() === "") {
                                        setDescriptionError(true)
                                    } else {
                                        setDescriptionError(false)
                                    }
                                }}
                                minRows={5}
                                className={`my-3 descriptionTextArea p-2 w-100 ${descriptionError ? 'text-danger border-danger descriptionTextAreaError' : ''}`}
                                placeholder="Description"
                            />
                            {descriptionError &&
                                <div className='position-absolute bottom-0 text-danger smalltext'> Description is required</div>
                            }

                        </div>

                        <div className='position-relative my-3'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Select task date"
                                    inputFormat="dd/MM/yyyy"
                                    value={taskDate}
                                    maxDate={new Date("2099-12-31")}
                                    onChange={setSelectedTaskDate}
                                    onError={(reason) => {
                                        switch (reason) {
                                            case "invalidDate":
                                                setDateError(true)
                                                setDateErrorMessage("Sorry Date provided is invalid")
                                                break;

                                            case "maxDate":
                                                setDateError(true)
                                                setDateErrorMessage("Sorry Date provided exceeds max date")
                                                break;
                                            case "minDate":
                                                setDateError(true)
                                                setDateErrorMessage("Sorry Date provided exceeds min date")
                                                break;
                                            
                                            default:
                                                setDateError(false)
                                        }
                                    }}
    
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            {dateError &&
                                <div className=' text-danger smalltext dateError'>{dateErrorMessage} </div>
                            }

                            <div onClick={unSelectDate} className='unSelectTaskDate bottom-0 text-primary smalltext hover'> Click here to unselect task date</div>
                        </div>

                        <Button type='submit' className='my-5' variant="contained">{buttonLabel}</Button>
                    </form>

                    <div className="d-flex justify-content-end">
                        <Link to='/'>Go To Dashboard</Link>
                    </div>
                </div>
            </div>

        </>
    )
}