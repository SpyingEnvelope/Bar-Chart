let jsonDataString;
let jsonData;
let dataSvg;
let heightScale;
let widthScale;
let yScale;
let xScale;

const w = 1000;
const h = 500;
const padding = 40;

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(function (response) {
        console.log('Date ' + response.data[2][0] + ' GDP ' + response.data[2][1]);
        jsonDataString = JSON.stringify(response);
        jsonData = response;
        console.log(jsonData);
        addSvg();
});

const addSvg = () => {
    dataSvg = d3.select('#chart-div')
                .append('svg')
                .attr('width', w)
                .attr('height', h);
    addScale();
}

const tooltip = d3.select('#chart-div')
                  .append('div')
                  .attr('id', 'tooltip')
                  .attr('class', 'smallfont')
                  .style('position', 'absolute')
                  .style('opacity', '0')

const addScale = () => {
    const minY = d3.min(jsonData.data, (d) => d[1])
    const maxY = d3.max(jsonData.data, (d) => d[1])

    const datesArray = jsonData.data.map(item => new Date(item[0]))

    console.log(datesArray)

    yScale = d3.scaleLinear()
               .domain([0, maxY])
               .range([h - padding, 0]);

    heightScale = d3.scaleLinear()
                    .domain([0, maxY])
                    .range([0, h - padding]);
    
    xScale = d3.scaleTime()
               .domain([d3.min(datesArray), d3.max(datesArray)])
               .range([padding, w - padding]);

    widthScale = d3.scaleLinear()
                   .domain([0, jsonData.data.length - 1])
                   .range([padding, w - padding])

    addRect();
}

const addRect = () => {
    dataSvg.selectAll('rect')
           .data(jsonData.data)
           .enter()
           .append('rect')
           .attr('data-date', (d) => d[0])
           .attr('data-gdp', (d) => d[1])
           .attr('class', 'bar')
           .attr('x', (d, i) => widthScale(i))
           .attr('y', (d, i) => h - padding - heightScale(d[1]))
           .attr('width', w / jsonData.data.length - 0.5)
           .attr('height', (d) => heightScale(d[1]))
           .on('mouseover', () => tooltip.style('opacity', '1'))
           .on('mousemove', (event) => tooltip.style('top', event.clientY + 'px')
                                              .style('left', event.clientX + 'px')
                                              .text('GDP (billions): ' + event.target.dataset.gdp + ' ' + 'Date: ' + event.target.dataset.date)
                                              .attr('data-date', event.target.dataset.date))
           .on('mouseout', () => tooltip.style('opacity', '0'))

    addAxisBottom();
}

const addAxisBottom = () => {
    const xAxis = d3.axisBottom(xScale);
    
    dataSvg.append('g')
           .attr('id', 'x-axis')
           .attr("transform", "translate(0," + (h - 30) + ")")
           .call(xAxis.ticks(20))
    addAxisLeft();
}

const addAxisLeft = () => {
    const yAxis = d3.axisLeft(yScale);

    dataSvg.append('g')
           .attr('id', 'y-axis')
           .attr('transform', 'translate(' + padding + ', 0)')
           .call(yAxis.ticks(55));
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className='container-fluid text-center'>
                <h1 id='title'>USA GDP Over the Years</h1>
                <h2 id='valueme'></h2>
            </div>
        )
    }
}

ReactDOM.render(<MainComponent />, document.getElementById('root'))