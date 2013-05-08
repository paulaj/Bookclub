Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
var user = Parse.User.current();
var Book = Parse.Object.extend("Book");

$(document).ready(function() {

		var readingQuery = new Parse.Query(Book);
		readingQuery.descending("createdAt");
		var books;
		readingQuery.find({
			success: function(results) {
			 for (var i = 0; i < 5; i++){
			var book = results[i];
			console.log(book.get("title"));
			$("#new").append("<div id='"+book.get("url")+"div'><a href='"+book.get("url")+".html'>"+book.get("title")+" by "+book.get("author")+"</a></br></div>");
				
			}
			}});
		
		
		
			

});

