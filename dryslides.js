var drySlide = function( args ) {
    
    var slideItems = $('#drySlides li');
    var slideCount = slideItems.length;
    var speed      = args.speed ? args.speed : 'slow';
    var startFrame = args.startFrame ? args.startFrame : 0;
    var mainSlide  = args.mainSlide ? args.mainSlide : 0;
    
    
    
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
    
    var nextSlide = function() {
        var slideContainer = $('#drySlideContainer');
        var currentSlide   = parseInt(slideContainer.attr('data-current'));
        
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
    
    // Iterate over all of the slide items and give them a data-count number
    
    
    // Add the onclick function to each slide item
    slideItems.on('click', function( event ) {
        var element = $(event.target).parent();
        var parent = $(event.target).parent().parent();
        console.log( );
    });
};


