import React from 'react';
import {Table, Button } from 'react-bootstrap';

export default(props) => {
    const town = props.town;

    function my_getTime (ms) {
        ms = ms + '000';
        const date = new Date(+ms);
        let h = date.getHours();
        let m = date.getMinutes();
        if (h < 10) {
            h = '0' + h
        }
        if (m < 10) {
            m = '0' + m
        }
        console.log(h, m);
        return `${h}:${m}`;
    }
    function getDateNaw() {
        let time = new Date().getTime();
        let date = new Date(time);
        let arrMonth = ["Jan","Febr","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        let h = date.getHours();
        let min = date.getMinutes();
        let m = date.getMonth();
        let d = date.getDate();
        if (h < 10) { h = '0' + h }
        if (min < 10) { min = '0' + m }
        if (d < 10) { d = '0' + d }

        return `${h}:${m}  ${arrMonth[m]} ${d}`;
    }
    return (
     <div>
       <div className="table_header">
           <h3><strong> Weather in {town.name}, {town.sys.country}</strong></h3>
           <p>
               <img src={`../../assets/images/${town.weather[0].icon}.png`}></img>
               <strong>{town.main.temp} <sup>0</sup>C</strong></p>
           <p>{town.weather[0].description.charAt(0).toUpperCase() + town.weather[0].description.substr(1)}</p>
           <p>{getDateNaw()}</p>
       </div>



         <Table striped bordered condensed hover>
             <thead>
             {/*<tr>*/}
                 {/*<th colSpan="2">Weather in the {props.city}</th>*/}
             {/*</tr>*/}
             </thead>
             <tbody>

             {/*{Object.keys(town.main).map(id => (*/}
                 {/*<tr key = {id}>*/}
                     {/*<td>{id}: </td>*/}
                     {/*<td>{town.main[id]}</td>*/}
                 {/*</tr>*/}
             {/*))}*/}
             <tr>
                 <td>Wind</td>
                 <td>Gentle Breeze, {town.wind.speed} m/s, South-southwest ({town.wind.deg})
                </td>

             </tr>

             <tr>
                 <td>Cloudiness</td>
                 <td>Sky is {town.weather[0].main}</td>
             </tr>
             <tr>
                 <td>Pressure</td>
                 <td>{town.main.pressure} hpa</td>
             </tr>

             <tr>
                 <td>Humidity</td>
                 <td>{town.main.humidity} %</td>
             </tr>
             <tr>
                 <td>Sunrise</td>
                 <td>{my_getTime(town.sys.sunrise)}</td>
             </tr>

             <tr>
                 <td>Sunset</td>
                 <td>{my_getTime(town.sys.sunset)}</td>
             </tr>
             <tr>
                 <td>Geo coolds</td>
                 <td>[{town.coord.lat}, {town.coord.lon}]</td>
             </tr>


             </tbody>
         </Table>
     </div>
    )
};