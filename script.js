const cards = [
    { id: 1, name: "あ", imagePath: "cardimages/A1.png", altText: "A1"},
    { id: 2, name: "い", imagePath: "cardimages/A2.png", altText: "A2"},
    { id: 3, name: "う", imagePath: "cardimages/A3.png", altText: "A3"},
    { id: 4, name: "え", imagePath: "cardimages/A4.png", altText: "A4"},
    { id: 5, name: "お", imagePath: "cardimages/A5.png", altText: "A5"},
    { id: 6, name: "か", imagePath: "cardimages/A6.png", altText: "A6"},
    { id: 7, name: "き", imagePath: "cardimages/A7.png", altText: "A7"},
    { id: 8, name: "く", imagePath: "cardimages/A8.png", altText: "A8"},
    { id: 9, name: "け", imagePath: "cardimages/A9.png", altText: "A9"},
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
];    
    // "青は赤より１少ない A1 2",
    // "青は赤より１多い A2 2",
    // "青は赤より２少ない A3 2",
    // "青は赤より２多い A4 2",
    // "青は赤より３少ない A5 2",
    // "青は赤より３多い A6 2",
    // "青は赤より４少ない A7 2",
    // "青は赤より４多い A8 2",
    // "青は赤と等しい A9 2",

let activeCard = null;
let currentQuestion = null;
let availableQuestions = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.classList.add("grid-item");
    cardElement.textContent = card.name;
    // 画像要素を作成
    const image = document.createElement("img");
    // 画像のパスを設定
    image.src = card.imagePath; // 画像ファイルのパスを設定
    // 画像の代替テキストを設定
    image.alt = card.altText;
    // ランダムな回転角度を生成（-30度から+30度まで）
    const randomRotation = Math.floor(Math.random() * 61) - 30;
    // 画像にランダムな回転を適用
    image.style.transform = `rotate(${randomRotation}deg)`;
    // 画像をカードに追加
    cardElement.appendChild(image);
    // cardがクリックされたとき
    cardElement.addEventListener("click", () => {
        if (!card.flipped) {
            cardElement.classList.add("active");
            //flipped = true は裏返しの判別
            card.flipped = true;
            if (card.id === currentQuestion.id) {
                showResult("正解");
                playSound("sounds/shakin.mp3");
            } else {
                showResult("不正解");
                playSound("sounds/pafu.mp3")
            }
            cardElement.classList.add("flipped");
        }
    });
    return cardElement;
}

function showResult(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    // Remove the current question.
    availableQuestions.splice(availableQuestions.indexOf(currentQuestion), 1); 
    setTimeout(() => {
        messageElement.textContent = "";
        if (availableQuestions.length > 0) {
            currentQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            document.getElementById("question").textContent = currentQuestion.text;
            document.querySelectorAll(".card").forEach((card) => {
                card.flipped = false;
                card.classList.remove("active");
            });
        } else {
            // No more questions.
            document.getElementById("question").textContent = "ゲームクリア！"; // You can replace this message with your own.
        }
    }, 5000);
}
// sound tag is "<audio id = "myAudio">"
function playSound(soundPath) {
    const myAudio = document.getElementById("myAudio");
    myAudio.src = soundPath;
    myAudio.play();
}
function initGame() {
    shuffle(cards);
    shuffle(questions);
    //Get the last question and delete it from questions .
    availableQuestions = [...questions]; // Create a copy of the questions array.
    currentQuestion = availableQuestions.pop();
    //currentQuestion = questions[0];
    document.getElementById("question").textContent = currentQuestion.text;
    const cardsContainer = document.getElementById("cards");
    // reset cards view
    cardsContainer.innerHTML = "";
    cards.forEach((card) => {
        card.flipped = false;
        cardsContainer.appendChild(createCardElement(card));
    });
}

initGame();