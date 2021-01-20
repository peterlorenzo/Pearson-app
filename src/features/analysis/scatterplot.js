import React from "react";
import {dot, sqrt} from "mathjs";
import * as d3 from 'd3';

// adapted from https://www.d3-graph-gallery.com/graph/scatter_basic.html and
// https://gist.github.com/isaaguilar/fb92517c1ce878f7d3780cf9aa74a709

export const Scatterplot = (props) => {
    const dataPairs = props.data

    // do all the stuff I was originally doing in the analysis file

    let xValues = dataPairs.map(a => a[0])
    let yValues = dataPairs.map(a => a[1])

    // Some math that does linear regression and correlation coefficient
    const n = dataPairs.length
    const ones = Array(n).fill(1)

    // set circle size based on how many points
    let circleSize
    if (n < 100) {
        circleSize = 5
    } else if (n < 1000) {
        circleSize = 2.5
    } else { circleSize = 1.25}

    // slope & y-intercept for linear regression
    const slope = (n * dot(xValues, yValues) -
        dot(xValues, ones) * dot(yValues, ones)) / (
        n * dot(xValues, xValues) -
        dot(xValues, ones) * dot(xValues, ones)
    )

    const intercept = (dot(yValues, ones) - slope * dot(xValues, ones)) / n
    const regression = (x) => (slope * x + intercept)

    // correlation coefficient
    const r = (n * dot(xValues, yValues) -
        dot(xValues, ones) * dot(yValues, ones)) / (
        sqrt(n * dot(xValues, xValues) -
            dot(xValues, ones) * dot(xValues, ones)) *
        sqrt(n * dot(yValues, yValues) -
            dot(yValues, ones) * dot(yValues, ones))
    )

    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Find the min and max and set axes
    let xMin = Math.min(...xValues), xMax = Math.max(...xValues)
    let yMin = Math.min(...yValues), yMax = Math.max(...yValues)

    // points for regression line
    const points = [
        [xMin, regression(xMin)],
        [xMax, regression(xMax)]
    ]

    // Add X axis
    let x = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([ 0, width ]);
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

    // Add Y axis
    let y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([ height, 0]);
    // svg.append("g")
    //     .call(d3.axisLeft(y));


    return (
        <div>
            <h3>The correlation coefficient is {formatter.format(r)}</h3>
            <h3>The linear regression is {formatter.format(slope)}x + {formatter.format(intercept)}</h3>
            <h3> Scatterplot with Trendline </h3>
                <svg
                    width={width + margin.right + margin.left}
                    height={height + margin.top + margin.bottom}
                    className="chart"
                >
                    <g
                        transform={"translate(" + margin.left + "," + margin.top + ")"}
                        width={width}
                        height={height}
                        className="main"
                    >
                        <RenderCircles data={dataPairs} scale={{ x, y }} size={circleSize}/>
                        <RegressionLine points={points} scale={{ x, y }} />
                        <Axis
                            axis="x"
                            transform={"translate(0," + height + ")"}
                            scale={d3.axisBottom().scale(x)}
                        />
                        <Axis
                            axis="y"
                            transform="translate(0,0)"
                            scale={d3.axisLeft().scale(y)}
                        />
                    </g></svg>
        </div>
    )
}


const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
});

const RenderCircles = (props) => {

        let renderCircles = props.data.map((coords, i) => (
            <circle
                cx={props.scale.x(coords[0])}
                cy={props.scale.y(coords[1])}
                r={props.size}
                style={{ fill: "#69b3a2" }}
                key={i}
            />
        ))
        return <g>{renderCircles}</g>
}

const RegressionLine = (props) => {
    return (
        <line
            x1={props.scale.x(props.points[0][0])}
            y1={props.scale.y(props.points[0][1])}
            x2={props.scale.x(props.points[1][0])}
            y2={props.scale.y(props.points[1][1])}
            style={{ stroke: "black", strokeWidth: "2" }}
        />
    )
}

class Axis extends React.Component {
    componentDidMount() {
        const node = this.refs[this.props.axis]
        d3.select(node).call(this.props.scale)
    }

    render() {
        return (
            <g
                className="main axis date"
                transform={this.props.transform}
                ref={this.props.axis}
            />
        )
    }
}

export default Scatterplot
