import React from 'react';
import ReactDOM from 'react-dom';
import Typist from 'Typist';
import './main.scss';

class TypistExample extends React.Component {

  state = {
    renderMsg: false,
    typistRef: null,
  }

  onHeaderTyped = () => {
    this.setState({ renderMsg: true });
  }

  render() {
    const docs = '//github.com/jstejada/react-typist';
    return (
      <div className="TypistExample">
        <Typist
          className="TypistExample-header"
          avgTypingSpeed={40}
          startDelay={0}
          startDelay={2000}
          onTypingDone={this.onHeaderTyped}
        >
          <a href={docs}>React Typist</a>
        </Typist>
        <div className="TypistExample-content">
          {this.state.renderMsg ? (
            <Typist
              className="TypistExample-message"
              startDelay={500}
              cursor={{ hideWhenDone: true }}
            >
              * Easy to style
              <Typist.Delay ms={1250} />
              <br />
              * Easy to customize
              <Typist.Delay ms={1250} />
              <br />
              * Easy to use backspace
              <Typist.Backspace count={23} delay={750} />
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
