<?php

use DataTables\Editor,
    DataTables\Editor\Field,
    DataTables\Editor\Format,
    DataTables\Editor\Mjoin,
    DataTables\Editor\Options,
    DataTables\Editor\Upload,
    DataTables\Editor\Validate;
  
class Controller_links extends Controller {
    public function post_links() {
    include( APPPATH . "/classes/controller/php/DataTables.php" );  
    Editor::inst( $db, 'db_linksTBL' )
    ->fields(
    Field::inst( 'id' ),        
    Field::inst( 'linkName' ),
    Field::inst( 'linkURL' ),
    Field::inst( 'linkDescription' ),
    Field::inst( 'linkType' )
    )
    ->process( $_POST )->json(); 
    }
}
