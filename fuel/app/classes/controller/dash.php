<?php
// \Package::load('email');

class Controller_dash extends Controller {

    public function action_index() {
        return Response::forge(View::forge('dash/index'));
    }
    
    public function action_admin() {
        return Response::forge(View::forge('dash/admin'));
    }
    
    public function action_access() {
        return Response::forge(View::forge('dash/access'));
    }

    public function post_update() {
        $email = Input::post('email');
        $emailSplit = explode('@', $email);
        $type = Input::post('type');
        $timestamp = Input::post('timestamp');
        $userName = Input::post('userName');
        $gToken = Input::post('googleToken');
        $userNotes = Input::post('curNotes');
        $loginID = Input::post('loginID');
        $lastPunch = Input::post('lastPunch');
        $punchStatus = Input::post('punchStatus');
        $punchID = Input::post('punchID');
        $timeBlock = Input::post('timeBlock');
        $agent = Input::post('userAgent');
        $splitID = explode(':', $loginID);
        $agentEmail = $splitID[0].'@digitellinc.com';
        $callStart = Input::post('callStart');
		$callEnd = Input::post('callEnd');
		$callTime = Input::post('callTime');
        $callType = Input::post('callType');
        $browserType = Input::post('browserType');
        $callSite = Input::post('callSite');
        $callTag = Input::post('callTag');
        $callEvent = Input::post('callEvent');
        $callerName = Input::post('callerName');
        $callerEmail = Input::post('callerEmail');
        $callerPhone = Input::post('callerPhone');
        $issueType = Input::post('issueType');
        $callNotes = Input::post('callNotes');
        $callRes = Input::post('callResolution');
        $agentRemind = Input::post('agentReminder');
        switch ($type) {
            case 'access':
                $logData = array('timestamp' => $timestamp, 'userName' => $userName, 'userEmail' => $email);
                DB::insert('db_adminLogTBL', array_keys($logData))->values(array_values($logData))->execute();
                break;
            case 'login':
                $ID = uniqid("$emailSplit[0]" . ":");
                $result = DB::query("INSERT INTO tc_usersTBL (userName, userEmail, loginID, gToken) VALUES ('$userName', '$email', '$ID','$gToken') ON DUPLICATE KEY UPDATE userName = '$userName', userEmail = '$email', loginID = '$ID', gToken = '$gToken';")->execute();
                $user = DB::select('*')->from('tc_usersTBL')->where('userEmail', $email)->execute();
                return json_encode($user->as_array());
                break;
            case 'updatePunch':
                if ($punchID === 'punch:first') {
                    $punchID = uniqid('punch:');
                }
                $result = DB::query("INSERT INTO tc_punchTBL (punchIn, userEmail, punchID) VALUES ('$lastPunch', '$email', '$punchID') ON DUPLICATE KEY UPDATE punchOUT = '$lastPunch',timeBlock = '$timeBlock';")->execute();
                if ($punchStatus === 'OUT') {
                    $punchID = uniqid('punch:');
                }
                $update = DB::update('tc_usersTBL')->set(array('punchID' => $punchID, 'lastPunch' => $lastPunch, 'punchStatus' => $punchStatus))->where('loginID', '=', $loginID)->execute();
                $user = DB::select('*')->from('tc_usersTBL')->where('loginID', $loginID)->execute();
                return json_encode($user->as_array());
                break;
            case 'phLog':
                $logData = array('callStart' => $callStart, 'callEnd' => $callEnd, 'callTime' => $callTime,'userAgent' => $agent,'callType' => $callType,'browserType' => $browserType,'callSite' => $callSite,'callTag' => $callTag,'callEvent' => $callEvent,'callerName' => $callerName,'callerEmail' => $callerEmail,'callerPhone' => $callerPhone,'issueType' => $issueType, 'callNotes' => $callNotes,'callResolution' => $callRes,'agentReminder' => $agentRemind);
                $update = DB::insert('ts_phoneLogTBL', array_keys($logData))->values(array_values($logData))->execute();
                break;
            case 'setNotes':
                DB::query("INSERT INTO tc_usersTBL (userNote, userEmail) VALUES ('$userNotes', '$agentEmail') ON DUPLICATE KEY UPDATE userNote = '$userNotes';")->execute();
                break;
        }
    }

