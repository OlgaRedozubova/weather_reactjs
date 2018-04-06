import React, { Component } from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Table } from 'react-bootstrap';

import Weather from '../../components/Weather/index';

class Index extends Component {

    state = {
        response: '',
        body: {},
        bodyCity: {},
        isCity:false,
        isAlreadyAdd:false,
        isNotTown:false,
        townValue:'',
        townName: ''
    };
    componentDidMount() {
        this.callApi()
            .then(res => {this.setState({
                body: res,
            });
                console.log('body', this.state.body);
            })
            .catch(err => console.log(err));
    };


    callApi = async () => {
        const response = await fetch('/api/weather');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    //
    // refreshPage = () => {
    //     this.callApi()
    //         .then(res => {this.setState({
    //             body: res,
    //         });
    //             console.log('body', this.state.body);
    //         })
    //         .catch(err => console.log(err));
    // };

    callApi_City = async () => {
        const response = await fetch('/api/weather/' + this.state.townValue);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body.main;
    };


    setCity = (e) =>{
        e.preventDefault();

        this.callApi_City()
            .then(res => {
                console.log('res',res);
                if(res) {
                    this.setState({
                        bodyCity: res,
                        isCity: true,
                        townName: this.state.townValue,
                        isNotTown: false,
                        isAlreadyAdd: false
                    })
                } else {
                    alert('Внимание! Нет такого города!');
                    this.setState({
                        isNotTown:true
                    })
                }
            })
            .catch(err => console.log('err_setCity', err));
    };

    callApi_TownLikeList = async () => {
        const response = await fetch('/api/weather', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.townValue,
            })}
            );
        if (response.status !== 403) {
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            return body;
        } else {
            this.setState({isAlreadyAdd:true});
            this.rowColor(response.statusText);
            console.log('204', response.statusText);
        }
    };

    addTownLikeList =() => {
        this.callApi_TownLikeList()
            .then(res => {
                if (res) {
                    this.setState({
                        body: res,
                        isAlreadyAdd:false
                    });
                }
            })
            .catch(err => console.log(err));
    };



getValidationState() {
        const length = this.state.townValue.length;
        if (length > 3) return 'success';
        else if (length > 2) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange = (e) => {
        console.log(e.target.value);
          this.setState({ townValue: e.target.value,
              isAlreadyAdd: false
            });
    };


    callApi_DelTownLikeList = async (townName) => {
        console.log('del', townName);
        const response = await fetch('/api/weather', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: townName,
            })}
        );
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    delTownLike = (name) => {
        this.callApi_DelTownLikeList(name)
            .then(res => {
                if (res) {
                    this.setState({
                        body: res,
                        isAlreadyAdd:false
                    });
                }
            })
            .catch(err => console.log(err));
    };

    rowColor = (id) => {
        const rowList = document.getElementById('likeTable').childNodes;
        for (let i= 0; i< rowList.length; i++) {
            rowList[i].style.background = "none";
        }
        document.getElementById(id).style.background = "#f9f9f9";
    };

    showTownLike = (item, id) => {
        console.log('show', item);
        this.setState({
            bodyCity: item.main,
            isCity: true,
            townName: item.name,
            townValue: item.name,
            isNotTown: false,
            isAlreadyAdd: false
        });
    };

    render(){
        const listTowns = [...this.state.body];
        return (
            <div className="home">
                <Form inline onSubmit={this.setCity}>

                    <FormGroup
                        controlId="formControlsText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Город </ControlLabel>
                        <FormControl
                            type="text"
                           // value = {this.state.townValue}
                            placeholder="Please, input the city"
                            onChange={this.handleChange}
                        />
                        <Button  type="submit">OK</Button>
                    </FormGroup>
                </Form>
                <div>
                    <h2>Первоначальные данные:</h2>
                    <Grid>
                        <Row>
                            <Col sm={6} md={4}>
                                {!this.state.isCity &&
                                <div className="title_left">
                                    <h3>Укажите город</h3>
                                </div>
                                }

                                {this.state.isCity &&
                                <div>
                                    <div className="title_left">

                                        <h3>Weather in the <strong> {this.state.townName}</strong></h3>
                                        <Button bsSize="xsmall" bsStyle="success"
                                                onClick={this.addTownLikeList}>Like</Button>

                                        {/*{this.state.isAlreadyAdd &&*/}
                                            {/*alert('Town ' + this.state.townName  + ' already exists in LikeList!')*/}
                                        {/*}*/}
                                    </div>

                                    <Weather {...this.state}/>
                                </div>
                                }
                            </Col>
                            <Col sm={6} md={8}>
                                <Table bordered condensed hover>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Temp</th>
                                        <th>Pressure</th>
                                        <th>Humidity</th>
                                        <th>Temp min</th>
                                        <th>Temp max</th>
                                        <th>Del</th>
                                    </tr>
                                    </thead>
                                    <tbody id="likeTable">

                                    {listTowns.map((item, index) => (
                                    <tr key={index} id = {index}>
                                        <td onClick={() => this.showTownLike(item, index)}>{item.name}</td>
                                        <td onClick={() => this.showTownLike(item, index)}>{item.main.temp}</td>
                                        <td onClick={() => this.showTownLike(item, index)}>{item.main.pressure}</td>
                                        <td onClick={() => this.showTownLike(item, index)}>{item.main.humidity}</td>
                                        <td onClick={() => this.showTownLike(item, index)}>{item.main.temp_min}</td>
                                        <td onClick={() => this.showTownLike(item, index)}>{item.main.temp_max}</td>

                                        <td>
                                            <Button
                                                bsSize="xsmall" bsStyle="danger"
                                                onClick={() => this.delTownLike(item.name)}
                                            >
                                            del
                                            </Button>
                                        </td>
                                    </tr>)
                                    )}

                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                    </Grid>

                </div>
                {/*<div className="container">*/}

                    {/*{this.state.isCity &&*/}
                    {/*<Weather {...this.state}/>}*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Index;