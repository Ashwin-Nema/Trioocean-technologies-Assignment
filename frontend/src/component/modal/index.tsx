
import { Modal, Alert } from 'react-bootstrap'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react'

interface AlertModalProps {
    variant:string, message:string, onhide:(value: React.SetStateAction<boolean>) => void, showmodal:boolean
}

export const AlertModal = (props:AlertModalProps) => {
    const { variant, message, onhide, showmodal } = props
    return (
        <>
            
            <Modal contentClassName="modalwithoutcolor"  onHide={() => {onhide(false)}} show={showmodal} >
                <Alert variant={variant} >
                    <div className="d-flex justify-content-center">
                        <h5>
                            {
                                variant !== "danger" ?
                                    <>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex justify-content-center">
                                                <CheckCircleIcon style={{ color: "green" }} />
                                            </div>

                                            <div >
                                                {message}
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="row">
                                            <div className="col-1"><ErrorRoundedIcon style={{ color: "red" }} /> </div>
                                            <div className="col-10">
                                                <h5>{message}</h5>

                                            </div>
                                        </div>
                                    </>
                            }
                        </h5>
                    </div>
                </Alert>
            </Modal>
        </>
    )
}