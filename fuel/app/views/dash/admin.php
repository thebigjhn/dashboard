<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Dashboard</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google-signin-scope" content="https://www.googleapis.com/auth/spreadsheets">
        <meta name="google-signin-client_id" content="786815525856-3402viqgn291shhfrs4mjljqa8l8p7ds.apps.googleusercontent.com">
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="/assets/js/datatables.min.js"></script>
        <script src="/assets/js/buttons.print.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
        <script src="/assets/js/lobipanel.min.js"></script>
        <script src="/assets/js/dashboard_a.js"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
        <link rel="icon" type="image/png" href="https://support.digitellinc.com/imgpsh_fullsize.png">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/datatables.min.css">
        <link rel="stylesheet" href="/assets/css/lobipanel.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css" />
        <link rel="stylesheet" href="/assets/css/select2-bootstrap.css" />
    <body>
        <script>
        </script>
        <div id="aBody" style="display:none;">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="http://dashboard.digitellinc.com"><img src="/assets/img/digitell-43.png" class="img-responsive" ></a>
                    </div>
                    <div class="tabsBottom">
                        <ul class="nav navbar-nav">
                            <li class="active"><a data-toggle="tab" href="#TC" class="fa fa-calendar">&nbsp;Time Clock</a> </li>
                            <li><a data-toggle="tab" href="#Links" class="fa fa-exclamation-circle">&nbsp;Links</a> </li>
                        </ul>
                    </div>
                    <ul class="nav navbar-nav navbar-right text-center">
                        <li><a id="curUser">
                                <div id="userName">
                                </div>
                                <button type="button" class="btn btn-primary btn-xs" id="punchButton">Punch OUT</button>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="tab-content">
                <div id="TC" class="tab-pane fade in active">
                    <div class="col-md-3">
                        <div class="panel panel-default" id="punchedInPanel">
                            <div class="panel-heading">
                                <div class="panel-title">
                                    <h4>Punched In</h4>
                                </div>
                            </div>
                            <div class="panel-body">
                                <table id="punchedInList" class="table table-striped table-bordered"></table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="panel panel-default" id="addPunch">
                            <div class="panel-heading">
                                <div class="panel-title">
                                    <h4>Edit Punches</h4>
                                </div>
                            </div>
                            <div class="panel-body">
                                <fieldset>
                                    <table width="40%" cellspacing="2">
                                        <tr>
                                            <td>
                                                <label for="punchEmail">Email:</label>
                                                <select name="Email" id="punchEmail" class="form-control">
                                                    <option></option>
                                                </select>
                                                <br/><br/>
                                            </td>
                                        </tr>
                                    </table>
                                    <table id="punchList" width="100%" class="table table-striped table-bordered"></table>
                                </fieldset>
                                <br>
                                <div style="float: right"><button type="button" class="btn btn-primary btn-sm success" id="addPunchSubmit">Submit</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Links" class="tab-pane fade">
                    <div class="col-md-12">
                        <div class="panel panel-default" id="linksPanel">
                            <div class="panel-heading">
                                <div class="panel-title">
                                    <h4>Manage Links</h4>
                                </div>
                            </div>
                            <div class="panel-body">
                                <table id="linkList" width="100%" class="table table-striped table-bordered"></table>
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
        </div>
    </body>
</html>