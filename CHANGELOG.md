# React Typist Changelog

### v1.1.1 (05/29/17)

- Fixes
  + Updated dist code

- Development:
  + Added dist command to the contribution section
  + Added prop-types to package dependencies
  
  
### v1.1.0 (03/26/17)

- Features:
  + Add new options: `onCharacterTyped` and `onLineTyped` (#22)

- Fixes
  + Fix text rendering issue in webkit/blink under certain widths (#13)

- Development:
  + Remove bower package


### v1.0.3 (10/29/16)

- Fixes
  + Component no longer sets `isDone` state if unmounted


### v1.0.1 (10/01/16)

- Fixes
  + Move `promise-mock` to `devDependencies`


### v1.0.0 (10/01/16)

This version should have no breaking changes, but given that we've bumped a
major version of React, we decided to  make this release opt-in, in case
unexpected errors occur.

- Fixes:
  + Can now use server rendering
  + Component no longer sets state after being unmounted

- Development:
  + Upgrade to React 15
  + Upgrade to Babel 6, and other tooling upgrades
  + Switch to promises to make code more concise and readable


### v0.3.0 (10/30/15)

- Features:

  + Typist can now render and animate any React element (not just strings).
  + You can now pass new options for the cursor:
    + `hideWhenDone`
    + `hideWhenDoneDelay`
  + Typist now supports a `delayGenerator` function to customize the delay
    between keystrokes.
