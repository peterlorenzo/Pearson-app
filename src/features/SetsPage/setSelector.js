import React from "react";
import { connect } from "react-redux";
import {newAnalysis} from "../analysis/analysisSlice";

const mapStateToProps = state => {
    const data  = state.data.dataSets

    const current = []
    for (let sheet of data) {
        current.push({name: sheet.name, columns: sheet.data[0]})
    }

    return {current};
}

class SetSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nameIndex: -1,
            colOneIndex: 0,
            colTwoIndex: 0,
            activeColumns: ['None Selected']
        }

        this.handleName = this.handleName.bind(this);
        this.handleColOne = this.handleColOne.bind(this);
        this.handleColTwo = this.handleColTwo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName = e => {
        let index = this.props.current.findIndex(x => x.name === e.target.value)
        if (index >= 0) {
            this.setState({nameIndex: index, activeColumns: this.props.current[index].columns})
        } else { this.setState({ nameIndex: -1, activeColumns: ['None Selected'] } ) }
    }

    handleColOne = e => this.setState({colOneIndex: this.state.activeColumns.indexOf(e.target.value)})
    handleColTwo = e => this.setState({colTwoIndex: this.state.activeColumns.indexOf(e.target.value)})



    handleSubmit = () => {
        let ind = this.state.nameIndex
        let col1 = this.state.colOneIndex
        let col2 = this.state.colTwoIndex

         this.props.dispatch(newAnalysis([ind, col1, col2] ) )

         this.setState({
             nameIndex: -1,
             colOneIndex: 0,
             colTwoIndex: 0,
             activeColumns: ['None Selected']
         })
    }

    render() {
        const sheetNames = []
        for (let i = 0; i < this.props.current.length; i++) {
            sheetNames[i] = this.props.current[i].name
        }
        sheetNames.unshift('Choose One')

        return (
            <div>
                <h3>Select a Data Set and two columns to test for correlation</h3>
                <p>
                    You can see a preview of each data set below. Choose wisely!
                </p>
                <form>
                    <label>
                        <select value={sheetNames[this.state.nameIndex + 1]} onChange={this.handleName}>{( sheetNames.map((x) => <option key={sheetNames.indexOf(x)}>{x}</option>))}</select>
                    </label>
                    <label>
                        <select value={this.state.activeColumns[this.state.colOneIndex]} onChange={this.handleColOne}>{( this.state.activeColumns.map((x) => <option key={this.state.activeColumns.indexOf(x)}>{x}</option>))}</select>
                    </label>
                    <label>
                        <select value={this.state.activeColumns[this.state.colTwoIndex]} onChange={this.handleColTwo}>{( this.state.activeColumns.map((x) => <option key={this.state.activeColumns.indexOf(x)}>{x}</option>))}</select>
                    </label>
                    <button type="button" onClick={this.handleSubmit}>
                        Analyze this!
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(SetSelector);
