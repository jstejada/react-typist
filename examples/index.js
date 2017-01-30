import React from 'react';
import ReactDOM from 'react-dom';
import Typist from 'Typist';
import './main.scss';


class TypistExample extends React.Component {

  state = {
    renderMsg: false,
    headerDrection: 1,
    msgDrection: 1,
  }

  onHeaderTyped = () => {
    setTimeout(() => this.setState({ renderMsg: true,
                    headerDrection: -this.state.headerDrection }), 1000);
  }
  onMessageTyped = () => {
    setTimeout(() => this.setState({ msgDrection: -this.state.msgDrection }), 1000);
  }

  delayGen(mean, std, { line, lineIdx, charIdx, defDelayGenerator }) {
    if (lineIdx === 0 && charIdx === line.length - 1) {
      return 1250;
    }
    if (lineIdx === 1 && charIdx === line.length - 1) {
      return 1250;
    }
    if (lineIdx === 3 && charIdx === line.length - 1) {
      return 1250;
    }
    return defDelayGenerator(mean + 25);
  }

  render() {
    const docs = '//github.com/jstejada/react-typist';
    return (
      <div className="TypistExample">
        <Typist
          className="TypistExample-header"
          avgTypingSpeed={40}
          startDelay={2000}
          onTypingDone={this.onHeaderTyped}
          direction={this.state.headerDrection}
        >
          <a href={docs}>React Typist</a>
        </Typist>
        <div className="TypistExample-content">
          {this.state.renderMsg ? (
            <Typist
              className="TypistExample-message"
              delayGenerator={this.delayGen}
              cursor={{ hideWhenDone: true }}
              onTypingDone={this.onMessageTyped}
              direction={this.state.msgDrection}
            >
              * Easy to style
              <br />
              * Easy to customize
              <br />
              <span>* <a href={docs} className="flash">docs</a></span>
              <br />
              {''}
            </Typist>
          ) : null }
        </div>
      </div>
    );
  }

}

ReactDOM.render(<TypistExample />, document.getElementById('content'));
