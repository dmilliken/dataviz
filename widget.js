$(function() {

    $( "#priorities" ).sortable({
      update: function( event, ui ) {
        //this event triggers when the user has changed the sort order of items

        // get items in the new order
        var items = $( "#priorities" ).sortable( "toArray" );

        // call some other method to change the visualisation
      }
    });
    $( "#priorities" ).disableSelection();
});
