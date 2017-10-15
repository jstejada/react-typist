import React from 'react';
import ReactMatchers from 'jasmine-react-matchers';
import * as utils from 'utils';


describe('utils', () => {
  describe('.extractTextFromElement', () => {
    it('returns array of lines to render when element passed', () => {
      const res = utils.extractTextFromElement(<div>Text</div>);
      expect(res).toEqual(['Text']);
    });

    it('returns array of lines to render when strings passed', () => {
      const res = utils.extractTextFromElement(['t1', 't2']);
      expect(res).toEqual(['t1', 't2']);
    });

    it('returns array of lines to render when array passed', () => {
      const res = utils.extractTextFromElement(['t1', <span>t2</span>]);
      expect(res).toEqual(['t1', 't2']);
    });

    it('returns array of lines to render when array of trees passed', () => {
      const res = utils.extractTextFromElement([
        't1',
        <div>t2</div>,
        <span>t3<span>t4</span></span>,
      ]);
      expect(res).toEqual(['t1', 't2', 't3', 't4']);
    });

    it('returns array of lines when tree passed', () => {
      const res = utils.extractTextFromElement(
        <div>
          T1
          <div><span>T2</span><span>T3</span></div>
          <span>T4</span>
          {5}
        </div>
      );
      expect(res).toEqual(['T1', 'T2', 'T3', 'T4', 5]);
    });

    it('returns empty array when nothing passed', () => {
      const res = utils.extractTextFromElement();
      expect(res).toEqual([]);
    });
  });

  describe('.cloneElementWithSpecifiedText', () => {
    beforeEach(() => jasmine.addMatchers(ReactMatchers));

    describe('when all text passed', () => {
      it('returns tree correctly when element is a string or number passed', () => {
        const res = utils.cloneElementWithSpecifiedText({
          element: 'Text',
          textLines: ['Expected'],
        });
        expect(res).toEqual('Expected');
      });

      it('returns tree correctly when element is an array of strings or numbers', () => {
        const res = utils.cloneElementWithSpecifiedText({
          element: ['T1', 2],
          textLines: ['E1', 'E2'],
        });
        expect(res).toEqual(['E1', 'E2']);
      });

      it('returns tree correctly when array of elements passed', () => {
        const actual = utils.cloneElementWithSpecifiedText({
          element: [<div className="c">T1</div>, <div>T2<span>T3</span></div>],
          textLines: ['E1', 'E2', 'E3'],
        });
        const expected = [
          <div className="c">E1</div>,
          <div>E2<span>E3</span></div>,
        ];
        expect(actual[0]).toEqualElement(expected[0]);
        expect(actual[1]).toEqualElement(expected[1]);
      });

      it('returns tree correctly when simple element passed', () => {
        const res = utils.cloneElementWithSpecifiedText({
          element: <div className="c">Text</div>,
          textLines: ['Expected'],
        });
        expect(res.props.className).toEqual('c');
        expect(res.props.children).toEqual('Expected');
      });

      it('returns tree correctly when nested element passed', () => {
        const element = (
          <div className="c">
            T1
            <div><span className="s">T2</span>T3</div>
            <p>
              <span>T4</span>
              <br />
            </p>
            <div>T5</div>
          </div>
        );
        const expected = (
          <div className="c">
            E1
            <div><span className="s">E2</span>E3</div>
            <p>
              <span>E4</span>
              <br />
            </p>
            <div>E5</div>
          </div>
        );
        const actual = utils.cloneElementWithSpecifiedText({
          element,
          textLines: ['E1', 'E2', 'E3', 'E4', 'E5'],
        });
        expect(actual).toEqualElement(expected);
      });
    });

    describe('when not sufficient text passed', () => {
      it(`does not display nodes that have no text to render when element is
 string or number`, () => {
        const res = utils.cloneElementWithSpecifiedText({
          element: 'Text',
          textLines: [],
        });
        expect(res).toBeNull();
      });

      it('returns tree correctly when element is array', () => {
        const res = utils.cloneElementWithSpecifiedText({
          element: ['T1', 2],
          textLines: ['E1'],
        });
        expect(res).toEqual(['E1', null]);
      });

      it('returns tree correctly when element is array of elements', () => {
        const actual = utils.cloneElementWithSpecifiedText({
          element: [<div className="c">T1</div>, <div>T2<span>T3</span></div>],
          textLines: ['E1', 'E2'],
        });
        const expected = [<div className="c">E1</div>, <div>E2</div>];
        expect(actual[0]).toEqualElement(expected[0]);
        expect(actual[1]).toEqualElement(expected[1]);
      });

      it('does not display nodes that have no text to render when simple element passed', () => {
        const res = utils.cloneElementWithSpecifiedText({
          element: <div className="c">Text</div>,
          textLines: [],
        });
        expect(res).toBeNull();
      });

      it('does not display nodes that have no text to render when nested element passed', () => {
        const element = (
          <div className="c">
            T1
            <div><span className="s">T2</span>T3</div>
            <p>
              <span>T4</span>
              <br />
            </p>
            <div>T5</div>
          </div>
        );
        const expected = (
          <div className="c">
            E1
            <div><span className="s">E2</span>E3</div>
          </div>
        );
        const actual = utils.cloneElementWithSpecifiedText({
          element,
          textLines: ['E1', 'E2', 'E3'],
        });
        expect(actual).toEqualElement(expected);
      });
    });

    it('returns undefined when no tree passed', () => {
      const res = utils.cloneElementWithSpecifiedText({
        element: undefined,
        textLines: [],
      });
      expect(res).toBeUndefined();
    });
  });
});
