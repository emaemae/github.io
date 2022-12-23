class UserService {

	#users = {};

	get users() {
		return this.#users;
	}
	

	keyLocalStorageUsers = 'users';

	constructor() {
		const localStorageUsers = localStorage.getItem(this.keyLocalStorageUsers);

		if (localStorageUsers !== null) {
			const localStorageUsersParsed = JSON.parse(localStorageUsers);
			this.#users = localStorageUsersParsed;

		}
	}

	create(name, points = 0) {
		
		const localStorageUsers = localStorage.getItem(this.keyLocalStorageUsers);

		if (localStorageUsers !== null) {
			const localStorageUsersParsed = JSON.parse(localStorageUsers);
			
			// // Если в объекте localStorageUsersParsed присутсвует свойство под ключом name
			// if (localStorageUsersParsed.hasOwnProperty(name)) {
			// 	// значит надо перезаписать это свойство в объекте localStorageUsersParsed
			// 	localStorageUsersParsed[name] = points;
			// 	this.setLocalStorage(this.keyLocalStorageUsers, localStorageUsersParsed);
			// }
			// перезаписать это свойство в объекте localStorageUsersParsed
			localStorageUsersParsed[name] = points;
			this.#setLocalStorage(this.keyLocalStorageUsers, localStorageUsersParsed);

			// произвести поиск по юзерам, найти юзера
		} else {
			// Это объект с юзерами в локальном хранилище, тут один юзер, его имя - name, кол-во очков 0
			const users = {
				[name]: points
			};

			this.#setLocalStorage(this.keyLocalStorageUsers, users);

		}
		
	}

	changePoint(name, points) {
		const localStorageUsers = localStorage.getItem(this.keyLocalStorageUsers);

		if (localStorageUsers !== null) {
			const localStorageUsersParsed = JSON.parse(localStorageUsers);

			// Если в объекте localStorageUsersParsed присутсвует свойство под ключом name
			if (localStorageUsersParsed.hasOwnProperty(name)) {
				const lastPointsUser = localStorageUsersParsed[name];
				const newPointsUser = lastPointsUser + points;
				console.log('lp: ', newPointsUser);
				localStorageUsersParsed[name] = newPointsUser;

				this.#setLocalStorage(this.keyLocalStorageUsers, localStorageUsersParsed);
			}
		}
	}
	getPoints(name){
		const localStorageUsers = localStorage.getItem(this.keyLocalStorageUsers);

		if (localStorageUsers !== null) {
			const localStorageUsersParsed = JSON.parse(localStorageUsers);

			// Если в объекте localStorageUsersParsed присутсвует свойство под ключом name
			if (localStorageUsersParsed.hasOwnProperty(name)) {
				console.log(localStorageUsersParsed[name]);
				return localStorageUsersParsed[name];
	}}}

	users_list() {
		
		const localStorageUsers = localStorage.getItem(this.keyLocalStorageUsers);
		var users_arr = [];
		if (localStorageUsers !== null) {
			const localStorageUsersParsed = JSON.parse(localStorageUsers);
			for (const item in localStorageUsersParsed){
				users_arr.push({"name": item, "score": localStorageUsersParsed[item]},)
			}
		} 
		return users_arr;		
	}

	#setLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
		this.#users = value;
	}

}
//Переменные
const page1BtnStartNode = document.querySelector('.page_1__btn-start');
const page2BtnStartNode = document.querySelector('.page_2__btn-start');
const page3BtnStartNode = document.querySelector('.page_3__btn-start');
const page2FormNode = document.querySelector('.page-2-form');
const page2FormInputNode = document.querySelector('.page-2-form__input');
const pageNodes = Array.from(document.querySelectorAll('.page'));
const userService = new UserService();

//page 1
page1BtnStartNode.addEventListener('click', (event) => {
	changePage('page_2');
});

function changePage(classChangePage) {
	
	for (const pageNode of pageNodes) {

		if (pageNode.classList.contains(classChangePage)) {
			pageNode.classList.add('page_active');
		} else {
			pageNode.classList.remove('page_active');
		}
	}
}

page2FormNode.addEventListener('submit', (event) => {
	event.preventDefault();
	const userName = page2FormInputNode.value;
	userService.create(userName);
	changePage('page_3');
});


//page 3 --> page 4

const startingMinutes = 1;
let time = startingMinutes * 60;
const countdownEl = document.getElementById('countdown');


