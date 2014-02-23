drySlide, A Gallery Plugin for jQuery
Intructions: https://github.com/amaxwell01/drySlide
By: Andrew Maxwell, http://www.andrewcmaxwell.com
Version: 0.1
Updated: February 17th, 2013


Q: What does drySlide stand for?:  
A: drySlide actually stands for "Don't Repeat Yourself, Slide!". One of my mottos is to not repeat yourself and I feel like other developers feel like they
are always repeating themself when working with code, and in this case galleries and slideshows.

Q: Why did you build drySlide since there are hundreds of other slideshows and gallery plugins out there?  
A: I decided after working with galleries for almost 8 years that it was time to build something that I can actually use on client projects that fit my need. 
I also figured that other developers can use a gallery/slideshow that actually gave them the functionaility that they need, when they need it, 
while also giving them more control on both the type of content that they add into the gallery/slideshow as well as the semantic HTML code that is being used.

## Minimum Requirements:
(I have not tested this on older versions, if you have time to test it on older versions that would be greatly appreciated)  
    jQuery 1.7.2



# How To Use drySlide

## Capturing the static URL's for linking
```javascript
    // Set starting slide to 0
    var drySlideStart = 0;
    // Get slide number if it exists
    if (window.location.hash) {
        drySlideStart = window.location.hash.replace('#','');
    }
```

## Calling drySlide
```javascript
drySlide({
    primaryContent: {
        speed: [duration], // A string or number determining how long the animation will run
        type: 'slide-left',  // Defaults to slide-left
    },
    secondaryContent: {
        speed: 500,
        type: 'fade-out'  // Defaults to fade-out
    },
    slideContent : {
        speed : 500,
        type  : 'slide-left', // Defaults to slide-left
    }
    id: 'unicorn', // This can be anything, but must start with a alphabetic character
    itemCount: true
    linking: {
        enabled: true, // Defaults to false
        customURL: true // Defaults to false
    },
    loop: true, //defaults to false
    speed: 400, // this is in milliseconds, defaults to 500ms, this is used for ALL sections that have a speed
    startFrame: 0, // the start frame activated or you can use the start check from above
    startFrame: drySlideStart,
    navigation: true,
    mainSlide: 4,
    timer: true, // defaults to false
    timerSpeed: 5000 // defaults to 6000ms
});
```

# Properties
itemCount (boolean):
```
itemCount:TRUE

or

itemCount: FALSE
```


    
## Primary Content
```html
<div class="dryContentContainer" data-id="<insert id here>">
    <ul class="dryContent">
        <li></li>
    </ul>
</div>
```


## Copy Content aka Secondary Content
```html
<div class="dryCopyContentContainer" data-id="<insert id here>">
    <ul class="dryCopyContent">            
        <li></li>
    </ul>
</div>
```

## Slide Content
```html
<div class="drySlideContainer" data-id="<insert id here>" data-middle="4">
    <ul class="drySlides">
        <li></li>
    </ul>
</div>
```

## Previous and Next Buttons
```html
<button class="dryPreviousSlide" type="button" data-id="<insert id here>">Previous Photo</button>
<button class="dryNextSlide" type="button" data-id="<insert id here>">Next Photo</button>
```

## Navigation Dots
```html
<ul class="drySlideNavigation" data-id="<insert id here>"></ul>
```

## Item Count
```html
// Current Item Count
<div class="dryCurrentCount" data-id="<insert id here>"></div>

// Total Item Count
<div class="dryTotalCount" data-id="<insert id here>"></div>
```


Variable options
### drySlide.primaryContentAnimation.type
* 'color-up'
* 'slide-left'
* 'slide-right'
* 'fade-out'


### color-up class
@keyframes colorUp {
    0% {
        opacity: 1;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    98% {
        opacity: 1;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    99% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    100% {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
}

@-webkit-keyframes colorUp {
    0% {
        opacity: 1;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    98% {
        opacity: 1;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    99% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    100% {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
}

/* COLOR UP TRANSITION */
.dryslide_color_up {
    background-color: #830051;
    animation: colorUp 4s;
    -webkit-animation: colorUp 4s;
    opacity: 1;
}

.dryslide_color_up.done {
    opacity: 0;
}


### drySlide.primaryContentAnimation.speed
* 0 - 9999999999999 (This is in milliseconds. You can have it run longer than 9999999999999 if you really wanted, but why would you? This is 316.88 years)
* 'slow' (600 milliseconds)
* 'fast' (200 milliseconds)


## Notes
* Use something like [data-hash="blah"] if you want to override the default hash of #1, #2, #3 etc.
