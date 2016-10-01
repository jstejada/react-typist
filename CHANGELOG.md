# React Typist Changelog

### v1.0.0 (10/01/16)

This version should have no breaking changes, but given that we've bumped a
major version of React, we decided to  make this release opt-in, in case
unexpected errors occur.

- Fixes:
  + Can now render server-side
  + Component no longer sets state after being unmounted

- Development:
  + Switch to promises to make code more concise and readable


### v0.3.0 (10/30/15)

- Features:

  + Typist can now render and animate any React element (not just strings).
  + You can now pass new options for the cursor:
    + `hideWhenDone`
    + `hideWhenDoneDelay`
  + Typist now supports a `delayGenerator` function to customize the delay
    between keystrokes.
