var commit;
$(document).ready(function() {
		getGitRepo("https://api.github.com/repos/ucam-cl-dtg/urop-2013-dashboard");
		getGitRepo("https://api.github.com/repos/ucam-cl-dtg/urop-2013-signups");
		getGitRepo("https://api.github.com/repos/ucam-cl-dtg/urop-2013-questions");
		getGitRepo("https://api.github.com/repos/ucam-cl-dtg/urop-2013-handins");
});
function getLastCommit(data){
	var url = data.url + '/commits';
	$.ajax({
		url: url,
		success: function (commits){
			displayRepo(data, commits[0]);
		},
		error: function () {
			var commit = {"url": "#", "message": "Could not get commit information", 
				"commiter":{"name": ""}};
			displayRepo(data, commit);
		}
		});	
}
function displayRepo(data, commit){
	$(".repo-links").append(
		'<div class="panel text-left">' +
		'<p><i class="icon icon-git pad-icon"></i>' +
		'<a href="'+ data.html_url + '"><strong>[' + data.name + ']</strong></a>' +
		'<i class="icon icon-clock pad-icon"></i><strong>Last updated: </strong>' + data.updated_at + '<br/>' +
		'<em>' + data.description + '</em><br/>' +
		'<i class="icon icon-signin pad-icon"></i><strong>Last commit: </strong>' +
		'<a href="' + commit.html_url +'">'+ commit.commit.message + '</a> <em>- by ' + 
		'<a href="' + commit.committer.html_url + '">'+ commit.commit.committer.name +'</a></em>' +
		'</p></div>'		
		);
}
function displayRepoLinks(){
	$(".repo-links").html(
		'<div class="dashboard-git">[Dashboard]<a href="https://github.com/ucam-cl-dtg/urop-2013-dashboard/"> https://github.com/ucam-cl-dtg/urop-2013-dashboard/</a></div>' +
		'<div class="signups-git">[Timetable/Signups]<a href="https://github.com/ucam-cl-dtg/urop-2013-signups/"> https://github.com/ucam-cl-dtg/urop-2013-signups/</a></div>' +
		'<div class="questions-git">[Setting Work]<a href="https://github.com/ucam-cl-dtg/urop-2013-questions/"> https://github.com/ucam-cl-dtg/urop-2013-questions/</a></div>' +
		'<div class="handins-git">[Marking Work]<a href="https://github.com/ucam-cl-dtg/urop-2013-handins/"> https://github.com/ucam-cl-dtg/urop-2013-handins/</a></div>');
}
function getGitRepo(url) {
	$.ajax({
		url: url,
		success: function (data){
			getLastCommit(data);
		},
		error: function () {
			displayRepoLinks();
		}
		});
}

