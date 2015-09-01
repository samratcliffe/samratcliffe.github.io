---
layout: post
title:  "Material Checkboxes"
date:   2015-08-31 19:59:17
image: "/images/list.jpg"
fullwidthcodepen: "//codepen.io/samratcliffe/embed/qdJLNX/?height=497&theme-id=17355&default-tab=result"
fullwidthcodepenheight: "500"
---

Apply CSS to your HTML `label` elements to create fully customised checkboxes and radio buttons. 

### Some Jade
```
mixin c(name)
  input(type="checkbox" id="#{name}")
  label(for="#{name}") #{name}

div
  form
    p Tick all that apply
    +c("Bernie")
    +c("Hillary")
    +c("Jed")
    +c("The Donald")
```

### Your CSS
```
/* Hide the checkbox itself */
input[type='checkbox'] {
  display: none;
}

/* And style your label however you like! */
label {
  display: block;
  background: #eee;
  font-weight:800;
  padding: 1em 1em;
  margin: 0.3em 0;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  color: #333;
  transition: color 0.2s 0s, background 0.2s;
}

/* A good subtle hover effect */
label:hover {
  background: #e8e8e8;
}

/* The '+' selector is very underused. It is great
 * for selecting siblings when your markup can't 
 * use children. (like labels next to inputs)
 */ 
input:checked+label {
  color: #fff;
  transition: color 0.2s 0.2s, background 0.2s;
}

/* We'll use our ::after element for the 
 * animated green circle 
 */
input+label::after {
  background: rgba(126, 196, 183, 0.3);
  content: "";
  display: block;
  position: absolute;
  border-radius: 9999px;
  width: 0px;
  height: 0px;
  top: 50%;
  right: 1.5em;
  transition: all 0.2s ease-out;
  z-index: -1;
}

/* Make it big when the checkbox is selected*/
input:checked+label::after {
  background: rgba(126, 196, 183, 1);
  transition: all 0.4s ease-in;
  width: 1300px; /* sorry for pixels but yolo */
  height: 1300px;
  top: -650px;
  right: -610px;
}

/* Our ::before will be an empty checkbox... */
input+label::before {
  content: "";
  position: absolute;
  width: 1em;
  height: 1em;
  border: 2px solid #999;
  border-radius: 3px;
  line-height: 1;
  text-align: center;
  right: 1em;
  color: #fff;
  transition: none;
}

/* Which is checked when the input is :checked */
input:checked+label::before {
  content: "\2713"; /* a UTF ✓ mark */
  border-color: #fff;
}
```