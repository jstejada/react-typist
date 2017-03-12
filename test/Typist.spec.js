import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import PromiseMock from 'promise-mock';
import Typist from 'Typist';


describe('Typist', () => {
  let props;
  beforeEach(() => {
    props = { delayGenerator: () => 100 }; // Delay between keystrokes always 100
    jasmine.clock().install();
    PromiseMock.install();
  });

  afterEach(() => {
    PromiseMock.uninstall();
    jasmine.clock().uninstall();
  });

  const typeAll = (limit) => {
    let i = 0;
    const canType = () => (
      limit != null ?
        Promise.waiting.length > 0 && i < limit :
        Promise.waiting.length > 0
    );
    while (canType()) {
      Promise.runAll();
      jasmine.clock().tick(100);
      i++;
    }
  };

  describe('#render', () => {
    describe('when no children passed', () => {
      it('renders the cursor', () => {
        const inst = TestUtils.renderIntoDocument(<Typist />);
        expect(findDOMNode(inst).textContent).toEqual('|');
      });

      it('calls onTypingDone callback', () => {
        const spy = jasmine.createSpy('onTypingDone');
        TestUtils.renderIntoDocument(<Typist onTypingDone={spy} />);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when children passed', () => {
      const assertLine = (inst, line, acum = '') => {
        for (let idx = 1; idx <= line.length; idx++) {
          expect(findDOMNode(inst).textContent).toEqual(`${acum}${line.slice(0, idx)}|`);
          jasmine.clock().tick(100);
          Promise.runAll();
        }
      };

      const assertLines = (inst, lines) => {
        let acum = '';
        Promise.runAll();
        for (const line of lines) {
          assertLine(inst, line, acum);
          acum += line;
        }
      };

      it('animates single string', () => {
        const str = 'Test';
        const inst = TestUtils.renderIntoDocument(<Typist {...props}>{str}</Typist>);

        Promise.runAll();
        assertLine(inst, str);
      });

      it('animates strings in correct order', () => {
        const strs = ['Test1', 'Test2'];
        const inst = TestUtils.renderIntoDocument(<Typist {...props}>{strs}</Typist>);

        assertLines(inst, strs);
      });

      it('animates elements in correct order', () => {
        const strs = ['T1', 'T2'];
        const els = [<div key="t1">T1</div>, <div key="t2"><span>T2</span></div>];
        const inst = TestUtils.renderIntoDocument(<Typist {...props}>{els}</Typist>);

        assertLines(inst, strs);
      });

      it('animates strings and elements', () => {
        const strs = ['Test1', 'Test2'];
        const inst = TestUtils.renderIntoDocument(
          <Typist {...props}>
            Test1
            <span>Test2</span>
          </Typist>
        );

        assertLines(inst, strs);
        const span = TestUtils.scryRenderedDOMComponentsWithTag(inst, 'span')[0];
        expect(findDOMNode(span).textContent).toEqual('Test2');
      });

      it('animates element trees', () => {
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

        assertLines(inst, strs);
        expect(findDOMNode(inst).childNodes[0].tagName).toEqual('SPAN');
        expect(findDOMNode(inst).childNodes[1].tagName).toEqual('DIV');
      });

      it('renders empty elements', () => {
        const strs = ['Test1', 'Test2', ''];
        const inst = TestUtils.renderIntoDocument(
          <Typist {...props}>
            Test1
            <span>Test2</span>
            <br />
            {''}
          </Typist>
        );

        assertLines(inst, strs);
        TestUtils.findRenderedDOMComponentWithTag(inst, 'br');
      });

      it('transfers props to children elements', () => {
        const inst = TestUtils.renderIntoDocument(
          <Typist {...props}>
            Test1
            <span className="mysp">Test2</span>
            <br />
          </Typist>
        );
        typeAll();
        const span = TestUtils.scryRenderedDOMComponentsWithTag(inst, 'span')[0];
        expect(findDOMNode(span).className).toEqual('mysp');
      });

      it('calls onTypingDone callback', () => {
        const spy = jasmine.createSpy('onTypingDone');
        TestUtils.renderIntoDocument(
          <Typist onTypingDone={spy} {...props}>
            Test1
            <span className="mysp">Test2</span>
            <br />
          </Typist>
        );
        typeAll();
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('cursor', () => {
    it('hides the cursor when specified', () => {
      props.cursor = { show: false };
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      typeAll();
      expect(findDOMNode(inst).textContent).toEqual('Test');
    });

    it('applies blink class when specified', () => {
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      typeAll();
      TestUtils.findRenderedDOMComponentWithClass(inst, 'Cursor--blinking');
    });

    it('does not apply blink class when specified', () => {
      props.cursor = { blink: false };
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      typeAll();
      const res = TestUtils.scryRenderedDOMComponentsWithClass(inst, 'Cursor--blinking');
      expect(res.length).toEqual(0);
    });

    it('displays correct cursor character', () => {
      props.cursor = { element: '▍' };
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      typeAll();
      expect(findDOMNode(inst).textContent).toEqual('Test▍');
    });

    it('hides cursor at end of animation when specified', () => {
      props.cursor = { hideWhenDone: true, hideWhenDoneDelay: 100 };
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      typeAll(4);
      let res = TestUtils.scryRenderedDOMComponentsWithClass(inst, 'Cursor');
      expect(res.length).toEqual(1);
      typeAll(1);
      res = TestUtils.scryRenderedDOMComponentsWithClass(inst, 'Cursor');
      expect(res.length).toEqual(0);
    });
  });

  describe('startDelay', () => {
    it('starts animation after specified delay', () => {
      props.startDelay = 500;
      const inst = TestUtils.renderIntoDocument(<Typist {...props}>Test</Typist>);
      expect(findDOMNode(inst).textContent).toEqual('|');
      jasmine.clock().tick(500);
      Promise.runAll();
      expect(findDOMNode(inst).textContent).toEqual('T|');
      jasmine.clock().tick(100);
      typeAll();
      expect(findDOMNode(inst).textContent).toEqual('Test|');
    });
  });

  describe('delayGenerator', () => {
    it('uses specified props for delay', () => {
      const spy = jasmine.createSpy('delayGenerator').and.returnValue(100);
      props = { avgTypingDelay: 500, stdTypingDelay: 100, delayGenerator: spy };
      TestUtils.renderIntoDocument(<Typist {...props}>Te</Typist>);
      typeAll();
      expect(spy.calls.argsFor(0).slice(0, 2)).toEqual([500, 100]);
      expect(spy.calls.argsFor(1).slice(0, 2)).toEqual([500, 100]);
    });

    it('passes obj with info for current line and char to delaygGenerator', () => {
      const spy = jasmine.createSpy('delayGenerator').and.returnValue(100);
      props = { delayGenerator: spy };
      TestUtils.renderIntoDocument(<Typist {...props}>{['Te', 'st']}</Typist>);
      typeAll();
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
