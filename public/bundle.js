(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var headerStyle = {
        backgroundColor: "rgb(19, 18, 18)",
        padding: "10px",
        color: "white",
        border: "1px solid red"
      };

      var logoColumn = {
        display: "inline-block",
        verticalAlign: "middle"

      };
      var statusColumn = {
        display: "inline-block",
        verticalAlign: "middle",
        border: "1px solid red",
        marginLeft: "30px"
      };

      return React.createElement(
        "div",
        { style: headerStyle },
        React.createElement(
          "div",
          { style: logoColumn },
          React.createElement("img", { src: this.props.logoTop })
        ),
        React.createElement(
          "div",
          { style: statusColumn },
          "View date: ",
          this.props.date
        )
      );
    }
  }]);

  return Header;
}(React.Component);

// REDDIT CONTENT BELOW

var RedditContent = function (_React$Component2) {
  _inherits(RedditContent, _React$Component2);

  function RedditContent(props) {
    _classCallCheck(this, RedditContent);

    return _possibleConstructorReturn(this, (RedditContent.__proto__ || Object.getPrototypeOf(RedditContent)).call(this, props));
  }

  _createClass(RedditContent, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.props.redditData
      );
    }
  }]);

  return RedditContent;
}(React.Component);

//FOOTER BELOW


var Footer = function (_React$Component3) {
  _inherits(Footer, _React$Component3);

  function Footer(props) {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      // define footer style
      var footerStyle = {
        padding: "20px 0px 20px 20px",
        backgroundColor: "rgb(168, 163, 164)"
      };
      var ulStyle = {
        marginLeft: "70px"
      };

      var liStyle = {
        display: "inline-block",
        padding: "5"
      };

      var logoStyle = {
        width: "50%"
      };

      return React.createElement(
        "div",
        { style: footerStyle },
        React.createElement(
          "div",
          null,
          React.createElement("img", { style: logoStyle, src: this.props.logoBottom })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "ul",
            { style: ulStyle },
            React.createElement(
              "li",
              { style: liStyle },
              "Time travel to:"
            ),
            this.props.items.map(function (dateText) {
              return React.createElement(
                "li",
                { style: liStyle },
                React.createElement(
                  "a",
                  { href: "/#" },
                  dateText
                )
              );
            })
          )
        )
      );
    }
  }]);

  return Footer;
}(React.Component);

// this collects all the other pieces


var Main = function (_React$Component4) {
  _inherits(Main, _React$Component4);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this4 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this4.state = { redditData: "cats" };
    _this4.getReddit = _this4.getReddit.bind(_this4);
    _this4.getReddit();
    return _this4;
  }

  _createClass(Main, [{
    key: "getReddit",
    value: function getReddit() {
      return fetch('populate').then(function (response) {
        return response.text();
      }).then(function (redditData) {
        this.setState({ redditData: redditData }); //redditData:redditData
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { date: "Live View", logoTop: "public/assets/left_arrow_only_one_line.png" }),
        React.createElement(RedditContent, { redditData: this.state.redditData }),
        React.createElement(Footer, { items: [27, 26, 25], logoBottom: "public/assets/one_line.png" })
      );
    }
  }]);

  return Main;
}(React.Component);

/// put teh stuff down here

// send get request from client to specific route
// server fetch the data and display here?

ReactDOM.render(React.createElement(Main, null), document.getElementById('app'));

},{}]},{},[1]);
