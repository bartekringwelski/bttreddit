// Code goes here


var Componentnt=React.createClass({

  render:function()
  {
    var Iframe=this.props.iframe;

    return(

      <div>

       <Iframe src={this.props.src} height={this.props.height} width={this.props.width}/>

      </div>
      )
  }
});
ReactDOM.render(
  <Componentnt iframe='iframe' src="../web/archives/sites/reddit.html" height="500" width="1000"/>,
  document.getElementById('app')
);
