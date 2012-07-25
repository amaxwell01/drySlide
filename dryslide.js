/*
* drySlide, A Gallery Plugin for jQuery
* Intructions: https://github.com/amaxwell01/drySlide
* By: Andrew Maxwell, http://www.andrewcmaxwell.com
* Version: 0.1
* Updated: July 25th, 2012
*/

var drySlide = function( args ) {

    // Set the drySlide ID
    var id  = args.id ? args.id : 'drySlide_';

    // Assign the id to the elements
    $('.drySlideContainer[data-id="' + id + '"]').attr('id', id + '_drySlideContainer');
    $('.drySlideContainer[data-id="' + id + '"]').children('.drySlides').attr('id', id + '_drySlides');
    $('.dryContentContainer[data-id="' + id + '"]').attr('id', id + '_dryContentContainer');
    $('.dryContentContainer[data-id="' + id + '"]').children('.dryContent').attr('id', id + '_dryContent');
    $('.dryCopyContentContainer[data-id="' + id + '"]').attr('id', id + '_dryCopyContentContainer');
    $('.dryCopyContentContainer[data-id="' + id + '"]').children('.dryCopyContent').attr('id', id + '_dryCopyContent');
    $('.dryPreviousSlide[data-id="' + id + '"]').attr('id', id + '_dryPreviousSlide');
    $('.dryNextSlide[data-id="' + id + '"]').attr('id', id + '_dryNextSlide');
    $('.drySlideNavigation[data-id="' + id + '"]').attr('id', id + '_drySlideNavigation');


    // Set variables
    var content              = $('#' + id + '_dryContent.dryContent');
    var contentParent        = content.parent();
    var contentItemsSelector = '#' + id + '_dryContent.dryContent li';
    var contentItems         = $(contentItemsSelector);
    var contentItemsCount    = $(contentItemsSelector).length;
    var copyContentItemsSelector = '#' + id + '_dryCopyContent.dryCopyContent li';
    var copyContentItems     = $(copyContentItemsSelector);
    var loop                 = args.loop ? args.loop : false;
    var mainSlide            = args.mainSlide ? args.mainSlide : 0;
    var navigation           = args.navigation ? args.navigation : false;
    var navigationContainer  = $('#' + id + '_drySlideNavigation');
    var slideContainer       = $('#' + id + '_drySlideContainer.drySlideContainer');
    var slideItems           = $('#' + id + '_drySlides.drySlides li');
    var slideCount           = slideItems.length;
    var beginningSlides      = slideCount - mainSlide;
    var firstChunk           = slideCount - beginningSlides;
    var lastChunk            = slideCount - ( mainSlide - 1 );
    var speed                = args.speed ? args.speed : 'slow';
    var startFrame           = args.startFrame ? args.startFrame : 0;
    var timer                = args.timer ? args.timer : false;
    var timerSpeed           = args.timerSpeed ? args.timerSpeed : 6000;
    var primaryContentAnimation = args.primaryContentAnimation ? args.primaryContentAnimation : { type : 'fade-out', speed: 500};
    
    
    // Set the data-middle attribute on the slides
    slideContainer.attr('data-middle', mainSlide );
    
    // Iterate over all of the slide items and give them a data-item number
    $.each(slideItems, function( index, value ) {
        $(value).attr('data-item', index)
    });
    
    // Iterate over all of the content items and give them a data-item number
    $.each(contentItems, function( index, value ) {
        $(value).attr('data-item', index)
    });
    
    // Iterate over all of the content items and give them a data-item number
    $.each(copyContentItems, function( index, value ) {
        $(value).attr('data-item', index)
    });
    
    
    //assign an onclick function to the previous and next buttons
    $('#' + id + '_dryPreviousSlide.dryPreviousSlide').on('click', function() {
        previousSlide();
    });
    
    $('#' + id + '_dryNextSlide.dryNextSlide').on('click', function() {
        nextSlide();
    });
    
    
    /*=== ANIMATION CONTROLS ===*/
     
    var drySlideAnimation = {};
    
    // Slide the content to the left
    drySlideAnimation.slideLeft = function( selector, item, area ) {
    
        // Get the parent of the selector
        var parentID = $(selector).parent().attr('id');
        
        // Get the originating slide (aka the previous slide)
        var previousItem = 0;
        // Get the current item
        if( $(selector + '[data-item="' + item + '"]').hasClass('selected') ) {
            previousItem = $(selector + '[data-item="' + item + '"]').hasClass('selected');
        }
        
        var previousItemPosition = $(selector + '[data-item="' + previousItem + '"]').position();
        var previousItemDistance = previousItemPosition.left;

        
        // Show the next item
        $(selector).removeClass('selected');
        $(selector + '[data-item="' + item + '"]').addClass('selected');
        
        // Get the selected slide
        var selectedItem = item;
        var selectedItemPosition = $(selector + '[data-item="' + item + '"]').position();
        var selectedItemDistance = selectedItemPosition.left;
        
        // Find the distance between the two, then animate that distance
        var moveAmount = selectedItemDistance - previousItemDistance + 'px';
        $('#' + parentID).animate({ 'left': '-' + moveAmount}, speed );
    };
    
    // Slide the content to the right
    drySlideAnimation.slideRight = function( selector, item, area ) {
        // Get the parent of the selector
        var parentID = $(selector).parent().attr('id');
        
        // Get the originating slide (aka the previous slide)
        var previousItem = 0;
        // Get the current item
        if( $(selector + '[data-item="' + item + '"]').hasClass('selected') ) {
            previousItem = $(selector + '[data-item="' + item + '"]').hasClass('selected');
        }
        
        var previousItemPosition = $(selector + '[data-item="' + previousItem + '"]').position();
        var previousItemDistance = previousItemPosition.left;

        
        // Show the next item
        $(selector).removeClass('selected');
        $(selector + '[data-item="' + item + '"]').addClass('selected');
        
        // Get the selected slide
        var selectedItem = item;
        var selectedItemPosition = $(selector + '[data-item="' + item + '"]').position();
        var selectedItemDistance = selectedItemPosition.left;
        
        // Find the distance between the two, then animate that distance
        var moveAmount = selectedItemDistance - previousItemDistance + 'px';
        $('#' + parentID).animate({ 'right': '-' + moveAmount}, speed );
    };
    
    // Fade content over the previous item
    drySlideAnimation.fadeOut = function( selector, item, area ) {
        
        switch( area ) {
            case copyContentItems:
                //speed = secondaryContentAnimation.speed;
                break;
            case contentItems:
            default:
                //speed = primaryContentAnimation.speed;
                break;
        }
        
        // Absolute position each item
        $(selector).css({
            left: 0,
            position: 'absolute',
            top: 0
        });
        
        // Hide all content items
        $(selector).removeClass('selected');
        $(selector).fadeOut(500);
        
        // Show the content for the given slide
        $(selector + '[data-item="' + item + '"]').addClass('selected');
        $(selector + '[data-item="' + item + '"]').fadeIn(500);
        return true;
    };
    
    // Run the selected animation
    drySlideAnimation.init = function( selector, item, area ) {
        
        var selectorParent = $(selector).parent().length;
        
        
        switch( primaryContentAnimation.type ) {
            case 'fade-out':
                if( selectorParent > 0 ) {
                    drySlideAnimation.fadeOut( selector, item, area );
                }
                break;
            case 'slide-left':
            default:
                if( selectorParent > 0 ) {
                    drySlideAnimation.slideLeft( selector, item, area );
                }
                break;
            case 'slide-right':
                if( selectorParent > 0 ) {
                    drySlideAnimation.slideRight( selector, item, area );
                }
                break;
        }
    }
    
    
    // Add the selected class to the start slide item
    $( slideItems[ startFrame ] ).addClass('selected');
    
    //Set the data-current on the content
    // TODO - Add the ability to get the frame count from the url and use that instead of the startFrame
    contentParent.attr('data-current', startFrame);
    
    // Show the content for the startFrame
    drySlideAnimation.init( contentItemsSelector, startFrame, 'primarycontent' );
    drySlideAnimation.init( copyContentItemsSelector, startFrame, 'secondarycontent' );
    
    
    
    var previousSlide = function() {
        var currentSlide   = parseInt(contentParent.attr('data-current'));
        
        if( currentSlide > 0 )
        {
            contentParent.attr('data-current', currentSlide);
            selectSlideItem( currentSlide - 1, 'button' );
            drySlideAnimation.init( contentItemsSelector, currentSlide - 1, 'primarycontent' );
            drySlideAnimation.init( copyContentItemsSelector, currentSlide - 1, 'secondarycontent' );
            navigationSelection( currentSlide - 1 );
        }
    };
    
    
    var selectSlideItem = function( currentSlide, call ) {
        var middle = mainSlide - 1;
        var middleSlide = parseInt( slideContainer.attr('data-middle') );
        
        var previousItem = parseInt( $(content).children('li.selected').attr('data-item') );
        var slideWidth = $(slideContainer).children('.drySlides').children('li[data-item="0"]').outerWidth();
        
        // Remove the select class from all items
        $(slideItems).removeClass('selected');

        // Add the selected class to the selected slide           
        $( slideItems[ currentSlide ] ).addClass('selected');
        
        contentParent.attr('data-current', currentSlide );
        
        // If a user jumps around in the selection, it needs to animate accordingly to fill that gap
        // vs just animating one slide
        // If the slide item is greater than the (slideCount - (mainSlide - 1)), only animate to (slideCount - (mainSlide - 1))
        // If the slide item is less than the (currentSlide >= (firstChunk - 1)), only animate to (firstChunk - 1)
        
        
        var moveAmount = '';
        if( currentSlide >= slideCount - (mainSlide - 1) ) {
        
            // Find the value of which the slide needs to move in order to show the last items without getting out of frame
            moveAmount = Math.abs((currentSlide - previousItem )) * slideWidth + 'px';
        }
        else
        if( currentSlide <= (firstChunk - 1) ) {
            moveAmount = '0';
        }
        else {
            moveAmount = Math.abs((currentSlide - previousItem )) * slideWidth + 'px';
        }
        
        if( currentSlide > (middleSlide - 1) ) {
            if( currentSlide < ( slideCount - ( mainSlide - 1) ) ) {
                slideContainer.attr('data-middle', middleSlide + 1 );
                $('#' + id + '_drySlides.drySlides').animate({ 'left': '-=' + moveAmount}, speed );
            }
        }
        else
        if( currentSlide < (middleSlide - 1) ) {
            if( currentSlide >= (firstChunk - 1)
              )
            {
                slideContainer.attr('data-middle', middleSlide - 1 );
                $('#' + id + '_drySlides.drySlides').animate({ 'left': '+=' + moveAmount}, speed );
            }
        }
    };
    
    var nextSlide = function() {
        var currentSlide   = parseInt(contentParent.attr('data-current')) + 1;
        
        if( currentSlide < contentItemsCount )
        {
            contentParent.attr('data-current', currentSlide + 1 );
            selectSlideItem( currentSlide, 'button' );
            drySlideAnimation.init( contentItemsSelector, currentSlide, 'primarycontent' );
            drySlideAnimation.init( copyContentItemsSelector, currentSlide, 'secondarycontent' );
            navigationSelection( currentSlide );
        }
    };
    
    
    
    // Add the onclick function to each slide item
    slideItems.on('click', function( event ) {
        var that = $(this);
        var slide = parseInt( that.attr('data-item') );
        
        selectSlideItem( slide, 'click' );
        drySlideAnimation.init( contentItemsSelector, slide, 'primarycontent' );
        drySlideAnimation.init( copyContentItemsSelector, slide, 'secondarycontent' );
    });
    
    
    /*=== SLIDE NAVIGATION ===*/
    
    // Show the navigation dots for the number of slides
    if( navigation )
    {
        for( var i = 0; i < contentItems.length; i++ )
        {
            // Add the selected Class to the startFrame
            if( i === startFrame )
            {
                $(navigationContainer).append( '<li data-item=' + i + ' class="selected"></li>');
            }
            else
            {
                $(navigationContainer).append( '<li data-item=' + i + '></li>');
            }
        }
    }
    
    
    
    
    /*=== NAVIGATION DOTS ===*/
    
    // Navigation selection
    var navigationSelection = function( itemNumber )
    {
        // Change the class to selected for the clicked on navigation dot
        $(navigationContainer).children('li').removeClass('selected');
        
        // Add the selected class to listen elementFromPoint
        $(navigationContainer).children('li[data-item="' + itemNumber + '"]').addClass('selected');
    }
    
    // Click on a navigation dot to change tabs
    $(navigationContainer).children('li').on('click', function() {
        var itemNumber = parseInt( $(this).attr('data-item') );
        
        navigationSelection( itemNumber );
        contentParent.attr('data-current', itemNumber );
        //selectSlideItem( itemNumber, 'button' );
        drySlideAnimation.init( contentItemsSelector, itemNumber, 'primarycontent' );
        drySlideAnimation.init( copyContentItemsSelector, itemNumber, 'secondarycontent' );
    });
    
    
    // Setup SEO friendly linkable pages
    // User the browser state API

    
    
    /*=== TIMER ===*/
    
    // Create a timer which can play through all of the slides
    if( timer ) {
        var i = 0;
        var interval = setInterval(function(){
            
            // Every time this interval runs, increment to the next slide
            // Once we get to the last slide, go back to the beginning if loop is set
            drySlideAnimation.init( contentItemsSelector, i, 'primarycontent' );
            drySlideAnimation.init( copyContentItemsSelector, i, 'secondarycontent' );
            selectSlideItem( i, 'button' );
            navigationSelection( i );
            
            // Increment the count
            i++;
            
            if( loop ) {
                if( i === (contentItemsCount) ){
                    i = 0;
                }
            }
            else {
                if( i === (contentItemsCount) ){
                    i = 0;
                    clearInterval(interval);
                }
            }
            
        },timerSpeed);
    }
    
    // Create a function which updates the current item for the previous/next/slide/content/copy/navigation so that everyone is on the same page... literally
};