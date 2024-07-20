
"use strict";

const width = 800;
const height = 600;
const padding = 50;
const margin = 50;
const maxY = 790000;

const bar_width = 30;

const intro_duration = 500;
const tooltip_duration = 300;

const colors = {
    "single": "#f0f07a",
    "multi": "#e39332",
    "error": "#de221f",
    "selected": "#9be89b"
}

async function getData() {
    const data = await d3.dsv(",", "../data/h1b_cap_2.csv");
    return data;
}


async function genChart(){
    const data = await getData();


    const x_scale = d3.scaleLinear()
    .domain([2021, 2025])
    .range([padding, width - padding * 2]);

const y_scale = d3.scaleLinear(
    [0, maxY],
    [height - padding, 0]
);

const y_percentage_scale = d3.scaleLinear(
    [0, 1],
    [height - padding, 0]
)

const height_scale = d3.scaleLinear(
    [0, maxY],
    [0, height - padding]
);


const svg1 = d3.select("#electronic_svg");

// set size
svg1.attr("width", width)
    .attr("height", height)
    .attr("transform", `translate(${margin}, ${margin})`);


// Set single content
const content_single = svg1.append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect");

content_single
    .attr("x", (d, i) => {
        return x_scale(d["H1B Fiscal Year"]);
    })
    .attr("y", (d, i) => {
        return y_scale(d["Eligible Registrations for Beneficiaries with No Other Eligible Registrations"]);
    })
    .attr("width", (d, i) => {
        return bar_width;
    })
    .attr("fill", (d, i) => {
        return colors["single"];
    });

content_single.transition()
    .duration(intro_duration)
    .attr("height", (d, i) => {
        return height_scale(d["Eligible Registrations for Beneficiaries with No Other Eligible Registrations"]);
    });


// Set multiple content
const content_multi = svg1.append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect");

content_multi
    .attr("x", (d, i) => {
        return x_scale(d["H1B Fiscal Year"]);
    })
    .attr("y", (d, i) => {
        return y_scale(d["Eligible Registrations"]);
    })
    .attr("width", (d, i) => {
        return bar_width;
    })
    .attr("fill", (d, i) => {
        return colors["multi"];
    });

content_multi.transition()
    .duration(intro_duration)
    .attr("height", (d, i) => {
        return height_scale(d["Eligible Registrations for Beneficiaries with Multiple Eligible Registrations"]);
    });


// Set error content
const content_error = svg1.append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect");

content_error
    .attr("x", (d, i) => {
        return x_scale(d["H1B Fiscal Year"]);
    })
    .attr("y", (d, i) => {
        return y_scale(d["Total Registrations"]);
    })
    .attr("width", (d, i) => {
        return bar_width;
    })
    .attr("fill", (d, i) => {
        return colors["error"];
    });

content_error.transition()
    .duration(intro_duration)
    .attr("height", (d, i) => {
        return height_scale(d["Total Registrations"] - d["Eligible Registrations"]);
    });


// Set selected content
const content_selected = svg1.append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect");

content_selected
    .attr("x", (d, i) => {
        return x_scale(d["H1B Fiscal Year"]) + bar_width + 10;
    })
    .attr("y", (d, i) => {
        return y_scale(d["Selected Registrations"]);
    })
    .attr("width", (d, i) => {
        return bar_width;
    })
    .attr("fill", (d, i) => {
        return colors["selected"];
    });

content_selected.transition()
    .duration(intro_duration)
    .attr("height", (d, i) => {
        return height_scale(d["Selected Registrations"]);
    });


// Set selecteion rate content
const content_rate = svg1.append("g")
    .append("path")
    .datum(data)

content_rate
    .attr("fill", "none")
    .attr("stroke", "darkgreen")
    .attr("stroke-width", "1px")
    .attr("d", d3.line()
        .x((d, i) => x_scale(d["H1B Fiscal Year"]))
        .y((d, i) => y_percentage_scale(d["Selected Registrations"] / d["Total Registrations"])))

// content_selected.transition()
//     .duration(intro_duration)
//     .attr("height", (d, i) => {
//         return height_scale(d["Selected Registrations"]);
//     });




// axis
const axis_x = svg1.append("g")
    .attr("transform", `translate(0, ${height - margin})`)
    .call(
        d3.axisBottom(x_scale)
            .tickFormat((d, i) => {
                return "FY" + d;
            })
            .ticks(5)
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
content_single
    .on("mouseover", (event, d) => {
        tooltip.attr()
        tooltip.transition()
            .duration(tooltip_duration)
            .style("opacity", .9);
        tooltip.html(`
            <strong>Fiscal Year ${d["H1B Fiscal Year"]}</strong>
            <br> 
            <strong>Total Registrations</strong> 
            ${d["Total Registrations"]}
            <br>
            <strong>Single Registration</strong> 
            ${d["Eligible Registrations for Beneficiaries with No Other Eligible Registrations"]} <strong>${get_single_percentage(d)}%</strong>
            <br>
            <strong>Multiple Registrations:</strong> 
            ${d["Eligible Registrations for Beneficiaries with Multiple Eligible Registrations"]} <strong>${get_multi_percentage(d)}%</strong>
        `);

        // Set unselected color to grey
        grey_everything()
        d3.select(event.target)
            .transition()
            .duration(tooltip_duration)
            .attr("fill", (d, i) => {
                return colors["single"];
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
        color_back_everything()
    });

content_multi
    .on("mouseover", (event, d) => {
        tooltip.attr()
        tooltip.transition()
            .duration(tooltip_duration)
            .style("opacity", .9);
        tooltip.html(`
            <strong>Fiscal Year ${d["H1B Fiscal Year"]}</strong>
            <br> 
            <strong>Total Registrations</strong> 
            ${d["Total Registrations"]}
            <br>
            <strong>Single Registration</strong> 
            ${d["Eligible Registrations for Beneficiaries with No Other Eligible Registrations"]} <strong>${get_single_percentage(d)}%</strong>
            <br>
            <strong>Multiple Registrations:</strong> 
            ${d["Eligible Registrations for Beneficiaries with Multiple Eligible Registrations"]} <strong>${get_multi_percentage(d)}%</strong>
        `);

        // Set unselected color to grey
        grey_everything()
        d3.select(event.target)
            .transition()
            .duration(tooltip_duration)
            .attr("fill", (d, i) => {
                return colors["multi"];
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
        color_back_everything()
    });

content_error
    .on("mouseover", (event, d) => {
        tooltip.attr()
        tooltip.transition()
            .duration(tooltip_duration)
            .style("opacity", .9);
        tooltip.html(`
            <strong>Fiscal Year ${d["H1B Fiscal Year"]}</strong>
            <br> 
            <strong>Total Registrations</strong> 
            ${d["Total Registrations"]}
            <br>
            <strong>Single Registration</strong> 
            ${d["Eligible Registrations for Beneficiaries with No Other Eligible Registrations"]} <strong>${get_single_percentage(d)}%</strong>
            <br>
            <strong>Multiple Registrations:</strong> 
            ${d["Eligible Registrations for Beneficiaries with Multiple Eligible Registrations"]} <strong>${get_multi_percentage(d)}%</strong>
        `);

        // Set unselected color to grey
        grey_everything()
        d3.select(event.target)
            .transition()
            .duration(tooltip_duration)
            .attr("fill", (d, i) => {
                return colors["error"];
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
        color_back_everything()
    });

content_selected
    .on("mouseover", (event, d) => {
        tooltip.attr()
        tooltip.transition()
            .duration(tooltip_duration)
            .style("opacity", .9);
        tooltip.html(`
            <strong>Fiscal Year ${d["H1B Fiscal Year"]}</strong>
            <br> 
            <strong>Total Registrations</strong> 
            ${d["Total Registrations"]}
            <br>
            <strong>Selected Registrations</strong> 
            ${d["Selected Registrations"]} <strong>${get_selected_percentage(d)}%</strong>
        `);

        // Set unselected color to grey
        grey_everything()
        d3.select(event.target)
            .transition()
            .duration(tooltip_duration)
            .attr("fill", (d, i) => {
                return colors["selected"];
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
        color_back_everything()
    });








// Annotation_bar
const annotations = [{
    note: {
        label: "First year of electronic registration",
        bgPadding: 20,
        title: "FY 2021"
    },
    data: {
        "H1B Fiscal Year": 2021,
        "Total Registrations": data[0]["Total Registrations"]
    },
    dy: -60,
    dx: 60,
},
{
    note: {
        label: "Over 50% registrations are multiple registrations",
        bgPadding: 20,
        title: "FY 2024"
    },
    data: {
        "H1B Fiscal Year": 2024,
        "Total Registrations": data[3]["Total Registrations"]
    },
    dy: 60,
    dx: -60,
},
{
    note: {
        label: "One person one ticket",
        bgPadding: 20,
        title: "FY 2025"
    },
    data: {
        "H1B Fiscal Year": 2025,
        "Total Registrations": data[4]["Total Registrations"]
    },
    dy: -60,
    dx: -60,
}
]


// Make Annotations
const makeAnnotation = d3
    .annotation()
    .editMode(false)
    .notePadding(15)
    .type(d3.annotationCallout)
    .accessors({
        x: d => x_scale(d["H1B Fiscal Year"]),
        y: d => y_scale(d["Total Registrations"])
    })
    .annotations(annotations);

svg1.append("g")
    .attr("class", "annotation_group")
    .call(makeAnnotation);



// legend
var keys = ["single", "multi", "error", "selected"];
var legends_plaintext = ["Eligible Registrations for Beneficiaries with No Other Eligible Registrations", "Eligible Registrations for Beneficiaries with Multiple Eligible Registrations", "Ineligible Registrations", "Selected Registrations"];

var legend_dot = svg1
    .append("g")
    .selectAll("legends")
    .data(keys)
    .enter()
    .append("rect")
    .attr("x", 60)
    .attr("y", (d, i) => {
        return 3 + i * 20;
    })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", (d, i) => colors[d]);

var legend_text = svg1
    .append("g")
    .selectAll("legends")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 80)
    .attr("y", (d, i) => {
        return 10 + i * 20;
    })
    .text((d, i) => { return legends_plaintext[i] })
    .style("fill", (d, i) => colors[d])
    .attr("text-anchor", "left")
    .style("width", "80px")
    .style("font-size", "10px")
    .style("alignment-baseline", "middle")











// helper functions
function grey_everything() {
    content_single.transition()
        .duration(tooltip_duration)
        .attr("fill", "grey");
    content_multi.transition()
        .duration(tooltip_duration)
        .attr("fill", "grey");
    content_error.transition()
        .duration(tooltip_duration)
        .attr("fill", "grey");
    content_selected.transition()
        .duration(tooltip_duration)
        .attr("fill", "grey");
}

function color_back_everything() {
    content_single.transition()
        .duration(tooltip_duration)
        .attr("fill", (d, i) => {
            return colors["single"];
        });
    content_multi.transition()
        .duration(tooltip_duration)
        .attr("fill", (d, i) => {
            return colors["multi"];
        });
    content_error.transition()
        .duration(tooltip_duration)
        .attr("fill", (d, i) => {
            return colors["error"];
        });
    content_selected.transition()
        .duration(tooltip_duration)
        .attr("fill", (d, i) => {
            return colors["selected"];
        });
}

function get_single_percentage(d) {
    let percentage = d["Eligible Registrations for Beneficiaries with No Other Eligible Registrations"] / d["Total Registrations"] * 100;
    return percentage.toFixed(2);
}

function get_multi_percentage(d) {
    let percentage = d["Eligible Registrations for Beneficiaries with Multiple Eligible Registrations"] / d["Total Registrations"] * 100;
    return percentage.toFixed(2);
}

function get_selected_percentage(d) {
    let percentage = d["Selected Registrations"] / d["Total Registrations"] * 100;
    return percentage.toFixed(2);
}

// End of helper functions



}


genChart();
