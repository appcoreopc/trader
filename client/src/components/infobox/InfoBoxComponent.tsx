import {symbolIteratorPonyfill} from 'rxjs/symbol/iterator';
import {connect} from 'react-redux';
import * as React from "react";

export interface InfoBoxProps {
    title : string;
    //imgUrl : string;
    description : string;
    tickerCode : string;
}

export class InfoBoxComponent extends React.Component < InfoBoxProps,
undefined > {
    context : any;

    static contextTypes = {
        store: React.PropTypes.object
    }

    private unsubscribe : Function;

    private tickerCode : string;
    private buyValue : string = "0";
    private sellValue : string = "0";
    private lastVol : string = "0";

    constructor()
    {
        super();
    }

    componentDidMount() {
        this.unsubscribe = this
            .context
            .store
            .subscribe(() => {

                if (this.props.tickerCode == this.context.store.getState().tickerCode) {
                    this.buyValue = this
                        .context
                        .store
                        .getState()
                        .buyValue;
                    this.sellValue = this
                        .context
                        .store
                        .getState()
                        .sellValue;

                    this.lastVol = this
                        .context
                        .store
                        .getState()
                        .volume;
                } 
                this.forceUpdate();
            });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return <div>
            <div className="col-md-3">
                <div className="panel">

                    <div className="body-panel-white">{this.props.title}</div>
                    <div className="panel-body-dark">
                        <div className="boxModel">
                            <table className="table">
                                <tr>
                                    <td className="tradeMarker">
                                        <div className="tradeText"> 
                                            BUY IT
                                        </div>
                                        <div className="blue-text"> 
                                            {this.buyValue}
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className="tradeMarker">
                                        <div className="tradeText"> 
                                            SELL
                                        </div>
                                        <div className="blue-text"> 
                                            {this.sellValue}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div className="volumeDiv"> 
                            Last Vol : {this.lastVol}
                        </div>  
                        
                    </div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state : any) => state;

const mapDispatchToProps = (dispatch : any) => ({
    incr: () => {
        dispatch({type: 'INCR', by: 1});
    },
    decr: () => {
        dispatch({type: 'DECR', by: -1});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoBoxComponent);