//Фигуры
const figure1 = document.querySelector('.figure_1');
const figure2 = document.querySelector('.figure_2');
const figure3 = document.querySelector('.figure_3');
const figure4 = document.querySelector('.figure_4');

const figures = [ figure1, figure2, figure3, figure4];

var figureType = [0, 0, 0, 0];
var color = [0, 0, 0, 0];
var targetFigure;

const colorText = document.querySelector('.color');
const figureText = document.querySelector('.figure_text');

var numbers = [0, 1, 2, 3];
function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
  }
var dro;
const dropZone = document.querySelector('.drop-zone');

const userName = page2FormInputNode.value;
console.log(userService.getPoints(userName));

page3BtnStartNode.addEventListener('click', (event) => {
	changePage('page_4');
	
	generateCondition();
	let timerId = setInterval(updateCountdown, 1000);
	setTimeout(() => {clearInterval(timerId);
	}, 61000);
});

//Реализация перетаскивания на первом уровне
	const currPoint = 0;
	const toogle = 0;
	const pointCount = document.querySelector('.score_number');

	for (const figure of figures) {
		figure.draggable = true;
		figure.addEventListener('dragstart', (ev) =>{
			console.log('dragstart');
			dro=ev.target;
			console.log(dro);
		})};


	dropZone.addEventListener('dragover', (e) =>{
		e.preventDefault();
	}); 
	dropZone.addEventListener('drop', (e) =>{
		e.target.append(dro);
		setTimeout(() =>{
		document.querySelector('.figures').append(dro);}, 1000);
		if (dro.classList.contains('target')){
			
			//всплывающее окно о победе и добавление 5 очков
			dropZone.append(document.querySelector('.right'));
			document.querySelector('.right').style.visibility = 'visible';
			
			setTimeout(() =>{
				document.querySelector('.right').style.visibility = 'hidden';
				document.querySelector('.task').append(document.querySelector('.right'));
			}, 1000);
			//Добавление очков
			const userName = page2FormInputNode.value;
			userService.changePoint(userName, 1);
			/*ВЫВОД ОЧКОВ НА ЭКРАН */
			const points = userService.getPoints(userName);
			pointCount.innerHTML = `${points}`;
			setTimeout(generateCondition, 1500);
		}
		else {
			
			dropZone.append(document.querySelector('.wrong'));
			document.querySelector('.wrong').style.visibility = 'visible';
			
			setTimeout(() =>{
				document.querySelector('.wrong').style.visibility = 'hidden';
				document.querySelector('.task').append(document.querySelector('.wrong'));
			}, 1000);
			
			//Вычитание очков
			const userName = page2FormInputNode.value;
			userService.changePoint(userName, -1);
			/*ВЫВОД ОЧКОВ НА ЭКРАН */
			const points = userService.getPoints(userName);
			pointCount.innerHTML = `${points}`;
			setTimeout(generateCondition, 1500);
		}
	}); 
//Таймер
function updateCountdown(){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
	if (time == -1) {
		setTimeout(() => {
			const userName = page2FormInputNode.value;
			const currPoints = userService.getPoints(userName);
			console.log(currPoints);
			if(currPoints>=5){
				changePage('page_5');
			}
			else{
				changePage('page_13');
			};}, 2000);
	}
};

//Всплывающее окно выхода

let popup = document.getElementById('exit_popup');
let popupToogle = document.querySelector('.page_4__btn-exit');
let popupClose = document.querySelector('.btn_no');
let popupExit = document.querySelector('.btn_yes');

popupToogle.onclick = function(){
	document.querySelector('.page_active').prepend(popup);
	popup.style.visibility = "visible";
	
	
}
popupExit.onclick = function(){
		changePage('page_12');
		rating();
		popup.style.visibility = "hidden";
		document.querySelector('.page_active').append(popup);
		//setTimeout(() => {location.reload();}, 1000);

};
popupClose.onclick = function(){
	popup.style.visibility = "hidden";
	document.querySelector('.page_active').append(popup);
}


function generateCondition(){
	randomContent();
	createFigures();
	buildCondition();	
}

//Заполнение массивов color figureType случайными числами от 1 до 4
function randomContent(){
	var index;
	shuffle(numbers);
	for (index = 0; index < figureType.length; ++index) {
		figureType[index] = numbers[index] + 1;
	};
	shuffle(numbers);
	for (index = 0; index < color.length; ++index) {
		color[index] = numbers[index] + 1;
	};
};

