/*
* drySlide, A Gallery Plugin for jQuery
* Intructions: https://github.com/amaxwell01/drySlide
* By: Andrew Maxwell, http://www.andrewcmaxwell.com
* Version: 0.1
* Updated: July 17th, 2011
*/

var drySlide = function( args ) {

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
    var content          = $('#' + id + '_dryContent.dryContent');
    var contentParent    = content.parent();
    var contentItems     = $('#' + id + '_dryContent.dryContent li');
    var contentItemsCount    = $('#' + id + '_dryContent.dryContent li').length;
    var copyContentItems     = $('#' + id + '_dryCopyContent.dryCopyContent li');
    var loop             = args.loop ? args.loop : false;
    var mainSlide        = args.mainSlide ? args.mainSlide : 0;
    var navigation       = args.navigation ? args.navigation : false;
    var navigationContainer  = $('#' + id + '_drySlideNavigation');
    var slideContainer   = $('#' + id + '_drySlideContainer.drySlideContainer');
    var slideItems       = $('#' + id + '_drySlides.drySlides li');
    var slideCount       = slideItems.length;
    var beginningSlides  = slideCount - mainSlide;
    var firstChunk       = slideCount - beginningSlides;
    var PrimaryContentAnimation = args.PrimaryContentAnimation ? args.PrimaryContentAnimation : 'slide-left';
    var lastChunk        = slideCount - ( mainSlide - 1 );
    var speed            = args.speed ? args.speed : 'slow';
    var startFrame       = args.startFrame ? args.startFrame : 0;
    var timer            = args.timer ? args.timer : false;
    var timerSpeed       = args.timerSpeed ? args.timerSpeed : 6000;
    
    
    // Add the slide content to the content container
    var displayContent = function( slide ) {
        
        // Hide all content items
        $( contentItems).removeClass('selected');
        $( contentItems).fadeOut(500);
        
        // Show the content for the given slide
        $( contentItems + '[data-item="' + slide + '"]').addClass('selected');
        $( contentItems + '[data-item="' + slide + '"]').fadeIn(500);
        
        // Hide all copy content items
        $( copyContentItems).removeClass('selected');
        $( copyContentItems).fadeOut(500);
        
        // Show the copy content for the given slide
        $( copyContentItems + '[data-item="' + slide + '"]').addClass('selected');
        $( copyContentItems + '[data-item="' + slide + '"]').fadeIn(500);
        
        return true;
    };
    
    
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
    
    
    
    // Add the selected class to the start slide item
    $( slideItems[ startFrame ] ).addClass('selected');
    
    // Show the content for the startFrame
    displayContent( startFrame );
    
    //Set the data-current on the content
    // TODO - Add the ability to get the frame count from the url and use that instead of the startFrame
    contentParent.attr('data-current', startFrame);
    
    var previousSlide = function() {
        var currentSlide   = parseInt(contentParent.attr('data-current'));
        
        if( currentSlide > 0 )
        {
            contentParent.attr('data-current', currentSlide);
            selectSlideItem( currentSlide - 1, 'button' );
            displayContent( currentSlide - 1 );
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
            displayContent( currentSlide );
            navigationSelection( currentSlide );
        }
    };
    
    
    
    // Add the onclick function to each slide item
    slideItems.on('click', function( event ) {
        var that = $(this);
        var slide = parseInt( that.attr('data-item') );
        
        selectSlideItem( slide, 'click' );
        displayContent( slide );
    });
    
    
    // Slide Navigation
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
    
    
    // Navigation selection
    var navigationSelection = function( itemNumber )
    {
        // Change the class to selected for the clicked on navigation dot
        $(navigationContainer).children('li').removeClass('selected');
        
        // Add the selected class to listen elementFromPoint
        $(navigationContainer).children('li[data-item="' + itemNumber + '"]').addClass('selected');
    }
    
    // Slide Navigation
    // Click on a navigation dot to change tabs
    $(navigationContainer).children('li').on('click', function() {
        var itemNumber = parseInt( $(this).attr('data-item') );
        var currentSlide = parseInt(contentParent.attr('data-current')) + 1;
        
        navigationSelection( itemNumber );
        
        contentParent.attr('data-current', currentSlide + 1 );
        selectSlideItem( itemNumber, 'button' );
        displayContent( itemNumber );
    });
    
    
    // Primary Content Animation
    // Change the way that the primary content animates
    switch( PrimaryContentAnimation ) {
        case 'slide-right':
            // Slide the content to the left
            break;
        case 'slide-left':
        default:
            // Slide the content to the left
            break;
    }
    
    
    // Setup SEO friendly linkable pages
    // User the browser state API

    // Create a timer which can play through all of the slides
    if( timer ) {
        var i = 0;
        var interval = setInterval(function(){
            
            // Every time this interval runs, increment to the next slide
            // Once we get to the last slide, go back to the beginning if loop is set
            displayContent( i );
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