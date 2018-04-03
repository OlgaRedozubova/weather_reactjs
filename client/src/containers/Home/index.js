import React, { Component } from 'react';

import Weather from '../../components/Weather/index';

class Index extends Component {

    state = {
        response: '',
        body: {},
        bodyCity: {},
        city: '',
        isCity:false,
    };
    componentDidMount() {
        this.callApi()
            .then(res => {this.setState({
                body: res,
            });
                console.log('body', this.state.body);
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/towns');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    callApi_City = async () => {
        const response = await fetch('/api/weather/' + this.cityName.value);
        const body = await response.json();
        // console.log('city',this.cityName.value);
        if (response.status !== 200) throw Error(body.message);
        // console.log(body.main);
        //console.log(response);
        return body.main;
    };


    setCity = (e) =>{
        e.preventDefault();
        if (this.cityName.value === '') {
            alert('Внимание! Не указан город!');
        }

        this.cityName.value &&
        this.callApi_City()
            .then(res => {this.setState({bodyCity: res,
                isCity: true,
                city: this.cityName.value})})
            .catch(err => console.log(err));

    };

    addTown = () => {
        console.log(this.state.city);
    };

    render(){
        const listTowns = [...this.state.body];
        return (
            <div className="home">
                <form onSubmit={this.setCity}>
                    <input type="text"
                           ref = {(input) => {this.cityName = input;}}
                           name="city" placeholder="Please, input the city"/>
                    <button type="submit">OK</button>
                    <button onClick={this.addTown}>Add</button>
                </form>

                <div>
                    <h2>Первоначальные данные:</h2>

                    {listTowns.map((item, index) => (
                        <div key={index} className="row">
                            <p className="col-md-3">{item.name}</p>
                        </div>)
                    )}

                    {/*{Object.keys(this.state.body).map(id => (*/}
                        {/*<div key={id} className="card-panel">*/}
                            {/*<span>{id}: </span><span>{this.state.body[id]}</span>*/}
                        {/*</div>*/}
                    {/*))}*/}
                </div>
                <div className="container">

                    {this.state.isCity &&
                    <Weather {...this.state}/>}
                </div>
            </div>
        )
    }
}

export default Index;