//Генерация случайного набора фигур
function createFigures(){
	var index;
	targetFigure = getRandomInt(4);
	for (index = 0; index < figureType.length; ++index) {
		figures[index].setAttribute("class", "figure");
		figures[index].draggable = true;
		if (figureType[index] == 1) {
			figures[index].classList.add('rectangle');
			isTarget(index);
			getColored(index);
			
		} else if (figureType[index] == 2) {
			figures[index].classList.add('square');//square
			isTarget(index);
			getColored(index);

		} else if (figureType[index] == 3) {
			figures[index].classList.add('triangle');//triangle
			isTarget(index);
			getColored(index);

		} else if (figureType[index] == 4) {
			figures[index].classList.add('circle');//circle)
			isTarget(index);
			getColored(index);
		}
	}
};

//Переменные для создания условия
function isTarget(index){
	if (index == targetFigure){
		figures[index].classList.add('target');
	}
	else {
		figures[index].classList.remove('target');
	}
};
//Функция для вывода условия согласно переменной targetFigure
function buildCondition(){
	if (color[targetFigure] == 1){
		colorText.innerHTML = `красный`;
	}
	
	if (color[targetFigure] == 2){
		colorText.innerHTML = `синий`;
	}
	if (color[targetFigure] == 3){
		colorText.innerHTML = `зелёный`;
	}
	if (color[targetFigure] == 4){
		colorText.innerHTML = `жёлтый`;
	}

	if (figureType[targetFigure] == 1){
		figureText.innerHTML = `прямоугольник:`;
	}
	if (figureType[targetFigure] == 2){
		figureText.innerHTML = `квадрат:`;
	}
	if (figureType[targetFigure] == 3){
		figureText.innerHTML = `треугольник:`;
	}
	if (figureType[targetFigure] == 4){
		figureText.innerHTML = `круг:`;
	}

};	
//Функция для покраски фигур согласно массиву color
function getColored(index){
	var figureNode = figures[index];
	figureNode.style.backgroundColor = '';
	figureNode.style.borderBottomColor = '';

	if (color[index] == 1){
		if (figureType[index] == 3){
			figureNode.style.borderBottomColor = 'red';
		}
		else {
			figureNode.style.backgroundColor = 'red';
		} 
		
	}
	if (color[index] == 2){
		if (figureType[index] == 3){
			figureNode.style.borderBottomColor = 'blue';
		}
		else {
			figureNode.style.backgroundColor = 'blue';
		}
	}
	if (color[index] == 3){
		if (figureType[index] == 3){
			figureNode.style.borderBottomColor = 'green';
		}
		else {
			figureNode.style.backgroundColor = 'green';
		}
	}
	if (color[index] == 4){
		if (figureType[index] == 3){
			figureNode.style.borderBottomColor = 'yellow';
		}
		else {
			figureNode.style.backgroundColor = 'yellow';
		}
	}

};
//Функция для генерации случайных целых чисел от 0 до max-1
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
};

const page5BtnStartNode = document.querySelector('.page_5__btn-start');
page5BtnStartNode.addEventListener('click', (event) => {
	changePage('page_6');
});


//2 уровень
const square1 = document.querySelector('.sqr_1');
const square2 = document.querySelector('.sqr_2');
const square3 = document.querySelector('.sqr_3');
const square4 = document.querySelector('.sqr_4');

const squares = [ square1, square2, square3, square4];
var targetSqr;

var dro2;
const dropZone2 = document.querySelector('.drop-zone_2');

const startingMinutes2 = 1;
let time2 = startingMinutes2 * 60;
const countdownEl2 = document.getElementById('countdown_2');
var colorNames = ['красный', 'синий', 'зелёный', 'жёлтый'];
var colorsStyle = ['red', 'blue', 'green', 'yellow'];

//Таймер 2 уровень
function updateCountdown2(){
    let minutes = Math.floor(time2 / 60);
    let seconds = time2 % 60;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl2.innerHTML = `${minutes}: ${seconds}`;
    time2--;
	if (time2 == -1) {
		setTimeout(() => {
			const userName = page2FormInputNode.value;
			const currPoints = userService.getPoints(userName);
			console.log(currPoints);
			if(currPoints>=5){
				changePage('page_8');
			}
			else{
				changePage('page_13');
			};}, 2000);
	}
};

