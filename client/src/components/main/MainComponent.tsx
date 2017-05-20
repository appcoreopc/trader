import {distinct} from 'rxjs/operator/distinct';
import {every} from 'rxjs/operator/every';
import {connect} from 'react-redux';
import * as React from "react";
import {InfoBoxComponent} from '../infobox/InfoBoxComponent';
import {PriceIndexComponent} from '../priceindex/PriceIndexComponent';

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
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <InfoBoxComponent title='GOO' tickerCode='GOOGLE' description='description1'/>
                        <InfoBoxComponent title='APPLE' tickerCode='APPLE' description='description1'/>
                        <InfoBoxComponent title='MSFT' tickerCode='MSFT' description='description1'/>
                        <InfoBoxComponent title='IBM' tickerCode='IBM' description='description1'/> 
                        <PriceIndexComponent title="NYSE - Index" />

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
