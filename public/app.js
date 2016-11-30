

class Header extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    var headerStyle = {
      backgroundColor: "rgba(19, 18, 18, 0.94)",
      padding:"10px",
      color: "white",
    };

    var logoColumn = {
      display: "inline-block",
      verticalAlign: "middle",
    };

    var imageStyle = {
      width:"65%"
    };


    var statusColumn = {
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: "30px"
    };

    return(
      <div style = {headerStyle}>
        <div style = {logoColumn}>
          <img style = {imageStyle} src = {this.props.logoTop}/>
        </div>
        <div style = {statusColumn} >
          View date: {this.props.date}
        </div>
      </div>
    )
  }
}

// REDDIT CONTENT BELOW

class RedditContent extends React.Component {
  constructor(props) {
    super(props)

  }



  render(){
    return (
      <div id='cats'></div>
    )
  }
}

//FOOTER BELOW


class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    // define footer style
    var footerStyle = {
      padding: "10px 0px 10px 10px",
      backgroundColor: "rgb(66, 63, 64)"
    };
    var ulStyle = {
      marginLeft:"70px"
    };

    var liStyle = {
      display: "inline-block",
      padding: "5",
      color: "white"
    };

    var footerLogoStyle = {
      width: "40%"
    };

    return (
      <div style = {footerStyle}>
        <div>
          <img style = {footerLogoStyle} src = {this.props.logoBottom}/>
        </div>
        <div>
            <ul style= {ulStyle}>
              <li style = {liStyle}>Time travel to:</li>
              {
                this.props.listDates.map( (date) => (
                  <li style = {liStyle}><a href = {date}>{date}</a></li>
                ))
              }
            </ul>
        </div>
      </div>
    );
  }
}


// this collects all the other pieces


class Main extends React.Component{
  constructor(props) {
    super(props)

    this.state = {redditData: ""}

    this.getReddit();
  }

componentDidUpdate() {
  if(this.state.redditData) {
    $(this.state.redditData).appendTo('#cats')
  }
}


  getReddit() {
    fetch('populate')
    .then((response) => {
      return response.text();
    }).then( (redditData) => {
        this.setState({redditData:redditData}) //redditData:redditData
    });
  }

  render(){
    return (
      <div>
        <Header date = {"Live View"} logoTop = {"assets/left_arrow_only_one_line.png"}/>
        <RedditContent redditData = {this.state.redditData}/>
        <Footer listDates = {["11-27-2016", "11-26-2016", "11-25-2016"]} logoBottom = {"assets/one_line.png"} />
      </div>
    )
  }
}



/// put teh stuff down here

// send get request from client to specific route
// server fetch the data and display here?

ReactDOM.render(
  <Main />,
    document.getElementById('app')
);
