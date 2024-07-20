
"use strict";


const width = 800;
const height = 600;
const padding = 50;
const margin = 50;
const maxY = 790000;

const intro_duration = 500;
const tooltip_duration = 300;

const color_band = ["#9be89b", "#f0f07a", "#e39332", "#de221f"];

async function getData() {
    const data = await d3.dsv(",", "../data/h1b_cap_1.csv");
    return data;
}


async function genChart() {
    const data = await getData();

    const x_scale = d3.scaleLinear()
        .domain([2004, 2025])
        .range([padding, width - padding]);

    const y_scale = d3.scaleLinear(
        [0, maxY],
        [height - padding, 0]
    );

    const height_scale = d3.scaleLinear(
        [0, maxY],
        [0, height - padding]
    );

    const color = d3.scaleQuantize()
        .domain([0, maxY])
        .range(color_band);

    const svg1 = d3.select("#cap1_svg");

    // set size
    svg1.attr("width", width)
        .attr("height", height)
        .attr("transform", `translate(${margin}, ${margin})`);


    // set content
    const content = svg1.append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect");
    content
        .attr("x", (d, i) => {
            return x_scale(d["H1B Fiscal Year"]);
        })
        .attr("y", (d, i) => {
            return y_scale(d["H1B Applications Received"]);
        })
        .attr("width", (d, i) => {
            return 20;
        })
        .attr("fill", (d, i) => {
            return color(d["H1B Applications Received"]);
        });

    content.transition()
        .duration(intro_duration)
        .attr("height", (d, i) => {
            return height_scale(d["H1B Applications Received"]);
        });

    // axis
    const axis_x = svg1.append("g")
        .attr("transform", `translate(0, ${height - margin})`)
        .call(
            d3.axisBottom(x_scale)
                .tickFormat((d, i) => {
                    return "FY" + d;
                })
        );

    const axis_y = svg1.append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .call(
            d3.axisLeft(y_scale)
        );

    // Create a tooltip div that is initially hidden
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

    // Define mouseover and mouseout events
    content
        .on("mouseover", (event, d) => {
            tooltip.attr()
            tooltip.transition()
                .duration(tooltip_duration)
                .style("opacity", .9);
            tooltip.html(`
            <strong>Fiscal Year ${d["H1B Fiscal Year"]}</strong> 
            <br>
            <strong>H1B Applications Received:</strong> 
            ${d["H1B Applications Received"]}
            <br>
            <strong>Cap Reached Date:</strong> 
            ${d["Cap Reached Date"]}
            <br>
            <strong>H1B Cap Open Days:</strong> 
            ${d["H1B Cap Open Days"]}
        `);

            // Set unselected color to grey
            content.transition()
                .duration(tooltip_duration)
                .attr("fill", "grey");
            d3.select(event.target)
                .transition()
                .duration(tooltip_duration)
                .attr("fill", (d, i) => {
                    return color(d["H1B Applications Received"]);
                });
        })
        .on("mousemove", ((event, d) => {
            tooltip
                .style("position", "absolute")
                .style("top", (event.clientY + 20) + "px")
                .style("left", (event.clientX + 20) + "px");
        }))
        .on("mouseout", () => {
            tooltip.transition()
                .duration(tooltip_duration)
                .style("opacity", 0);

            // Set the color back
            content.transition()
                .duration(tooltip_duration)
                .attr("fill", (d, i) => {
                    return color(d["H1B Applications Received"]);
                });
        });


    // Annotation
    const annotations = [{
        note: {
            label: "Great recession of 2008",
            bgPadding: 20,
            title: "FY 2008"
        },
        data: {
            "H1B Fiscal Year": 2008,
            "H1B Applications Received": data[4]["H1B Applications Received"]
        },
        dy: -60,
        dx: -60,
    },
    {
        note: {
            label: "Lottery introduced for H1-B",
            bgPadding: 20,
            title: "FY 2014"
        },
        data: {
            "H1B Fiscal Year": 2014,
            "H1B Applications Received": data[10]["H1B Applications Received"]
        },
        dy: -60,
        dx: -60,
    },
    {
        note: {
            label: "Electronic registration lottery introduced",
            bgPadding: 20,
            title: "FY 2021"
        },
        data: {
            "H1B Fiscal Year": 2021,
            "H1B Applications Received": data[17]["H1B Applications Received"]
        },
        dy: -60,
        dx: -60,
    }]


    // Make Annotations
    const makeAnnotation = d3
        .annotation()
        .editMode(false)
        .notePadding(15)
        .type(d3.annotationLabel)
        .accessors({
            x: d => x_scale(d["H1B Fiscal Year"]),
            y: d => y_scale(d["H1B Applications Received"])
        })
        .annotations(annotations);

    svg1.append("g")
        .attr("class", "annotation_group")
        .call(makeAnnotation);

}

genChart();


