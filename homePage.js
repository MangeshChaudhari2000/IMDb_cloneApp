let apiKey = 'c4ff0bfb';
let searchInput = document.getElementById('searchInput');
let searchButon = document.getElementById('searchBtn');


//feching Movie data from OMDC API
const DisplayInfo = async function (movie) {
    try {
        let fetchData = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`);
        // let fetchData = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t="pk"`);

        let jsonData = await fetchData.json();
        console.log(jsonData);

        searchInput.value = "";
        document.querySelector('#test').innerHTML = "";
        let div1 = document.createElement("div");  //created Div
        div1.classList.add("movieCard");  //given classname to div
        // div1.style.color = "white";  //given css property
        console.log(div1);


        div1.innerHTML = ` 
         <img src="${jsonData.Poster}" alt="" >
         <div class="cardText">
         <h1>${jsonData.Title}</h1>
         <a href="">${jsonData.Genre}</a>
         <p>Released Date: <span>${jsonData.Released}</span></p>
         <p>Runtime: <span>${jsonData.Runtime}</span></p>
         <p><span>${jsonData.Plot}</span></p>
         <p>Cast: <span>${jsonData.Actors}</span></p>
     </div>`

        document.getElementById('test').append(div1);
        // document.querySelector(".card").appendChild("div1");

    } catch (error) {
        document.getElementById("test").innerHTML = `<h1 id="validity">Ohh Enter valid Movie Name!</h1>`

        console.log("movie name not enterd");
    }

}

DisplayInfo();
// searchButon.addEventListener('click', function () {
//     let movieName = searchInput.value;
//     if (movieName != "" || movieName != 'undefined') {
//         getData(movieName);
//     } else {
//         document.getElementsByClassName('movieCard').innerHTML = "<h1>Enter Movie Name </h1>";
//     }
// })