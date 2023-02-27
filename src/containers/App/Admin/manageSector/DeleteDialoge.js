import { Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteData } from '../../../../appRedux/actions/Common';

const DeleteDialoge = (props) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        props.isDeleteModalOpen();
    }

    const handleOk = (id) => {
        dispatch(deleteData(id))
        props.isDeleteModalOpen();
    }

    return (
        <div>
            <Modal
                title="Delete Sector"
                visible={props.show}
                onOk={(e) => handleOk(props.details.id)}
                onCancel={handleClose}
            >
                Are you sure you want to delete this sector? You will loose all the sector details. This action can not be undone.
            </Modal>
        </div >
    )
}

export default DeleteDialoge;
