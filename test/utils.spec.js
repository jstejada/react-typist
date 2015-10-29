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

  describe('.renderTree', ()=> {
    beforeEach(()=> jasmine.addMatchers(ReactMatchers));

    it('renders text correctly when simple tree', ()=> {
      const res = utils.renderTree(<div className="c">Text</div>, ['Expected']);
      expect(res.props.className).toEqual('c');
      expect(res.props.children).toEqual('Expected');
    });

    it('renders text correctly when string or number provided', ()=> {
      const res = utils.renderTree('Text', ['Expected']);
      expect(res).toEqual('Expected');
    });

    it('renders text correctly when not all text provided', ()=> {
      const res = utils.renderTree(<div className="c">Text</div>, []);
      expect(res.props.children).toEqual('');
    });

    it('returns undefined when no tree provided', ()=> {
      const res = utils.renderTree(undefined, []);
      expect(res).toBeUndefined();
    });

    it('renders text correctly when complex tree', ()=> {
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
      const actual = utils.renderTree(tree, ['E1', 'E2', 'E3', 'E4', 'E5']);
      expect(actual).toEqualElement(expected);
    });
  });
});
