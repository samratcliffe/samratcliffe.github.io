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


	<div class="metal-casing">
		<div class="bezel">
			<div class="front">
				<div class="cam-speaker-wrap">
					<div class="speaker"></div>
					<div class="camera"></div>
				</div>
				<div class="screen">
				</div>
				<div class="button-wrap">
					<div class="button"></div>
				</div>
			</div>
		</div>
		<div class="vol-buttons">
			<div class="side-button silent">
			</div>
			<div class="side-button volume">
			</div>
			<div class="side-button volume">
			</div>
		</div>
		<div class="side-button lock-button">
		</div>
	</div>
