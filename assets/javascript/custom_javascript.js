

$(document).ready(function () {

    // Section for D3 Table

    d3.json('./assets/data/dataset.json', function (error, data) {

        if (error) {
            return console.warn(error);
        }

        console.log(data);

        function tabulate(data, columns) {
            var table = d3.select('.table_presentation').append('table')
            var thead = table.append('thead')
            var tbody = table.append('tbody');

            // append the header row
            thead.append('tr')
                .selectAll('th')
                .data(columns).enter()
                .append('th')
                .text(function (column) { return column; });

            // create a row for each object in the data
            var rows = tbody.selectAll('tr')
                .data(data)
                .enter()
                .append('tr');

            // create a cell in each row for each column
            var cells = rows.selectAll('td')
                .data(function (row) {
                    return columns.map(function (column) {
                        return { column: column, value: row[column] };
                    });
                })
                .enter()
                .append('td')
                .text(function (d) { return d.value; });

            return table;
        }

        // render the table(s)
        tabulate(data, ['name', 'value']); // 2 column table

    });


    // Section for D3 Bar Chart

    d3.json('./assets/data/dataset.json', function (error, data) {

        if (error) {
            return console.warn(error);
        }

        console.log(data);

        // Creates a number of variables which define the dimensions of the svg container
        var containerWidth = +d3.select('.col-12').style('width').slice(0, -2)
        var svgWidth = containerWidth * .80;
        var svgHeight = 300;
        var barPadding = 5;
        var barWidth = (svgWidth / data.value.length);

        // Creates a variables that allows for scaling of the x axes of the chart elements to fit the container
        var x = d3.scaleLinear()
            .domain([0, data.value.length])
            .range([0, svgWidth]);

        var y = d3.scaleLinear()
            .domain([0, d3.max(data.value)])
            .range([svgHeight, 0]);

        // Select svg element and add attributes to the element
        var svg = d3.select("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("class", "bar-chart");

        // Create new rect elements within the svg elemetn and add atributes
        svg.selectAll("rect")
            .data(data.value)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("width", barWidth - barPadding)
            .attr("height", function (d) { return svgHeight - y(d); })
            .attr("x", function (d, i) { return x(i); })
            .attr("y", function (d) { return y(d) - 20; });

        // Create labels for bars
        svg.selectAll("text")
            .data(data.value)
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

    });

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