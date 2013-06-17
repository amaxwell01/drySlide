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
    var secondaryContent     = args.secondaryContent ? args.secondaryContent : { type : 'fade-out', speed: 500};
    var slideContent         = args.slideContent ? args.slideContent : { type : 'slide-left-centered', speed: 500};

    // Set the data-middle attribute on the slides
    slideContainer.attr('data-middle', mainSlide );

    // Iterate over all of the slide items and give them a data-item number
    $.each( $(slide).children('li'), function( index, value ) {
        $(value).attr('data-item', index);
    });

    // Iterate over all of the content items and give them a data-item number
    $.each( $(content).children('li'), function( index, value ) {
        $(value).attr('data-item', index);
    });

    // Iterate over all of the content items and give them a data-item number
    $.each( $(copyContent).children('li'), function( index, value ) {
        $(value).attr('data-item', index);
    });

    if ( args.itemCount ) {
        dryslide.renderSlideCount();
    }

    //assign an onclick function to the previous and next buttons
    $('#' + id + '_dryPreviousSlide.dryPreviousSlide').on('click', function() {
        dryslide.previousSlide();
    });

    $('#' + id + '_dryNextSlide.dryNextSlide').on('click', function() {
        dryslide.nextSlide();
    });

    /*=== ANIMATION CONTROLS ===*/
    var dryslide = {

        // Fade content over the previous item
        fadeOut: function( selector, item, area ) {

            switch( area ) {
                case 'copyContentItems':
                    //speed = secondaryContent.speed;
                    break;
                case 'contentItems':
                    break;
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
        },

        // Get the Current Slide ID
        getCurrentSlideID: function( parent ) {
            var ID = parent.attr('data-current') ? parent.attr('data-current') : 0;

            // Return an INT, not a string
            return parseInt(ID, 10);
        },

        /* ==========================================================================
           Get Move Amount
           * @param <Int> item
           * @param <Int> slideCount
           * @param <Int> mainSlide
           * @param <Int> previousItem
           * @param <Int> firstChunk
           * @param <Int> lastChunk
           * @param <Int> slideWidth
           * @param <Int> selectedItemDistance
           * @return <Int> moveAmount
           ========================================================================== */
        getMoveAmount: function( args ) {
            var moveAmount;

            if( args.item >= args.slideCount - (args.mainSlide - 1) ) {
                if( args.previousItem <= (args.lastChunk - 2) ) {
                    moveAmount = (args.lastChunk - args.mainSlide) * args.slideWidth + 'px';
                }
                else {
                    moveAmount = args.item - (args.lastChunk - (args.lastChunk - 1)) * args.slideWidth + 'px';
                }
            } else if( args.item <= (args.firstChunk - 1) ) {
                moveAmount = '0';
            }
            else {
                moveAmount = args.selectedItemDistance - ((args.item - (args.item - args.mainSlide ) - 1) * args.slideWidth) + 'px';
            }

            return moveAmount;
        },

        getSlideWidth: function( slide ) {
            var slideWidth = slide.outerWidth(true);
            return slideWidth;
        },

        getMiddleSlideID: function( parent ) {
            var middleSlideID = parent.attr('data-middle') ? parent.attr('data-middle') : 0;
            return parseInt(middleSlideID, 10);
        },

        // Run the selected animation
        init: function( selector, item, area ) {
            var selectorParent, animate;

            // Primary animation switch
            selectorParent = $(selector).parent().length;

            animate = function( type ) {
                switch( type ) {
                    case 'fade-out':
                        if( selectorParent > 0 ) {
                            dryslide.fadeOut( selector, item, area );
                        }
                        break;
                    case 'slide-left':
                        if( selectorParent > 0 ) {
                            dryslide.slideLeft( selector, item, area );
                        }
                        break;
                    case 'slide-left-centered':
                        if( selectorParent > 0 ) {
                            dryslide.slideLeftCentered( selector, item, area );
                        }
                        break;
                    case 'slide-right':
                        if( selectorParent > 0 ) {
                            dryslide.slideRight( selector, item, area );
                        }
                        break;
                    default:
                        break;
                }
            };

            if( area === 'primarycontent' ) {
                // primary animation switch
                animate( primaryContent.type );
            }

            if( area === 'secondarycontent' ) {
                // secondary animation switch
                animate( secondaryContent.type );
            }

            if( area === 'slidecontent' ) {
                // secondary animation switch
                animate( slideContent.type );
            }
        },

        middleSlideOffset: function( container, slide ) {
            var offset = 0, containerWidth, containerMiddle, slideWidth, slideMiddle;

            // Get the width of the container
            containerWidth = container.outerWidth(true);
            containerMiddle = containerWidth / 2;

            // Get the width of each slide, including margin and border
            slideWidth = slide.outerWidth(true);
            slideMiddle = slideWidth / 2;

            // Get the left position for the slider
            offset = containerMiddle - slideMiddle;

            console.log( offset );
            return offset;
        },

        // Navigation selection
        navigationSelection: function( itemNumber ) {
            // Change the class to selected for the clicked on navigation dot
            $(navigationContainer).children('li').removeClass('selected');

            // Add the selected class to listen elementFromPoint
            $(navigationContainer).children('li[data-item="' + itemNumber + '"]').addClass('selected');
        },

        nextSlide: function() {
            var currentSlide = parseInt(contentParent.attr('data-current'), 10) + 1;

            if ( currentSlide < contentItemsCount ) {
                contentParent.attr('data-current', currentSlide + 1 );
                dryslide.selectSlideItem( currentSlide, 'button' );
                dryslide.init( contentItemsSelector, currentSlide, 'primarycontent' );
                dryslide.init( copyContentItemsSelector, currentSlide, 'secondarycontent' );
                dryslide.navigationSelection( currentSlide );
            } else if ( currentSlide === contentItemsCount ) {
                contentParent.attr('data-current', 0 );
                dryslide.selectSlideItem( 0, 'button' );
                dryslide.init( contentItemsSelector, 0, 'primarycontent' );
                dryslide.init( copyContentItemsSelector, 0, 'secondarycontent' );
                dryslide.navigationSelection( 0 );
            }

            if ( args.itemCount ) {
                dryslide.renderSlideCount();
            }
        },

        previousSlide: function() {
            var currentSlide = parseInt(contentParent.attr('data-current'), 10);

            if ( currentSlide > 0 ) {
                contentParent.attr('data-current', currentSlide);
                dryslide.selectSlideItem( currentSlide - 1, 'button' );
                dryslide.init( contentItemsSelector, currentSlide - 1, 'primarycontent' );
                dryslide.init( copyContentItemsSelector, currentSlide - 1, 'secondarycontent' );
                dryslide.navigationSelection( currentSlide - 1 );
            }
        },

        // Slide Counters
        renderSlideCount: function() {
            var current = contentParent.attr('data-current') ? parseInt( contentParent.attr('data-current'), 10 ) + 1 : startFrame + 1,
                total = parseInt( contentItemsCount, 10 );

            $('.dryCurrentCount[data-id="' + id + '"]').text( current );
            $('.dryTotalCount[data-id="' + id + '"]').text( total );
        },

        // Set the Current Slide ID
        setCurrentSlideID: function( parent, ID ) {
            parent.attr('data-current', ID);
        },

        selectSlideItem: function( currentSlide, call ) {
            var middle = mainSlide - 1,
                middleSlide = parseInt( slideContainer.attr('data-middle'), 10 ),
                previousItem = parseInt( $(content).children('li.selected').attr('data-item'), 10 ),
                slideWidth = $(slideContainer).children('.drySlides').children('li[data-item="0"]').outerWidth();

            dryslide.init( slideItemsSelector, currentSlide, 'slidecontent' );

            // Remove the select class from all items
            $(slideItems).removeClass('selected');

            // Add the selected class to the selected slide           
            $( slideItems[ currentSlide ] ).addClass('selected');

            contentParent.attr('data-current', currentSlide );

            // If the user has enabled navigation
            if( navigation ) {
                dryslide.navigationSelection( currentSlide );
            }

            // Add a window.location.hash if the user has opted into linking
            if(  args.linking && args.linking.enabled ) {
                window.location.hash = ( parseInt(currentSlide, 10) + 1 );
            }
        },

        // Slide the content to the left
        slideLeft: function( selector, item, area ) {
            var parentID, previousItem, previousItemPosition, previousItemDistance,
            selectedItem, selectedItemPosition, selectedItemDistance, moveAmount;

            // Get the parent of the selector
            parentID = $(selector).parent().attr('id');

            // Get the originating slide (aka the previous slide)
            previousItem = 0;

            // @TODO Check which area it is
            // Get the current item
            if( $(selector + '[data-item="' + item + '"]').hasClass('selected') ) {

                switch( area ) {
                    case 'primarycontent':
                        previousItem = $(selector + '[data-item="' + item + '"].selected').attr('data-item');
                        break;
                    case '':
                        previousItem = $(selector + '[data-item="' + item + '"].selected').prev().attr('data-item');
                        break;
                    default:
                        console.log('No area provided');
                }
            }

            previousItemPosition = $(selector + '[data-item="' + previousItem + '"]').position();
            previousItemDistance = previousItemPosition.left;

            // Show the next item
            $(selector).removeClass('selected');
            $(selector + '[data-item="' + item + '"]').addClass('selected');

            // Get the selected slide
            selectedItem = item;
            selectedItemPosition = $(selector + '[data-item="' + item + '"]').position();
            selectedItemDistance = selectedItemPosition.left;

            // Find the distance between the two, then animate that distance
            moveAmount = selectedItemDistance - previousItemDistance + 'px';
            $('#' + parentID).animate({ 'left': '-' + moveAmount}, speed );
        },

        // Slide the content to the left and center the main item
        // Center the main item based on the container if under the width of the
        // visible area
        slideLeftCentered: function( selector, item, area ) {
            var self = this, parentID, middleSlide, slideWidth, previousItem,
            previousItemElement, previousItemPosition, previousItemDistance,
            selectedItemPosition, selectedItemDistance, moveAmount;

            // Get the parent of the selector
            parentID = $(selector).parent().attr('id');

            // Current Slide
            middleSlide  = self.getMiddleSlideID( slideContainer );
            slideWidth = self.getSlideWidth( $(slideContainer).children('.drySlides').children('li[data-item="0"]') );

            // Get the originating slide (aka the previous slide)
            previousItem = self.getCurrentSlideID( $('#' + parentID).parent() );

            // Get the current item
            previousItemElement = $(selector + '[data-item="' + previousItem + '"]');

            previousItemPosition = previousItemElement.position();
            previousItemDistance = previousItemPosition.left;

            // Show the next item
            $(selector).removeClass('selected');
            $(selector + '[data-item="' + item + '"]').addClass('selected');

            // Get the selected slide
            selectedItemPosition = $(selector + '[data-item="' + item + '"]').position();
            //var selectedItemDistance = selectedItemPosition.left;
            selectedItemDistance = item * slideWidth;

            moveAmount = self.getMoveAmount({
                item: item,
                slideCount: slideCount,
                mainSlide: mainSlide,
                previousItem: previousItem,
                firstChunk: firstChunk,
                lastChunk: lastChunk,
                slideWidth: slideWidth,
                selectedItemDistance: selectedItemDistance
            });

            $('#' + parentID).animate({ 'left': '-' + moveAmount}, slideContent.speed );
            self.setCurrentSlideID( $('#' + parentID).parent(), item );
        },

        // Slide the content to the right
        slideRight: function( selector, item, area ) {
            var parentID, previousItem, previousItemPosition, previousItemDistance,
            selectedItem, selectedItemPosition, selectedItemDistance, moveAmount;

            // Get the parent of the selector
            parentID = $(selector).parent().attr('id');

            // Get the originating slide (aka the previous slide)
            previousItem = 0;
            // Get the current item
            if( $(selector + '[data-item="' + item + '"]').hasClass('selected') ) {
                previousItem = $(selector + '[data-item="' + item + '"].selected');
            }

            previousItemPosition = previousItem.position();
            previousItemDistance = previousItemPosition.left;

            // Show the next item
            $(selector).removeClass('selected');
            $(selector + '[data-item="' + item + '"]').addClass('selected');

            // Get the selected slide
            selectedItem = item;
            selectedItemPosition = $(selector + '[data-item="' + item + '"]').position();
            selectedItemDistance = selectedItemPosition.left;

            // Find the distance between the two, then animate that distance
            moveAmount = selectedItemDistance - previousItemDistance + 'px';
            $('#' + parentID).animate({ 'right': '-' + moveAmount}, speed );
        }
    };

    // Add the selected class to the start slide item
    $( slideItems[ startFrame ] ).addClass('selected');

    //Set the data-current on the content
    // TODO - Add the ability to get the frame count from the url and use that instead of the startFrame
    contentParent.attr('data-current', startFrame);

    // Show the content for the startFrame
    dryslide.init( contentItemsSelector, startFrame, 'primarycontent' );
    dryslide.init( copyContentItemsSelector, startFrame, 'secondarycontent' );

    // Add the onclick function to each slide item
    slideItems.on('click', function( event ) {
        var that = $(this);
        var slide = parseInt( that.attr('data-item'), 10);

        dryslide.selectSlideItem( slide, 'click' );
        dryslide.init( contentItemsSelector, slide, 'primarycontent' );
        dryslide.init( copyContentItemsSelector, slide, 'secondarycontent' );
    });

    /*=== SLIDE NAVIGATION ===*/

    // Show the navigation dots for the number of slides
    if( navigation ) {
        for( var i = 0; i < contentItems.length; i++ ) {
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
        var itemNumber = parseInt( $(this).attr('data-item'), 10);
        var currentItem = parseInt( contentParent.attr('data-current'), 10);

        if( itemNumber !== currentItem ) {
            dryslide.navigationSelection( itemNumber );
            contentParent.attr('data-current', itemNumber );
            dryslide.selectSlideItem( itemNumber, 'button' );
            dryslide.init( contentItemsSelector, itemNumber, 'primarycontent' );
            dryslide.init( copyContentItemsSelector, itemNumber, 'secondarycontent' );
        }
    });

    /*=== TIMER ===*/

    // Create a timer which can play through all of the slides
    if( timer ) {
        var i = 0;
        var interval = setInterval(function(){

            // Every time this interval runs, increment to the next slide
            // Once we get to the last slide, go back to the beginning if loop is set
            dryslide.init( contentItemsSelector, i, 'primarycontent' );
            dryslide.init( copyContentItemsSelector, i, 'secondarycontent' );
            dryslide.selectSlideItem( i, 'button' );
            dryslide.navigationSelection( i );
            dryslide.renderSlideCount();

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
                dryslide.navigationSelection( clicked );
                contentParent.attr('data-current', clicked );
                dryslide.selectSlideItem( clicked, 'button' );
                dryslide.init( contentItemsSelector, clicked, 'primarycontent' );
                dryslide.init( copyContentItemsSelector, clicked, 'secondarycontent' );
            }
        });
    }
};