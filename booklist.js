$(function() {
	Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
	if (Parse.User.current() === null){
		$(".content").replaceWith("You need to <a href='login.html'>log in</a> to use this feature.");
	}
	else{
		var user = Parse.User.current();
		var Book = Parse.Object.extend("Book");
		
		if (user.get("reading")){
		for (var i = 0; i < user.get("reading").length; i++){
			var readingQuery = new Parse.Query(Book);
			var book = readingQuery.equalTo("title", user.get("reading")[i]);
			book.first({
				success: function(object){
					$("#reading").append("<a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='done' id="+object.get("url")+">Done Reading</button></br>");
				},
			});
		}
		} 
		if (user.get("goingToRead")){
		for (var i = 0; i < user.get("goingToRead").length; i++){
			var goingToReadQuery = new Parse.Query(Book);
			var book = goingToReadQuery.equalTo("title", user.get("goingToRead")[i]);
			book.first({
				success: function(object){
					$("#goingToRead").append("<a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='currentlyreading' id="+object.get("url")+">Currently Reading</button></br>");
				},
			});
		}
		}
		if (user.get("read")){
		for (var i = 0; i < user.get("read").length; i++){
			var readQuery = new Parse.Query(Book);
			var book = readQuery.equalTo("title", user.get("read")[i]);
			book.first({
				success: function(object){
					$("#alreadyRead").append("<a href='"+object.get("url")+".html' class='listedBook'>"+object.get("url")+" by "+object.get("author")+"</a></br>");
				},
			});
		}
		} 
	
		$(document).ready($(".currentlyreading")).click(function(){
			console.log(this.activeElement);
			console.log(this.activeElement.id);
			var goingToReadQuery = new Parse.Query(Book);
			var book = goingToReadQuery.equalTo("url", this.activeElement.id);
			book.first({
				success: function(object){
					user.addUnique("reading", object);
					user.remove("goingToRead", object);
					user.save();
					$("#reading").append("<a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='done' id="+object.get("title")+">Done Reading</button></br>");
					if (user.get("goingToRead")){
					for (var i = 0; i < user.get("goingToRead").length; i++){
					var goingToReadQuery = new Parse.Query(Book);
					var book = goingToReadQuery.equalTo("title", user.get("goingToRead")[i]);
					book.first({
						success: function(object){
							$("#goingToRead").append("<a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='currentlyreading' id="+object.get("url")+">Currently Reading</button></br>");
						},
					});
					}
					}
				}
			});
		});
	
	}
	

});
