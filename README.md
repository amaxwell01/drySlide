* drySlide, A Gallery Plugin for jQuery
* Intructions: https://github.com/amaxwell01/drySlide
* By: Andrew Maxwell, http://www.andrewcmaxwell.com
* Version: 0.1
* Updated: July 24th, 2012


Q: What does drySlide stand for?:  
A: drySlide actually stands for "Don't Repeat Yourself, Slide!". One of my mottos is to not repeat yourself and I feel like other developers feel like they
are always repeating themself when working with code, and in this case galleries and slideshows.

Q: Why did you build drySlide since there are hundreds of other slideshows and gallery plugins out there?  
A: I decided after working with galleries for almost 8 years that it was time to build something that I can actually use on client projects that fit my need. 
I also figured that other developers can use a gallery/slideshow that actually gave them the functionaility that they need, when they need it, 
while also giving them more control on both the type of content that they add into the gallery/slideshow as well as the semantic HTML code that is being used.

## Minimum Requirements: (I have not tested this on older versions, if you have time to test it on older versions that would be greatly appreciated)
    jQuery 1.7.2



# How To Use drySlide

## Calling drySlide
    drySlide({
        primaryContent : {
            slideWidth   : '350px',
            speed : [duration], // A string or number determining how long the animation will run
            transition: 'linear',
            type  : 'slide-left',  // Defaults to slide-left
        },
        secondaryContent : {
            slideWidth   : '350px',
            speed : 500,
            transition: 'linear',
            type  : 'fade-out'  // Defaults to fade-out
        },
        slideContent : {
            slideWidth   : '350px',
            speed : 500,
            transition: 'linear',
            type  : 'slide-left', // Defaults to slide-left
            visibleCount : 7
        }
        id           : 'hockey', // This can be anything, but must start with a alphabetic character
        loop         : true, //defaults to false
        speed        : 400, // this is in milliseconds, defaults to 500ms, this is used for ALL sections that have a speed
        startFrame   : 0, // the start frame activated
        navigation   : true,
        mainSlide    : 4,
        timer        : true, // defaults to false
        timerSpeed   : 5000 // defaults to 6000ms
    });

## Main Content
    <div class="dryContentContainer" data-id="<insert id here>">
        <ul class="dryContent">
            <li></li>
        </ul>
    </div>


## Copy Content aka Secondary Content
    <div class="dryCopyContentContainer" data-id="<insert id here>">
        <ul class="dryCopyContent">            
            <li></li>
        </ul>
    </div>


## Slide Content
    <div class="drySlideContainer" data-id="<insert id here>" data-middle="4">
        <ul class="drySlides">
            <li></li>
        </ul>
    </div>


## Previous and Next Buttons
    <button class="dryPreviousSlide" type="button" data-id="<insert id here>">Previous Photo</button>
    <button class="dryNextSlide" type="button" data-id="<insert id here>">Next Photo</button>


## Navigation Dots
    <ul class="drySlideNavigation" data-id="<insert id here>">
    </ul>



Variable options
### drySlide.primaryContentAnimation.type
* 'slide-left'
* 'slide-right'
* 'fade-out'

### drySlide.primaryContentAnimation.speed
* 0 - 9999999999999 (This is in milliseconds. You can have it run longer than 9999999999999 if you really wanted, but why would you? This is 316.88 years)
* 'slow' (600 milliseconds)
* 'fast' (200 milliseconds)


## Notes
* Use something like [data-hash="blah"] if you want to override the default hash of #1, #2, #3 etc.
