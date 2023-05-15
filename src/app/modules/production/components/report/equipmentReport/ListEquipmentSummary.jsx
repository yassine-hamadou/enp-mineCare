import React from 'react'
import ko from 'knockout'
import 'devexpress-reporting/dx-webdocumentviewer'
// import '../../../../../../../node_modules/jquery-ui/themes/base/all.css'
import '../../../../../../../node_modules/devextreme/dist/css/dx.light.css'
import '../../../../../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css'
import '../../../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css'
import '../../../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.light.css'

class ReportViewer extends React.Component {
    constructor(props) {
        super(props)
        this.reportUrl = ko.observable('ListEquipmentSummary')
        this.requestOptions = {
            host: 'http://208.117.44.15/serverside/',
            // Use this line for the ASP.NET MVC backend.
            //invokeAction: "/WebDocumentViewer/Invoke"
            // Use this line for the ASP.NET Core backend
            invokeAction: 'DXXRDV',
        }
    }

    render() {
        return <div ref='viewer' data-bind='dxReportViewer: $data'></div>
    }

    componentDidMount() {
        ko.applyBindings(
            {
                reportUrl: this.reportUrl,
                requestOptions: this.requestOptions,
            },
            this.refs.viewer
        )
    }

    componentWillUnmount() {
        ko.cleanNode(this.refs.viewer)
    }
}

function AllEquipSummary() {
    return (
        <div style={{width: '100%', height: '1000px'}}>
            <ReportViewer/>
        </div>
    )
}

export default AllEquipSummary
