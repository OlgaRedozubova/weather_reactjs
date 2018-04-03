import React from 'react';

export default(props) => {
    const arr = props.bodyCity;

    return (
         <div>
             <h2>
                Weather in the {props.city}
             </h2>

             {Object.keys(arr).map(id => (
                 <div key={id} className="card-panel">
                     <span>{id}: </span><span>{arr[id]}</span>
                 </div>
             ))}

         </div>

    )
};