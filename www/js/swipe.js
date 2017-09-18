$( document ).on( "pagecreate", "#demo-page", function() {
    // Swipe to remove list item
    $( document ).on( "swipeleft", "ul li", function( event ) {
        var listitem = $( this ), "left",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? "left" : false;
            client.confirmAndDelete( listitem, transition );
    });
    
});