    public function get_update() {
        $type = Input::get('type');
        $loginID = Input::get('loginID');
        $splitID = explode(':', $loginID);
        $agentEmail = $splitID[0].'@digitellinc.com';
        $newStart = Input::get('newStart');
        $newEnd = Input::get('newEnd');
		$punchEmail = Input::get('userEmail');
        switch ($type) {
            case 'dayHours':

                break;
            case 'weekHours':

                break;
            case 'monthHours':

                break;
            case 'getOpus':
                $clients = DB::select('*')->from('ts_clientTBL')->execute();
                return json_encode($clients->as_array());
                break;
            case 'opusFetch':
                $results = file_get_contents('http://www.prolibraries.com/scripts/wayne/opus_site_info.php?api_key=so_vuyd-me8fjd6*bdy%kdsopf@ps');
                $dc = json_decode($results, true);
                print_r($dc);
                foreach ($dc as $arr ) {
                    $host = $arr['host'];
                    $acronymn = $arr['mnemonic'];
                    $name = $arr['name'];
                    DB::query('INSERT INTO ts_clientTBL (hostedSite, clientAcro, clientName) VALUES ("'.$host.'","'. $acronymn.'","'. $name.'") ON DUPLICATE KEY UPDATE hostedSite = "'.$host.'",'.'clientName = "'.$name.'";')->execute();                }
            case 'userFetch':
                $user = DB::select('*')->from('tc_usersTBL')->where('loginID', $loginID)->execute();
                return json_encode($user->as_array());
                break;
            case 'phoneLogs':
                $logs = DB::select('*')->from('ts_phoneLogTBL')->execute();
                return json_encode($logs->as_array());
                break;
            case 'getCallBacks':
                $callBacks = DB::select('*')->from('ts_phoneLogTBL')
                ->where_open()
                ->where('userAgent', $agentEmail)->and_where('agentReminder', 'true')->and_where('userCalled', 'false')
                ->where_close()
                ->execute();
                return json_encode($callBacks->as_array());
                break;
            case 'newLinks':
                $newLinks = DB::select('*')->from('db_linksTBL')
                ->where_open()
                ->where('lastChange','<', $newEnd)->and_where('lastChange','>', $newStart)
                ->where_close()
                ->execute();
                return json_encode($newLinks->as_array());
                break;
            case 'salesLinks':
                $salesLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'Sales')->execute();
                return json_encode($salesLinks->as_array());
                break;
            case 'demoLinks':
                $demoLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'Demo')->execute();
                return json_encode($demoLinks->as_array());
                break;
            case 'mLinks':
                $mLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'MarketLink')->execute();
                return json_encode($mLinks->as_array());
                break;
            case 'mVideos':
                $mVideos = DB::select('*')->from('db_linksTBL')->where('linkType', 'MarketVideo')->execute();
                return json_encode($mVideos->as_array());
                break;
            case 'mAssets':
                $mAssets = DB::select('*')->from('db_linksTBL')->where('linkType', 'MarketAssets')->execute();
                return json_encode($mAssets->as_array());
                break;
			case 'sLinks':
                $sLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'Support')->execute();
                return json_encode($sLinks->as_array());
                break;
            case 'adminLinks':
                $adminLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'Admin')->execute();
                return json_encode($adminLinks->as_array());
                break;
            case 'logLinks':
                $logLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'Logistics')->execute();
                return json_encode($logLinks->as_array());
                break;
            case 'devLinks':
                $devLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'Dev')->execute();
                return json_encode($devLinks->as_array());
                break;
            case 'osLinks':
                $osLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'OnSite')->execute();
                return json_encode($osLinks->as_array());
                break;
            case 'eventLinks':
                $eventLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'Events')->execute();
                return json_encode($eventLinks->as_array());
                break;
            case 'accLinks':
                $accLinks = DB::select('*')->from('db_linksTBL')->where('linkType', 'Accounting')->execute();
                return json_encode($accLinks->as_array());
                break;
            case 'fetchContacts':
                $contacts = DB::select('*')->from('db_contactsTBL')->execute();
                return json_encode($contacts->as_array());
                break;
            case 'fetchExt':
                $ext = DB::select('*')->from('db_extNumTBL')->execute();
                return json_encode($ext->as_array());
                break;
            case 'fetchNotes':
                $ext = DB::select('userNote')->from('tc_usersTBL')->where('userEmail', $agentEmail)->execute();
                return json_encode($ext->as_array());
                break;
		    case 'linkList':
                $links = DB::select('*')->from('db_linksTBL')->execute();
                return json_encode($links->as_array());
                break;
		    case 'fetchPunchedIn':
                $punchedIn = DB::query('SELECT * FROM `tc_punchTBL` WHERE punchOUT IS NULL')->execute(); 
                return json_encode($punchedIn->as_array());
                break;	
			case 'fetchUsers':
                $userEmails = DB::query('SELECT userEmail FROM `tc_usersTBL`')->execute(); 
                return json_encode($userEmails->as_array());
                break;
			case 'punchEdit' :
			    $punchEdit = DB::select('*')->from('tc_punchTBL')->where('userEmail', $punchEmail)->execute();
				return json_encode($punchEdit->as_array());
        }
    }

    public function action_404() {
        return Response::forge(Presenter::forge('dash/404'), 404);
    }

}
