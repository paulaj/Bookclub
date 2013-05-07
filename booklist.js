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
			console.log(user.get("reading")[i]);
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
		for (var i = 0; i < user.get("goingToRead").length; i++){
			var goingToReadQuery = new Parse.Query(Book);
			console.log(user.get("goingToRead")[i]);
			var book = goingToReadQuery.equalTo("title", user.get("goingToRead")[i]);
			book.first({
				success: function(object){
					console.log(object.get('url'));
					$("#goingToRead").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='currentlyReading' id="+object.get('url')+" onClick='markReading(this.id)'>Currently Reading</button></br></div>");
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
					$("#alreadyRead").append("<div id='"+object.get('url')+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</br></div>");
				},
			});
		}
		} 

	}
	

});


		function markReading(id){
			Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
			var user = Parse.User.current();
			var Book = Parse.Object.extend("Book");
			var goingToReadQuery = new Parse.Query(Book);
			var book = goingToReadQuery.equalTo("url", id);
			book.first({
				success: function(object){
					$("#"+object.get("url")+"div").remove();
					user.addUnique("reading", object.get("title"));
					user.remove("goingToRead", object.get("title"));
					console.log(user.get("goingToRead"));
					user.save();
					$("#reading").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</a><button type='button' class='done' id="+object.get("url")+" onClick='markDone(this.id)'>Done Reading</button></br></div>");
				}
			});
		}
		
		function markDone(id){
			Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
			var user = Parse.User.current();
			var Book = Parse.Object.extend("Book");
			console.log("logs yo");
			console.log(id);
			var readingQuery = new Parse.Query(Book);
			var book = readingQuery.equalTo("url", id);
			book.first({
				success: function(object){
					console.log(object.get("url"));
					$("#"+object.get("url")+"div").remove();
					user.addUnique("read", object.get("title"));
					user.remove("reading", object.get("title"));
					console.log(user.get("reading"));
					user.save();
					$("#alreadyRead").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</br></div>");
				}
			});
		}
