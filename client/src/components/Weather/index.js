import React from 'react';
import {Table } from 'react-bootstrap';

export default(props) => {
    const arr = props.bodyCity;
    return (
         <div>
             <Table striped bordered condensed hover>
                 <thead>
                 <tr>
                     <th colSpan="2">Weather in the {props.city}</th>
                 </tr>
                 </thead>
                 <tbody>

                 {Object.keys(arr).map(id => (
                     <tr>
                         <td>{id}: </td>
                         <td>{arr[id]}</td>
                     </tr>
                 ))}
                 </tbody>
             </Table>



             {/*{Object.keys(arr).map(id => (*/}
                 {/*<div key={id} className="card-panel">*/}
                     {/*<span>{id}: </span><span>{arr[id]}</span>*/}
                 {/*</div>*/}
             {/*))}*/}

         </div>

    )
};