const page6BtnStartNode = document.querySelector('.page_6__btn-start');
page6BtnStartNode.addEventListener('click', (event) => {
  changePage('page_7');

  //Вывод очков с предыдущего уровня
  const userName = page2FormInputNode.value;
  console.log(userName);
  const pointCount2 = document.querySelector('.score_number_2');
  const points = userService.getPoints(userName);
	pointCount2.innerHTML = `${points}`;
	//Вывод условия первый раз
  generateCondition2();

  //Работа таймера
	let timerId = setInterval(updateCountdown2, 1000);
	setTimeout(() => {clearInterval(timerId);
	
	}, 61000);
});

//Всплывающее окно выхода 2 уровень

let popup2 = document.getElementById('exit_popup_2');
let popupToogle2 = document.querySelector('.page_7__btn-exit');
let popupClose2 = document.querySelector('.btn_no_2');
let popupExit2 = document.querySelector('.btn_yes_2');

popupToogle2.onclick = function(){
	document.querySelector('.page_active').prepend(popup2);
	popup2.style.visibility = "visible";
	
	
}
popupExit2.onclick = function(){
	
		changePage('page_12');
		rating();
		popup2.style.visibility = "hidden";
		document.querySelector('.page_active').append(popup2);
		//setTimeout(() => {location.reload();}, 1000);

};
popupClose2.onclick = function(){
	popup2.style.visibility = "hidden";
	document.querySelector('.page_active').append(popup2);
}

//Условие
function generateCondition2(){
	randomColor();
	colorSquares();
}

//Заполнение массивов color figureType случайными числами от 1 до 4
function randomColor(){
	var index;
	shuffle(numbers);
	for (index = 0; index < color.length; ++index) {
		color[index] = numbers[index] + 1;
	};
}

//Реализация перетаскивания для второго уровня
for (const sqr of squares) {
	sqr.draggable = true;
	sqr.addEventListener('dragstart', (ev) =>{
		dro2=ev.target;
})};


const pointCount2 = document.querySelector('.score_number_2');

	dropZone2.addEventListener('dragover', (e) =>{
		e.preventDefault();
	}); 
	dropZone2.addEventListener('drop', (e) =>{
		e.target.append(dro2);
		setTimeout(() =>{
		document.querySelector('.squares').append(dro2);}, 1000);
		if (dro2.classList.contains('target')){
			//всплывающее окно о победе и добавление 5 очков
			dropZone2.append(document.querySelector('.right'));
			document.querySelector('.right').style.visibility = 'visible';
		
			setTimeout(() =>{
				document.querySelector('.right').style.visibility = 'hidden';
				document.querySelector('.task_2').append(document.querySelector('.right'));
			}, 1000);
			const userName = page2FormInputNode.value;
			userService.changePoint(userName, 1);
			/*ВЫВОД ОЧКОВ НА ЭКРАН */
			const points = userService.getPoints(userName);
			pointCount2.innerHTML = `${points}`;
			setTimeout(generateCondition2, 1500);
			
		}
		else {
			
			dropZone2.append(document.querySelector('.wrong'));
			document.querySelector('.wrong').style.visibility = 'visible';

			setTimeout(() =>{
				document.querySelector('.wrong').style.visibility = 'hidden';
				document.querySelector('.task_2').append(document.querySelector('.wrong'));
			}, 1000);
			
			const userName = page2FormInputNode.value;
			userService.changePoint(userName, -1);
			/*ВЫВОД ОЧКОВ НА ЭКРАН */
			const points = userService.getPoints(userName);
			pointCount2.innerHTML = `${points}`;
			setTimeout(generateCondition2, 1500);
		}
		
	}); 	

