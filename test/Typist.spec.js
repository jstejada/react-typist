import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import Typist from 'Typist';


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
            expect(findDOMNode(inst).textContent).toEqual(`${acum}${str.slice(0, idx)}|`);
            jasmine.clock().tick(100);
          }
          acum += str;
        }
      };

      it('animates single string', ()=> {
        const str = 'Test';
        const inst = TestUtils.renderIntoDocument(<Typist {...props}>{str}</Typist>);

        for (let idx = 1; idx <= str.length; idx++) {
          expect(findDOMNode(inst).textContent).toEqual(`${str.slice(0, idx)}|`);
          jasmine.clock().tick(100);
        }
      });

      it('animates strings in correct order', ()=> {
        const strs = ['Test1', 'Test2'];
        const inst = TestUtils.renderIntoDocument( <Typist {...props}>{strs}</Typist>);

        assertAnimation(inst, strs);
      });

      it('animates elements in correct order', ()=> {
        const strs = ['T1', 'T2'];
        const els = [<div key="t1">T1</div>, <div key="t2"><span>T2</span></div>];
        const inst = TestUtils.renderIntoDocument( <Typist {...props}>{els}</Typist>);

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

      it('animates element trees', ()=> {
        const strs = ['Test1', 'Test2', 'Test3'];
        const inst = TestUtils.renderIntoDocument(
          <Typist {...props}>
            <span>Test1</span>
            <div>
              <span>Test2</span>
              <span>Test3</span>
            </div>
          </Typist>
        );

        assertAnimation(inst, strs);
        expect(findDOMNode(inst).childNodes[0].tagName).toEqual('SPAN');
        expect(findDOMNode(inst).childNodes[1].tagName).toEqual('DIV');
      });

      it('renders empty elements', ()=> {
        const strs = ['Test1', 'Test2', ''];
        const inst = TestUtils.renderIntoDocument(
          <Typist {...props}>
            Test1
            <span>Test2</span>
            <br />
            {''}
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

    it('hides cursor and end of animation when specified', ()=> {
      props.cursor = {hideWhenDone: true, hideWhenDoneDelay: 100};
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      jasmine.clock().tick(400);
      let res = TestUtils.scryRenderedDOMComponentsWithClass(inst, 'Cursor');
      expect(res.length).toEqual(1);
      jasmine.clock().tick(100);
      res = TestUtils.scryRenderedDOMComponentsWithClass(inst, 'Cursor');
      expect(res.length).toEqual(0);
    });
  });

  describe('startDelay', ()=> {
    it('starts animation after specified delay', ()=> {
      props.startDelay = 500;
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      expect(findDOMNode(inst).textContent).toEqual('|');
      jasmine.clock().tick(500);
      expect(findDOMNode(inst).textContent).toEqual('T|');
      jasmine.clock().tick(400);
      expect(findDOMNode(inst).textContent).toEqual('Test|');
    });
  });

  describe('delayGenerator', ()=> {
    it('uses specified props for delay', ()=> {
      const spy = jasmine.createSpy('delayGenerator').and.returnValue(100);
      props = {avgTypingDelay: 500, stdTypingDelay: 100, delayGenerator: spy};
      TestUtils.renderIntoDocument(<Typist {...props}>Te</Typist>);
      jasmine.clock().tick(100);
      expect(spy.calls.argsFor(0).slice(0, 2)).toEqual([500, 100]);
      expect(spy.calls.argsFor(1).slice(0, 2)).toEqual([500, 100]);
    });

    it('passes obj with info for current line and char to delaygGenerator', ()=> {
      const spy = jasmine.createSpy('delayGenerator').and.returnValue(100);
      props = {delayGenerator: spy};
      TestUtils.renderIntoDocument(<Typist {...props}>{['Te', 'st']}</Typist>);
      jasmine.clock().tick(300);
      for (const idx of [0, 1]) {
        const obj = spy.calls.argsFor(idx).slice(2)[0];
        expect(obj.line).toEqual('Te');
        expect(obj.lineIdx).toEqual(0);
        expect(obj.character).toEqual('Te'[idx]);
        expect(obj.charIdx).toEqual(idx);
      }
      for (const idx of [2, 3]) {
        const obj = spy.calls.argsFor(idx).slice(2)[0];
        expect(obj.line).toEqual('st');
        expect(obj.lineIdx).toEqual(1);
        expect(obj.character).toEqual('st'[idx - 2]);
        expect(obj.charIdx).toEqual(idx - 2);
      }
    });
  });
});
