$(document).ready(function() {

    //checkPvp();

});


function checkPvp() {

    // the pvp api is currently unavailable due to being between expansion packs.

    let requestURL = "https://us.api.battle.net/wow/leaderboard/3v3?locale=en_US&apikey=kccpjk8nb8z7hvjyvbkvxhzxjakz4wjz";



    $.get(requestURL, function(data, status) {

        console.log(data);

    });
}

