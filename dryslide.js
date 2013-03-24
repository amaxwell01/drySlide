/*
* drySlide, A Gallery Plugin for jQuery
* Intructions: https://github.com/amaxwell01/drySlide
* By: Andrew Maxwell, http://www.andrewcmaxwell.com
* Version: 0.1
* Updated: February 10th, 2013
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
    var copyContent          = '#' + id + '_dryCopyContent.dryCopyContent';
    var copyContentItemsSelector = '#' + id + '_dryCopyContent.dryCopyContent li';
    var copyContentItems     = $(copyContentItemsSelector);
    var linking              = args.linking ? args.linking : {
            enabled  : true, // Defaults to false
            customURL : false // Defaults to false
        };
    var loop                 = args.loop ? args.loop : false;
    var mainSlide            = args.mainSlide ? args.mainSlide : 0;
    var navigation           = args.navigation ? args.navigation : false;
    var navigationContainer  = $('#' + id + '_drySlideNavigation');
    var slideContainer       = $('#' + id + '_drySlideContainer.drySlideContainer');
    var slide                = '#' + id + '_drySlides.drySlides';
    var slideItemsSelector   = '#' + id + '_drySlides.drySlides li';
    var slideItems           = $(slideItemsSelector);
    var slideCount           = slideItems.length;
    var beginningSlides      = slideCount - mainSlide;
    var firstChunk           = slideCount - beginningSlides;
    var lastChunk            = slideCount - ( mainSlide - 1 );
    var speed                = args.speed ? args.speed : 300;
    var startFrame           = args.startFrame ? args.startFrame : 0;
    var timer                = args.timer ? args.timer : false;
    var timerSpeed           = args.timerSpeed ? args.timerSpeed : 6000;
    var primaryContent       = args.primaryContent ? args.primaryContent : { type : 'slide-left', speed: 500};
    var secondaryContent     = args.secondaryContent ? args.secondaryContent : { type : 'fade-out', speed: 500, centerMiddleSlide: false};
    var slideContent         = args.slideContent ? args.slideContent : { type : 'slide-left-centered', speed: 500};
    
    
    // Set the data-middle attribute on the slides
    slideContainer.attr('data-middle', mainSlide );
    
    // Iterate over all of the slide items and give them a data-item number
    $.each( $(slide).children('li'), function( index, value ) {
        $(value).attr('data-item', index)
    });
    
    // Iterate over all of the content items and give them a data-item number
    $.each( $(content).children('li'), function( index, value ) {
        $(value).attr('data-item', index)
    });
    
    // Iterate over all of the content items and give them a data-item number
    $.each( $(copyContent).children('li'), function( index, value ) {
        $(value).attr('data-item', index)
    });

    var spacialDifference = function( container, itemsWrapper ) {
        return container.outerWidth() - itemsWrapper.outerWidth();
    }

    var centerSliderSlides = function() {
        var slidesWidth = 0;
        var slideWrapper = $(slide);
        var slideContainerWidth = slideContainer.outerWidth();
        var spacialDifference = 0;

        // Get the width of the first slide
        slidesWidth = slideItems.eq(0).outerWidth() * slideCount;

        if ( slidesWidth < slideContainerWidth ) {

            spacialDifference = slideContainerWidth - slidesWidth;
            slideWrapper.css('margin-left', spacialDifference / 2);
        } else {
            slideWrapper.css('margin-left', '');
        }
    };

    if ( slideCount ) {
        centerSliderSlides();
    }

    // Slide Counters
    var renderSlideCount = function() {
        var current = contentParent.attr('data-current') ? parseInt( contentParent.attr('data-current') ) + 1 : startFrame + 1;
        var total = parseInt( contentItemsCount );

        $('.dryCurrentCount[data-id="' + id + '"]').text( current );
        $('.dryTotalCount[data-id="' + id + '"]').text( total );
    }

    if ( args.itemCount ) {
        renderSlideCount();
    }

    // Navigation selection
    var navigationSelection = function( itemNumber ) {
        // Change the class to selected for the clicked on navigation dot
        $(navigationContainer).children('li').removeClass('selected');
        
        // Add the selected class to listen elementFromPoint
        $(navigationContainer).children('li[data-item="' + itemNumber + '"]').addClass('selected');
    }

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
        
        drySlideAnimation.init( slideItemsSelector, currentSlide, 'slidecontent' );
        
        // Remove the select class from all items
        $(slideItems).removeClass('selected');

        // Add the selected class to the selected slide           
        $( slideItems[ currentSlide ] ).addClass('selected');
        
        contentParent.attr('data-current', currentSlide );
        
        // If the user has enabled navigation
        if( navigation ) {
            navigationSelection( currentSlide );
        }
        
        // Add a window.location.hash if the user has opted into linking
        if(  args.linking && args.linking.enabled ) {
            window.location.hash = ( parseInt(currentSlide) + 1 );
        }
    };
    
    var nextSlide = function() {
        var currentSlide   = parseInt(contentParent.attr('data-current')) + 1;
        
        if ( currentSlide < contentItemsCount ) {
            contentParent.attr('data-current', currentSlide + 1 );
            selectSlideItem( currentSlide, 'button' );
            drySlideAnimation.init( contentItemsSelector, currentSlide, 'primarycontent' );
            drySlideAnimation.init( copyContentItemsSelector, currentSlide, 'secondarycontent' );
            navigationSelection( currentSlide );
        }
        else
        if ( currentSlide === contentItemsCount ) {
            contentParent.attr('data-current', 0 );
            selectSlideItem( 0, 'button' );
            drySlideAnimation.init( contentItemsSelector, 0, 'primarycontent' );
            drySlideAnimation.init( copyContentItemsSelector, 0, 'secondarycontent' );
            navigationSelection( 0 );
        }

        if ( args.itemCount ) {
            renderSlideCount();
        }
    };
    
    //assign an onclick function to the previous and next buttons
    $('#' + id + '_dryPreviousSlide.dryPreviousSlide').on('click', function() {
        previousSlide();
    });
    
    $('#' + id + '_dryNextSlide.dryNextSlide').on('click', function() {
        nextSlide();
    });

    // A responsive way to center images 
    var centerMiddleSlide = function() {
        
        // Get the width of the visible container
        var containerWidth = slideContainer.width();

        // Get the currently selected side
        var selectedSlide = slideContainer.find('.selected');
        var selectedSlideWidth = selectedSlide.width();
        var selectedSlidePosition = selectedSlide.position();

        // Find the offset of the container
        var offset = selectedSlide.parent().css('left');
            offset = parseInt(offset.replace('px','') );

        // Get the new center location ( perfectly centers )
        var newCenter = containerWidth + selectedSlideWidth / 2;

        // Get the left position of the selected slide - offset
        var newOffset = selectedSlidePosition.left - offset;

        // Make sure that the first slide is never too far right 
        // before centering
        if ( offset >= 0 ) {
            selectedSlide.parent().css('left', newOffset );
            console.log( 'center the middle slide' );
        }
    };
    
    
    /*=== ANIMATION CONTROLS ===*/
     
    var drySlideAnimation = {};
    
    // Slide the content to the left
    drySlideAnimation.slideLeft = function( selector, item, area ) {
    
        // Get the parent of the selector
        var parentID = $(selector).parent().attr('id');
        
        // Get the originating slide (aka the previous slide)
        var previousItem = 0;

        // @TODO Check which area it is
        // Get the current item
        if( $(selector + '[data-item="' + item + '"]').hasClass('selected') ) {

            switch( area ) {
                case 'primarycontent':
                    previousItem = $(selector + '[data-item="' + item + '"].selected').parent().parent();
                    break;
                case '':
                    previousItem = $(selector + '[data-item="' + item + '"].selected').prev().attr('data-item');
                    break;
                default:
                    console.log('No area provided');
            }
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
    
    // Slide the content to the left and center the main item
    // Center the main item based on the container if under the width of the
    // visible area
    drySlideAnimation.slideLeftCentered = function( selector, item, area ) {
    
        // Get the parent of the selector
        var parentID = $(selector).parent().attr('id');

        // Current Slide
        var middleSlide  = parseInt( slideContainer.attr('data-middle') );
        var slideWidth = $(slideContainer).children('.drySlides').children('li[data-item="0"]').outerWidth();
        
        // Get the originating slide (aka the previous slide)
        var previousItem = $('#' + parentID).parent().attr('data-current') ? parseInt($('#' + parentID).parent().attr('data-current')) : 0;

        // Get the current item
        var previousItemElement = $(selector + '[data-item="' + previousItem + '"]');
        
        var previousItemPosition = previousItemElement.position();
        var previousItemDistance = previousItemPosition.left;

        
        // Show the next item
        $(selector).removeClass('selected');
        $(selector + '[data-item="' + item + '"]').addClass('selected');
        
        // Get the selected slide
        var selectedItemPosition = $(selector + '[data-item="' + item + '"]').position();
        //var selectedItemDistance = selectedItemPosition.left;
        var selectedItemDistance = item * slideWidth;
        var moveAmount;
        var itemsWidth = $(selector).eq(0).outerWidth() * $(selector).length;

        if( item >= slideCount - (mainSlide - 1) ) {
            if( previousItem <= (lastChunk - 2) ) {
                moveAmount = (lastChunk - mainSlide) * slideWidth + 'px';
            }
            else {
                moveAmount = item - (lastChunk - (lastChunk - 1)) * slideWidth + 'px';
            }
        }
        else
        if( item <= (firstChunk - 1) ) {
            moveAmount = '0';
        }
        else {
            moveAmount = selectedItemDistance - ((item - (item - mainSlide ) - 1) * slideWidth) + 'px';
        }

        if ( area === 'slidecontent' ) {
            if ( itemsWidth > $('#' + parentID).parent().outerWidth() ) {
                $('#' + parentID).animate({ 'left': '-' + moveAmount}, slideContent.speed );
            }
        } else {
            $('#' + parentID).animate({ 'left': '-' + moveAmount}, slideContent.speed );
        }

        $('#' + parentID).parent().attr('data-current', item);
    };
    
    
    // Slide the content to the right
    drySlideAnimation.slideRight = function( selector, item, area ) {
        // Get the parent of the selector
        var parentID = $(selector).parent().attr('id');
        
        // Get the originating slide (aka the previous slide)
        var previousItem = 0;
        // Get the current item
        if( $(selector + '[data-item="' + item + '"]').hasClass('selected') ) {
            previousItem = $(selector + '[data-item="' + item + '"].selected');
        }
        
        var previousItemPosition = previousItem.position();
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
                //speed = secondaryContent.speed;
                break;
            case contentItems:
            default:
                //speed = primaryContent.speed;
                break;
        }
        
        // Absolute position each item
        $(selector).css({
            left: 0,
            position: 'absolute',
            top: 0
        });
        
        // Hide all content items
        $(selector).fadeOut(500);
        
        // Show the content for the given slide
        $(selector + '[data-item="' + item + '"]').fadeIn(500);
        return true;
    };
    
    // Run the selected animation
    drySlideAnimation.init = function( selector, item, area ) {
        
        // Primary animation switch
        var selectorParent = $(selector).parent().length;

        var animate = function( type ) {
            switch( type ) {
                case 'fade-out':
                    if( selectorParent > 0 ) {
                        drySlideAnimation.fadeOut( selector, item, area );
                    }
                    break;
                case 'slide-left':
                    if( selectorParent > 0 ) {
                        drySlideAnimation.slideLeft( selector, item, area );
                    }
                    break;
                case 'slide-left-centered':
                    if( selectorParent > 0 ) {
                        drySlideAnimation.slideLeftCentered( selector, item, area );
                    }
                case 'slide-right':
                    if( selectorParent > 0 ) {
                        drySlideAnimation.slideRight( selector, item, area );
                    }
                    break;
                default:
                    break;
            }
        }
        
        if( area === 'primarycontent' ) {
            // primary animation switch
            animate( primaryContent.type );
        }

        if( area === 'secondarycontent' ) {
            // secondary animation switch
            animate( secondaryContent.type );

            // center the slides

            if ( args.secondaryContent.centerMiddleSlide ) {
                centerMiddleSlide();
            }
        }
        
        if( area === 'slidecontent' ) {
            // secondary animation switch
            animate( slideContent.type );
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
    
    // Click on a navigation dot to change tabs
    $(navigationContainer).children('li').on('click', function() {
        var itemNumber = parseInt( $(this).attr('data-item') );
        var currentItem = parseInt( contentParent.attr('data-current') );
        
        if( itemNumber !== currentItem ) {
            navigationSelection( itemNumber );
            contentParent.attr('data-current', itemNumber );
            selectSlideItem( itemNumber, 'button' );
            drySlideAnimation.init( contentItemsSelector, itemNumber, 'primarycontent' );
            drySlideAnimation.init( copyContentItemsSelector, itemNumber, 'secondarycontent' );
        }
    });

    
    
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
            renderSlideCount();
            
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
    
    // Setup SEO friendly linkable pages
    // User the browser state API
    // Enabling Custom Linking
    if( args.linking && args.linking.enabled ) {
        
        $('a[data-id="' + id + '"]').on('click', function() {
            // get clicked, pass to animate function                    
            var clicked = $(this).attr('href').match('[^#/]+$') - 1;
            var current = contentParent.attr('data-current');
            
            // if current slide equals clicked, don't do anything
            if( current != clicked ) {
                navigationSelection( clicked );
                contentParent.attr('data-current', clicked );
                selectSlideItem( clicked, 'button' );
                drySlideAnimation.init( contentItemsSelector, clicked, 'primarycontent' );
                drySlideAnimation.init( copyContentItemsSelector, clicked, 'secondarycontent' );
            }
        });
    }
};
