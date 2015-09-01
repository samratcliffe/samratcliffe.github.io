---
layout: post
title:  "How not to do sticky navs"
date:   2015-08-01 19:59:17
image: "/images/alibaba.png"
---

About a year ago, Chrome announced that they would be dropping support for the experimental `position:sticky` class in Canary, much to the disappointment of the web developers everywhere. Elements that 'stick' after a certain scroll point have been in vogue with designers for a while now, and it looks like for the foreseeable future we'll have to keep implementing them with the dreadfully inefficient `onscroll` event. 

That's not to say there aren't some optimisations to be made when we implement sticky divs. So without further ado, I will present the biggest indictments to this mechanic that I have witnessed across the world wide web. 

## For the love of God, please don't do this.

<p data-height="415" data-theme-id="17355" data-slug-hash="rVXoEd" data-default-tab="result" data-user="samratcliffe" class='codepen'>See the Pen <a href='http://codepen.io/samratcliffe/pen/rVXoEd/'>rVXoEd</a> by Sam R (<a href='http://codepen.io/samratcliffe'>@samratcliffe</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Javascript engineers, this goes out to you: CSS positioning exists and works really well. Please use it.

## The infamous 'phantom content jump'

See if you can spot the problem in this demo:

<p data-height="415" data-theme-id="17355" data-slug-hash="WvVPQp" data-default-tab="result" data-user="samratcliffe" class='codepen'>See the Pen <a href='http://codepen.io/samratcliffe/pen/WvVPQp/'>WvVPQp</a> by Sam R (<a href='http://codepen.io/samratcliffe'>@samratcliffe</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

If you didn't notice, don't worry. Even Alibaba, the world's biggest online retailer, hasn't yet worked this one out:

<iframe width="100%" height="300px" src="https://www.youtube.com/embed/c0nZ_tEgF4M" frameborder="0" allowfullscreen></iframe>

Notice the "jump" when the sticky is activated? When you change your div's positioning to `fixed`, it no longer affects the flow of elements below it. This is why you see a sudden upward jump in the content. To compensate for this, you need to create a "filler div" which expands in height when sticky is applied.

## Getting closer...

<p data-height="415" data-theme-id="17355" data-slug-hash="vOobvX" data-default-tab="result" data-user="samratcliffe" class='codepen'>See the Pen <a href='http://codepen.io/samratcliffe/pen/vOobvX/'>vOobvX</a> by Sam R (<a href='http://codepen.io/samratcliffe'>@samratcliffe</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Alright! This is more like it! The transition between fixed and static is looking much smoother. Take a look at the Javascript in this example to see the `#filler` div solving the issue. We are also implementing our style changes with CSS classes rather than Javascript, which keeps your code more modular and extensible. 

However, we are facing a couple of very serious performance issues:

 - We are accessing the DOM and repainting four times on every scroll event  
 - The scroll event is executing this code a *lot*.

 While the effects of these problems aren't obvious in this simple demo, they will definitely start to kill your pages as your projects gain complexity. The first issue is a very common one, (Twitter is a recent offender with <a href="http://www.dustindiaz.com/about-that-slowness-on-twitter/">their 'infinte scrolling' feature</a>), but thankfully it is easy to solve. 

 It is *crucial* to optimise any code which is fired many times, whether it is in large loops, `mousemove` events, or on scroll. Caching out time-consuming calls like DOM queries is as simple as changing this:

``` javascript 
  $(document).on("scroll",function(){
    if (window.scrollY > stickyPoint) {
      $("#nav").addClass("sticky");
      $("#filler").addClass("sticky");
    } else {
      $("#nav").removeClass("sticky");
      $("#filler").removeClass("sticky");
    }
  });
```

 To this:

``` javascript
  //get these FIRST
  var nav = $("#nav");
  var filler = $("#filler");

  $(document).on("scroll",function(){
    if (window.scrollY > stickyPoint) {
      nav.addClass("sticky");
      filler.addClass("sticky");
    } else {
      nav.removeClass("sticky");
      filler.removeClass("sticky");
    }
  });
```

Problem solved. However we're still calling this code a ridiculous amount of times...

## Debouncing, Throttling and setInterval

The scroll event can fire dozens of times every second. It's overkill. We want to decouple our handler from our event by limiting the frequency our code is called. There are a few approaches to this:

- We can **throttle** our code, calling the function only if a certain amount of time has passed since it was last called
- We can **debounce** our code, calling the function only once in every *n* times
- We can **bind** our expensive code to a less frequently called event.

Each particular method is useful for different applications. For scroll events, <a href="http://ejohn.org/blog/learning-from-twitter/">John Resig</a> recommends binding to `setInterval`, warning that "it’s a very, very, bad idea to attach handlers to the window scroll event." 

Instead, we check to see if the user has scrolled and bind to a `setInterval`. See below for a working demo. It's a fraction less smooth, but a whole lot more performant. And it's not often you can say that about `setInterval`.

``` javascript
$(document).ready(function(){
  var stickyPoint = $("#nav").offset().top;
  var nav = $("#nav");
  var sticky = $("#filler");
  var didScroll = false;
  $(document).on("scroll",function(){
    didScroll = true;
  });
  setInterval(function() {
      if ( didScroll ) {
          didScroll = false;
          if (window.scrollY > stickyPoint) {
            nav.addClass("sticky");
            sticky.addClass("sticky");
          } else {
            nav.removeClass("sticky");
            sticky.removeClass("sticky");
          }
      }
  }, 50)
});
```

<p data-height="415" data-theme-id="17355" data-slug-hash="waVOam" data-default-tab="result" data-user="samratcliffe" class='codepen'>See the Pen <a href='http://codepen.io/samratcliffe/pen/waVOam/'>waVOam</a> by Sam R (<a href='http://codepen.io/samratcliffe'>@samratcliffe</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Touch events

Finally, let's not forget about our friends on touch devices. You can read a lot <a href="http://tjvantoll.com/2012/08/19/onscroll-event-issues-on-mobile-browsers/">here</a>, <a href="http://developer.telerik.com/featured/scroll-event-change-ios-8-big-deal/">here</a> and <a href="http://andyshora.com/mobile-scroll-event-problems.html">here</a> about how poorly some devices handle touch events (I'm looking at you, Apple) but the tl;dr is that `touchmove` is the best we have for the web right now. 