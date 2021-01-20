import React from "react";
import {useSelector} from "react-redux";
import Scatterplot from "./scatterplot";

export const Analysis = () => {
    // use selectors to get indices of datasheet and columns to analyze
    const codes = useSelector((state) => state.analysis.codes)
    const dataSet = useSelector((state) => state.data.dataSets[codes[0]].data)

    let firstFeature = []
    let secondFeature = []

    // start at index 1 => not reading header row into feature columns
    // Papa parse appears to read a blank row onto the end so we also stop 1 before the end
    for (let i = 1; i < dataSet.length - 1; i++) {
        firstFeature.push(dataSet[i][codes[1]])
        secondFeature.push(dataSet[i][codes[2]])
    }

    // TODO get column names and store as labels - only for d3 part

    // filter to numbers & combine
    firstFeature = firstFeature.map(x => Number(x.replace(/[^\d.-]/g, '')))
    secondFeature = secondFeature.map(y => Number(y.replace(/[^\d.-]/g, '')))
    let dataPairs = firstFeature.map((coordinate, index) => [coordinate, secondFeature[index]])
        .filter(row => row[0] != null && row[1] != null)

    return (
        <div>
        <Scatterplot data={dataPairs} />
        </div>
    )
}


export default Analysis
