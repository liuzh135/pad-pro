/**
 * @fileName: AirDataProgress.jsx
 * Created on 2017-12-22
 * 空气检测仪  app UI
 */
import React from "react";

export class AirDataProgress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let $loader;
        let width = this.props.width || 150;
        let height = this.props.height || 150;
        let progress = this.props.progress || 0;
        $loader = window.jQuery('.' + this.props.className).percentageLoader({
            width: width,
            height: height,
            progress: 10
        });

        $loader.setProgress(progress);
        $loader.setValue(this.props.pm);
    }

    render() {
        const { className, pm, pmValue, color } = this.props;
        return (
            <div className='air-text'>
                <div style={{ margin: '3px 3px' }}><span>{pm}</span></div>
                <div style={{ margin: '3px 3px' }}>{pmValue != null ?
                    <span><span style={{ fontSize: '30px', color: color }}>{pmValue}</span><span
                        style={{ fontSize: '8px', marginLeft: '3px' }}>μg/m3</span></span> : ""}</div>
                <div className={className + " point3"}>
                    <div className="loader loader5 loader5-green duration-3s-after point2 contentY"
                         style={{ height: '90px', width: '90px', margin: '0' }}>
                        <div className="pointer"></div>
                    </div>
                </div>
                {
                    <style>
                        {`
                            ${"." + className} .loader:before{
                                background: ${color};
                            }
                            ${"." + className} .loader5:after{
                                margin-left: 0px;
                                margin-top: 0px;
                            }
                            ${"." + className} .loader5-green:after{
                                border-color:${color};
                                background-color: transparent;
                            }
                        `}
                    </style>
                }
            </div>
        );
    }

}