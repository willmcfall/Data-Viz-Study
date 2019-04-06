

$(document).ready(function () {


    // Section for D3 Bar Chart

    // Section to create bar chart container and bars

    // Creates a variable holding the values to be vizualized
    var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

    // Creates a number of variables which define the dimensions of the svg container
    var containerWidth = +d3.select('.col-12').style('width').slice(0, -2)
    var svgWidth = containerWidth * .80;
    var svgHeight = 300;
    var barPadding = 5;
    var barWidth = (svgWidth / dataset.length);

    // Creates a variables that allows for scaling of the x axes of the chart elements to fit the container
    var x = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([0, svgWidth]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([svgHeight, 0]);

    // Select svg element and add attributes to the element
    var svg = d3.select("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("class", "bar-chart");

    // Create new rect elements within the svg elemetn and add atributes
    svg.selectAll("rect")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", barWidth - barPadding)
        .attr("height", function (d) { return svgHeight - y(d); })
        .attr("x", function (d, i) { return x(i); })
        .attr("y", function (d) { return y(d) - 20;});

    // Create labels for bars
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("height", function (d) { return svgHeight - y(d); })
        .attr("x", function (d, i) {return x(i) + (barWidth - 2 * barPadding)/2; })
        .attr("y", function (d) {return y(d); })
        .attr("text-anchor", "middle")
        .attr("fill", "black");
 

    // // Section to create axis

    // var x_axis = d3.axisBottom().scale(xScale);

    // var y_axis = d3.axisLeft().scale(yScale);

    // svg.append("g")
    //     .attr("transform", "translate(50, 10)")
    //     .call(y_axis);

    // var xAxisTranslate = svgHeight - 20;

    // svg.append("g")
    //     .attr("transform", "translate(50, " + xAxisTranslate + ")")
    //     .call(x_axis);



});