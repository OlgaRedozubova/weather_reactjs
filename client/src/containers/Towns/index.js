import React, { Component } from 'react';
import {Button, Form, FormGroup, ControlLabel, FormControl, Table} from 'react-bootstrap';

class Towns extends Component {
    state = {
        body: {},
        townValue: '',
        name: '',
        isAlreadyAdd: false
    };

    componentDidMount() {
      this.callApi()
          .then(res => {this.setState({body: res});
            console.log('bodyTown', this.state.body);
          })
          .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/towns');
        const body = await response.json();
        if (response.status !== 200) throw Error (body.message);
        return body;
    };


    callApi_addTown = async () => {
        const response = await fetch('/api/towns', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.townValue,
            })
        });

        if (response.status !== 204) {
            const body = await response.json();
            if (response.status !== 200) throw  Error(body.message);
            return body;
        } else {
            this.setState({isAlreadyAdd: true})
        }
    };

    addTown = (e) => {
        e.preventDefault();
        this.callApi_addTown()
            .then(res => {
                if (res) {
                    this.setState({
                        body: res,
                        isAlreadyAdd: false
                    })
                }
            })
            .catch(err => {console.log(err)})
    }

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

    render() {
        console.log('bodyTown-render', this.state.body);
        const listTowns = [...this.state.body];

        console.log('listTowns', listTowns);
        return (
            <div className="towns">
                <h2>All Towns</h2>

                <Form inline onSubmit={this.addTown}>

                    <FormGroup
                        controlId="formControlsText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Город </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Please, input the city"
                            onChange={this.handleChange}
                        />
                        <Button  type="submit">Add</Button>
                    </FormGroup>
                </Form>

                <div className="container">
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Del</th>
                        </tr>
                        </thead>
                        <tbody>

                        {listTowns.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                 <td>
                                    <Button
                                        bsSize="xsmall" bsStyle="danger"
                                    >
                                        del
                                    </Button>
                                </td>
                            </tr>)
                        )}

                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default Towns;