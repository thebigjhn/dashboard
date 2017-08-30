function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var id_token = googleUser.getAuthResponse().id_token;
	var name = profile.getName();
	var email = profile.getEmail();
	var emailSuffix = email.toString().split("@");
	var postData = {
		'email' : email,
		'type' : 'login',
		'userName' : name,
		'googleToken' : id_token
	};
	$.post('./update', postData, function (data) {
		var user = JSON.parse(data);
		var loginID = user[0].loginID;
		$("#userID").val(loginID);
		if (emailSuffix[1] !== 'digitellinc.com') {
			signOut();
			return;
		} else {
			$(document).trigger('loadComplete');
			punchStatus(user);
			$('#signIn').modal('toggle');
		}
	});

}
function punchStatus(user) {
	var userPunch = user[0].punchStatus;
	var userName = user[0].userName;
	var lastPunch = new Date(user[0].lastPunch);
	var theme = user[0].customTheme;
	var punchID = user[0].punchID;
	if (userPunch === "IN") {
		var atOn = "at";
		$("#punchButton").text("Punch OUT").val('OUT');
	} else {
		var atOn = "since";
		$("#punchButton").text("Punch IN").val('IN');
	}
	$("#punchID").val(punchID);
	$('#userName').html(userName + "<br>Punched " + userPunch + " " + atOn + "<br>" + ezTime(lastPunch));
}
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		window.location.replace("http://www.google.com");
	});
}
function getUser() {
	var loginID = $("#userID").val();
	postData = {
		'type' : 'userFetch',
		'loginID' : loginID
	};
	$.get('./update', postData, function (data) {
		var user = JSON.parse(data);
		punchStatus(user);
	});
}
function doPunch() {
	var loginID = $("#userID").val();
	var postData = {
		'type' : 'userFetch',
		'loginID' : loginID
	};
	$.get('./update', postData).done(function (data) {
		var user = JSON.parse(data);
		parsePunch(user);
	});
}
function doLog() {
	var loginID = $("#userID").val();
	var postData = {
		'type' : 'userFetch',
		'loginID' : loginID
	};
	$.get('./update', postData).done(function (data) {
		var user = JSON.parse(data);
		parseLog(user);
	});
}
function parseLog(data) {
	var user = data;
	var userEmail = user[0].userEmail;
	var now = moment();
	var timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
	var callType = $('#callType label.active input').val();
	var callSite = $("#siteType").val();
	var browserType = $('#browserType').val();
	var callStart = $("#loggerStart").val();
	var callDur = moment.duration(now.diff(callStart));
	var callTime = callDur.asMinutes();
	var callTag = $("#callTag").val();
	var callEvent = $("#forSession").val();
	var callerName = $("#callerName").val();
	var callerEmail = $("#callerEmail").val();
	var callerPhone = $("#callerPhone").val();
	var issueType = $("#issueType").val();
	var agentNotes = $("#callNotes").val();
	var callResolution = $('#outcome label.active input').val();
	var eventDate = $("#loggerLiveEvent").val();
	if (eventDate !== "") {
		var callNotes = "Event Date: " + eventDate + "  | Notes: " + agentNotes;
	} else {
		var callNotes = "Notes: " + agentNotes;
	}
	if (callResolution === 'Call Back') {
		var agentReminder = true;
	} else {
		var agentReminder = false;
	}
	var postData = {
		'type' : 'phLog',
		'callStart' : callStart,
		'callEnd' : timestamp,
		'callTime' : callTime,
		'userAgent' : userEmail,
		'callType' : callType,
		'browserType' : browserType,
		'callSite' : callSite,
		'callTag' : callTag,
		'callEvent' : callEvent,
		'callerName' : callerName,
		'callerEmail' : callerEmail,
		'callerPhone' : callerPhone,
		'issueType' : issueType,
		'callNotes' : callNotes,
		'callResolution' : callResolution,
		'agentReminder' : agentReminder
	};
	$.post('./update', postData);
	$("#callTag,#callerName,#callerEmail,#callerPhone,#forSession,#loggerLiveEvent,#callNotes,#loggerStart").val("");
	$("#loggerStart").text("Start Call");
	$("#siteType, #issueType").prop('selectedIndex', 0);
	$("label[for=type1]").addClass('active').siblings().removeClass('active');
	$("label[for=outcome07]").addClass('active').siblings().removeClass('active');
}
function parsePunch(data) {
	var user = data;
	var punchID = user[0].punchID;
	var userEmail = user[0].userEmail;
	var lastPunch = moment(user[0].lastPunch);
	var loginID = $("#userID").val();
	var now = moment();
	var timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
	var timeDur = moment.duration(now.diff(lastPunch));
	var timeBlock = timeDur.asHours();
	var inOUT = $("#punchButton").val();
	var postData = {
		'type' : 'updatePunch',
		'loginID' : loginID,
		'punchID' : punchID,
		'punchStatus' : inOUT,
		'email' : userEmail,
		'lastPunch' : timestamp,
		'timeBlock' : timeBlock
	};
	$.post('./update', postData, function (data) {
		var user = JSON.parse(data);
		punchStatus(user);
	});
}
function ezTime(timestamp) {
	var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	var day = days[timestamp.getDay()];
	var month = months[timestamp.getMonth()];
	var date = timestamp.getDate();
	var hour = timestamp.getHours();
	var min = timestamp.getMinutes();
	var sec = timestamp.getSeconds();
	var ampm = "AM";
	if (hour >= 12) {
		if (hour !== 12) {
			hour = timestamp.getHours() - 12;
		}
		ampm = "PM";
	}
	if (min < 10) {
		var minFix = '0' + min;
		min = minFix;
	}
	if (sec < 10) {
		var secFix = '0' + sec;
		sec = secFix;
	}
	return day + ' ' + month + ' ' + date + " | " + hour + ':' + min + ':' + sec + ' ' + ampm;
}
$(function () {
    $(document).ready(function() { 
        $(".dropdown-toggle").dropdown();
            var sideslider = $('[data-toggle=collapse-side]');
            var sideTab = $('#myTabs li');            
            var sel = sideslider.attr('data-target');
            var sel2 = sideslider.attr('data-target-2');
            sideslider.click(function(event){
                $(sel).toggleClass('in');
                $(sel2).toggleClass('out');
            });
            sideTab.click(function(event){
                if ($(".out")[0]){
                    $(sel).toggleClass('in');
                    $(sel2).toggleClass('out');
                } 
            });
        });
	$(document).on('loadComplete', function () {
            var html = '<iframe src="https://calendar.google.com/calendar/embed?title=Current%20Events&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=digitellinc.com_0a669nfn8dvdnq9qcrsoiqcvn4%40group.calendar.google.com&amp;color=%23182C57&amp;src=digitellinc.com_nbpp5pj1vvtuug6q5ufe3f5i9s%40group.calendar.google.com&amp;color=%238C500B&amp;src=digitellinc.com_fdcas4t098galvs36gonp72q0s%40group.calendar.google.com&amp;color=%23875509&amp;src=digitellinc.com_gbtc6mihtuka5bls5ogavmtsno%40group.calendar.google.com&amp;color=%231B887A&amp;src=digitellinc.com_t5fkr8ppa5otfskomol3e3a1e4%40group.calendar.google.com&amp;color=%235229A3&amp;src=digitellinc.com_j20h011ie34mt0erg3a6jud67k%40group.calendar.google.com&amp;color=%238C500B&amp;ctz=America%2FNew_York" style="border-width:0" width="100%" height="680" frameborder="0" scrolling="no"></iframe>'
            $("#eventsDisplay").html(html);
            getData();
            });
			    $('#agentCallBacks').lobiPanel({
			        minWidth: 900,
			        maxWidth: 900,
			        minHeight: 465,
			        maxHeight: 465,
			        editTitle: false,
			        close: false,
			        expand: false,
			        reload: false,
			        resize: 'none'
			    });
			    $('#clientList').lobiPanel({
			        sortable: true,
			        minWidth: 1500,
			        maxWidth: 1500,
			        minHeight: 650,
			        maxHeight: 650,
			        editTitle: false,
			        close: false,
			        expand: false,
			        reload: false,
			        resize: 'none'
			    });
			    $('#phoneLogPanel').lobiPanel({
			        sortable: true,
			        minWidth: 1500,
			        maxWidth: 1500,
			        minHeight: 600,
			        maxHeight: 600,
			        editTitle: false,
			        close: false,
			        expand: false,
			        reload: false,
			        resize: 'none',
			        unpin: false
			    });
			    $('#phoneLogger').on('onMaximize.lobiPanel', function (ev, lobiPanel) {
			    $('#phoneLogger').lobiPanel("setPosition", 40, 40);
			    });
			    $('#phoneLogger').lobiPanel({
			        minWidth: 600,
			        maxWidth: 600,
			        minHeight: 600,
			        maxHeight: 600,
			        editTitle: false,
			        close: false,
			        expand: false,
			        reload: false,
			        resize: 'none'
			    });
			    $('#contactsPanel').lobiPanel({
			        minWidth: 900,
			        maxWidth: 900,
			        minHeight: 600,
			        maxHeight: 600,
			        editTitle: false,
			        close: false,
			        expand: false,
			        reload: false,
			        resize: 'none'
			    });
			    $('#extPanel').lobiPanel({
			        minWidth: 500,
			        maxWidth: 500,
			        minHeight: 510,
			        maxHeight: 510,
			        editTitle: false,
			        close: false,
			        expand: false,
			        reload: false,
			        unpin: false,
			        resize: 'none'
			    });
			    $('#notesPanel').lobiPanel({
			        minWidth: 500,
			        maxWidth: 1500,
			        minHeight: 600,
			        maxHeight: 600,
			        editTitle: false,
			        close: false,
			        expand: false,
			        reload: false,
			        unpin: false,
			        resize: 'horizontal'
			    });
			    function phoneNote(d) {
			        // `d` is the original data object for the row
			        return '<table cellpadding = "5" cellspacing = "0" border = "0" style = "padding-left:50px;" >' +
			                '<tr>' +
			                '<td> Notes :  </td>' +
			                '<td>' + d.callNotes + '</td>' +
			                '</tr>' +
			                '</table>';
			    }
			    function getData() {
			        getNewLinks();
			        getSalesLinks();
			        getDemoLinks();
			        getMLinks();
			        getMVideos();
			        getMAssets();
			        getAdminLinks();
					getSupportLinks();
			        getLogisticsLinks();
			        getDevLinks();
			        getOSLinks();
			        getEventLinks();
			        getAccLinks();
			        getContacts();
			        getExt();
			        getNotes();
			        getOpusSites();
			        getCallBacks();
			        getPhoneLogs();
			    }
			    function getNewLinks() {
			        var newStart = moment().startOf('month').format("YYYY-MM-DD HH:mm:ss");
			        var newEnd = moment().endOf('month').format("YYYY-MM-DD HH:mm:ss");
			        var getData = {
			            'type': 'newLinks',
			            'newStart': newStart,
			            'newEnd': newEnd
			        };
			        $.get('./update', getData, function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var newTable = $('#newList').DataTable({
			                language: {
			                    searchPlaceholder: "New"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
			    function getSalesLinks() {
			        $.get('./update', 'type=salesLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '" > ' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var salesTable = $('#salesList').DataTable({
			                language: {
			                    searchPlaceholder: "Sales"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
			    function getDemoLinks() {
			        $.get('./update', 'type=demoLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '" > ' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var demoTable = $('#demoList').DataTable({
			                language: {
			                    searchPlaceholder: "Demo"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
			    function getMLinks() {
			        $.get('./update', 'type=mLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var mLinkTable = $('#mLinkList').DataTable({
			                language: {
			                    searchPlaceholder: "Marketing Links"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
				function getSupportLinks() {
			        $.get('./update', 'type=sLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var sLinkTable = $('#sLinkList').DataTable({
			                language: {
			                    searchPlaceholder: "Support Links"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
			    function getMVideos() {
			        $.get('./update', 'type=mVideos', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: ' URL ',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var mVideoTable = $('#mVideoList').DataTable({
			                language: {
			                    searchPlaceholder: "Marketing Videos"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
			    function getMAssets() {
			        $.get('./update', 'type=mAssets', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '">' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var mAssetTable = $('#mAssetList').DataTable({
			                language: {
			                    searchPlaceholder: "Marketing Assets"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: ' 540px ',
			                scrollCollapse: true,
			                order: [[1, ' desc ']]
			            });
			        });
			    }
			    function getAdminLinks() {
			        $.get('./update', 'type=adminLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = ' <a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a> ';
			                                return renderData;
			                            }
			                        }, {
			                            title: ' Description ',
			                            data: "linkDescription"
			                        }
			                    ];
			            var adminTable = $('#adminList').DataTable({
			                language: {
			                    searchPlaceholder: "Admin"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: ' 540px ',
			                scrollCollapse: true,
			                order: [[1, ' desc ']]
			            });
			        });
			    }
			    function getLogisticsLinks() {
			        $.get('./update', 'type=logLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var logisticsTable = $('#logisticsList').DataTable({
			                language: {
			                    searchPlaceholder: "Logistics"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
			    function getDevLinks() {
			        $.get('./update', 'type=devLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = ' <a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var devTable = $('#devList').DataTable({
			                language: {
			                    searchPlaceholder: "Dev"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
			    function getOSLinks() {
			        $.get('./update', 'type=osLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = ' <a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var osTable = $('#onSiteList').DataTable({
			                language: {
			                    searchPlaceholder: "OnSite"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, 'desc']]
			            });
			        });
			    }
			    function getEventLinks() {
			        $.get('./update', 'type=eventLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = '<a href = "' + url + '" target = "new" title = "' + desc + '" >' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: ' Description ',
			                            data: "linkDescription"
			                        }
			                    ];
			            var eventTable = $('#eventsList').DataTable({
			                language: {
			                    searchPlaceholder: "Events"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, ' desc ']]
			            });
			        });
			    }
			    function getAccLinks() {
			        $.get('./update', 'type=accLinks', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'URL',
			                            data: "linkURL",
			                            render: function (data, type, row, meta) {
			                                var url = row.linkURL;
			                                var name = row.linkName;
			                                var desc = row.linkDescription;
			                                var renderData = ' <a href = "' + url + '" target = "new" title = "' + desc + '" > ' + name + '</a>';
			                                return renderData;
			                            }
			                        }, {
			                            title: 'Description',
			                            data: "linkDescription"
			                        }
			                    ];
			            var accTable = $('#accountingList').DataTable({
			                language: {
			                    searchPlaceholder: "Accounting"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                pageLength: 14,
			                scrollY: '540px',
			                scrollCollapse: true,
			                order: [[1, ' desc ']]
			            });
			        });
			    }
			    function getContacts() {
			        $.get('./update', 'type=fetchContacts', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'Name',
			                            data: "contactName"
			                        }, {
			                            title: 'Title',
			                            data: "contactTitle"
			                        }, {
			                            title: 'Number',
			                            data: "contactNumber"
			                        }, {
			                            title: 'Call Reason',
			                            data: "callReason"
			                        }
			                    ];
			            var contactTable = $('#contactsList').DataTable({
			                language: {
			                    searchPlaceholder: "Contacts"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                bLengthChange: false,
			                paging: false,
			                pageLength: 100,
			                scrollY: '300px',
			                scrollCollapse: true,
			                order: [[1, ' desc ']]
			            });
			        });
			    }
			    function getNotes() {
			        var loginID = $("#userID").val();
			        var postData = {
			            'type': 'fetchNotes',
			            'loginID': loginID
			        };
			        $.get('./update', postData, function (data) {
			            var dataSet = JSON.parse(data);
			            $('#userNotes').val(dataSet[0].userNote);
			        });
			    }
			    function setNotes() {
			        var loginID = $("#userID").val();
			        var curNotes = $('#userNotes').val();
			        var postData = {
			            'type': 'setNotes',
			            'loginID': loginID,
			            'curNotes': curNotes
			        };
			        $.post('./update', postData, function (data) {
			        });
			    }
			    function getExt() {
			        $.get('./update', 'type=fetchExt', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            title: 'Name',
			                            data: "fullName"
			                        }, {
			                            title: 'Ext',
			                            data: "phoneExt"
			                        }
			                    ];
			            var extTable = $('#extList').DataTable({
			                language: {
			                    searchPlaceholder: "Extension"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
			                fixedHeader: true,
			                paging: false,
			                bLengthChange: false,
			                pageLength: 100,
			                scrollY: '300px',
			                scrollCollapse: true,
			                order: [[0, 'asc']]
			            });
			        });
			    }
			    function getPhoneLogs() {
			        $.get('./update', 'type=phoneLogs', function (data) {
			            var dataSet = JSON.parse(data);
			            var columnDefs =
			                    [{
			                            "className": 'details-control',
			                            "orderable": false,
			                            "data": null,
			                            "defaultContent": ''
			                        }, {
			                            title: 'Call Start',
			                            data: "callStart"
			                        }, {
			                            title: 'Call End',
			                            data: "callEnd"
			                        }, {
			                            title: 'Call Time',
			                            data: "callTime"
			                        }, {
			                            title: 'Agent',
			                            data: "userAgent"
			                        }, {
			                            title: 'Call Type',
			                            data: "callType"
			                        }, {
			                            title: 'Browser',
			                            data: "browserType"
			                        }, {
			                            title: 'Call Site',
			                            data: "callSite"
			                        }, {
			                            title: 'Call Tag',
			                            data: "callTag"
			                        }, {
			                            title: 'Event',
			                            data: "callEvent"
			                        }, {
			                            title: 'Caller',
			                            data: "callerName"
			                        }, {
			                            title: 'Caller Email',
			                            data: "callerEmail"
			                        }, {
			                            title: 'Caller Phone',
			                            data: "callerPhone"
			                        }, {
			                            title: 'Issue Type',
			                            data: "issueType"
			                        }, {
			                            title: 'Resolution',
			                            data: "callResolution"
			                        }
			                    ];
			            var phoneTable = $('#supportTable').DataTable({
			                language: {
			                    searchPlaceholder: "Logs"
			                },
			                data: dataSet, // data from above
			                columns: columnDefs, // columns from above
                                        dom: 'Bfrtip',
			                fixedHeader: true,
			                pageLength: 50,
			                scrollY: '220px',
			                scrollCollapse: true,
			                order: [[1, 'desc']],
                                        buttons : [{
							text : 'Refresh',
							action : function (e, dt, node, config) {
								$("#supportTable").DataTable().destroy();
								setTimeout(function () {
									getPhoneLogs();
								}, 1000);
							},
							className : 'btn-xs'
						}
					]
			            });
			            $('#callerEmail').keyup(function () {
			                phoneTable.search($(this).val()).draw();
			            });
			        });
			    }
			    function fetchOpus() {
			        var postData = {
			            'type': 'opusFetch'
			        };
			        $.get('./update', postData).done(function (data) {
			        });
			    }
			    function getOpusSites() {
			        var postData = {
			            'type': 'getOpus'
			        };
			        $.get('./update', postData).done(function (data) {
			            var sites = JSON.parse(data);
			            var clientEditor = new $.fn.dataTable.Editor({
			                ajax: "./client",
			                table: "#sites-list",
			                idSrc: 'id',
			                fields: [{
			                        label: "Login",
			                        name: "hostedSite"
			                    }, {
			                        label: "Opus",
			                        name: "clientOpus",
			                        type: "select",
			                        options: [
			                            "Y",
			                            "N"
			                        ]
			                    }, {
			                        label: "Acronymn",
			                        name: "clientAcro"
			                    }, {
			                        label: "Name",
			                        name: "clientName"
			                    }, {
			                        label: "Site",
			                        name: "clientSite"
			                    }, {
			                        label: "Contact",
			                        name: "siteContact"
			                    }, {
			                        label: "AM/PM",
			                        name: "clientAMPM"
			                    }, {
			                        label: "Active",
			                        name: "clientActive",
			                        type: "select",
			                        options: [
			                            "Y",
			                            "N"
			                        ]
			                    }, {
			                        label: "SSO",
			                        name: "clientSSO",
			                        type: "select",
			                        options: [
			                            "Y",
			                            "N"
			                        ]
			                    }, {
			                        label: "Evals",
			                        name: "digiEvals",
			                        type: "select",
			                        options: [
			                            "Y",
			                            "N"
			                        ]
			                    }, {
			                        label: "Member",
			                        name: "memberCheck",
			                        type: "select",
			                        options: [
			                            "Y",
			                            "N"
			                        ]
			                    }, {
			                        label: "Code",
			                        name: "memberCode"
			                    }, {
			                        label: "Refunds",
			                        name: "digiRefunds",
			                        type: "select",
			                        options: [
			                            "Y",
			                            "N"
			                        ]
			                    }, {
			                        label: "Orders",
			                        name: "digiPhoneOrder",
			                        type: "select",
			                        options: [
			                            "Y",
			                            "N"
			                        ]
			                    }
			                ]
			            });
			            var sitesTable = $('#sites-list').DataTable({
			                language: {
			                    searchPlaceholder: "Sites"
			                },
			                dom: 'Bfrtip',
			                data: sites,
			                columns: [{
			                        data: ' hostedSite ',
			                        name: ' hostedSite ',
			                        title: ' Login ',
			                        className: ' center ',
			                        orderable: false,
			                        render: function (data, type, row, meta) {
			                            var url = 'http : //' + row.hostedSite + '/' + row.clientAcro + '/opus/login';
			var renderData = '<button type="button" class="btn-xs btn-primary login-btn" url="' + url + '">Login</button>';
		return renderData;
	}
	}, {
		data : 'clientOpus',
		title : 'Opus'
	}, {
		data : 'clientAcro',
		title : 'Acronymn'
	}, {
		data : 'clientName',
		title : 'Name'
	}, {
		data : 'clientSite',
		title : 'Site'
	}, {
		data : 'siteContact',
		title : 'Contact'
	}, {
		data : 'clientAMPM',
		title : 'AM/PM'
	}, {
		data : 'clientActive',
		title : 'Active'
	}, {
		data : 'clientSSO',
		title : 'SSO'
	}, {
		data : 'digiEvals',
		title : 'Evals'
	}, {
		data : 'memberCheck',
		title : 'Members'
	}, {
		data : 'memberCode',
		title : 'Code'
	}, {
		data : 'digiRefunds',
		title : 'Refunds'
	}, {
		data : 'digiPhoneOrder',
		title : 'Orders'
	}
		],
		buttons : [{
				extend : "create",
				text : 'Add Client',
				className : 'btn-xs',
				editor : clientEditor
			}
		],
		fixedHeader : true,
		pageLength : 200,
		scrollY : '400px',
		pagingType : 'full_numbers',
		processing : true
		});
		$('#sites-list').on('click', 'tbody td:not(:first-child)', function (e) {
			clientEditor.inline(this, {
				onBlur : 'submit'
			});
		});
		$('button.login-btn').click(function () {
			new_window = window.open($(this).attr('url'));
		});
		var sTable = $('#sites-list').DataTable();
		$('#callTag').keyup(function () {
			sitesTable.search($(this).val()).draw();
		});
		});
		}
		function getCallBacks() {
			var loginID = $("#userID").val();
			var postData = {
				'type' : 'getCallBacks',
				'loginID' : loginID
			};
			$.get('./update', postData).done(function (data) {
				var callBackData = JSON.parse(data);
				var callEditor = new $.fn.dataTable.Editor({
						ajax : "./callback",
						table : "#callBackList",
						idSrc : 'id',
						fields : [{
								label : "Called",
								name : "userCalled",
								type : "select",
								options : [
									'true',
									'false'
								]
							}, {
								label : "Caller",
								name : "callerName"
							}, {
								label : "Phone",
								name : "callerPhone"
							}, {
								label : "Email",
								name : "callerEmail"
							}, {
								label : "Browser",
								name : "browserType",
								type : "select",
								options : [
									'Chrome',
									'IE/Edge',
									'Firefox',
									'iPhone/iPad',
									'Android'
								]
							}, {
								label : "Tag",
								name : "callTag"
							}, {
								label : "Notes",
								name : "callNotes"
							}
						]
					});
				$('#callBackList').DataTable({
					language : {
						searchPlaceholder : "Call Backs"
					},
					dom : 'Brti',
					data : callBackData,
					columns : [{
							data : 'userCalled',
							title : 'Called'
						}, {
							data : 'callerName',
							title : 'Caller'
						}, {
							data : 'callerPhone',
							title : 'Phone'
						}, {
							data : 'callerEmail',
							title : 'Email'
						}, {
							data : 'browserType',
							title : 'Browser'
						}, {
							data : 'callTag',
							title : 'Tag'
						}, {
							data : 'callNotes',
							title : 'Notes'
						}
					],
					fixedHeader : true,
					pageLength : 300,
					scrollY : '310px',
					pagingType : 'full_numbers',
					processing : true,
					buttons : [{
							text : 'Refresh',
							action : function (e, dt, node, config) {
								$("#callBackList").DataTable().destroy();
								setTimeout(function () {
									getCallBacks();
								}, 1000);
							},
							className : 'btn-xs'
						}
					]
				});
				$('#callBackList').on('click', 'tbody td', function (e) {
					callEditor.inline(this, {
						onBlur : 'submit'
					});
				});
			});
		}
		var leftTabHeight = $("#marketingTabcontent").height();
		$("#marketingTabs").height(leftTabHeight);
		var themes = {
			"slate" : "/assets/themes/slate/bootstrap.min.css",
			"spacelab" : "/assets/themes/spacelab/bootstrap.min.css"

		};
		var themesheet = $('<link href="' + themes['spacelab'] + '" rel="stylesheet" />');
		var customCSS = $('<link rel="stylesheet" href="/assets/css/bootstrap.vertical-tabs.min.css"><link rel="stylesheet" href="/assets/css/dashboard.css">');
		themesheet.appendTo('head');
		customCSS.appendTo('head');
		$("#loggerStart").click(function () {
			var timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
			$("#loggerStart").val(timestamp);
			$("#loggerStart").text(timestamp);
		});
		$("#loggerSubmit").click(function () {
			doLog();
			$("#callBackList").DataTable().destroy();
			$("#supportTable").DataTable().destroy();
			setTimeout(function () {
				getPhoneLogs();
				getCallBacks();
			}, 1000);
		});
		$("#punchButton").click(function () {
			doPunch();
		});
		$('#supportTable').on('click', 'td.details-control', function () {
			var tr = $(this).closest('tr');
			var row = $('#supportTable').DataTable().row(tr);
			if (row.child.isShown()) {
				row.child.hide();
				tr.removeClass('shown');
			} else {
				row.child(phoneNote(row.data())).show();
				tr.addClass('shown');
			}
		});
		$('#signIn').modal({
			backdrop : 'static',
			keyboard : false
		});
		$("#loggerLiveEvent").datepicker({
			autoclose : true
		});
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var target = $(e.target).attr("href");
			if (target === '#CE') {}
			if (target === '#New') {
				$('#newList').DataTable().draw();
			}
			if (target === '#Sales') {
				$('#salesList').DataTable().draw();
			}
			if (target === '#Demo') {
				$('#demoList').DataTable().draw();
			}
			if (target === '#Marketing') {
				$('#mLinkList').DataTable().draw();
			}
			if (target === '#marketingLinks') {
				$('#mLinkList').DataTable().draw();
			}
			if (target === '#marketingVideos') {
				$('#mVideoList').DataTable().draw();
			}
			if (target === '#marketingAssets') {
				$('#mAssetList').DataTable().draw();
			}
			if (target === '#Admin') {
				$('#adminList').DataTable().draw();
			}
			if (target === '#Logistics') {
				$('#logisticsList').DataTable().draw();
			}
			if (target === '#Dev') {
				$('#devList').DataTable().draw();
			}
			if (target === '#On-Site') {
				$('#onSiteList').DataTable().draw();
			}
			if (target === '#Events') {
				$('#eventsList').DataTable().draw();
			}
			if (target === '#supportLinks') {
				$('#sLinkList').DataTable().draw();
			}
			if (target === '#supportTools') {
				$('#sites-list').DataTable().draw();
				$('#supportTable').DataTable().draw();
				$('#callBackList').DataTable().draw();
			}
			if (target === '#Accounting') {
				$('#accountingList').DataTable().draw();
			}
			if (target === '#Contacts') {
				$('#contactsList').DataTable().draw();
				$('#extList').DataTable().draw();
			}
		});
		$('#userNotes').blur(function () {
			setNotes();
		});
		$('#clientList').on('onUnpin.lobiPanel', function () {
			$('#sites-list').DataTable().draw();
		});
		$('#clientList').on('onPin.lobiPanel', function () {
			$('#sites-list').DataTable().draw();
		});
		$('#extPanel').lobiPanel('unpin');
		$('#extPanel').lobiPanel('toggleMinimize');
		$('#extPanel').on('onMaximize.lobiPanel', function () {
			if (!$('#notesPanel').lobiPanel('isMinimized')) {
				$('#notesPanel').lobiPanel('toggleMinimize');
			}
			var topPos = $(document).scrollTop() + 200;
			$('#extPanel').lobiPanel("setPosition", 60, topPos);
		});
		$('#notesPanel').lobiPanel('unpin');
		$('#notesPanel').lobiPanel('toggleMinimize');
		$('#notesPanel').on('onMaximize.lobiPanel', function () {
			if (!$('#extPanel').lobiPanel('isMinimized')) {
				$('#extPanel').lobiPanel('toggleMinimize');
			}
			var topPos = $(document).scrollTop() + 200;
			$('#notesPanel').lobiPanel("setPosition", 60, topPos);
                        $('#notesPanel').lobiPanel("enableResize");
		});

		});
