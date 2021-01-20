import React from "react";
import Papa from "papaparse";
import { addDataSet } from "./dataSlice";
import {connect, useSelector} from "react-redux";

// custom Hook
function useSetName() {
    const length = useSelector(state => state.data.dataSets.length)
    const currentSet = useSelector(state => state.data.dataSets[length-1])

    if (currentSet) { return(currentSet['name'])} else {
        return("No Data Uploaded yet!")
    }
}

const RecentUpload = () => {
    const setName = useSetName()
    return (
        <article>
            <h4>Most Recent Upload: {setName}</h4>
        </article>
    )
}

class FileReader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvfile: undefined,
            name: 'FileName',
            data: []
        };
        this.updateData = this.updateData.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.fileInput = React.createRef();
    };

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0],
        });
    };

    handleNameChange = event => {
        this.setState( {
            name: event.target.value
        })
    }

    importCSV = () => {
        const { csvfile, _ } = this.state;

        Papa.parse(csvfile, {
            complete: this.updateData,
            header: false
        })
    };

    updateData(result) {
        let data = result.data;

        // strip out whitespace from header row to avoid downstream errors
        const headerRow = data[0].map(field => field.trim())
        data[0] = headerRow;
        let name = this.state.name;

        this.setState({data: data} )
        this.props.dispatch(addDataSet({name, data}))

        this.setState({
            csvfile: undefined,
            name: 'FileName',
        })
    }

    render() {
        return (
            <div className="App">
                <h2>Import CSV File:</h2>
                <input
                    className="csv-input"
                    type="file"
                    ref={this.fileInput}
                    // placeholder={null}
                    onChange={this.handleChange}
                />
                <input
                    className="csv-input-name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <p />
                <button onClick={this.importCSV}> Upload now!</button>
                <p />
                <RecentUpload />
            </div>

        );
    }
}

export default connect()(FileReader);
