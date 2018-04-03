import React, { Component } from 'react';

class Towns extends Component {
    state = {
        body: {}
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

    render() {
        console.log('bodyTown-render', this.state.body);
        const listTowns = [...this.state.body];

        console.log('listTowns', listTowns);
        return (
            <div className="towns">
                <h2>All Towns</h2>
                <div className="container">

                    {listTowns.map((item, index) => (
                        <div key={index} className="row">
                            {/*<p className="col-md-2">{item.id}</p>*/}
                            <p className="col-md-3">{item.name}</p>
                        </div>)
                    )}



                </div>
            </div>
        )
    }
}

export default Towns;