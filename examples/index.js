
import React from 'react';
import ReactDOM from 'react-dom';
import Typist from 'Typist';
import './main.scss';


class TypistExample extends React.Component {

  state = {
    renderMsg: false,
  }

  onHeaderTyped = ()=> {
    this.setState({renderMsg: true});
  }

  delayGen(mean, std, {line, lineIdx, charIdx, defDelayGenerator}) {
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
        <Typist className="TypistExample-header" avgTypingSpeed={40} startDelay={2000}
          onTypingDone={this.onHeaderTyped}>
          <a href={docs}>React Typist</a>
        </Typist>
        <div className="TypistExample-content">
          {this.state.renderMsg ? (
            <Typist className="TypistExample-message" delayGenerator={this.delayGen}
              cursor={{hideWhenDone: true}}>
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
