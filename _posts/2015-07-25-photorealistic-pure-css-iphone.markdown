---
layout: post
title:  "Photorealistic Pure CSS iPhone"
date:   2015-07-25 19:59:17
image: "/images/iphone-closeup.jpg"
fullwidthcodepen: "//codepen.io/samratcliffe/embed/JdeWLr/?height=500&theme-id=17355&default-tab=result"
fullwidthcodepenheight: "500"
---

## Structure
The structure of the iPhone is built with a series of nested `div`s, each with a large `border-radius` and a bit of padding. On the face of the device we have three `inline-block` elements, comprising the camera, the screen, and the home button.

	<div class="wrap">
		<div class="metal-casing">
			<div class="bezel">
				<div class="front">
					<div class="cam-speaker-wrap">
					</div>
					<div class="screen">
					</div>
					<div class="button-wrap">
					</div>
				</div>
			</div>
		</div>
	</div>


## Highlights
Pseudo-elements are a powerful tool for adding graphic details while keeping your HTML clean and semantic. Highlights were added to the side buttons and camera lens:

<p data-height="268" data-theme-id="17355" data-slug-hash="aOQyPL" data-default-tab="result" data-user="samratcliffe" class='codepen'>See the Pen <a href='http://codepen.io/samratcliffe/pen/aOQyPL/'>aOQyPL</a> by Sam R (<a href='http://codepen.io/samratcliffe'>@samratcliffe</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<img src="/images/iphone-closeup.jpg">

## Animation
A bit of CSS animation can bring the phone to life. The wrapper is given a very simple `rotate3d()` transform around the y axis.

	@keyframes swing {
		0% {
			transform: rotate3d(0, 1, 0, -10deg);
		}
		50% {
			transform: rotate3d(0, 1, 0, 20deg);
		}
		100% {
			transform: rotate3d(0, 1, 0, -10deg);
		}
	}
	.wrap {
	  animation-name: swing;
	  animation-duration: 4s;
	  animation-iteration-count: infinite;
	}

The reflection is given another rotation in the opposite direction:

	@keyframes reflectShift {
		0% {
			transform: rotate3d(0, 0, 1, -3deg);
		}
		50% {
			transform: rotate3d(0, 0, 1, 6deg);
		}
		100% {
			transform: rotate3d(0, 0, 1, -3deg);
		}
	}
	.front::after {
	  animation-name: reflectShift;
	  animation-duration: 4s;
	  animation-iteration-count: infinite;
	}
