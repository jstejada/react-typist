import React from 'react';
import ReactDOM from 'react-dom';
import Typist from 'Typist';
import './main.scss';

class TypistExample extends React.Component {

  state = {
    renderMsg: false,
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
          startDelay={2000}
          onTypingDone={this.onHeaderTyped}
        >
          <a href={docs}>React Typist</a>
        </Typist>
        <div className="TypistExample-content">
          {this.state.renderMsg ? (
            <Typist
              className="TypistExample-message"
              cursor={{ hideWhenDone: true }}
            >
              * Let's see if I can do a really cool thing
              <Typist.Backspace count={15} />
              a pretty cool thing
              <Typist.Backspace count={15} />
              an amazing thing
              <Typist.Backspace count={13} />
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
