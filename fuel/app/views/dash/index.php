<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Dashboard</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google-signin-scope" content="https://www.googleapis.com/auth/spreadsheets">
        <meta name="google-signin-client_id" content="786815525856-3402viqgn291shhfrs4mjljqa8l8p7ds.apps.googleusercontent.com">
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="/assets/js/datatables.min.js"></script>
        <script src="/assets/js/buttons.print.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
        <script src="/assets/js/lobipanel.min.js"></script>
        <script src="/assets/js/dashboard.js"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
        <link rel="icon" type="image/png" href="https://support.digitellinc.com/imgpsh_fullsize.png">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/datatables.min.css">
        <link rel="stylesheet" href="/assets/css/lobipanel.min.css">
    <body>
        <script>
        </script>
        <header class="navbar navbar-fixed-top navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
            <button data-toggle="collapse-side" data-target=".side-collapse" data-target-2=".side-collapse-container" type="button" class="navbar-toggle pull-left"><div align="center"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>Menu</div></button>
        </div>
        <div class="navbar-info side-collapse in" id="myTabs">
          <nav role="navigation" class="navbar-collapse">
            <ul class="nav navbar-nav navbar-left">
                <li class="active"><a data-toggle="tab" href="#CE" class="fa fa-calendar">&nbsp;Current</a> </li>
                <li><a data-toggle="tab" href="#New" class="fa fa-exclamation-circle">&nbsp;New</a> </li>
                <li><a data-toggle="tab" href="#Sales" class="fa fa-line-chart">&nbsp;Sales</a> </li>
                <li><a data-toggle="tab" href="#Demo" class="fa fa-bullhorn">&nbsp;Demo</a> </li>
                <li class="dropdown"><a class="dropdown-toggle fa fa-tachometer" data-toggle="dropdown">Marketing <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a data-toggle="tab" href="#marketingLinks">Links</a> </li>
                        <li><a data-toggle="tab" href="#marketingVideos">Videos</a> </li>
                        <li><a data-toggle="tab" href="#marketingAssets">Assets</a> </li>
                    </ul>
                </li>
                <li><a data-toggle="tab" href="#Admin" class="fa fa-pie-chart">&nbsp;Admin</a> </li>
                <li><a data-toggle="tab" href="#Logistics" class="fa fa-cogs">&nbsp;Logistics</a> </li>
                <li><a data-toggle="tab" href="#Dev" class="fa fa-flask">&nbsp;Dev</a> </li>
                <li><a data-toggle="tab" href="#On-Site" class="fa fa-plan">&nbsp;On-Site</a> </li>
                <li><a data-toggle="tab" href="#Events" class="fa fa-laptop">&nbsp;Events</a> </li>
				<li class="dropdown"><a class="dropdown-toggle fa fa-map-signs" data-toggle="dropdown">&nbsp;Support<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a data-toggle="tab" href="#supportLinks">Links</a> </li>
                        <li><a data-toggle="tab" href="#supportTools">Tools</a> </li>
                        <li><a data-toggle="tab" href="#supportHelp">Help</a> </li>
                    </ul>
                </li>
                <li><a data-toggle="tab" href="#Accounting" class="fa fa-bank">&nbsp;Accounting</a> </li>
                <li><a data-toggle="tab" href="#Contacts" class="fa fa-phone">&nbsp;Contacts</a> </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
        <div class="container-fluid side-collapse-container">
        <div class="panel panel-default col-md-12 row">
            <a href="#"><img src="/assets/img/digitell-43.png" style="padding-top: 45px;padding-bottom: 45px"></a>
        <div class="panel panel-default" style="padding: 5px;margin-top: 20px;float: right;display: inline-">
            <div id="curUser">
                <div id="userName" class="text-center"></div>
                <button type="button" class="btn btn-primary btn-xs center-block" id="punchButton">Punch OUT</button>
            </div>
        </div>
        </div>
        <div class="tab-content">
            <div id="CE" class="tab-pane fade in active">
                <div class="panel panel-default" id="curEventPanel">
                    <div class="panel-heading">
                        <div class="panel-title" id="eventsPanel">
                            <h4>Current Events</h4>
                        </div>
                    </div>
                    <div class="panel-body" id="eventsDisplay">
                    </div>
                </div>
            </div>
            <div id="New" class="tab-pane fade">
                <div class="panel panel-default" id="newPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>New Links this Month</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="newList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="Sales" class="tab-pane fade">
                <div class="panel panel-default" id="salesPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Sales</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="salesList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="Demo" class="tab-pane fade">
                <div class="panel panel-default" id="demoPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Demo</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="demoList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="marketingLinks">
                <div class="panel panel-default" id="mLinkPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Marketing Links</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="mLinkList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="marketingVideos">
                <div class="panel panel-default" id="mVideoPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Marketing Videos</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="mVideoList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="marketingAssets">
                <div class="panel panel-default" id="mAssetPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Marketing Assets</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="mAssetList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="Admin" class="tab-pane fade">
                <div class="panel panel-default" id="adminPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Admin</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="adminList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="Logistics" class="tab-pane fade">
                <div class="panel panel-default" id="logisticsPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Logistics</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="logisticsList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="Dev" class="tab-pane fade">
                <div class="panel panel-default" id="devPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Dev</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="devList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="On-Site" class="tab-pane fade">
                <div class="panel panel-default" id="onSitePanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>On-Site</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="onSiteList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="Events" class="tab-pane fade">
                <div class="panel panel-default" id="eventsPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Live Events</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="eventsList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
			<div class="tab-pane fade" id="supportLinks">
                <div class="panel panel-default" id="sLinkPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Support Links</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="sLinkList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="supportTools" class="tab-pane fade">
                <!-- Phone Logger Panel -->
                <div class="col-md-5">
                    <div class="panel panel-default" id="phoneLogger">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <h4>Phone Logger</h4>
                            </div>
                        </div>
                        <div class="panel-body">
                            <fieldset>
                                <table width="100%" cellspacing="9">
                                    <tr>
                                        <td colspan="3" align="center">
                                            <div class="btn-group-xs" data-toggle="buttons" id="callType" style="padding-bottom: 15px">
                                                <label class="btn btn-default active" for="type1">
                                                    <input type="radio" name="radioIncoming" id="type1" value="Incoming" checked>
                                                    Incoming </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioDialout" id="type2" value="DialOut">
                                                    Dial Out </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioDsync" id="type3" value="Dsync">
                                                    Dsync </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioSupervisor" id="type4" value="Supervisor">
                                                    Supervisor </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioChatReminder" id="type5" value="Chat Reminder">
                                                    Chat Reminder </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr align="center">
                                        <td>
                                            <div>
                                                <label for="siteType">Site</label>
                                                <select id="siteType" class="form-control input-sm">
                                                    <optgroup label="Regular">
                                                        <option>PROLib</option>
                                                        <option>AICPA</option>
                                                        <option>CFOnline</option>
                                                        <option>ASE Uni</option>
                                                        <option>OPUS</option>
                                                        <option>STARLib</option>
                                                    </optgroup>
                                                    <optgroup label="Dysnc">
                                                        <option>N/A</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </td>
                                        <td align="center">
                                            <label for="callKeyword">Library/Tag:</label>
                                            <input type="text" id="callTag" class="form-control input-sm">
                                        </td>
                                        <td>
                                            <label for="issueType">Issue Type</label>
                                            <select name="Type of Issue" id="issueType" class="form-control input-sm">
                                                <option>Content Access</option>
                                                <option>Handouts Access</option>
                                                <option>Password Reset</option>
                                                <option>Registration Assistance</option>
                                                <option>Eval or Certificate Access</option>
                                                <option>Live Player Issue</option>
                                                <option>Archive Player Issue</option>
                                                <option>Account Creation or Merge</option>
                                                <option>Profile Update</option>
                                                <option>SSO Issue</option>
                                                <option>Payment or Refund Issue</option>
                                                <option>3rd Party App Inquiry</option>
                                                <option>Client Rep. Call</option>
                                                <option>General Question</option>
                                                <option>All affected Issue</option>
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                                <table width="100%" cellspacing="5">
                                    <tr>
                                        <td>
                                            <label for="callerName">Name:</label>
                                            <input type="text" id="callerName" class="form-control input-sm">
                                        </td>
                                        <td>
                                            <label for="callerEmail"><i id="searchEmailButton" class="fa fa-search"></i> Email:</label>
                                            <input type="text" id="callerEmail" class="form-control input-sm">
                                        </td>
                                        <td>
                                            <label for="callerPhone">Phone:</label>
                                            <input type="text" id="callerPhone" class="form-control input-sm">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>
                                                <label for="siteType">Broswer</label>
                                                <select id="browserType" class="form-control input-sm">
                                                    <optgroup>
                                                        <option>Chrome</option>
                                                        <option>IE/Edge</option>
                                                        <option>Firefox</option>
                                                        <option>iPad/iPhone</option>
                                                        <option>Android</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </td>
                                        <td align="center">
                                            <label for="forSession">Session/Event:</label>
                                            <input type="text" id="forSession" class="form-control input-sm">
                                        </td>
                                        <td>
                                            <label for="loggerLiveEvent">Date:</label>
                                            <input type="text" class="form-control input-sm" id="loggerLiveEvent">               
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" align="center">
                                            <label for="callNotes">Notes:</label>
                                            <textarea name="callNotes" id="callNotes" cols="40" rows="4" data-autosize-on="true" style="overflow: hidden; resize: vertical;"  class="form-control"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" align="center">
                                            <div class="btn-group-xs" data-toggle="buttons" id="outcome" style="padding-top: 15px;padding-bottom: 15px">
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioIncoming" id="outcome01" value="Call Back" checked>
                                                    Call Back 
                                                </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioDialout" id="outcome02" value="Call Assoc">
                                                    Call Assoc 
                                                </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioDsync" id="outcome03" value="Dsync">
                                                    Dsync 
                                                </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioSupervisor" id="outcome04" value="No Ans">
                                                    No Ans 
                                                </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioChatReminder" id="outcome05" value="VM">
                                                    VM 
                                                </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioChatReminder" id="outcome06" value="Resolved">
                                                    Resolved 
                                                </label>
                                                <label class="btn btn-default active" for="outcome07">
                                                    <input type="radio" name="radioChatReminder" id="outcome07" value="First Call">
                                                    First Call 
                                                </label>
                                                <label class="btn btn-default">
                                                    <input type="radio" name="radioChatReminder" id="outcome08" value="Repeat"> Repeat 
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </fieldset>
                            <div style="float: right"><button type="button" class="btn btn-warning btn-sm success" id="loggerStart">Start Call</button><button type="button" class="btn btn-primary btn-sm success" id="loggerSubmit">Submit</button></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="panel panel-default" id="agentCallBacks">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <h4>Call Backs</h4>
                            </div>
                        </div>
                        <div class="panel-body">
                            <table id="callBackList" class="table table-striped table-bordered"></table>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="col-md-12">
                        <div class="panel panel-default" id="clientList">
                            <div class="panel-heading">
                                <div class="panel-title">
                                    <h4>Digitell Sites</h4>
                                </div>
                            </div>
                            <div class="panel-body">
                                <table id="sites-list" class="table table-striped table-bordered"></table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="panel panel-default" id="phoneLogPanel">
                            <div class="panel-heading">
                                <div class="panel-title">
                                    <h4>Phone Logs</h4>
                                </div>
                            </div>
                            <div class="panel-body">
                                <fieldset>
                                    <div>
                                        <table cellpadding="0" cellspacing="0" border="0" class="dataTable table table-striped table-bordered table-responsive" id="supportTable" width="100%">
                                        </table>
                                    </div>  
                                </fieldset>
                            </div>
                            <div class="panel-footer" ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Accounting" class="tab-pane fade">
                <div class="panel panel-default" id="accountingPanel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4>Accounting</h4>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table id="accountingList" class="table table-striped table-bordered"></table>
                    </div>
                </div>
            </div>
            <div id="Contacts" class="tab-pane fade">
                <div class="col-md-12">
                    <div class="panel panel-default" id="contactsPanel">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <h4>Contacts</h4>
                            </div>
                        </div>
                        <div class="panel-body">
                            <table id="contactsList" class="table table-striped table-bordered"></table>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="panel panel-default" id="notesPanel">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <h4>Notes</h4>
                            </div>
                        </div>
                        <div class="panel-body">
                            <textarea name="User Notes" id="userNotes" cols="40" rows="25" data-autosize-on="true" style="resize: vertical;"  class="form-control"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="panel panel-default" id="extPanel">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <h4>Extensions</h4>
                            </div>
                        </div>
                        <div class="panel-body">
                            <table id="extList" class="table table-striped table-bordered"></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- SignIn -->
        <div id="userID"></div><div id="punchID" value="null"></div>
        <div id="signIn" class="modal fade" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <a href="#gLogin"><div class="g-signin2" data-onsuccess="onSignIn"></div></a>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>