let cards = [
    { id: 1, imagePath: "cardimages/A1.png", altText: "A1"},
    { id: 2, imagePath: "cardimages/A2.png", altText: "A2"},
    { id: 3, imagePath: "cardimages/A3.png", altText: "A3"},
    { id: 4, imagePath: "cardimages/A4.png", altText: "A4"},
    { id: 5, imagePath: "cardimages/A5.png", altText: "A5"},
    { id: 6, imagePath: "cardimages/A6.png", altText: "A6"},
    { id: 7, imagePath: "cardimages/A7.png", altText: "A7"},
    { id: 8, imagePath: "cardimages/A8.png", altText: "A8"},
    { id: 9, imagePath: "cardimages/A9.png", altText: "A9"},
];

const questions = [
    { id: 1, text: "赤は青より１多い"},
    { id: 2, text: "赤は青より１少ない"},
    { id: 3, text: "赤は青より２多い"},
    { id: 4, text: "赤は青より２少ない"},
    { id: 5, text: "赤は青より３多い"},
    { id: 6, text: "赤は青より３少ない"},
    { id: 7, text: "赤は青より４多い"},
    { id: 8, text: "赤は青より４少ない"},
    { id: 9, text: "赤は青と等しい"},
    { id: 10, text: "青は赤より１少ない"},
    { id: 11, text: "青は赤より１多い"},
    { id: 12, text: "青は赤より２少ない"},
    { id: 13, text: "青は赤より２多い"},
    { id: 14, text: "青は赤より３少ない"},
    { id: 15, text: "青は赤より３多い"},
    { id: 16, text: "青は赤より４少ない"},
    { id: 17, text: "青は赤より４多い"},
    { id: 18, text: "青は赤と等しい"},

];
//一周終わってパターン変化

let activeCard = null;
let currentQuestion = null;
let availableQuestions = null;
let extension = ".jpg";
let score = 0;
let ct = 0;

let list = null;

// "red" "blue" "all"
// let questionPattern = null;
let questionPattern = "red";

function changeCardsImagePath(cardPattern){
    for(let i =  0; i < cards.length; i++){
        const imageNum = (i+1).toString();
        const imagePath = "cardimages/" + cardPattern + imageNum + extension;
        cards[i].imagePath = imagePath;
        cards[i].altText = cardPattern + imageNum;
    }
}

changeCardsImagePath("A");
// changeCardsImagePath("B");
// changeCardsImagePath("C");
// changeCardsImagePath("D");
// changeCardsImagePath("E");
// changeCardsImagePath("F");
// changeCardsImagePath("G");
// changeCardsImagePath("H");


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const modal = document.getElementById("modal");

function openModal(message,waitingTime=1000) {
    modalMessage = document.getElementById("modal-message");
    modalMessage.innerHTML = message;
    modal.style.display = "block";
    setTimeout(closeModal, waitingTime);
}
function closeModal() {
    modal.style.display = "none";
}

function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.classList.add("grid-item");
    // 画像要素を作成
    const image = document.createElement("img");
    // 画像のパスを設定
    image.src = card.imagePath; // 画像ファイルのパスを設定
    // 画像の代替テキストを設定
    image.alt = card.altText;
    // ランダムな回転角度を生成（-30度から+30度まで）
    //const randomRotation = Math.floor(Math.random() * 61) - 30;
    // 画像にランダムな回転を適用
    //image.style.transform = `rotate(${randomRotation}deg)`;
    // 画像をカードに追加
    cardElement.appendChild(image);
    // cardがクリックされたとき
    cardElement.addEventListener("click", () => {
        if (card.id === currentQuestion.id % 9) {
            //showResult("正解");
            openModal("正解！");
            playSound("sounds/shakin.mp3");
            score++;
            //document.getElementById("score").textContent = score.toString();
        } else {
            //showResult("不正解");
            openModal("おてつき");
            playSound("sounds/pafu.mp3")
        }
        // closemodalと同じタイミング
        setTimeout(refleshQuestion, 1010);
        }
    );
    return cardElement;
}

// sound tag is "<audio id = "myAudio">"
function playSound(soundPath) {
    const myAudio = document.getElementById("myAudio");
    myAudio.src = soundPath;
    myAudio.play();
}
function refleshQuestion(){
    if(ct === 10){
        openModal("問題終了！！<br>あなたの得点は、"+score+"　点でした！！！",5000);
    }
    shuffle(cards);
    if(questionPattern === "red"){
        availableQuestions = questions.slice(0, 10);
    }else if(questionPattern === "blue"){
        availableQuestions = questions.slice(10, 19);
    }else{
        // availableQuestions  "all"
        availableQuestions = questions;
    }
    // shuffle(availableQuestions);
    const arrayLength = availableQuestions.length;
    // 1 から arrayLength までの整数をランダムに生成
    const randomIndex = Math.floor(Math.random() * arrayLength);
    currentQuestion = availableQuestions[randomIndex];
    document.getElementById("question").textContent = currentQuestion.text;
    document.getElementById("score").textContent = score.toString()+"/10";
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    cards.forEach((card) => {
        cardsContainer.appendChild(createCardElement(card));
    });
    ct++;
}
function initGame() {
    refleshQuestion();
}

initGame();
