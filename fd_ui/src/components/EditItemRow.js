import React from 'react'

const EditItemRow = ({ editFormData, handleEditFormChange, handleEditFormSubmit}) => {
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
            <td></td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='Enter a price...'
                    name='price'
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type='submit' onClick={handleEditFormSubmit}>Save</button>
            </td>
        </tr>
    )
}

export default EditItemRow