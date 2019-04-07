

$(document).ready(function () {

    // Section for Data

    var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

    // Section for D3 Table



    // Section for D3 Bar Chart

    // Creates a number of variables which define the dimensions of the svg container
    var containerWidth = +d3.select('.col-12').style('width').slice(0, -2)
    var svgWidth = containerWidth * .80;
    var svgHeight = 300;
    var barPadding = 10;
    var barWidth = (svgWidth / dataset.length);
    var margin = 30;

    // Creates a variables that allows for scaling of the x axes of the chart elements to fit the container
    var x = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([0, svgWidth]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([svgHeight, 0]);

    // Select svg element and add attributes to the element
    var svg = d3.select("svg")
        .attr("width", svgWidth + 2 * margin)
        .attr("height", svgHeight + 2 * margin)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + margin + ")")
        .attr("class", "bar-chart");

    // Create new rect elements within the svg elemetn and add atributes
    svg.selectAll("rect")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", barWidth - barPadding)
        .attr("height", function (d) { return svgHeight - y(d); })
        .attr("x", function (d, i) { return x(i); })
        .attr("y", function (d) { return y(d) - 20; });

    // Create labels for bars
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("height", function (d) { return svgHeight - y(d); })
        .attr("x", function (d, i) { return x(i) + (barWidth - 2 * barPadding) / 2; })
        .attr("y", function (d) { return y(d); })
        .attr("text-anchor", "middle")
        .attr("fill", "white");

    // Section to create axis

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + (svgHeight - 20) + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .attr("transform", "translate(0," + (-20) + ")")
        .call(d3.axisLeft(y));
});

