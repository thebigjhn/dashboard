<?php

use DataTables\Editor,
    DataTables\Editor\Field,
    DataTables\Editor\Format,
    DataTables\Editor\Mjoin,
    DataTables\Editor\Options,
    DataTables\Editor\Upload,
    DataTables\Editor\Validate;
  
class Controller_punches extends Controller {
    public function post_punches() {
    include( APPPATH . "/classes/controller/php/DataTables.php" );  
    Editor::inst( $db, 'tc_punchTBL' )
    ->fields(
    Field::inst( 'id' ),
	Field::inst( 'punchID' ),	
    Field::inst( 'userEmail' ),
    Field::inst( 'punchIN' ),
    Field::inst( 'punchOUT' ),
    Field::inst( 'timeBlock' )
    )
    ->process( $_POST )->json(); 
    }
}
