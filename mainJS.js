document.addEventListener('DOMContentLoaded', function () {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(function (response) {
        jsonData = JSON.stringify(response)
        console.log(jsonData)
    });
})

let jsonData;

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(function (response) {
        jsonData = JSON.stringify(response)
});

class MainComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    changeValue = () => {
        $('#valueme').html(jsonData)
    }
    
    render() {
        return (
            <div>
                <h1 id='title'>Bar Chart</h1>
                <h2 id='valueme'>{jsonData}</h2>
                <button onClick={this.changeValue}>click me</button>
            </div>
        )
    }
}

ReactDOM.render(<MainComponent />, document.getElementById('root'))