import React from 'react';
import ReactMatchers from 'jasmine-react-matchers';
import * as utils from 'utils';


describe('utils', ()=> {
  describe('.extractText', ()=> {
    it('returns array of lines to render when element passed', ()=> {
      const res = utils.extractText(<div>Text</div>);
      expect(res).toEqual(['Text']);
    });

    it('returns array of lines to render when strings passed', ()=> {
      const res = utils.extractText(['t1', 't2']);
      expect(res).toEqual(['t1', 't2']);
    });

    it('returns array of lines to render when array passed', ()=> {
      const res = utils.extractText(['t1', <span>t2</span>]);
      expect(res).toEqual(['t1', 't2']);
    });

    it('returns array of lines to render when array of trees passed', ()=> {
      const res = utils.extractText(['t1', <div>t2</div>, <span>t3<span>t4</span></span>]);
      expect(res).toEqual(['t1', 't2', 't3', 't4']);
    });

    it('returns array of lines when tree passed', ()=> {
      const res = utils.extractText(
        <div>
          T1
          <div><span>T2</span><span>T3</span></div>
          <span>T4</span>
          {5}
        </div>
      );
      expect(res).toEqual(['T1', 'T2', 'T3', 'T4', 5]);
    });

    it('returns empty array when nothing passed', ()=> {
      const res = utils.extractText();
      expect(res).toEqual([]);
    });
  });

  describe('.extractTreeWithText', ()=> {
    beforeEach(()=> jasmine.addMatchers(ReactMatchers));

    describe('when all text passed', ()=> {
      it('returns tree correctly when string or number passed', ()=> {
        const res = utils.extractTreeWithText('Text', ['Expected']);
        expect(res).toEqual('Expected');
      });

      it('returns tree correctly when array of strings or numbers passed', ()=> {
        const res = utils.extractTreeWithText(['T1', 2], ['E1', 'E2']);
        expect(res).toEqual(['E1', 'E2']);
      });

      it('returns tree correctly when array of trees passed', ()=> {
        const actual = utils.extractTreeWithText(
          [<div className="c">T1</div>, <div>T2<span>T3</span></div>],
          ['E1', 'E2', 'E3']
        );
        const expected = [
          <div className="c">E1</div>,
          <div>E2<span>E3</span></div>,
        ];
        expect(actual[0]).toEqualElement(expected[0]);
        expect(actual[1]).toEqualElement(expected[1]);
      });

      it('returns tree correctly when simple tree passed', ()=> {
        const res = utils.extractTreeWithText(
          <div className="c">Text</div>, ['Expected']
        );
        expect(res.props.className).toEqual('c');
        expect(res.props.children).toEqual('Expected');
      });

      it('returns tree correctly when complex tree passed', ()=> {
        const tree = (
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
        const actual = utils.extractTreeWithText(tree, ['E1', 'E2', 'E3', 'E4', 'E5']);
        expect(actual).toEqualElement(expected);
      });
    });

    describe('when not sufficient text passed', ()=> {
      it('does not display nodes that have no text to render when string or number passed', ()=> {
        const res = utils.extractTreeWithText('Text', []);
        expect(res).toBeNull();
      });

      it('returns tree correctly when array passed', ()=> {
        const res = utils.extractTreeWithText(['T1', 2], ['E1']);
        expect(res).toEqual(['E1', null]);
      });

      it('returns tree correctly when array of trees passed', ()=> {
        const actual = utils.extractTreeWithText(
          [<div className="c">T1</div>, <div>T2<span>T3</span></div>],
          ['E1', 'E2']
        );
        const expected = [<div className="c">E1</div>, <div>E2</div>];
        expect(actual[0]).toEqualElement(expected[0]);
        expect(actual[1]).toEqualElement(expected[1]);
      });

      it('does not display nodes that have no text to render when simple tree passed', ()=> {
        const res = utils.extractTreeWithText(<div className="c">Text</div>, []);
        expect(res).toBeNull();
      });

      it('does not display nodes that have no text to render when complex tree passed', ()=> {
        const tree = (
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
        const actual = utils.extractTreeWithText(tree, ['E1', 'E2', 'E3']);
        expect(actual).toEqualElement(expected);
      });
    });

    it('returns undefined when no tree passed', ()=> {
      const res = utils.extractTreeWithText(undefined, []);
      expect(res).toBeUndefined();
    });
  });
});
