
import React from 'react';
import ReactDOM from 'react-dom';
import Typist from 'Typist';
import './main.scss';


class TypistExample extends React.Component {

  state = {
    renderMsg: false,
    msgCursor: true,
  }

  onHeaderTyped = ()=> {
    this.setState({renderMsg: true});
  }

  onMsgTyped = ()=> {
    setTimeout(this.setState.bind(this, {msgCursor: false}), 2000);
  }

  render() {
    const docs = '//github.com/jstejada/react-typist';
    return (
      <div className="TypistExample">
        <Typist className="TypistExample-header" avgTypingSpeed={40} startDelay={2000}
          onTypingDone={this.onHeaderTyped}>
          <a href={docs}>React Typist</a>
        </Typist>
        <div className="TypistExample-content">
          {this.state.renderMsg ? (
            <Typist className="TypistExample-message" onTypingDone={this.onMsgTyped}
              cursor={{show: this.state.msgCursor}}>
              * Easy to style
              <br />
              * Easy to customize
              <br />
              <span>* </span><a href={docs} className="flash">docs</a>
              <br />
            </Typist>
          ) : null }
        </div>
      </div>
    );
  }

}

ReactDOM.render(<TypistExample />, document.getElementById('content'));
