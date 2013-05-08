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
				
				$("#new").append("<p><a href='"+book.get("url")+".html'>"+book.get("title")+" by "+book.get("author")+"</a></p>");	
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
				tableContent= tableContent+ "<a href='"+book.get("url")+".html'>"+book.get("title")+" by "+book.get("author")+"</a></br>";	
				
			}
			if(results.length<1){
				tableContent="No book matching that title exists.</br>";
			}
			
			document.getElementById('displayBooksTable').innerHTML = tableContent;}
	});
}

function showAll(id){

	var text = document.getElementById(id).textContent;
   
	if (text == "See All Books"){
		document.getElementById(id).textContent = "Hide List";
		$("#all").append("</br><h2>All Books <h2>");
		var readingQuery = new Parse.Query(Book);
		readingQuery.ascending("title");
		readingQuery.find({
			success: function(results) {
			 for (var i = 0; i < results.length; i++){
				books=results;
				var book = books[i];
				
				$("#all").append("<p><a href='"+book.get("url")+".html'>"+book.get("title")+" by "+book.get("author")+"</a></p>");	
				}
			}});
	}
	else{
		
		$("#all").html("");
		document.getElementById(id).textContent = "See All Books";
	}
}
