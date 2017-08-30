<?php

use DataTables\Editor,
    DataTables\Editor\Field,
    DataTables\Editor\Format,
    DataTables\Editor\Mjoin,
    DataTables\Editor\Options,
    DataTables\Editor\Upload,
    DataTables\Editor\Validate;
  
class Controller_callback extends Controller {
    public function post_callback() {
    include( APPPATH . "/classes/controller/php/DataTables.php" );  
    Editor::inst( $db, 'ts_phoneLogTBL' )
    ->fields(
    Field::inst( 'id' ),        
    Field::inst( 'timeStamp' ),
    Field::inst( 'userAgent' ),
    Field::inst( 'callType' ),
    Field::inst( 'browserType' ),        
    Field::inst( 'callSite' ),
    Field::inst( 'callTag' ),
    Field::inst( 'callEvent' ),
    Field::inst( 'callerName' ),
    Field::inst( 'callerEmail' ),
    Field::inst( 'callerPhone' ),
    Field::inst( 'issueType' ),
    Field::inst( 'callNotes' ),
    Field::inst( 'callResolution' ),
    Field::inst( 'agentReminder' ),
    Field::inst( 'userCalled' )
    )
    ->process( $_POST )->json(); 
    }
}
