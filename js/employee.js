
"use strict";


const width = 1000;
const height = 1000;
const padding = 50;
const margin = 50;

const min_data = 10;
const max_data = 10000;

const bar_width = 30;

const intro_duration = 500;
const tooltip_duration = 300;

const circle_lower_radius = 1;
const circle_higher_radius = 10;


const data = await processData()
const data_country = await processDataCountry()

const countryToContinent = {
    "AFGHANISTAN": "ASIA",
    "ALBANIA": "EUROPE",
    "ALGERIA": "AFRICA",
    "ANDORRA": "EUROPE",
    "ANGOLA": "AFRICA",
    "ANTIGUA AND BARBUDA": "NORTH AMERICA",
    "ARGENTINA": "SOUTH AMERICA",
    "ARMENIA": "ASIA",
    "AUSTRALIA": "OCEANIA",
    "AUSTRIA": "EUROPE",
    "AZERBAIJAN": "ASIA",
    "BAHAMAS": "NORTH AMERICA",
    "BAHRAIN": "ASIA",
    "BANGLADESH": "ASIA",
    "BARBADOS": "NORTH AMERICA",
    "BELARUS": "EUROPE",
    "BELGIUM": "EUROPE",
    "BELIZE": "NORTH AMERICA",
    "BENIN": "AFRICA",
    "BHUTAN": "ASIA",
    "BOLIVIA": "SOUTH AMERICA",
    "BOSNIA AND HERZEGOVINA": "EUROPE",
    "BOTSWANA": "AFRICA",
    "BRAZIL": "SOUTH AMERICA",
    "BRUNEI": "ASIA",
    "BULGARIA": "EUROPE",
    "BURKINA FASO": "AFRICA",
    "BURUNDI": "AFRICA",
    "CABO VERDE": "AFRICA",
    "CAMBODIA": "ASIA",
    "CAMEROON": "AFRICA",
    "CANADA": "NORTH AMERICA",
    "CENTRAL AFRICAN REPUBLIC": "AFRICA",
    "CHAD": "AFRICA",
    "CHILE": "SOUTH AMERICA",
    "CHINA": "ASIA",
    "COLOMBIA": "SOUTH AMERICA",
    "COMOROS": "AFRICA",
    "CONGO, DEMOCRATIC REPUBLIC OF THE": "AFRICA",
    "CONGO, REPUBLIC OF THE": "AFRICA",
    "COSTA RICA": "NORTH AMERICA",
    "CROATIA": "EUROPE",
    "CUBA": "NORTH AMERICA",
    "CYPRUS": "ASIA",
    "CZECH REPUBLIC": "EUROPE",
    "DENMARK": "EUROPE",
    "DJIBOUTI": "AFRICA",
    "DOMINICA": "NORTH AMERICA",
    "DOMINICAN REPUBLIC": "NORTH AMERICA",
    "EAST TIMOR": "ASIA",
    "ECUADOR": "SOUTH AMERICA",
    "EGYPT": "AFRICA",
    "EL SALVADOR": "NORTH AMERICA",
    "EQUATORIAL GUINEA": "AFRICA",
    "ERITREA": "AFRICA",
    "ESTONIA": "EUROPE",
    "ESWATINI": "AFRICA",
    "ETHIOPIA": "AFRICA",
    "FIJI": "OCEANIA",
    "FINLAND": "EUROPE",
    "FRANCE": "EUROPE",
    "GABON": "AFRICA",
    "GAMBIA": "AFRICA",
    "GEORGIA": "ASIA",
    "GERMANY": "EUROPE",
    "GHANA": "AFRICA",
    "GREECE": "EUROPE",
    "GRENADA": "NORTH AMERICA",
    "GUATEMALA": "NORTH AMERICA",
    "GUINEA": "AFRICA",
    "GUINEA-BISSAU": "AFRICA",
    "GUYANA": "SOUTH AMERICA",
    "HAITI": "NORTH AMERICA",
    "HONDURAS": "NORTH AMERICA",
    "HUNGARY": "EUROPE",
    "ICELAND": "EUROPE",
    "INDIA": "ASIA",
    "INDONESIA": "ASIA",
    "IRAN": "ASIA",
    "IRAQ": "ASIA",
    "IRELAND": "EUROPE",
    "ISRAEL": "ASIA",
    "ITALY": "EUROPE",
    "IVORY COAST": "AFRICA",
    "JAMAICA": "NORTH AMERICA",
    "JAPAN": "ASIA",
    "JORDAN": "ASIA",
    "KAZAKHSTAN": "ASIA",
    "KENYA": "AFRICA",
    "KIRIBATI": "OCEANIA",
    "KOREA, NORTH": "ASIA",
    "KOREA, SOUTH": "ASIA",
    "KOSOVO": "EUROPE",
    "KUWAIT": "ASIA",
    "KYRGYZSTAN": "ASIA",
    "LAOS": "ASIA",
    "LATVIA": "EUROPE",
    "LEBANON": "ASIA",
    "LESOTHO": "AFRICA",
    "LIBERIA": "AFRICA",
    "LIBYA": "AFRICA",
    "LIECHTENSTEIN": "EUROPE",
    "LITHUANIA": "EUROPE",
    "LUXEMBOURG": "EUROPE",
    "MADAGASCAR": "AFRICA",
    "MALAWI": "AFRICA",
    "MALAYSIA": "ASIA",
    "MALDIVES": "ASIA",
    "MALI": "AFRICA",
    "MALTA": "EUROPE",
    "MARSHALL ISLANDS": "OCEANIA",
    "MAURITANIA": "AFRICA",
    "MAURITIUS": "AFRICA",
    "MEXICO": "NORTH AMERICA",
    "MICRONESIA": "OCEANIA",
    "MOLDOVA": "EUROPE",
    "MONACO": "EUROPE",
    "MONGOLIA": "ASIA",
    "MONTENEGRO": "EUROPE",
    "MOROCCO": "AFRICA",
    "MOZAMBIQUE": "AFRICA",
    "MYANMAR": "ASIA",
    "NAMIBIA": "AFRICA",
    "NAURU": "OCEANIA",
    "NEPAL": "ASIA",
    "NETHERLANDS": "EUROPE",
    "NEW ZEALAND": "OCEANIA",
    "NICARAGUA": "NORTH AMERICA",
    "NIGER": "AFRICA",
    "NIGERIA": "AFRICA",
    "NORTH MACEDONIA": "EUROPE",
    "NORWAY": "EUROPE",
    "OMAN": "ASIA",
    "PAKISTAN": "ASIA",
    "PALAU": "OCEANIA",
    "PALESTINE": "ASIA",
    "PANAMA": "NORTH AMERICA",
    "PAPUA NEW GUINEA": "OCEANIA",
    "PARAGUAY": "SOUTH AMERICA",
    "PERU": "SOUTH AMERICA",
    "PHILIPPINES": "ASIA",
    "POLAND": "EUROPE",
    "PORTUGAL": "EUROPE",
    "QATAR": "ASIA",
    "ROMANIA": "EUROPE",
    "RUSSIA": "EUROPE",
    "RWANDA": "AFRICA",
    "SAINT KITTS AND NEVIS": "NORTH AMERICA",
    "SAINT LUCIA": "NORTH AMERICA",
    "SAINT VINCENT AND THE GRENADINES": "NORTH AMERICA",
    "SAMOA": "OCEANIA",
    "SAN MARINO": "EUROPE",
    "SAO TOME AND PRINCIPE": "AFRICA",
    "SAUDI ARABIA": "ASIA",
    "SENEGAL": "AFRICA",
    "SERBIA": "EUROPE",
    "SEYCHELLES": "AFRICA",
    "SIERRA LEONE": "AFRICA",
    "SINGAPORE": "ASIA",
    "SLOVAKIA": "EUROPE",
    "SLOVENIA": "EUROPE",
    "SOLOMON ISLANDS": "OCEANIA",
    "SOMALIA": "AFRICA",
    "SOUTH AFRICA": "AFRICA",
    "SOUTH SUDAN": "AFRICA",
    "SPAIN": "EUROPE",
    "SRI LANKA": "ASIA",
    "SUDAN": "AFRICA",
    "SURINAME": "SOUTH AMERICA",
    "SWEDEN": "EUROPE",
    "SWITZERLAND": "EUROPE",
    "SYRIA": "ASIA",
    "TAIWAN": "ASIA",
    "TAJIKISTAN": "ASIA",
    "TANZANIA": "AFRICA",
    "THAILAND": "ASIA",
    "TOGO": "AFRICA",
    "TONGA": "OCEANIA",
    "TRINIDAD AND TOBAGO": "NORTH AMERICA",
    "TUNISIA": "AFRICA",
    "TURKEY": "ASIA",
    "TURKMENISTAN": "ASIA",
    "TUVALU": "OCEANIA",
    "UGANDA": "AFRICA",
    "UKRAINE": "EUROPE",
    "UNITED ARAB EMIRATES": "ASIA",
    "UNITED KINGDOM": "EUROPE",
    "UNITED STATES": "NORTH AMERICA",
    "URUGUAY": "SOUTH AMERICA",
    "UZBEKISTAN": "ASIA",
    "VANUATU": "OCEANIA",
    "VATICAN CITY": "EUROPE",
    "VENEZUELA": "SOUTH AMERICA",
    "VIETNAM": "ASIA",
    "YEMEN": "ASIA",
    "ZAMBIA": "AFRICA",
    "ZIMBABWE": "AFRICA"
};

