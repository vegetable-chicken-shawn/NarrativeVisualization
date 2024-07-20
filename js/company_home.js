
"use strict";


const width = 1200;
const height = 600;
const padding = 50;
const margin = 50;

const min_data = 250;
const max_data = 2000;

const bar_width = 30;

const intro_duration = 500;
const tooltip_duration = 300;

const circle_lower_radius = 5;
const circle_higher_radius = 30;

const colors = {
    11: "#1f77b4",
    21: "#ff7f0e",
    22: "#2ca02c",
    23: "#d62728",
    31: "#8c564b",
    32: "#8c564b",
    33: "#8c564b",
    42: "#7f7f7f",
    44: "#bcbd22",
    45: "#bcbd22",
    48: "#393b79",
    49: "#393b79",
    51: "#8c6d31",
    52: "#843c39",
    53: "#7b4173",
    54: "#5254a3",
    55: "#6b6ecf",
    56: "#b5cf6b",
    61: "#c49c94",
    62: "#f7b6d2",
    71: "#c7c7c7",
    72: "#dbdb8d",
    81: "#9edae5",
    92: "#3182bd"
}


// select data
const file2023 = "../data/h1b_employer_2023.csv";
const file2022 = "../data/h1b_employer_2022.csv";
const file2021 = "../data/h1b_employer_2021.csv";

const data2023 = await processData(file2023)
const data2022 = await processData(file2022)
const data2021 = await processData(file2021)


function genChart(data) {
    
    data = filterData(data, min_data)
    // console.log(data)


    const dataScale = d3.scaleLog()
        .domain([min_data, max_data])
        .range([circle_lower_radius, circle_higher_radius])
        .base(2);



    const svg1 = d3.select("#company_svg");

    const text_element = d3.select("#description_text");

    //clear everything
    svg1.selectAll("*").remove();

    // set size
    svg1.attr("width", width)
        .attr("height", height)
        .attr("transform", `translate(${margin}, ${margin})`)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);


    const simulation = d3
        .forceSimulation(data)
        .alphaTarget(0.3)
        .velocityDecay(0.1)
        .force("collide", d3.forceCollide().radius(d => dataScale(d["Total Approval"] - 1)).iterations(3))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX().strength(0.08))
        .force("y", d3.forceY().strength(0.08));


    const node = svg1.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("g")

    node.append("circle")
        .attr("r", (d, i) => dataScale(d["Total Approval"]))
        .attr("fill", (d, i) => {
            return colors[d["NAICS"]]
        })
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1.5);

    node.append("text")
        .text((d, i) => {
            if (dataScale(d["Total Approval"]) + 3 > circle_higher_radius) {
                let cur_strings = d["Employer"].split(" ")
                return cur_strings[0];
            } else {
                return "";
            }
        })
        // .style("fill", (d, i) => colors[d])
        .attr("text-anchor", "middle")
        .style("fill", "#EEEEEE")
        .style("width", circle_higher_radius)
        .style("font-size", "10px")
        // .style("alignment-baseline", "middle")
        .style("word-break", "normal");


    // start simulation
    simulation.on("tick", () => {
        node
            .attr('transform', d => `translate(${d.x},${d.y})`);
    });



    // Create a tooltip div that is initially hidden
    // const tooltip = d3.select("body")
    //     .append("div")
    //     .attr("class", "tooltip");

    // Define mouseover and mouseout events
    node
        .on("mouseover", (event, d) => {
            d3.select(event.target)
                .transition()
                .duration(tooltip_duration)
                .attr("r", d => {
                    return Math.max(
                        dataScale(d["Total Approval"]) * 1.5,
                        50
                    )
                });

            d3.select(event.target.parentNode)
                .selectAll("text")
                .text((d, i) => {
                    let cur_strings = d["Employer"].split(" ")
                    return cur_strings[0];
                })
        })
        .on("mouseout", () => {
            d3.select(event.target)
                .transition()
                .duration(tooltip_duration)
                .attr("r", d => dataScale(d["Total Approval"]));

            d3.select(event.target.parentNode)
                .selectAll("text")
                .text((d, i) => {
                    if (dataScale(d["Total Approval"]) + 1 > circle_higher_radius) {
                        let cur_strings = d["Employer"].split(" ")
                        return cur_strings[0];
                    } else {
                        return "";
                    }
                })
        })
        .on("click", () => {
            let d = d3.select(event.target)
                .datum();

            console.log(d["Employer"]);

            text_element.selectAll("*").remove();
            text_element.append("div")
            .html(`
                <strong>${d["Employer"]}</strong>
                <br> 
                <strong>${d["Fiscal Year"]}</strong> 
                ${d["Total Approval"]} Total Approvals
            `);
        });






    // legend
    const legends_plaintext = [
        "Agriculture, Forestry, Fishing and Hunting",
        "Mining, Quarrying, and Oil and Gas Extraction",
        "Utilities",
        "Construction",
        "Manufacturing",
        "Wholesale Trade",
        "Retail Trade",
        "Transportation and Warehousing",
        "Information",
        "Finance and Insurance",
        "Real Estate and Rental and Leasing",
        "Professional, Scientific, and Technical Services",
        "Management of Companies and Enterprises",
        "Administrative and Support and Waste Management and Remediation Services",
        "Educational Services",
        "Health Care and Social Assistance",
        "Arts, Entertainment, and Recreation",
        "Accommodation and Food Services",
        "Other Services (except Public Administration)",
        "Public Administration"
    ]

    const colors_value = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#8c564b",
        "#8c564b",
        "#8c564b",
        "#7f7f7f",
        "#bcbd22",
        "#bcbd22",
        "#393b79",
        "#393b79",
        "#8c6d31",
        "#843c39",
        "#7b4173",
        "#5254a3",
        "#6b6ecf",
        "#b5cf6b",
        "#c49c94",
        "#f7b6d2",
        "#c7c7c7",
        "#dbdb8d",
        "#9edae5",
        "#3182bd"
    ]

    const legend_dot = svg1
        .append("g")
        .attr("transform", `translate(300, -200)`)
        .selectAll("legends")
        .data(legends_plaintext)
        .enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", (d, i) => {
            return i * 20;
        })
        .attr("r", 2)
        .style("fill", (d, i) => colors_value[i]);

        const legend_text = svg1
        .append("g")
        .attr("transform", `translate(300, -200)`)
        .selectAll("legends")
        .data(legends_plaintext)
        .enter()
        .append("text")
        .attr("x", 20)
        .attr("y", (d, i) => {
            return 2 + i * 20;
        })
        .text((d, i) => { return legends_plaintext[i] })
        .style("fill", (d, i) => colors_value[i])
        .attr("text-anchor", "left")
        .style("width", "80px")
        .style("font-size", "10px")
        .style("alignment-baseline", "middle")



}


// initial run
genChart(data2023);


// button functions
document
    .getElementById("button_2021")
    .addEventListener("click",
        () => {
            genChart(data2021);
        }
    )

document
    .getElementById("button_2022")
    .addEventListener("click",
        () => {
            genChart(data2022);
        }
    )

document
    .getElementById("button_2023")
    .addEventListener("click",
        () => {
            genChart(data2023);
        }
    )








// helper functions

async function processData(selection) {
    const data = await d3.dsv(",", selection);

    return data;
}


function filterData(data, min_data) {
    var result = [];
    for (const single_item of data) {
        if (single_item["Total Approval"] < min_data) {
            continue;
        }
        result.push(single_item);
    }

    // console.log(result);
    return result;
}

// End of helper functions

