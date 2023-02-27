import { Modal } from 'antd';
import React, { useState ,useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { deleteData } from '../../../../appRedux/actions/Common';

const DeleteDialoge = (props) => {
    const userdata = useSelector(({ auth }) => auth)
    const tempData = useSelector(({ common }) => common)
    const [userid, setuserid] = useState(0);
    const dispatch = useDispatch();

    const handleClose = () => {
        props.isDeleteModalOpen();
    }

    const handleOk = (id) => {
        const obj = {
            path1:`/api/v1/traders/delete/${id}/`,
            user_id:userdata.userData.authUser.user_id
        }
        dispatch(deleteData(obj))
       
    }
    useEffect(() => {
        setuserid(userdata.userData.authUser.user_id)
    }, [userdata])
    useEffect(() => {
        if (tempData.successDelete == true) {
            props.isDeleteModalOpen();
        }
    }, [tempData])
    return (
        <div>
            <Modal
                title="Delete User"
                visible={props.show}
                onOk={(e) => handleOk(props.details.id)}
                onCancel={handleClose}
            >
                Are you sure you want to delete this user? You will loose all the user details. This action can not be undone.
            </Modal>
        </div >
    )
}

export default DeleteDialoge;
