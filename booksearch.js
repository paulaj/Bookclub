Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
var user = Parse.User.current();
var Book = Parse.Object.extend("Book");
var books = [];
var titles = [];
    
$(document).ready(function() {
		//This gets the 5 newest books
		var readingQuery = new Parse.Query(Book);
		readingQuery.descending("createdAt");
		readingQuery.find({
			success: function(results) {
			 for (var i = 0; i < 5; i++){
				books=results;
				var book = books[i];
				
				$("#new").append("<div id='"+book.get("url")+"div'><a href='"+book.get("url")+".html'>"+book.get("title")+" by "+book.get("author")+"</a></br></div>");	
			}
			
			
			for (var i = 0; i < books.length; i++){
				titles.push(books[i].get("title"));}
			console.log(titles);	
			$("#BookRecommendBox").autocomplete({source: titles});  
			
}});
});

function searchBooks(searched){
$("#displayBooksTable").empty();
	var tableContent="Results:</br>";
	var url = searched + 'profile.html';

	var readingQuery = new Parse.Query(Book);
	readingQuery.equalTo("title", searched);
	readingQuery.find({
			success: function(results) {
			 for (var i = 0; i < results.length; i++){
				var book = results[i];
				console.log(book.get("title") + " " + searched);
				tableContent= tableContent+ "<tr><td></td><td colspan='5'><a href='"+book.get("url")+".html'>"+book.get("title")+" by "+book.get("author")+"</a></td></tr>";	
				
			}
			if(results.length<1){
				tableContent="<tr><td></td><td colspan='5'>No book matching that title exists.</td></tr>";
			}
			
			document.getElementById('displayBooksTable').innerHTML = tableContent;}
	});
}
