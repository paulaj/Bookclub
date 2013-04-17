$(function() {

  var reading	= {"books":{ "title":"Holes" , "author":"Louis Sachar" },
"booksone":{ "title":"Harry Potter and the Philosopher's Stone" , "author":"JK Rowling" }};
	var reading_list="\n";
	
    
    
	//document.getElementById("from").innerHTML=reading.title
    
	
	for(var key in reading){
	
	reading_list=reading_list + reading[key].title 
	+ "    " + reading[key].author +" \n";
	
	}
	$(".books").html(reading_list);
	//'<header1>Reading: </header1><br/><a href="holes.html" class="listedBook">Holes by Louis Sachar</a><br/><header1>Going to Read: </header1><br/><a href="mobydick.html" class="listedBook">Moby Dick by Herman Melville</a><br/><header1>Already Read: </header1><br/><a href="eragon.html" class="listedBook">Eragon by Christopher Paolini</a><br/>');

		
	
	
	
    });