const continentToColor = {
    "AFRICA": "#a6cee3",
    "ANTARCTICA": "#fb9a99",
    "ASIA": "#b2df8a",
    "EUROPE": "#fdbf6f",
    "NORTH AMERICA": "#cab2d6",
    "OCEANIA": "#cccc55",
    "SOUTH AMERICA": "#fdae61"
};


async function genCountryChart(data) {

    // console.log(data)


    const dataScale = d3.scaleLog()
        .domain([min_data, max_data])
        .range([circle_lower_radius, circle_higher_radius])
        .base(2);



    const svg1 = d3.select("#employee_svg");

    //clear everything
    svg1.selectAll("*").remove();

    // set size
    svg1.attr("width", width)
        .attr("height", height)
        .attr("transform", `translate(${margin}, ${margin})`);

    const projection = d3.geoMercator()
        .translate([width / 2, height / 2]);
    const path = d3.geoPath(projection);

    var points = null;


    // Load map
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
        .then(d => {

            const countries = topojson.feature(d, d.objects.countries);

            // build country background
            svg1.append("g")
                .selectAll('path')
                .data(countries.features)
                .enter()
                .append('path')
                .attr('class', 'topo_country')
                .attr('d', path);

            // load data points
            points = svg1.append("g")
                .selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("transform", (d, i) => {
                    return `translate(${projection([d['long'], d['lat']])[0]}, ${projection([d['long'], d['lat']])[1]})`;
                })

            points
                .append("circle")
                .attr("fill", (d, i) => {
                    let cur_color = continentToColor[countryToContinent[d['Country']]];
                    if (cur_color == undefined || cur_color == null) {
                        return "#cccccc";
                    } else {
                        return cur_color;
                    }
                })
                .transition()
                .duration(intro_duration)
                .attr("r", (d, i) => {
                    if (d['Count'] < min_data) {
                        return 0;
                    } else {
                        return dataScale(d['Count']);
                    }
                });

            // Define mouseover and mouseout events
            points
                .on("mouseover", async (event, d) => {
                    d3.select(event.target)
                        .transition()
                        .duration(tooltip_duration)
                        .attr("r", (d, i) => {
                            if (d['Count'] < min_data) {
                                return 0;
                            } else {
                                return dataScale(d['Count']) * 1.5;
                            }
                        })

                    // console.log(event.target)
                    await genPieChart(
                        d3.select(event.target.parentNode),
                        d,
                        dataScale
                    );

                })
                .on("mouseout", () => {
                    d3.select(event.target)
                        .transition()
                        .duration(tooltip_duration)
                        .attr("r", (d, i) => {
                            if (d['Count'] < min_data) {
                                return 0;
                            } else {
                                return dataScale(d['Count']);
                            }
                        })

                    d3.selectAll("g").selectAll("#pie_chart").remove();

                });

        });



    // Create a tooltip div that is initially hidden
    // const tooltip = d3.select("body")
    //     .append("div")
    //     .attr("class", "tooltip");



    // legend
    const legends_plaintext = [
        "AFRICA",
        "ANTARCTICA",
        "ASIA",
        "EUROPE",
        "NORTH AMERICA",
        "OCEANIA",
        "SOUTH AMERICA"
    ]

    const colors_value = [
        "#a6cee3",
        "#fb9a99",
        "#b2df8a",
        "#fdbf6f",
        "#cab2d6",
        "#cccc55",
        "#fdae61"
    ]

    const legend_dot = svg1
        .append("g")
        .attr("transform", `translate(20, 20)`)
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
        .attr("transform", `translate(20, 20)`)
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



async function genPieChart(parentSvg, parentD, dataScale) {

    const country = parentSvg.datum()["Country"]

    const data = await processDataEdu(country);
    // console.log(data)

    const colorScale = d3.scaleOrdinal(d3.schemeAccent);


    //clear everything
    parentSvg.selectAll("g").remove();

    var radius = dataScale(parentD['Count']) * 10;
    console.log(radius);
    if(radius > 85){
        radius = 85;
    }
    if(radius < 35){
        radius = 35;
    }

    // console.log(dataScale(parentD['Count']) * 10);

    const arc = d3.arc()
        .innerRadius(radius)
        .outerRadius(radius * 1.5);

    const pie = d3.pie()
        .padAngle(1 / 400)
        .sort(null)
        .value(d => d["Count"]);

    // console.log(pie(data))

    parentSvg.append("g")
    .attr("id", "pie_chart")
        .append("text")
        .attr("text-anchor", "middle")
        .text(d => country)
        .style("user-select", "none");

    parentSvg.append("g")
    .attr("id", "pie_chart")
        .selectAll()
        .data(pie(data))
        .enter()
        .append("path")
        .attr("fill", d => colorScale(d.data["Education"]))
        .attr("d", arc)
        .append("title")
        .text(d => `${d.data["Education"]}: ${d.data["Count"]}`);

    parentSvg.append("g")
    .attr("id", "pie_chart")
        .selectAll()
        .data(pie(data))
        .enter()
        .append("text")
        .attr("font-size", 8)
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25)
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text((d, i) => `${d.data["Education"]}: ${d.data["Count"]}`))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text((d, i) => `${d.data["Education"]}: ${d.data["Count"]}`));




}



// initial run
genCountryChart(data_country);





// helper functions

async function processData() {
    const data = await d3.dsv(",", "../data/PERM.csv");

    return data;
}

async function processDataCountry() {
    const data = await d3.dsv(",", "../data/PERM_Country.csv");

    return data;
}

async function processDataEdu(country) {
    const data = await d3.dsv(",", "../data/PERM_Country_Edu.csv");
    // console.log(data)

    const result = d3.filter(data, d => d['Country'] == country);
    // console.log(result)

    return result;
}


// End of helper functions



