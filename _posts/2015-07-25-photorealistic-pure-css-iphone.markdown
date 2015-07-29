---
layout: post
title:  "Photorealistic Pure CSS iPhone"
date:   2015-07-25 19:59:17
categories: jekyll update
image: "/images/test.jpg"
fullwidthcodepen: "//codepen.io/samratcliffe/embed/JdeWLr/?height=630&theme-id=17355&default-tab=result"
fullwidthcodepenheight: "630"
---

## Don't rely on PNGs for complex geometry
One of the greatest challenges as a front-end developer is letting your markup do the heavy lifting. Rather than cutting out dozens of large transparent .pngs, it is often more efficient to build out any complex geometry in CSS or SVG vectors, then swap out assets as you need them. This project required several product screenshots to be placed on the same device.

This CSS iPhone accommodates screenshots in a simple HTML `img` tag. The gradients, reflections and transparency are all handled by the CSS, greatly reducing network calls and bandwidth. Let's take a look at some of the code.

## Structure
The structure of the iPhone is built with a series of nested `div`s, each with a large `border-radius` and a bit of padding. On the face of the device we have three `inline-block` elements, comprising the camera, the screen, and the home button.

<img src="/images/iphone-structure.jpg">

## Highlights
<img src="/images/iphone-closeup.jpg">

Pseudo-elements are a powerful tool for adding fine detail while keeping your HTML clean and semantic. Highlights were added to the side buttons and camera lens:

<p data-height="268" data-theme-id="17355" data-slug-hash="aOQyPL" data-default-tab="result" data-user="samratcliffe" class='codepen'>See the Pen <a href='http://codepen.io/samratcliffe/pen/aOQyPL/'>aOQyPL</a> by Sam R (<a href='http://codepen.io/samratcliffe'>@samratcliffe</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

