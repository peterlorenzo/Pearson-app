import React from "react";
import {useSelector} from "react-redux";
import SetSelector from "./setSelector";

let DataItem = ({ index }) => {
    const currentSet = useSelector(state => state.data.dataSets[index])

    if (currentSet) {

        console.log(currentSet)

        return (
            <article>
                <h3>DataSet #: {index + 1} DatSet Name: {currentSet.name}</h3>
                <div>
                    <RowPreview item={index} arr={currentSet.data} />
                </div>
            </article>
        )
    } else { return (
        <article>Please upload some data first!</article>
    )}
}

// Component displays column headers and up to 5 rows of array
let RowPreview = ({ arr }) => {
    let shortArr
    if (arr.length < 6) { shortArr = arr} else {
        shortArr = arr.slice(1, 6)  }

    let content = shortArr.map((row) => (
        <div> <ItemPreview key={row[0]} item={row}/> </div>) )

        return (
            <section>
                <h4><ItemPreview item={arr[0]} /></h4>
                {content}
            </section>
        )

}

let ItemPreview = ({ item }) => {
    let content = item.map((entry) => (
        <span>{entry} -- </span>
    ))
    return (
        <span>{content}</span>
    )
}

export const DataSets = () => {
    const length = useSelector(state => state.data.dataSets.length)
    let container = Array.from(Array(length).keys())

    const content = container.map((num) => (
    <DataItem key={num} index={num} />
    )
)

    return (
        <section>
            <SetSelector />
            <h2> DataSets so Far: </h2>

            <span>{content}</span>

        </section>

    )
}

export default DataSets