//Красим сами квадраты и добавляем к ним текст
function colorSquares(){
	targetSqr = getRandomInt(4);
	var textEl;


	getColoredSquare(targetSqr);
	var colorIndex = color[targetSqr];
	textEl = colorNames[colorIndex-1];
	squares[targetSqr].innerHTML = `${textEl}`;
	getColoredText(targetSqr);

	for (index = 0; index < squares.length; ++index) {
		isTargetSqr(index);
		if (index != targetSqr){
			getColoredSquare(index);
		
			do{
				var colorIndex = getRandomInt(colorNames.length);
			}
			while(colorIndex == (color[index]-1));
			
			textEl = colorNames[colorIndex];

			console.log(colorNames);

		console.log(textEl);
		squares[index].innerHTML = `${textEl}`;
		getColoredText(index);
		}
	}
}
//Красим сами квадраты
function getColoredSquare(index){
	
	var sqrNode = squares[index];
	
	
	if (color[index] == 1){
		sqrNode.style.backgroundColor = 'red';
	}
	if (color[index] == 2){
		sqrNode.style.backgroundColor = 'blue';
	}
	if (color[index] == 3){
		sqrNode.style.backgroundColor = 'green';
	}
	if (color[index] == 4){
		sqrNode.style.backgroundColor = 'yellow';
	}

};
//Красим текст внутри квадратов
function getColoredText(index){
	do{
		var colorText = getRandomInt(4);
	}
	while((color[index]-1) == colorText);
	squares[index].style.color = colorsStyle[colorText];

}

//Добавление класса target
function isTargetSqr(index){
	if (index == targetSqr){
		squares[index].classList.add('target');
	}
	else {
		squares[index].classList.remove('target');
	}
};

//3 уровень

const startingMinutes3 = 1;
let time3 = startingMinutes3 * 60;
const countdownEl3 = document.getElementById('countdown_3');

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
const img4 = document.getElementById('img4');

const images = [img1, img2, img3, img4];

const page8BtnStartNode = document.querySelector('.page_8__btn-start');
page8BtnStartNode.addEventListener('click', (event) => {
  changePage('page_9');
});


const page9BtnStartNode = document.querySelector('.page_9__btn-start');
page9BtnStartNode.addEventListener('click', (event) => {
  changePage('page_10');
  const userName = page2FormInputNode.value;
  console.log(userName);
  const pointCount3 = document.querySelector('.score_number_3');
  const points = userService.getPoints(userName);
	pointCount3.innerHTML = `${points}`;
  generateCondition3();
	let timerId = setInterval(updateCountdown3, 1000);
	setTimeout(() => {clearInterval(timerId);
	}, 61000);
});

//Всплывающее окно выхода 3 уровень
let popup3 = document.getElementById('exit_popup_3');
let popupToogle3 = document.querySelector('.page_10__btn-exit');
let popupClose3 = document.querySelector('.btn_no_3');
let popupExit3 = document.querySelector('.btn_yes_3');

popupToogle3.onclick = function(){
	document.querySelector('.page_active').prepend(popup3);
	popup3.style.visibility = "visible";
	
	
}
popupExit3.onclick = function(){
	
		changePage('page_12');
		rating();
		popup3.style.visibility = "hidden";
		document.querySelector('.page_active').append(popup3);
		//setTimeout(() => {location.reload();}, 1000);

};
popupClose3.onclick = function(){
	popup3.style.visibility = "hidden";
	document.querySelector('.page_active').append(popup3);
}

//Таймер 3 уровень
function updateCountdown3(){
    let minutes = Math.floor(time3 / 60);
    let seconds = time3 % 60;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl3.innerHTML = `${minutes}: ${seconds}`;
    time3--;
	if (time3 == -1) {
		setTimeout(() => {
			const userName = page2FormInputNode.value;
			const currPoints = userService.getPoints(userName);
			console.log(currPoints);
			if(currPoints>=5){
				changePage('page_11');
			}
			else{
				changePage('page_13');
			};}, 2000);
	}
};

var letters = ["A", "Б", "B", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н",
"О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Э", "Ю", "Я"];
var targetLetter;
var srcs = [
	'./pic/а.png',
	'./pic/б.png',
	'./pic/в.png',
	'./pic/г.png',
	'./pic/д.png',
	'./pic/е.png',
	'./pic/ё.png',
	'./pic/ж.png',
	'./pic/з.png',
	'./pic/и.png',
	'./pic/й.png',
	'./pic/к.png',
	'./pic/л.png',
	'./pic/м.png',
	'./pic/н.png',
	'./pic/о.png',
	'./pic/п.png',
	'./pic/р.png',
	'./pic/с.png',
	'./pic/т.png',
	'./pic/у.png',
	'./pic/ф.png',
	'./pic/х.png',
	'./pic/ц.png',
	'./pic/ч.png',
	'./pic/ш.png',
	'./pic/щ.png',
	'./pic/э.png',
	'./pic/ю.png',
	'./pic/я.png'
]

