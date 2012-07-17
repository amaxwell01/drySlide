Q: What does drySlide stand for?:
A: drySlide actually stands for "Don't Repeat Yourself, Slide!". One of my mottos is to not repeat yourself and I feel like other developers feel like they
are always repeating themself when working with code, and in this case galleries and slideshows.

Q: Why did you build drySlide since there are hundreds of other slideshows and gallery plugins out there?
A: I decided after working with galleries for almost 8 years that it was time to build something that I can actually use on client projects that fit my need. 
I also figured that other developers can use a gallery/slideshow that actually gave them the functionaility that they need, when they need it, 
while also giving them more control on both the type of content that they add into the gallery/slideshow as well as the semantic HTML code that is being used.





# How To Use drySlide

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








## Notes
* Use something like [data-hash="blah"] if you want to override the default hash of #1, #2, #3 etc.
