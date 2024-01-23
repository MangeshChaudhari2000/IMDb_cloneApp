let apiKey = "c4ff0bfb";
let searchInput = document.getElementById("searchInput");
let searchButon = document.getElementById("searchBtn");
let count = localStorage.length;

searchButon.addEventListener("click", function () {

    let movieName = searchInput.value;
    if (movieName != '' && movieName != 'undefined') {
        getData(movieName);
    } else {
        alert("You have not Enterd Movie Name")
        console.log("enter movie name");
        // document.getElementById("test").innerHTML =
        //    `<h1 id="not-found">Enter Movie Name </h1>`;
    }
});

searchInput.addEventListener("keypress", function (e) {
    // console.log(e);
    if (e.key == 'Enter') {
        let movieName = searchInput.value;
        if (movieName != '' && movieName != 'undefined') {
            getData(movieName);
        } else {
            alert("You have not Enterd Movie Name")
            console.log("enter movie name");
            // document.getElementById("test").innerHTML =
            // `<h1 id="not-found">Enter Movie Name </h1>`;
        }
    }

});

//feching Movie data from OMDC API
const getData = async function (movie) {
    try {
        let fetchData;
        let jsonData;
        try {

            fetchData = await fetch(
                // `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
                // `https://www.omdbapi.com/?s=${(movie).trim()}&page=1&apikey=${apiKey}`
                `https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`
            );
            jsonData = await fetchData.json();
            if (jsonData.Response == 'True') {
                console.log("got rsponse");
                console.log(jsonData);
                searchInput.value = "";
                document.querySelector("#test").innerHTML = "";
                let div1 = document.createElement("div"); //created Div
                div1.classList.add("movieCard"); //given classname to div
                // div1.style.color = "white";  //given css property
                console.log(div1);
                var x = jsonData.Search;

                for (i of x) {
                    div1.innerHTML += ` 
                    <div id="block-div">
                    <a href="HomePage.html?id=${i.Title}" ><img id="poster" src="${i.Poster}" alt="" onerror="this.src='NotFoundImage.png'" ></a>
                    <div id="movieName">
                    <p>${i.Title}</p>
                    <a onclick="addToFavourites('${i.Title}')" href="#">  <i class="fa-solid fa-bookmark fa-flip" style="--fa-animation-duration: 3s; --fa-animation-iteration-count: infinite;" ></i>
                    </a>       
                    </div>   
                  </div>   
             `
                }

                document.getElementById("test").append(div1);
            }
            else if (jsonData.Error != 'Movie not found!' && jsonData.Error != 'Incorrect IMDb ID.') {
                console.log("Tring via Title to get result");
                fetchData = await fetch(
                    `https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
                );
                jsonData = await fetchData.json();

                console.log(jsonData);
                searchInput.value = "";
                document.querySelector("#test").innerHTML = "";
                let div1 = document.createElement("div"); //created Div
                div1.classList.add("movieCard"); //given classname to div
                // div1.style.color = "white";  //given css property
                console.log(div1);
                var x = jsonData.Search;

                div1.style.marginLeft = 37 + "%";

                div1.innerHTML = ` 
                <div id="block-div">

                <a  href="HomePage.html?id=${jsonData.Title}"><img id="poster" src="${jsonData.Poster}" alt="" onerror="this.src='NotFoundImage.png'" ></a>
                <div id="movieName">
                <p>${jsonData.Title}</p>
                <a onclick="addToFavourites('${jsonData.Title}')" href="#">  <i class="fa-solid fa-bookmark fa-flip" style="--fa-animation-duration: 3s; --fa-animation-iteration-count: infinite;" ></i>
                </div>   
                </div>  
             `
                document.getElementById("test").append(div1);
            } else {
                console.log("movie not found");
                document.getElementById(
                    "test"
                ).innerHTML = `<h1 id="not-found">Movie Name couldnt Found!</h1>`;

            }
        }
        catch (e) {
            console.log(e);
        }

    } catch (error) {
        document.getElementById(
            "test"
        ).innerHTML = `<h1 id="not-found">Ohh Technical Error!</h1>`;
        console.log("Technical Error: " + error);
    }
};

// getData();


//---------------------Detailed Movie Info------
const DisplayInfo = async function () {
    var urlQueryParams = new URLSearchParams(window.location.search);
    var id = urlQueryParams.get("id");
    console.log(id);
    try {
        let fetchData = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&t=${id}`
        );
        // let fetchData = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t="pk"`);

        let jsonData = await fetchData.json();
        console.log(jsonData);

        searchInput.value = "";
        document.querySelector("#test").innerHTML = "";
        let div1 = document.createElement("div"); //created Div
        div1.classList.add("detailed-Card"); //given classname to div
        // div1.style.color = "white";  //given css property
        console.log(div1);

        div1.innerHTML = ` 
        <img src="${jsonData.Poster}" alt="" onerror="this.src='NotFoundImage.png'">
   <div class="cardText">
    <h1 id="Heading">${jsonData.Title}</h1>
    <br/>
    <a href="">${jsonData.Genre}</a>
    <p>Rating: <span> ${jsonData.Ratings[0].Value}</span> <i class="fa-solid fa-star " style="color: #FFD43B;"></i></p>
    <p>Released Date: <span>${jsonData.Released}</span></p>
    <p>Runtime: <span>${jsonData.Runtime}</span></p>
    <p>Cast: <span>${jsonData.Actors}</span></p>
    <p>Language: <span>${jsonData.Language}</span></p>
    <p>Director : <span>${jsonData.Director}</span></p>

<br/>
    <p><span>${jsonData.Plot}</span></p>

    <div id="detailed-fav-div">
    <a id="favTag" onclick="addToFavourites('${jsonData.Title}')" href="#"><i class="fa-solid fa-bookmark fa-flip" style="--fa-animation-duration: 3s; --fa-animation-iteration-count: infinite;" ></i></a>
    </div>`;

        document.getElementById("test").append(div1);
        // document.querySelector(".card").appendChild("div1");
    } catch (error) {
        console.log(error);
        document.getElementById(
            "test"
        ).innerHTML = `<h1 id="not-found">Ohh,Technical Issue Occured</h1>`;

        console.log("movie name not enterd");
    }
};

//----------faviourite

function addToFavourites(favMovieName) {
    console.log("add fav called");
    var checkingwatchList = true;

    for (const key in localStorage) {
        if (localStorage[key] == favMovieName) {
            checkingwatchList = false;
            break;
        }
    }
    if (checkingwatchList == true) {
        localStorage.setItem(Math.random().toString(36).slice(2, 7), favMovieName);// math.random for the unique key and value pair
        alert("Movie added to Favourite List")
    } else {
        alert("Movie already added to fav list")
    }
}



function removeFavourites(favMovieName) {
    console.log("remove fav called");
    for (const key in localStorage) {
        if (localStorage[key] == favMovieName) {
            localStorage.removeItem(key)
            break;
        }
    }
}

var favouriteLoader = async function () {
    let jsonData;
    let div1 = document.createElement("div"); //created Div
    div1.classList.add("movieCard");
    for (index in localStorage) {
        localStorage.loglevel = '';
        var id = localStorage.getItem(index);
        console.log(id);
        if (id != null && id != '') {
            let fetchData = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&t=${id}`
            );
            jsonData = await fetchData.json();
            // console.log(jsonData);
            var movieTitle = jsonData.Title;
            div1.innerHTML += `<div id="block-div">
            <a onclick="DisplayInfo(${movieTitle})" href="HomePage.html?id=${movieTitle}"><img id="poster" src="${jsonData.Poster}" alt="" ></a>
            <div id="movieName">
            <p>${jsonData.Title}</p>
            <a onclick="removeFavourites('${movieTitle}')" href="favourite.html"><i class="fa-solid fa-trash fa-flip fa-lg" style="color: #224777;--fa-animation-duration: 3s; --fa-animation-iteration-count: infinite;"></i></a>
            </div>  

            </div> `

        }
    }
    if (localStorage.length < 2) {
        div1.innerHTML += `<h1 id="not-found">No Movies Added to Favourite List</h1>`
    }
    document.getElementById("test").append(div1);
}
