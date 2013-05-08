Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
var user = Parse.User.current();
var Book = Parse.Object.extend("Book");
var Recommendation = Parse.Object.extend("Recommendation");

$(document).ready(function(){
  $("#profileLink").attr("href",'profile.html?username='+Parse.User.current().get("username"));
});

$(function() {
	if (Parse.User.current() === null){
		$(".content").replaceWith("You need to <a href='login.html'>log in</a> to use this feature.");
	}
	else{
		var Recommendation = Parse.Object.extend("Recommendation");
		console.log(user.get("username"));
		var query = new Parse.Query(Parse.User);
		query.get(user.id, {
			success: function(thing){
			console.log(thing);
			console.log(thing.get("username"));
			},
			});

		if (user.get("reading")){
		var readingQuery = new Parse.Query(Book);
		for (var i = 0; i < user.get("reading").length; i++){
			var book = readingQuery.equalTo("title", user.get("reading")[i]);
			book.first({
				success: function(object){
					$("#reading").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='done' id="+object.get("url")+" onClick='markDone(this.id)'>Done Reading</button></br></div>");
				},
			});
		}
		} 
		if (user.get("goingToRead").length > 0){
		console.log(user.get("goingToRead"));
		var goingToReadQuery = new Parse.Query(Book);
		for (var i = 0; i < user.get("goingToRead").length; i++){
			var book = goingToReadQuery.equalTo("title", user.get("goingToRead")[i]);
			book.first({
				success: function(object){
					$("#goingToRead").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='currentlyReading' id="+object.get('url')+" onClick='markReading(this.id)'>Currently Reading</button></br></div>");
				},
			});
		}
		}
		if (user.get("read")){
		var readQuery = new Parse.Query(Book);
		for (var i = 0; i < user.get("read").length; i++){
			var book = readQuery.equalTo("title", user.get("read")[i]);
			book.first({
				success: function(object){
					$("#alreadyRead").append("<div id='"+object.get('url')+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a></br></div>");
				},
			});
		}
		} 
		var recQuery = new Parse.Query(Recommendation);
		recQuery.equalTo("recommendedTo", user.id);
		recQuery.find({
			success: function(thing){
				console.log(thing)
				for (var i=0; i < thing.length; i++){
					console.log(thing[i].get("title"));
					var bookQuery = new Parse.Query(Book);
					var book = bookQuery.equalTo("title", thing[i].get("title"));
					book.first({
					success: function(object){
						$("#recommended").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='goingToRead' id="+object.get('url')+" onClick='markGoingToRead(this.id)'>I'll Read It!</button><button type='button' class='ignoreRec' id="+object.get('url')+" onClick='ignoreRec(this.id)'>No Thanks</button></br></div>");
					},
					});
				}
			},
		});
	}
	

});


		function markReading(id){
			console.log(user.get("username"));
			var goingToReadQuery = new Parse.Query(Book);
			var book = goingToReadQuery.equalTo("url", id);
			book.first({
				success: function(object){
					console.log(user.get("username"));
					$("#"+object.get("url")+"div").remove();
					console.log(user.get("username"));
					user.addUnique("reading", object.get("title"));
					user.remove("goingToRead", object.get("title"));
					user.set("read", user.get("read"));
					user.set("username", user.get("username"));
					user.set("friends", user.get("friends"));
					user.set("liked", currentUser.get("liked"));
					user.set("userpic", currentUser.get("userpic"));
					user.save();
					$("#reading").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='done' id="+object.get("url")+" onClick='markDone(this.id)'>Done Reading</button></br></div>");
				}
			});
		}
		
		function markDone(id){
			console.log(id);
			var readingQuery = new Parse.Query(Book);
			var book = readingQuery.equalTo("url", id);
			book.first({
				success: function(object){
					console.log(object.get("url"));
					$("#"+object.get("url")+"div").remove();
					user.addUnique("read", object.get("title"));
					user.remove("reading", object.get("title"));
					user.set("goingToRead", user.get("goingToRead"));
					user.set("username", user.get("username"));
					user.set("friends", user.get("friends"));
					user.set("liked", currentUser.get("liked"));
					user.set("userpic", currentUser.get("userpic"));					
					user.save();
					$("#alreadyRead").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a></br></div>");
				}
			});
		}
		
		function markGoingToRead(id){
			console.log(id);
			var readingQuery = new Parse.Query(Book);
			var book = readingQuery.equalTo("url", id);
			book.first({
				success: function(object){
					console.log(object.get("url"));
					$("#"+object.get("url")+"div").remove();
					user.addUnique("goingToRead", object.get("title"));
					user.set("read", user.get("read"));
					user.set("reading", user.get("reading"));
					user.set("username", user.get("username"));
					user.set("friends", user.get("friends"));
					user.set("liked", currentUser.get("liked"));
					user.set("userpic", currentUser.get("userpic"));	
					var recQuery = new Parse.Query(Recommendation);
					recQuery.equalTo("title", object.get("title"));
					recQuery.equalTo("recommendedTo", user.id);
					recQuery.first({
						success: function(rec){
							rec.destroy();
						},
					});
					user.save();
					$("#goingToRead").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='currentlyReading' id="+object.get('url')+" onClick='markReading(this.id)'>Currently Reading</button></br></div>");
				}
			});
		}
		
		function ignoreRec(id){
			console.log(id);
			var readingQuery = new Parse.Query(Book);
			var book = readingQuery.equalTo("url", id);
			book.first({
				success: function(object){
					console.log(object.get("url"));
					$("#"+object.get("url")+"div").remove();
				}
			});
			var recQuery = new Parse.Query(Recommendation);
				recQuery.equalTo("title", object.get("title"));
				recQuery.equalTo("recommendedTo", user.id);
				recQuery.first({
					success: function(rec){
						rec.destroy();
					},
				});
		}
