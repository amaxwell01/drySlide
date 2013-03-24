/*
* drySlide, A Gallery Plugin for jQuery
* Intructions: https://github.com/amaxwell01/drySlide
* By: Andrew Maxwell, http://www.andrewcmaxwell.com
* Version: 0.1
* Updated: February 10th, 2013
*/

var dryslide = {

    // Set defaults
    defaults: {
        concealed: this.userSetValues.concealed ? this.userSetValues.concealed : false,
        content: $('#' + id + '_dryContent.dryContent'),
        contentParent: content.parent(),
        contentItemsSelector: '#' + id + '_dryContent.dryContent li',
        contentItems: $(contentItemsSelector),
        contentItemsCount: $(contentItemsSelector).length,
        copyContent: '#' + id + '_dryCopyContent.dryCopyContent',
        copyContentItemsSelector: '#' + id + '_dryCopyContent.dryCopyContent li',
        copyContentItems: $(copyContentItemsSelector),
        id: this.userSetValues.id ? this.userSetValues.id : 'drySlide_',
        linking: this.userSetValues.linking ? this.userSetValues.linking : {
            enabled: true, // Defaults to false
            customURL: false // Defaults to false
        },
        loop: this.userSetValues.loop ? this.userSetValues.loop : false,
        mainSlide: this.userSetValues.mainSlide ? this.userSetValues.mainSlide : 0,
        navigation: this.userSetValues.navigation ? this.userSetValues.navigation : false,
        navigationContainer: $('#' + id + '_drySlideNavigation'),
        slideContainer: $('#' + id + '_drySlideContainer.drySlideContainer'),
        slide: '#' + id + '_drySlides.drySlides',
        slideItemsSelector: '#' + id + '_drySlides.drySlides li',
        slideItems: $(slideItemsSelector),
        slideCount: slideItems.length,
        beginningSlides: slideCount - mainSlide,
        firstChunk: slideCount - beginningSlides,
        lastChunk: slideCount - ( mainSlide - 1 ),
        speed: this.userSetValues.speed ? this.userSetValues.speed : 300,
        startFrame: this.userSetValues.startFrame ? this.userSetValues.startFrame : 0,
        timer: this.userSetValues.timer ? this.userSetValues.timer : false,
        timerSpeed: this.userSetValues.timerSpeed ? this.userSetValues.timerSpeed : 6000,
        primaryContent: this.userSetValues.primaryContent ? this.userSetValues.primaryContent : { type : 'slide-left', speed: 500},
        secondaryContent: this.userSetValues.secondaryContent ? this.userSetValues.secondaryContent : { type : 'fade-out', speed: 500},
        slideContent: this.userSetValues.slideContent ? this.userSetValues.slideContent : { type : 'slide-left-centered', speed: 500},
    },

    // A place to store all of the user set values
    userDefinedValues: null,

    init: {

    },

    create: function( args ) {
        this.userDefinedValues = args;
    }
};
