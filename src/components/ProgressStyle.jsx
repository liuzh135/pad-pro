/**
 * @fileName: ProgressStyle.jsx
 * Created on 2017-12-22
 * 进度条 样式
 */
import React from "react";

export class ProgressStyle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
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
    }

    getPrograssPercentage() {
        let progress = this.props.progress || 0;
        let percentage = progress * 315 + 160;
        return percentage;
    }


    render() {
        const { proressValue, className,value } = this.props;
        let percentage = this.getPrograssPercentage();
        let percentStyle = 'rotate(' + percentage + 'deg)';
        console.log(" =====> percentage :" + percentage);
        return (
            <div className="row">
                <div className={className + " flex-center point3"}>
                    <div className="point2"
                         style={{ height: '100px', width: '100px', backgroundColor: "#9239B9", borderRadius: "100px" }}>
                    </div>

                    <div className="point2 point4"
                         style={{
                             height: '80px', width: '80px', margin: '0',
                             transform: percentStyle, backgroundColor: "#9CDCE1"
                         }}/>
                    <div className="point2 text-center"
                         style={{
                             height: '90px',
                             width: '90px',
                             backgroundColor: "#9CDCE1",
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