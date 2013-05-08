$(document).ready(function() {
	Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
	var Book = Parse.Object.extend("Book");
	var Comment = Parse.Object.extend("Comment");
	var query = new Parse.Query(Book);
	query.equalTo("title", $("#title").text());
	
	query.first({
		success: function(object){
		$(function(){
		//Currently doesn't change when you add a rating until the page is refreshed
		$("#avgRatingInfo").html("Average: "+Math.round(object.get("avgRating")*10)/10+", based on "+object.get("numRatings")+" votes");
		$("#title").html(object.get("title"));
		$("#genre").html("Genre: "+object.get("genre"));
		$("#synopsis").html(object.get("synopsis"));
		for (var i = 0; i<object.get("comments").length; i++){
			var commentQuery = new Parse.Query(Comment);
			commentQuery.get(object.get("comments")[i].id, {
				success: function(comment){
				console.log(comment);
					$("#comments").prepend("<div class='comment'><b><a href='profile.html?username="+(comment.get("author"))+"'>"+comment.get("author")+"</a>:</b> "+comment.get("text")+"</div>");
				},
				error: function(object, error) {
					alert("Error: "+error.message);
				}
				});
			
		}
		if (Parse.User.current() === null){
			$("#logout").replaceWith("<a href='login.html' id='logout' class='navBar'>Log In</a>");
			$("#addToShelf").replaceWith("");
			$("#recommend").replaceWith("");
			$("#commentform").replaceWith("Please <a style='color: #0000FF' href='login.html'>log in</a> to add a comment.");
		} else {
		}
		$(".rateBook").flexibleStars({
			init: object.get("avgRating"),
			doRate: "#rating",
			gold: "sprite-gold-star",
			silver: "sprite-silver-star",
			half: "sprite-half-star",
			url: "/flexible-stars/example/handler/"
		});
	});
	

	// HANNAHDORF! FILL IN YOUR RATINGS CODE, GIRL! :D
	
	$("#addToShelf").click(function(){
		var user = Parse.User.current();
		var shouldAdd = confirm("Add this book to your reading list?");
		if (shouldAdd){
			user.addUnique("goingToRead", object.get("title"));
			user.set("read", user.get("read"));
			user.set("username", user.get("username"));
			user.set("friends", user.get("friends"));
			user.set("reading", user.get("reading"));
			user.save();
			alert(object.get("title")+" added to reading list.");
		};
	});
	
	$("#recommend").click(function(){
		$("#chooseFriends").dialog("open");
	});
	
	$("#addComment").click(function(){
		if($('#commentForm').val() != ""){
		var comment = $("#commentForm").val();
		// Really terrible way of sanitizing inputs. Don't want people to hack us via comments, yo.
		comment = comment.replace(/\$\(/g, ' ');
		comment = comment.replace(/\</g, ' ');
		comment = comment.replace(/\>/g, ' ');
		comment = comment.replace(/\r\n/g, "</p><p>");
		comment = comment.replace(/\n/g, "<br/>");
		commentObj = new Comment();
		commentObj.set("author", Parse.User.current().get("username"));
		commentObj.set("text", comment);
		if (object.get("comments")){
			object.add("comments", commentObj);
		} else {
			object.set("comments", [commentObj]);
		}
		commentObj.save();
		object.save();
		$('#comments').prepend("<div class='comment'><b>"+Parse.User.current().get("username")+":</b> "+comment+"</div>");
		$('#commentForm').val("");
		}
	});

 $(function() {	
 $("#chooseFriends").dialog({
	autoOpen: false,
	height: 300,
	width: 350,
	modal: true,
	buttons: {
		"Recommend": function() {
			var shouldRecommend = confirm("Are you sure?");
			if (shouldRecommend){
				$(this).dialog("close");
				$('#chooseFriends').find(':checked').each(function() {
					$(this).removeAttr('checked');
				});
				alert("Recommended.");
			}
		},
		"Cancel": function() {
			$(this).dialog("close");
			$('#chooseFriends').find(':checked').each(function() {
				$(this).removeAttr('checked');
			});
		},
		
	}
	});
});
		},
		error: function(error){
			alert("Error: "+error.message);
		}
	});
	
	

});