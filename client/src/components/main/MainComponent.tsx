import {distinct} from 'rxjs/operator/distinct';
import {every} from 'rxjs/operator/every';
import {connect} from 'react-redux';
import * as React from "react";
import {InfoBoxComponent} from '../infobox/InfoBoxComponent';

export interface InfoBoxProps {
    title : string;
    imgUrl : string;
    description : string;
    value : number;
}

export class MainComponent extends React.Component < any,
undefined > {
    context : any;

    static contextTypes = {
        store: React.PropTypes.object
    }

    incr() {}

    render() {
        return <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button
                            type="button"
                            onClick={e => this
                            .context
                            .store
                            .dispatch({type: 'INCR', item : {
    title: '22222',
    description : '22222222', buyValue : "200", sellValue : "300"
}  })}>Click Me!</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <InfoBoxComponent title='title1' tickerCode='' description='description1'/>
                        <InfoBoxComponent title='title2' tickerCode='' description='description1'/>
                        <InfoBoxComponent title='title3' tickerCode='' description='description1'/>
                        <InfoBoxComponent title='title4' tickerCode='' description='description1'/>
                    </div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state : any) => state;
const mapDispatchToProps = (dispatch : any) => ({
    incr: () => {
        console.log('incrementing');
        dispatch({type: 'INCR', by: 1});
    },
    decr: () => {
        dispatch({type: 'INCR', by: -1});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
