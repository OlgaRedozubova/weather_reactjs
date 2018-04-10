//---------------------------------------------
import React from 'react';
import ObservableComponent from 'rxjs-react-component';

class Time extends ObservableComponent {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }
    onClick$(observable) {
        return observable.map(() => ({count: this.state.count + 1}));
    }
    render() {
        return (
            <div>
                <h1>Hello world ({this.state.count})</h1>
                <button onClick={this.onClick$}>Increase</button>
            </div>
        );
    }
}

export default Time;