import React from 'react'

const EditItemRow = ({ editformData, HandleEditFormChange }) => {
    return (
        <tr>
            <td></td>
            <td>
                <input type={"text"}
                    required="required"
                    placeholder='Enter a name...'
                    name='itemname'>
                    value={editformData.name}
                    onChange={HandleEditFormChange}
                </input>
            </td>
            <td></td>
            <td>
                <input type={"text"}
                    required="required"
                    placeholder='Enter a price...'
                    name='itemprice'>
                    value={editformData.price}
                    onChange={HandleEditFormChange}
                </input>
            </td>
            <td>
                <button type='submit'>Save</button>
            </td>
        </tr>
    )
}

export default EditItemRow