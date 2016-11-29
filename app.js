//
// var GroceryListItem = (props) => (
//   <li>{props.item}</li>
// )

class BackItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <li>{this.props.item}</li>
    )
  }
}


//Header below

class Header extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    var headerStyle = {
      backgroundColor: "rgb(19, 18, 18)",
      padding:"10px",
      color: "white",
      border: "1px solid red"
    };

    var logoColumn = {
      display: "inline-block",
      verticalAlign: "middle"

    }
    var statusColumn = {
      display: "inline-block",
      verticalAlign: "middle",
      border: "1px solid red",
      marginLeft: "30px"
    }

    return(
      <div style = {headerStyle}>
        <div style = {logoColumn}>
          <img src = {this.props.logoTop}/>
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
      <div>{this.props.redditHTML}</div>
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
      padding: "20px 0px 20px 20px",
      backgroundColor: "rgb(168, 163, 164)"
    };
    var ulStyle = {
      marginLeft:"70px"
    };

    var liStyle = {
      display: "inline-block",
      padding: "5"
    };

    var logoStyle = {
      width: "50%"
    };

    return (
      <div style = {footerStyle}>
        <div>
          <img style = {logoStyle} src = {this.props.logoBottom}/>
        </div>
        <div>
            <ul style= {ulStyle}>
              <li style = {liStyle}>Time travel to:</li>
              {
                this.props.items.map( (dateText) => (
                  <li style = {liStyle}><a href = "/#">{dateText}</a></li>
                ))
              }
            </ul>
        </div>
      </div>
    );
  }
}




// this collects all the other pieces
var Main = (props) => (
  <div>
    <Header date = {"Live View"} logoTop = {"public/assets/left_arrow_only_one_line.png"}/>
    <RedditContent redditHTML = {<h1>yo dog</h1>} />
    <Footer items = {[27, 26, 25]} logoBottom = {"public/assets/one_line.png"} />
  </div>
)


/// put teh stuff down here
ReactDOM.render(
  <Main />,
    document.getElementById('app')
);
