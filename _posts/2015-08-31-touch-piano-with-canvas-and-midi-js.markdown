---
layout: post
title:  "Touch Piano with MIDI.js and Canvas"
date:   2015-09-05 19:59:17
image: "/images/chopin.png"
fullwidthcodepen: "//codepen.io/samratcliffe/embed/ZbGKmy/?height=500&theme-id=17355&default-tab=result"
fullwidthcodepenheight: "500"
---

Today I stumbled upon the very cool <a href="http://mudcu.be/midi-js/">MIDI.js</a> library, which supports in-browser MIDI sequencing and triggering of soundfonts. Thought I would spend the afternoon recreating the awesome Touchpianist app (found <a href="http://touchpianist.com/presskit/index.html">here</a> for iOS and Android). I also got to mess around with particle effects in `canvas` elements. The code is a pretty messy, sorry about that.

First thing you want to do is get some Chopin from a <a href="http://nusmax.ru/index.php/synthesia/contentall-comcontent-views/category-list/chopin-nocturne-e-flat-major-op-9-no-2">sketchy Russian site</a>. 

MIDI.js can handle raw MIDI files, but to make things a more compatible just convert it to JSON. You can write a quick conversion tool in Node.js with <a href="https://github.com/mobyvb/midi-converter">this</a> really handy utility by Maximillian von Briesen.

Once you've got your JSON, it's just a matter of parsing through the object on keypress and animating the dots. You can call note events with MIDI.noteOn() and MIDI.noteOff() and the library should handle most of your heavy lifting. I'll let you figure all that out from the Codepen. 

I should probably put some code here so here's the particle effects:

```
/*==============================*/
/*      ( ͡° ͜ʖ ͡°) Particles      */
/*==============================*/
function Particle(x,y,r) {
  this.init(x,y,r);
}
Particle.prototype = {
  init: function(x,y,r) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = r || 30;
    this.alive = true;
    this.vx = Math.random()*14-7;
    this.vy = Math.random()*14-7;
    this.color = COLORS[~~(Math.random()*COLORS.length)];
    this.damping = 0.92;
    this.wind = Math.random()*Math.PI*2;
    this.burn = 1;
  },
  update: function() {
    this.radius *= this.damping;
    this.wind += (Math.random()-0.5);
    this.vx *= this.damping;
    this.vy *= this.damping;
    this.vx += Math.sin(this.wind);
    this.vy += Math.cos(this.wind);
    this.x += this.vx;
    this.y += this.vy;
    this.burn *= this.damping;
    this.alive = this.radius > 1;
    if (this.alive) this.draw();
  },
  draw: function() {
    ctx.globalCompositeOperation = 'screen';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
```