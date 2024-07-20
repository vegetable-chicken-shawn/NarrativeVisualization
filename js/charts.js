

export async function test_chart() {

    const data = await d3.dsv(",", "../data/test.csv");
    console.log(data)

    var div1 = d3.select("#svg1")

    div1.attr("width", 500)
        .attr("height", 500)


    div1.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => { return i * 10; })
        .attr("cy", (d, i) => { return i * 20; })
        .attr("r", (d, i) => { return d["Continuing Approval"] * 2; })


}



