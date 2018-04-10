//---------------------------------------------
import React from 'react';
import ObservableComponent from 'rxjs-react-component';
import {Observable} from 'rxjs';

class Time extends ObservableComponent {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    onClick$(observable) {
        // return observable.map(() => ({count: this.state.count + 1}));
        const increase$ = observable.map(() => ({count: this.state.count + 1}));
        const delayedIncrease$ = observable.delay(200).map(() => ({count: this.state.count + 1}));
        return Observable.merge(
            increase$,
            delayedIncrease$
        );
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