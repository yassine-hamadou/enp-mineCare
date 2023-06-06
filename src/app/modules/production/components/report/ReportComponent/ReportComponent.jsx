import React, {useEffect, useRef} from "react";
import ko from "knockout";
import "devexpress-reporting/dx-webdocumentviewer";
import "../../../../../../../node_modules/devextreme/dist/css/dx.light.css";
import "../../../../../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css";
import "../../../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css";
import "../../../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.light.css";
import {DxReportViewer} from "devexpress-reporting/dx-webdocumentviewer";
import {useAuth} from "../../../../auth";

const ReportViewer = (props) => {
    const {tenant} = useAuth();
    const reportUrl = ko.observable(`${props.reportName}`);
    const viewerRef = useRef();
    const requestOptions = {
        host: "http://208.117.44.15/serverside/",
        invokeAction: "DXXRDV"
    };

    useEffect(() => {
        const viewer = new DxReportViewer(viewerRef.current,
            {
                reportUrl,
                requestOptions,
                callbacks: {
                    customizeParameterLookUpSource: function (s, e) {
                        if (s.name.toLowerCase() === 'tenantid') {
                            var parametersModel = e.filter(x => x.value === tenant);
                            return parametersModel
                        }
                    },
                }
            });
        viewer.render();
        return () => viewer.dispose();
    })
    return (<div ref={viewerRef}></div>);
}

function ReportComponent(props) {
    return (<div style={{width: "100%", height: "1000px"}}>
        <ReportViewer reportName={props.reportName}/>
    </div>);
}

export default ReportComponent;
