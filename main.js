// في البداية إنشاء قايمكة الكلمات العشواية التى سيتم الللعب منها
const words = [
  "الرحمن",
  "الرحيم",
  "القدوس",
  "السلام",
  "اخسؤا",
  "مالك",
  "خازن",
  "وسيق",
  "جهنم",
  "الجنة",
  "الفردوس",
  "سلسبيل",
  "طرطريق",
  "شيماء",
  "ياسمين",
  "إيمان",
  "أسماء",
  "فاتن",
  "حمديه",
  "جنات",
  "ماهر",
  "حسين",
  "رضا",
  "مريم",
  "فرناس",
  "ابن",
  "عباس",
  "القرآن",
  "أتوبيسات",
  "تليفزيونات",
  "مصاحف",
  "راديو",
  "خاملون",
  "مبلسون",
  "سامدين",
  "فأسقيناكموه",
  "فسيكفيكهم",
  "صبغة",
  "آلاء",
  "خديجة",
];

// ثانيا عمل المستويات التي في اللعبة
const level = {
  سهل: 5,
  متوسط: 3,
  صعب: 2,
};

// هنا هنبدأ نمسك عناصر الصفحة عشان نتعامل معاها
let lvlName = document.querySelector(".info .lvl");
let second = document.querySelector(".info .second");
let lv1 = document.querySelector(".box .lv1");
let lv2 = document.querySelector(".box .lv2");
let lv3 = document.querySelector(".box .lv3");
let start = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upWord = document.querySelector(".up-word");
let time = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");

// إظهر أخر نتيجة لعب في القايمة
if (window.sessionStorage.getItem("score")) {
  document.querySelector(".list span").innerHTML =
    window.sessionStorage.getItem("score");
}

// عمل اختيار للمستوي والوقت من مربعات الاختيار
lv1.addEventListener("click", selted);
lv2.addEventListener("click", selted);
lv3.addEventListener("click", selted);
// نعمل ملىء للبيانات في اللعبة وإضافة الأوقات في مكانها تلقاءياً
function selted() {
  lvlName.innerHTML = this.innerHTML;
  let timing = level[this.innerHTML];
  second.innerHTML = timing;
  time.innerHTML = timing;
  start.style.display = "block";
  document.querySelector(".box").style.display = "none";
}

// حركة حلوه عشان نلغي حركة النسخ واللصق فى اللعبة عشان الغش
input.onpaste = function () {
  // لو دخل كلمة ملصوقة لا تكتب اصلاً
  return false;
};

// زرار تشغيل اللعب وإظهار حقل الإدخال مباشرة
start.onclick = function () {
  document.querySelector(".wow").play();
  this.remove();
  input.style.display = "block";
  input.focus();
  // توليد كلمة عشواءية
  generut();
};

// عمل أهم فنكشن فى اللعبة وهي توليد الكلمة العشواءية
function generut() {
  // كلمة عشواءية
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // عمل حذف للكلمة العشواءية من القايمة وذلك عن طريق رقمها فى القايمة، ثم إضافتها لمكانها لبدء كتابتها
  let index = words.indexOf(randomWord);
  words.splice(index, 1);
  theWord.innerHTML = randomWord;
  // عمل إفراغ لمكان الكلمات القادمة عشان نبدأ نضيف جديد مكان القديم
  upWord.innerHTML = "";
  // عمل إنشاء للكلمات كلها داخل المكان المخصص لها عن طريق إنشاء ديف فى الصفحة
  for (i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = words[i];
    upWord.appendChild(div);
  }
  // بدأ الوقت والنتيجة
  play();
}

// بدأ عداد الوقت والتوقف عند الصفر ، ثم التحقق  من الكلمة والنتيجة
function play() {
  // الوقت
  time.innerHTML = second.innerHTML;
  let start = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML == 0) {
      clearInterval(start);
      // هنا هنتحقق من الكلمة هل صح او خطأ
      if (input.value == theWord.innerHTML) {
        input.value = "";
        scoreGot.innerHTML++;
        document.querySelector(".secses").play();
        // عمل توليد لكلمة أخري لاستمرار اللعبة لو لسه في كلمات فى القايمة
        if (words.length > 0) {
          generut();
        } else {
          document.querySelector(".win").style.display = "block";
        }
      } else {
        document.querySelector(".wow").remove();
        document.querySelector(".fill").play();
        window.sessionStorage.setItem("score", scoreGot.innerHTML);
        document.querySelector(".finish span").innerHTML = scoreGot.innerHTML;
        document.querySelector(".finish").style.display = "block";
      }
      // تشغيل فنكشن حفظ النتيجة الاخيرة
      result();
    }
  }, 1000);
}
// عمل فنكشن حفظ النتيجة الاخيرة
function result() {
  let span = document.querySelector(".list span");
  span.innerHTML = window.sessionStorage.getItem("score");
}

