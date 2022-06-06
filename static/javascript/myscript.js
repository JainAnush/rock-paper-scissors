console.log("in js file");
let user = 0;
let computer = 0;
let choices = ["ROCK", "PAPER", "SCISSORS"];
rock = document.getElementById("rock");
paper = document.getElementById("paper");
scissors = document.getElementById("scissors");
function process() {
  let userinput;
  if (rock.checked) {
    userinput = 1;
  } else if (paper.checked) {
    userinput = 2;
  } else if (scissors.checked) {
    userinput = 3;
  } else {
    alert("please choose one among ROCK, PAPER AND SCISSORS");
    return;
  }
  //   let queryString = JSON.stringify({ userchoice: userinput });
  //   console.log(queryString);
  const request = new Request(
    "/getresult?userinput=" +
      userinput +
      "&userscore=" +
      user +
      "&computerscore=" +
      computer,
    {
      method: "GET",
    }
  );
  console.log(request.url);
  fetch(request)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((response) => {
      console.log(response);
      user = response.userscore;
      computer = response.computerscore;
      let scoresdiv = document.getElementById("scores");
      let finalresdiv = document.getElementById("finalresult");
      let compchoicediv = document.getElementById("compchoice");
      let userchoicediv = document.getElementById("yourchoice");
      let play = document.getElementById("play");
      let msgdiv = document.getElementById("msg");
      let again = document.getElementById("again");
      again.style.visibility = "hidden";
      msgdiv.innerHTML = "<center><h1>" + response.msg + "</h1?</center>";
      userchoicediv.innerHTML =
        "<center><h1>YOU CHOSE " + choices[userinput - 1] + "</h1></center>";
      let scorestring = "<center><h1>SCORES<h1></center>";
      scorestring +=
        "<center><h1>USER " + user + "-" + computer + " COMPUTER</h1></center>";
      scoresdiv.innerHTML = scorestring;
      compchoicediv.innerHTML =
        "<center><h1>COMPUTER CHOSE " +
        choices[response.computerchoice - 1] +
        "<h1></center>";
      if (user == 3) {
        finalresdiv.innerHTML =
          "<center><h1>WELL DONE YOU WON THE GAME!!</h1></center>";
        msgdiv.innerHTML = "";
        play.style.visibility = "hidden";
        again.style.visibility = "visible";
      } else if (computer == 3) {
        finalresdiv.innerHTML =
          "<center><h1>COMPUTER WON THE GAME!!</h1></center>";
        finalresdiv.innerHTML +=
          "<center><h1>BETTER LUCK NEXT TIME</h1></center>";
        msgdiv.innerHTML = "";
        play.style.visibility = "hidden";
        again.style.visibility = "visible";
      }
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
}
