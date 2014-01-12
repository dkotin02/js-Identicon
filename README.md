js-Identicon
============

Identicon generator in javascript using the HTML5 canvas element

Will eventually make into a jQuery plugin for the curious minds and add more complexity

/js/mydenticon.js contains my implementation and calls to the other scripts used.


v0.9
======
Added PHP version of my solution as a simple REST api. Server decides what the identicon should look like (minimally), 
page is rendered in the client (as opposed to sending an image over). 

To do in version 1.0:
- Convery to jQuery plugin 

To do in version 2.0:
- Add rotation and shape support
- Add more colors to final image content

[here be dragons]

v0.1
======
Shows my implementation in the browswer using javascript an the HTML5 canvas element
 - Uses simple method of turning squares on/off based on bit values from hash. No shapes or rotations (similar to the github soluton)

Shows Don Park's solution re-writted in javascript using the HTML5 canvas element
Shows a jQuery plugin producing richer result
