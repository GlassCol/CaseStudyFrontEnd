import React from 'react'

const EditRestaurantRow = ({ editFormData, handleEditFormChange, handleEditFormSubmit}) => {
    return (
        <tr>
            <td></td>
            <td>
            <input
                    type="text"
                    required="required"
                    placeholder='Enter a name...'
                    name='name'
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="email"
                    required="required"
                    placeholder='Enter an email...'
                    name='emailId'
                    value={editFormData.emailId}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type='submit' onClick={handleEditFormSubmit}>Save</button>
            </td>
        </tr>
    )
}

export default EditRestaurantRow