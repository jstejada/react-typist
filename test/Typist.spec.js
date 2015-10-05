import React from 'react/addons';
import Typist from 'Typist';
const {findDOMNode, addons: {TestUtils}} = React;


describe('Typist', ()=> {
  let props;
  beforeEach(()=> {
    props = {delayGenerator: ()=> 100}; // Delay between keystrokes always 100
    jasmine.clock().install();
  });

  afterEach(()=> {
    jasmine.clock().uninstall();
  });

  describe('#render', ()=> {
    describe('when no children passed', ()=> {
      it('renders the cursor', ()=>{
        const inst = TestUtils.renderIntoDocument(<Typist />);
        expect(findDOMNode(inst).textContent).toEqual('|');
      });

      it('calls onTypingDone callback', ()=> {
        const spy = jasmine.createSpy('onTypingDone');
        TestUtils.renderIntoDocument(<Typist onTypingDone={spy} />);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when children passed', ()=> {
      const assertAnimation = (inst, strs)=> {
        let acum = '';
        for (const str of strs) {
          for (let idx = 1; idx <= str.length; idx++) {
            jasmine.clock().tick(100);
            expect(findDOMNode(inst).textContent).toEqual(`${acum}${str.slice(0, idx)}|`);
          }
          acum += str;
        }
      };

      it('animates single string', ()=> {
        const str = 'Test';
        const inst = TestUtils.renderIntoDocument(<Typist {...props}>{str}</Typist>);

        for (let idx = 1; idx <= str.length; idx++) {
          jasmine.clock().tick(100);
          expect(findDOMNode(inst).textContent).toEqual(`${str.slice(0, idx)}|`);
        }
      });

      it('animates strings in correct order', ()=> {
        const strs = ['Test1', 'Test2'];
        const inst = TestUtils.renderIntoDocument( <Typist {...props}>{strs}</Typist>);

        assertAnimation(inst, strs);
      });

      it('animates strings and elements', ()=> {
        const strs = ['Test1', 'Test2'];
        const inst = TestUtils.renderIntoDocument(
          <Typist {...props}>
            Test1
            <span>Test2</span>
          </Typist>
        );

        assertAnimation(inst, strs);
        expect(findDOMNode(inst).childNodes[1].tagName).toEqual('SPAN');
      });

      it('renders empty elements', ()=> {
        const strs = ['Test1', 'Test2', ''];
        const inst = TestUtils.renderIntoDocument(
          <Typist {...props}>
            Test1
            <span>Test2</span>
            <br />
          </Typist>
        );

        assertAnimation(inst, strs);
        expect(findDOMNode(inst).childNodes[2].tagName).toEqual('BR');
      });

      it('transfers props to children elements', ()=> {
        const inst = TestUtils.renderIntoDocument(
          <Typist {...props}>
            Test1
            <span className="mysp">Test2</span>
            <br />
          </Typist>
        );
        jasmine.clock().tick(1100);
        expect(findDOMNode(inst).childNodes[1].className).toEqual('mysp');
      });

      it('calls onTypingDone callback', ()=> {
        const spy = jasmine.createSpy('onTypingDone');
        TestUtils.renderIntoDocument(
          <Typist onTypingDone={spy} {...props}>
            Test1
            <span className="mysp">Test2</span>
            <br />
          </Typist>
        );
        jasmine.clock().tick(1100);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('cursor', ()=> {
    it('hides the cursor when specified', ()=> {
      props.cursor = {show: false};
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      jasmine.clock().tick(500);
      expect(findDOMNode(inst).textContent).toEqual('Test');
    });

    it('applies blink class when specified', ()=> {
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      jasmine.clock().tick(500);
      TestUtils.findRenderedDOMComponentWithClass(inst, 'Cursor--blinking');
    });

    it('does not apply blink class when specified', ()=> {
      props.cursor = {blink: false};
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      jasmine.clock().tick(500);
      const res = TestUtils.scryRenderedDOMComponentsWithClass(inst, 'Cursor--blinking');
      expect(res.length).toEqual(0);
    });

    it('displays correct cursor character', ()=> {
      props.cursor = {element: '▍'};
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      jasmine.clock().tick(500);
      expect(findDOMNode(inst).textContent).toEqual('Test▍');
    });
  });

  describe('startDelay', ()=> {
    it('starts animation after specified delay', ()=> {
      props.startDelay = 500;
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      jasmine.clock().tick(500);
      expect(findDOMNode(inst).textContent).toEqual('|');
      jasmine.clock().tick(500);
      expect(findDOMNode(inst).textContent).toEqual('Test|');
    });
  });

  describe('avgTypingDelay', ()=> {
    it('uses specified avg typing delay', ()=> {
      const spy = jasmine.createSpy('delayGenerator').and.returnValue(100);
      props = {avgTypingDelay: 500, delayGenerator: spy};
      TestUtils.renderIntoDocument(<Typist {...props}>Te</Typist>);
      jasmine.clock().tick(200);
      expect(spy.calls.allArgs()).toEqual([[500], [500]]);
    });
  });
});
