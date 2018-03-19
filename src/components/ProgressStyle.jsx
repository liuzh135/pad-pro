/**
 * @fileName: ProgressStyle.jsx
 * Created on 2017-12-22
 * 进度条 样式
 */
import React from "react";

export class ProgressStyle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: {}
        }
    }

    componentDidMount() {
        let $loader;
        let width = this.props.width || 250;
        let height = this.props.height || 250;
        let progress = this.props.progress || 0;
        $loader = window.jQuery('.' + this.props.className).percentageLoader({
            width: width,
            height: height,
            progress: 10
        });

        $loader.setProgress(progress);
        $loader.setValue("Temp");
        let percentage = progress * 315 + 160;
        window.jQuery('.roratedata').css({
                "transform": 'translateY(-50%) translateX(-50%) rotate(' + percentage + 'deg)'
            }
        );
        this.setState({
            loader: $loader
        });
    }

    componentWillReceiveProps(nextPorps) {
        let $loader = this.state.loader || {};
        let progress = nextPorps.progress || 0;
        if (nextPorps.progress !== this.props.progress) {
            $loader.setProgress(progress);
            $loader.setValue("Temp");
            let percentage = progress * 315 + 160;
            window.jQuery('.roratedata').css({
                    "transform": 'translateY(-50%) translateX(-50%) rotate(' + percentage + 'deg)'
                }
            );
        }
    }

    getPrograssPercentage() {
        let progress = this.props.progress || 0;
        let percentage = progress * 315 + 160;
        return percentage;
    }


    render() {
        const { proressValue, className, value, height, width } = this.props;
        console.log("-props- " + JSON.stringify(this.props));
        let percentage = this.getPrograssPercentage();
        let percentStyle = 'translateY(-50%) translateX(-50%) ' + 'rotate(' + percentage + 'deg)';
        return (
            <div className="row" style={{}}>
                <div className={className + " point3"} style={{ margin: '0 auto', width: width, height: height }}>
                    <div className="point2 contentY bg-point"
                         style={{ height: '100px', width: '100px', borderRadius: "100px" }}>
                    </div>

                    <div className="point2 point4 contentY roratedata"
                         style={{
                             height: '80px',
                             width: '80px',
                             margin: '0',
                         }}/>
                    <div className="point2 text-center contentY"
                         style={{
                             height: '90px',
                             width: '90px',
                             backgroundColor: "#9CDCsE1",
                             borderRadius: "100px",
                             zIndex: '10'
                         }}>
                        <div style={{ fontSize: '30px ', color: '#E8F9F9', top: '20px', position: 'relative' }}>
                            <span>{value}</span><span>°</span></div>
                    </div>

                </div>
                {proressValue != null ?
                    <span style={{ fontSize: '16px', fontWeight: '600', color: "#efefef" }}>{proressValue}</span> : ''}

                {
                    <style>
                        {`
                            .loader3:after{
                                left:0;
                                margin-left: 0px;
                                margin-top: 0px;
                                background-color:"#ADF5F3"
                            }
                        `}
                    </style>
                }
            </div>
        );
    }

}