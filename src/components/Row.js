import React from 'react'

const Row = (props) => {
    
    return (
        <tr id={props.id}>
            <th scope="row">{1}</th>
            <td>{props.type}</td>
            <td>{props.make}</td>
            <td>{props.model}</td>
            <td>{props.size}</td>
            <td>{props.weight}</td>
            <td id={props.id} onClick={props.remove} ><i className="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
    )
}

export default Row