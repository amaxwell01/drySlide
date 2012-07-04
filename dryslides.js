var drySlide = function( args ) {
    
    var slideContainer = $('#drySlideContainer');
    var slideItems   = $('#drySlides li');
    var contentItems = $('#dryContent li');
    var slideCount   = slideItems.length;
    var speed        = args.speed ? args.speed : 'slow';
    var startFrame   = args.startFrame ? args.startFrame : 0;
    var mainSlide    = args.mainSlide ? args.mainSlide : 0;
    var middleSlide  = args.mainSlide ? Math.ceil(args.mainSlide / 2) : 0;
    
     // Add the slide content to the content container
    var displayContent = function( slide ) {
        
        // Hide all content items
        $( contentItems).fadeOut();
        
        
        // Show the content for the given slide
        $( contentItems + '[data-content="' + slide + '"]').fadeIn();
    };
    
    // Iterate over all of the slide items and give them a data-slide number
    $.each(slideItems, function( index, value ) {
        $(value).attr('data-slide', index)
    });
    
    // Iterate over all of the content items and give them a data-content number
    $.each(contentItems, function( index, value ) {
        $(value).attr('data-content', index)
    });
    
    //Get the number of visible items that will be seen to the user
    
    
    //assign an onclick function to the previous and next buttons
    $('#dryPreviousSlide').on('click', function() {
        previousSlide();
    });
    
    $('#dryNextSlide').on('click', function() {
        nextSlide();
    });
    
    
    
    // Add the selected class to the start slide item
    $( slideItems[ startFrame ] ).addClass('selected');
    
    // Show the content for the startFrame
    displayContent( startFrame );
    
    
    var previousSlide = function() {
        var slideContainer = $('#drySlideContainer');
        var currentSlide   = parseInt(slideContainer.attr('data-current'));
        
        if( currentSlide > 0 )
        {
            
            if( currentSlide > mainSlide - 1 && 
              ( currentSlide - 1 ) < ( slideCount - mainSlide )
              )
            {
                $('#drySlides').animate({ 'left': '+=102px'}, speed );
            }
            
            // Remove the select class from all items
            $(slideItems).removeClass('selected');
            
            // Add the selected class to the previous slide           
            $( slideItems[ currentSlide - 1 ] ).addClass('selected');
            
            slideContainer.attr('data-current', currentSlide - 1 );
        }
    };
    
    
    var selectSlideItem = function( currentSlide ) {
        
        if( currentSlide < slideCount - 1 )
        {
            if( ( currentSlide + 1 ) > ( mainSlide - 1 ) && 
                ( currentSlide ) < ( slideCount - mainSlide )
              )
            {
                $('#drySlides').animate({ 'left': '-=102px'}, speed );
            }
           
            // Remove the select class from all items
            $(slideItems).removeClass('selected');

            // Add the selected class to the next slide           
            $( slideItems[ currentSlide + 1 ] ).addClass('selected');
            
            slideContainer.attr('data-current', currentSlide + 1 );
        }
        
    };
    
    var nextSlide = function() {
        var currentSlide   = parseInt(slideContainer.attr('data-current'));
        selectSlideItem( currentSlide );
    };
    
    
    
    // Add the onclick function to each slide item
    slideItems.on('click', function( event ) {
        var that = $(this);
        var slide = parseInt( that.attr('data-slide') );
        
        selectSlideItem( slide - 1 );
        displayContent( slide );
    });
};