//Добавляем на страницу целевую букву
function buildCondition3(){
	
	const conditionLetter = document.querySelector('.letter');
	var letterEl = letters[targetLetter];
	conditionLetter.innerHTML = `${letterEl}`;
	console.log(letters[targetLetter]);
}

var pic = [-1, -1, -1, -1];

function chooseLetter(){
	var targetImg = getRandomInt(3);
	for (index = 0; index < images.length; ++index) {
		var letIndex;
		do{
			letIndex = getRandomInt(30);
			var res = 0;
			for (i=0; i < pic.length; ++i){
				if (letIndex == pic[i]){
					res++; 
				}
			}

		} while (res > 0)
		pic[index] = letIndex;
			
		images[index].src = srcs[letIndex];	
		if (index == targetImg){
			targetLetter = letIndex;
		}
		isTargetImg(index, targetImg);
	}
 }


function isTargetImg(index, targetImg){
	if (index == targetImg){
		images[index].classList.add('target');
	}
	else {
		images[index].classList.remove('target');
	}
};

function generateCondition3(){
	chooseLetter();
	buildCondition3();
}

const pointCount3 = document.querySelector('.score_number_3');
const task3 = document.querySelector('.task_3');
const place = document.querySelector('.wrong-right');

images[0].addEventListener('click' ,(event) => {
	console.log(images[0]);
	if (images[0].classList.contains('target')){	
		console.log('RIGHT');
		task3.append(document.querySelector('.right_3'));
		document.querySelector('.right_3').style.visibility = 'visible';

		setTimeout(() =>{
			document.querySelector('.right_3').style.visibility = 'hidden';
			place.append(document.querySelector('.right_3'));
		}, 1000);

		//Добавление очков
		const userName = page2FormInputNode.value;
		userService.changePoint(userName, 1);
		/*ВЫВОД ОЧКОВ НА ЭКРАН */
		const points = userService.getPoints(userName);
		console.log(+1);
		pointCount3.innerHTML = `${points}`;
		setTimeout(generateCondition3, 1500);
		
	}
	else {
			
		task3.append(document.querySelector('.wrong_3'));
		document.querySelector('.wrong_3').style.visibility = 'visible';
		
		setTimeout(() =>{
			document.querySelector('.wrong_3').style.visibility = 'hidden';
			place.append(document.querySelector('.wrong_3'));
		}, 1000);
		
		//Вычитание очков
		const userName = page2FormInputNode.value;
		userService.changePoint(userName, -1);
		/*ВЫВОД ОЧКОВ НА ЭКРАН */
		const points = userService.getPoints(userName);
		pointCount3.innerHTML = `${points}`;
		setTimeout(generateCondition3, 1500);
	}
} ) ; 

images[1].addEventListener('click' ,(event) => {
	console.log(images[1]);
	if (images[1].classList.contains('target')){	
			console.log('RIGHT');
			task3.append(document.querySelector('.right_3'));
			document.querySelector('.right_3').style.visibility = 'visible';
	
			setTimeout(() =>{
				document.querySelector('.right_3').style.visibility = 'hidden';
				place.append(document.querySelector('.right_3'));
			}, 1000);
	
			//Добавление очков
			const userName = page2FormInputNode.value;
			userService.changePoint(userName, 1);
			/*ВЫВОД ОЧКОВ НА ЭКРАН */
			const points = userService.getPoints(userName);
			console.log(+1);
			pointCount3.innerHTML = `${points}`;
			setTimeout(generateCondition3, 1500);
	}
	else {
		task3.append(document.querySelector('.wrong_3'));
		document.querySelector('.wrong_3').style.visibility = 'visible';
		
		setTimeout(() =>{
			document.querySelector('.wrong_3').style.visibility = 'hidden';
			place.append(document.querySelector('.wrong_3'));
		}, 1000);
		
		//Вычитание очков
		const userName = page2FormInputNode.value;
		userService.changePoint(userName, -1);
		/*ВЫВОД ОЧКОВ НА ЭКРАН */
		const points = userService.getPoints(userName);
		pointCount3.innerHTML = `${points}`;
		setTimeout(generateCondition3, 1500);
	}
} ) ;	

