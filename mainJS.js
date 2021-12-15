
let jsonDataString;
let jsonData;
let dataSvg;
let heightScale;

const w = 1920;
const h = 500;
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

    heightScale = d3.scaleLinear()
                    .domain([minY, maxY])
                    .range([10, 500]);
    addRect();
}

const addRect = () => {
    dataSvg.selectAll('rect')
           .data(jsonData.data)
           .enter()
           .append('rect')
           .attr('x', (d, i) => i * 6)
           .attr('y', 0)
           .attr('width', 5)
           .attr('height', (d) => heightScale(d[1]))
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