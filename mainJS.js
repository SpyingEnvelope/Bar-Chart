
let jsonDataString;
let jsonData;
let dataSvg;
let scale;

const w = 1920;
const h = 180;
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
           .attr('height', 180)
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