images[2].addEventListener('click' ,(event) => {
	console.log(images[2]);
	if (images[2].classList.contains('target')){	
		console.log('RIGHT');
		task3.append(document.querySelector('.right_3'));
		document.querySelector('.right_3').style.visibility = 'visible';

		setTimeout(() =>{
			document.querySelector('.right_3').style.visibility = 'hidden';
			place.append(document.querySelector('.right_3'));
		}, 1000);

		//Добавление очков
		const userName = page2FormInputNode.value;
		userService.changePoint(userName, 1);
		/*ВЫВОД ОЧКОВ НА ЭКРАН */
		const points = userService.getPoints(userName);
		pointCount3.innerHTML = `${points}`;
		setTimeout(generateCondition3, 1500);
		
	}
	else {
		task3.append(document.querySelector('.wrong_3'));
		document.querySelector('.wrong_3').style.visibility = 'visible';
		
		setTimeout(() =>{
			document.querySelector('.wrong_3').style.visibility = 'hidden';
			place.append(document.querySelector('.wrong_3'));
		}, 1000);
		//Вычитание очков
		const userName = page2FormInputNode.value;
		userService.changePoint(userName, -1);
		/*ВЫВОД ОЧКОВ НА ЭКРАН */
		const points = userService.getPoints(userName);
		pointCount3.innerHTML = `${points}`;
		setTimeout(generateCondition3, 1500);
	}
} ) ; 

images[3].addEventListener('click' ,(event) => {
	console.log(images[3]);
	if (images[3].classList.contains('target')){	
		console.log('RIGHT');
		task3.append(document.querySelector('.right_3'));
		document.querySelector('.right_3').style.visibility = 'visible';

		setTimeout(() =>{
			document.querySelector('.right_3').style.visibility = 'hidden';
			place.append(document.querySelector('.right_3'));
		}, 1000);

		//Добавление очков
		const userName = page2FormInputNode.value;
		userService.changePoint(userName, 1);
		/*ВЫВОД ОЧКОВ НА ЭКРАН */
		const points = userService.getPoints(userName);

		pointCount3.innerHTML = `${points}`;
		setTimeout(generateCondition3, 1500);
	}
	else {
			
		task3.append(document.querySelector('.wrong_3'));
		document.querySelector('.wrong_3').style.visibility = 'visible_3';
		
		setTimeout(() =>{
			document.querySelector('.wrong_3').style.visibility = 'hidden';
			place.append(document.querySelector('.wrong_3'));
		}, 1000);
		
		//Вычитание очков
		const userName = page2FormInputNode.value;
		userService.changePoint(userName, -1);
		/*ВЫВОД ОЧКОВ НА ЭКРАН */
		const points = userService.getPoints(userName);
		pointCount3.innerHTML = `${points}`;
		setTimeout(generateCondition3, 1500);
	}
} ) ; 

function rating(){
var listed_users = userService.users_list();
  console.log(listed_users);
  listed_users.sort(compareScore).reverse();
  console.log(listed_users);
  const ratingTable = document.querySelector('.rating-table');
  const userName = page2FormInputNode.value;
	for (i = 0; i < listed_users.length; ++i){
		console.log(i);
		console.log(listed_users[i].name);
		
		let div = document.createElement('div');
		div.className = "rating_row";
		ratingTable.append(div);

		let divNum = document.createElement('div');
		divNum.className = "num";
		divNum.innerHTML = `${i+1}`;
		div.append(divNum);

		let divName = document.createElement('div');
		divName.className = "player";
		divName.innerHTML = `${listed_users[i].name}`;
		div.append(divName);
	  
		let divScore = document.createElement('div');
		divScore.className = "points";
		divScore.innerHTML = `${listed_users[i].score}`;
		div.append(divScore);
		

		if ((listed_users[i].name) == userName){
			divNum.style.backgroundColor = 'yellow';
			divName.style.backgroundColor = 'yellow';
			divScore.style.backgroundColor = 'yellow';
		}
	}
}

const ratingPage = document.querySelector(".page_12");
const page11BtnStartNode = document.querySelector('.page_11__btn-start');
page11BtnStartNode.addEventListener('click', (event) => {
  changePage('page_12');
  rating();
  
});

function compareScore(userA, userB) {
	return userA.score - userB.score;
}

const page12BtnStartNode = document.querySelector('.page_12__btn-start');
page12BtnStartNode.addEventListener('click', (event) => {
	changePage('page_1');
	setTimeout(() => {location.reload();}, 1000);
});

const page13BtnStartNode = document.querySelector('.page_13__btn-start');
page13BtnStartNode.addEventListener('click', (event) => {
	changePage('page_1');
	setTimeout(() => {location.reload();}, 1000);
//
});






