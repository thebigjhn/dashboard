function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    var name = profile.getName();
    var email = profile.getEmail();
    var emailSuffix = email.toString().split("@");
    var postData = {
        'email': email,
        'type': 'login',
        'userName': name,
        'googleToken': id_token
    };
    $.post('./update', postData, function (data) {
        var user = JSON.parse(data);
        var loginID = user[0].loginID;
        $("#userID").val(loginID);
        var aStat = user[0].aStatus;
        if (aStat === "0") {
            var timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
            var logData = {
                'type': 'access',
                'email': email,
                'userName': name,
                'timestamp': timestamp
            };
            $.post('./update', logData);
            window.location = "./access";
            return;
        } else {
            $(document).trigger('loadComplete');
            renderA(aStat);
            punchStatus(user);
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
    auth2.signOut().then(function () {});
}
function renderA(aStat) {
    $('#aBody').show();
}
function getUser() {
    var loginID = $("#userID").val();
    postData = {
        'type': 'userFetch',
        'loginID': loginID
    };
    $.get('./update', postData, function (data) {
        var user = JSON.parse(data);
        punchStatus(user);
    });
}
function doPunch() {
    var loginID = $("#userID").val();
    var postData = {
        'type': 'userFetch',
        'loginID': loginID
    };
    $.get('./update', postData).done(function (data) {
        var user = JSON.parse(data);
        parsePunch(user);
    });
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
        'type': 'updatePunch',
        'loginID': loginID,
        'punchID': punchID,
        'punchStatus': inOUT,
        'email': userEmail,
        'lastPunch': timestamp,
        'timeBlock': timeBlock
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
    $("#addPunchDate").datetimepicker({
        inline: true,
        sideBySide: true
    });
    $(document).on('loadComplete', function () {
        getData();
    });
    $("#punchButton").click(function () {
        doPunch();
    });
    function getData() {
        getLinkList();
        getPunchedIn();
        getUsers();
    }
    function getPunches() {

    }
    function getUsers() {
        var postData = {
            'type': 'fetchUsers'
        };
        $.get('./update', postData).done(function (data) {
            var usersJSON = JSON.parse(data);
            var users = [];
            for (var x in usersJSON) {
                users.push({
                    id: x,
                    text: usersJSON[x].userEmail
                });
            }
            $("#punchEmail").select2({
                data: users,
                placeholder: "Email"
            });
        });
    }
    function getLinkList() {
        var postData = {
            'type': 'linkList'
        };
        $.get('./update', postData).done(function (data) {
            var links = JSON.parse(data);
            var linkEditor = new $.fn.dataTable.Editor({
                ajax: "./links",
                table: "#linkList",
                idSrc: 'id',
                fields: [{
                        label: "Name",
                        name: "linkName"
                    }, {
                        label: "URL",
                        name: "linkURL"
                    }, {
                        label: "Type",
                        name: "linkType",
                        type: "select",
                        options: [
                            "Accounting",
                            "Admin",
                            "Demo",
                            "Dev",
                            "Events",
                            "Logistics",
                            "MarketAssets",
                            "MarketLink",
                            "MarketVideo",
							"Support",
                            "OnSite",
                            "Sales"
                        ]
                    }, {
                        label: "Description",
                        name: "linkDescription"
                    }
                ]
            });
            var linksTable = $('#linkList').DataTable({
                language: {
                    searchPlaceholder: "Links"
                },
                dom: 'Bfrtip',
                data: links,
                columns: [{
                        data: null,
                        defaultContent: '',
                        className: 'select-checkbox',
                        orderable: false
                    }, {
                        data: 'linkName',
                        title: 'Name'
                    }, {
                        data: 'linkURL',
                        title: 'URL'
                    }, {
                        data: 'linkType',
                        title: 'Type'
                    }, {
                        data: 'linkDescription',
                        title: 'Description'
                    }
                ],
                select: {
                    style: 'os',
                    selector: 'td:first-child'
                },
                buttons: [{
                        extend: "create",
                        text: 'Add Link',
                        className: 'btn-xs',
                        editor: linkEditor
                    }, {
                        extend: "remove",
                        className: 'btn-xs',
                        editor: linkEditor
                    }
                ],
                fixedHeader: true,
                pageLength: 400,
                scrollY: '500px',
                pagingType: 'full_numbers',
                processing: true
            });
            $('#linkList').on('click', 'tbody td:not(:first-child)', function (e) {
                linkEditor.inline(this, {
                    onBlur: 'submit'
                });
            });
        });
    }
    function getPunchedIn() {
        $.get('./update', 'type=fetchPunchedIn', function (data) {
            var punchedIn = JSON.parse(data);
            var columnDefs =
                    [{
                            title: 'User',
                            data: "userEmail"
                        }, {
                            title: 'Punched In',
                            data: "punchIN"
                        }
                    ];
            var punchedInTable = $('#punchedInList').DataTable({
                dom: 'Bfrtip',
                language: {
                    searchPlaceholder: "User"
                },
                data: punchedIn, // data from above
                columns: columnDefs, // columns from above
                fixedHeader: true,
                buttons: [{
                        text: 'Refresh',
                        action: function (e, dt, node, config) {
                            $("#punchedInList").DataTable().destroy();
                            setTimeout(function () {
                                getPunchedIn();
                            }, 1000);
                        },
                        className: 'btn-xs'
                    }
                ],
                bLengthChange: false,
                paging: false,
                pageLength: 100,
                scrollY: ' 300px',
                scrollCollapse: true,
                order: [[1, 'desc']]
            });
        });
    }
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if (target === '#TC') {
        }
        if (target === '#Links') {
            $('#linkList').DataTable().draw();
        }
        if (target === '#Labor') {
            $('#').DataTable().draw();
        }
        if (target === '#Events') {
            $('#').DataTable().draw();
        }
    });
});
