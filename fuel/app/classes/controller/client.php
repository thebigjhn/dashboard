<?php

use DataTables\Editor,
    DataTables\Editor\Field,
    DataTables\Editor\Format,
    DataTables\Editor\Mjoin,
    DataTables\Editor\Options,
    DataTables\Editor\Upload,
    DataTables\Editor\Validate;
  
class Controller_client extends Controller {
    public function post_client() {
    include( APPPATH . "/classes/controller/php/DataTables.php" );  
    Editor::inst( $db, 'ts_clientTBL' )
    ->fields(
    Field::inst( 'id' ),        
    Field::inst( 'hostedSite' ),
    Field::inst( 'clientOpus' ),
    Field::inst( 'clientAcro' ),
    Field::inst( 'clientName' ),
    Field::inst( 'clientSite' ),
    Field::inst( 'siteContact' ),
    Field::inst( 'clientAMPM' ),
    Field::inst( 'clientActive' ),
    Field::inst( 'clientSSO' ),
    Field::inst( 'digiEvals' ),
    Field::inst( 'memberCheck' ),
    Field::inst( 'memberCode' ),
    Field::inst( 'digiRefunds' ),
    Field::inst( 'digiPhoneOrder' )
    )
    ->process( $_POST )->json(); 
    }
}
