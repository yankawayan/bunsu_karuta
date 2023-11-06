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
    { id: 1, text: "赤は青より１多い A1 1"},
    { id: 2, text: "赤は青より１少ない A2 1"},
    { id: 3, text: "赤は青より２多い A3 1"},
    { id: 4, text: "赤は青より２少ない A4 1"},
    { id: 5, text: "赤は青より３多い A5 1"},
    { id: 6, text: "赤は青より３少ない A6 1"},
    { id: 7, text: "赤は青より４多い A7 1"},
    { id: 8, text: "赤は青より４少ない A8 1"},
    { id: 9, text: "赤は青と等しい A9 1"},
    { id: 10, text: "青は赤より１少ない A1 2"},
    { id: 11, text: "青は赤より１多い A2 2"},
    { id: 12, text: "青は赤より２少ない A3 2"},
    { id: 13, text: "青は赤より２多い A4 2"},
    { id: 14, text: "青は赤より３少ない A5 2"},
    { id: 15, text: "青は赤より３多い A6 2"},
    { id: 16, text: "青は赤より４少ない A7 2"},
    { id: 17, text: "青は赤より４多い A8 2"},
    { id: 18, text: "青は赤と等しい A9 2"},

];    

let activeCard = null;
let currentQuestion = null;
let availableQuestions = null;
// "red" "blue" "all"
// let questionPattern = null;
let questionPattern = "red";
const settingTime = 0;

function changeCardsImagePath(cardPattern){
    for(let i =  0; i < cards.length; i++){
        const imageNum = (i+1).toString();
        const imagePath = "cardimages/" + cardPattern + imageNum + ".png";
        cards[i].imagePath = imagePath;
    }
}

changeCardsImagePath("B");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const modal = document.getElementById("modal");

function openModal(message) {
    document.getElementById("modal-message").textContent = message;
    modal.style.display = "block";
    setTimeout(closeModal, settingTime);
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
        } else {
            //showResult("不正解");
            openModal("おてつき");
            playSound("sounds/pafu.mp3")
        }
        // closemodalと同じタイミング
        setTimeout(refleshQuestion, settingTime);
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
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    cards.forEach((card) => {
        cardsContainer.appendChild(createCardElement(card));
    });
}
function initGame() {
    refleshQuestion();
}

initGame();