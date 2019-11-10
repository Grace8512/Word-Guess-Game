// 1. 유저가 키를 누렀을때 맞으면 알파벳이 맞는 위치에 기록. 
// 2. 틀렸을때 게스넘버가 줄어들고 letters guessed에 기록. 
// 3. numbers of guesses remaining이 0이 되면 게임이 리셋된다.(새로운 단어)
// 4. current word가 다 채워졌을경우, wins가 올라가고 게임이 리셋된다. 

var wins = 0;
var currentWord = "";
var currentWordIndex = 0;
var answerWord = ""; 
var remainingGuesses = 5;
var alreadyGuesses = [];//지금까지 타이핑했던 것 중 틀린 알파벳들.
var wordslist = ["today","yesterday","tomorrow"];
var audioList = ["asset/audio/Bon! Bon!.mp3", "asset/audio/Bon! Bon!.mp3","asset/audio/Bon! Bon!.mp3"];
var imgList = ["asset/img/today.png","asset/img/yesterday.png","asset/img/tomorrow.jpg"]

//html에서 지정했던 아이디를 어떤 내용으로 바꿀건지 지정해주는 펑션. 
function changeHtml(id, text){
    if(id === "currentword"){
        var spacedCurrentWord = "";
        for(var i=0; i < text.length; i++){
            spacedCurrentWord += text.charAt(i)+ " ";
        }
        text = spacedCurrentWord;
    }
    document.getElementById(id).innerText = text;
    
}
function updateAllHtml(){
 changeHtml("winstime", wins);
 changeHtml("currentword", currentWord);
 changeHtml("numberRemaining", remainingGuesses);  
 changeHtml("guessedLetters", alreadyGuesses);     
}

//0.game reset
function gamereset(){
    var index = Math.floor(Math.random() * wordslist.length);
    currentWordIndex = index;
    answerWord = wordslist[index];
    remainingGuesses = 10;
    alreadyGuesses = [];
    currentWord = ""; 
    for(var i = 0; i < answerWord.length; i++){
        currentWord += "_";
    }
    console.log("answerWord =" + answerWord);
    console.log("remainingGuesses =" + remainingGuesses);
    console.log("alreadyGuesses =" + alreadyGuesses);
    updateAllHtml("currentWord =" +currentWord);
}
function getAnswerIndex(letter,word){
    console.log("word =" + word.charAt(0));
    var returnIndex = [];
    for(var i =0; i < word.length; i++){
        if(word.charAt(i)===letter){
            returnIndex.push(i); 
        }
    }
    return returnIndex;
}

function getNewString(index, word, letter){
    var newWord = word;
    for(var i=0; i<index.length; i++){
        newWord = newWord.substr(0, index[i])+letter+newWord.substr(index[i]+1, newWord.length); 
    }
    return newWord;
} 
//1.유저가 키를 눌렀을때 맞으면 알파벳이 맞는 위치에 기록. 
//앤서워드 안에서 레터가 몇 번째에 들어가는지 찾고 커런트워드의 인덱스에 레터를 넣어준다. 
function gameplay(letter){
    if(answerWord.includes(letter)){
        //레터가 앤서워드안에 들어있으면
        var answerIndex = getAnswerIndex(letter, answerWord); 
                                        //(l, hello);-> getAnswerIndex[2,3];
        currentWord = getNewString(answerIndex, currentWord, letter); 
    } //_ _ll_ _<-currentWord에 들어가는 식.    //[list2,3], _ _ _ _ _,  l ->지정해 준 단어.
    else{
        if(!alreadyGuesses.includes(letter)){
            alreadyGuesses.push(letter);//alreadyGuesses에 틀린 알파벳을 넣어준다. 
            remainingGuesses -= 1;  //remaingGuesses - 1
        }
    }//3. numbers of guesses remaining이 0이 되면 게임이 리셋된다.(새로운 단어) 
    if(remainingGuesses === 0){
        gamereset();
    }// 4. current word가 다 채워졌을경우, wins가 올라가고 게임이 리셋된다. 
    if(currentWord === answerWord){
        wins += 1;
        var audio = new Audio(audioList[currentWordIndex]);
        audio.play();
        var changeImg = imgList[currentWordIndex];
        document.getElementById("img").src=changeImg;
        gamereset();
    }
    updateAllHtml();
}
gamereset();
document.onkeyup = function(event){
    console.log("this is user's value." + String.fromCharCode(event.which).toLowerCase());
    gameplay(String.fromCharCode(event.which).toLowerCase());
}
