$(document).ready(function() {
	Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
	var Book = Parse.Object.extend("Book");
	var Rating = Parse.Object.extend("Rating");
	var Comment = Parse.Object.extend("Comment");
	var Recommendation = Parse.Object.extend("Recommendation");
	var yourRating = 0;
	var query = new Parse.Query(Book);
	var rated = false;
	//var bookRatings;
	query.equalTo("title", $("#title").text());
	
	console.log("oh man I sure am a comment");
	var recommendDiv = "";
	var friendsList = Parse.User.current().get("friends");
	for (i = 0; i < friendsList.length; i++){
		recommendDiv += "<input type='checkbox' id='"+friendsList[i]+"'>"+friendsList[i]+"</input></br>"
	}
	recommendDiv += ""
	$("#chooseFriends").html(recommendDiv);
	console.log(recommendDiv);
		
	
	query.first({
		success: function(object){
		$(function(){
		var bookRatings = object.get("ratings");
		//console.log(object.get("ratings"));
		var displayedRating = object.get("avgRating");
		//outerloop:
		console.log("guacamole");
		for(var i = 0; i < bookRatings.length; i++){
			userRatingQuery = new Parse.Query(Rating);
			userRatingQuery.get(bookRatings[i].id, {
				success: function(r){
					if(r.get("username") === Parse.User.current().get("username")){
						yourRating = r.get("rating");
						rated = true;
						console.log("HELLO!"+rated);
						updateRatingInfo();
						//break outerloop;
						return
					}
				}
			});
		}
		console.log("yo bucket");
		console.log(rated);
		updateRatingInfo();

		//Currently doesn't change when you add a rating until the page is refreshed
		//$("#avgRatingInfo").html("Your Rating: "+ yourRating+ "<br>Average: "+Math.round(object.get("avgRating")*10)/10+", based on "+object.get("numRatings")+" votes");
		$("#title").html(object.get("title"));
		$("#genre").html("Genre: "+object.get("genre"));
		$("#synopsis").html(object.get("synopsis"));

		//console.log("HI!"+displayedRating);

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
			init: displayedRating,
			doRate: "#rating",
			gold: "sprite-gold-star",
			silver: "sprite-silver-star",
			half: "sprite-half-star",
			url: "/flexible-stars/example/handler/"
		});
	});
	
	function updateRatingInfo(){
		$('#avgRatingInfo').empty();
		$("#avgRatingInfo").html("Your Rating: "+ yourRating+ "<br>Average: "+Math.round(object.get("avgRating")*10)/10+", based on "+object.get("numRatings")+" votes");
	}

	function changedRating(){
		console.log("HI!!!"+rated);
		var bookRatings = object.get("ratings");
		if(rated === true){
			for(var i = 0; i < bookRatings.length; i++){
			userRatingQuery = new Parse.Query(Rating);
			userRatingQuery.get(bookRatings[i].id, {
				success: function(r){
					if(r.get("username") === Parse.User.current().get("username")){
						var totalRating = object.get("avgRating")*object.get("numRatings");
						//console.log("totalRating" + totalRating);
						totalRating = totalRating - r.get("rating");
						//console.log("totalRating Changed " + totalRating);
						object.set("avgRating", (parseInt($("#rating").val())+totalRating)/object.get("numRatings"));
						//console.log("avgRating" + object.get("avgRating"));
						r.set("rating", parseInt($("#rating").val()));
						r.save();
						yourRating = parseInt($("#rating").val());
						//console.log("HELLO!!! "+yourRating);
						updateRatingInfo();
					}
				}
			});
			}
		}

		else if (rated === false && $("#rating").val() != ""){
			var totalRating = object.get("avgRating")*object.get("numRatings");
			object.set("numRatings", object.get("numRatings") + 1);
			var userRating = new Rating();
			userRating.set("username", Parse.User.current().get("username"));
			userRating.set("rating", parseInt($("#rating").val()));
			userRating.save();

			yourRating = parseInt($("#rating").val());

			object.addUnique("ratings", userRating);
			object.set("avgRating", (parseInt($("#rating").val())+totalRating)/object.get("numRatings"));
			object.save();
			updateRatingInfo();
		}
	}

	$("#rate").click(function(){
		var bookRatings = object.get("ratings");
		for(var i = 0; i < bookRatings.length; i++){
			userRatingQuery = new Parse.Query(Rating);
			userRatingQuery.get(bookRatings[i].id, {
				success: function(r){
					if(r.get("username") === Parse.User.current().get("username")){
						rated = true;
						console.log("rated"+rated);
						return
					}
				}
			});
		}
		setTimeout(function(){changedRating()},300);
	});
	
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
				$('#chooseFriends').find(':checked').each(function() {
					console.log("please send some recs person");
					friend = this.id;
					var rec = new Recommendation();
					console.log(Parse.User.current().get("username"));
					rec.set("recommendedBy", Parse.User.current().id);
					rec.set("title", $("#title"));
					rec.set("recommendedTo", friend)
					rec.save();
					$(this).removeAttr('checked');
				});
			}
			return false;
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