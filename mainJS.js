
let jsonDataString;
let jsonData;
let dataSvg;
let heightScale;
let xScale;

const w = 1920;
const h = 500;
const padding = 40;
const widthCheck = window.innerWidth;
const heightCheck = window.innerHeight;

console.log(widthCheck + ' ' + heightCheck)

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(function (response) {
        console.log('Date ' + response.data[2][0] + ' GDP ' + response.data[2][1]);
        jsonDataString = JSON.stringify(response);
        jsonData = response;
        console.log(jsonData);
        addSvg();
        // $('#valueme').html(jsonDataString);
});

const addSvg = () => {
    dataSvg = d3.select('#chart-div')
                .append('svg')
                .attr('width', w)
                .attr('height', h);
    addScale();
}

const addScale = () => {
    const minY = d3.min(jsonData.data, (d) => d[1])
    const maxY = d3.max(jsonData.data, (d) => d[1])

    const minX = d3.min(jsonData.data, (d) => d[0])
    const maxX = d3.max(jsonData.data, (d) => d[0])

    heightScale = d3.scaleLinear()
                    .domain([minY, maxY])
                    .range([padding, h - padding]);
    
    xScale = d3.scaleLinear()
               .domain([minX, maxX])
               .range([padding, w - padding]);

    console.log(d3.max(jsonData.data, (d) => d[0]))
    addRect();
}

const addRect = () => {
    dataSvg.selectAll('rect')
           .data(jsonData.data)
           .enter()
           .append('rect')
           .attr('class', 'bar')
           .attr('x', (d, i) => i * 6)
           .attr('y', (d, i) => h - heightScale(d[1]))
           .attr('width', 5)
           .attr('height', (d) => heightScale(d[1]));

    addAxisBottom();
}

const addAxisBottom = () => {
    const xAxis = d3.axisBottom(xScale);
    
    dataSvg.append('g')
           .attr("transform", "translate(0," + (h - padding) + ")")
           .call(xAxis)
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div>
                <h1 id='title'>Bar Chart</h1>
                <h2 id='valueme'></h2>
            </div>
        )
    }
}

ReactDOM.render(<MainComponent />, document.getElementById('root'))