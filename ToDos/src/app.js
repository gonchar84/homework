// массив задач
const todos = [
  { name: 'task1', key: 1, status: "overdue" },
  { name: 'task2', key: 2, status: "overdue" },
  { name: 'task3', key: 3, status: "done" },
  { name: 'task4', key: 4, status: "active" },
  { name: 'task5', key: 5, status: "active" },
  { name: 'task6', key: 6, status: "active" },
  { name: 'task7', key: 7, status: "active" },
];

window.todos = todos;

let filter = false;

// делаем запрос и вытаскиваем нужный тег
let parent = document.querySelector("body > div > div:nth-child(4) > ul");

// функция рендер списка дел
const renderList = function () {

  // удаляем весь html в теге
  parent.innerHTML = '';

  let todosList = [...todos];

  // проверяем установлено ли значение фильтра
  if (filter && filter !== 'all') {
    // фильтруем массив по статусу возращаем только нужный список
    todosList = todos.filter((element) => {

      // проверям совпадает ли статусы
      return element.status === filter;
    });
  }

  /*
     let todosList2 = [];
     for(let i=0; i < todos.length; i++) {
       let element = todos.length;
       if(element.status === filter) {
         todosList2.push(element)
       }
     }*/


  // цикл - todos
  for (let i = 0; i < todosList.length; i++) {

        let todo = todosList[i]; // помещаем задачу в переменную { name: 'task1', key: 1, status: 'overdue' }

    // создаем теги
    let li = document.createElement("li");
    let div = document.createElement("div");
    let input = document.createElement("input");
    let span = document.createElement("span");
    let button = document.createElement("button");

    // создаем тег li
    div.classList.add("todo")

    // добаляем атрибут type
    input.setAttribute("type", "checkbox");
    input.classList.add("toggle")

    // добаляем текст
    span.innerText = `${todo.name}`

    // добаляем класс
    button.classList.add("destroy")

    // всталяем сразу все элементы по очереди
    div.append(input, span, button)

    // всталяем div
    li.appendChild(div)

    // добавляем событие по клику
    li.onclick = function () {
      // alert(`${todo.name}`);

      // добавляем класс completed
      li.classList.add("completed")
    }

    // добавляем событие по двойному клику
    li.ondblclick = function () {

      // удаляем класс completed
      li.classList.remove("completed")
    }

    // добавляем событие при наведение курсора
    li.onmouseover = function () {

      // добавляем рамку
      li.style.border = "1px solid green"
    }

    // добавляем событие когда курсор уходит с элемента
    li.onmouseout = function () {
      // удаляем рамку
    li.style.border = ""
    }

    // вставляем таг
    parent.appendChild(li);
  }
}

// рисуем список задач
renderList();
// рисуем бар
renderBar();

// ищем форму по аттр id
const form = document.getElementById("insert__form");

// вещаем перехват события submit
form.onsubnmit = function (event) {
  // сбросить действие события по умолчанию
  event.preventDefault();

  // ищем наш input, firstElementChild - первый ребенок формы
  let input = event.currentTarget.firstElementChild;

  // добавляем новое значение
  todos.push(
    { name: input.value, key: todos.length + 1, status: 'active' }
  );

  // делаем инпут пустым
  input.value = '';

  // рисуем список задач
  renderList();
  renderBar();
}

// 2 задание


function renderBar() {
  // находим нужный блок
  const blockIdList = document.getElementById('js-bar');

  //удалить html
  blockIdList.innerHTML = '';

  // рисуем первый блок
  {
    // создаем div
    let div = document.createElement('div');
    // добавляем класс
    div.classList.add('col-1-4');
    // создаем span
    let span = document.createElement('span');
    // добавляем класс
    span.classList.add('total');
    // добавляем аттрибут id
    span.setAttribute('id', 'js-total');
    // добавляем текст
    span.innerText = `${todos.length} items left`;
    // добавляем созданный тег span к тегу div
    div.appendChild(span);

    // добавляем созданный тег div к js-bar
    blockIdList.appendChild(div);
  }

  // рисуем второй блок
  {
    // создаем div
    let div1 = document.createElement('div');
    // добавляем класс
    div1.classList.add('col-1-2');

    // создаем ul
    let ul = document.createElement('ul');

    ul.classList.add('filter');

    ul.setAttribute('id', 'js-filters');

    // добавляем html
    ul.innerHTML = '<li><a href="#/all" data-status="all" class="button selected"><span>All</span></a></li>' +
      '<li><a href="#/active" data-status="active" class="button"><span>Active</span></a></li>' +
      '<li><a href="#/completed" data-status="done" class="button"><span>Completed</span></a></li>'

    // добавляем созданный тег ul к тегу div
    div1.appendChild(ul);

    // добавляем созданный тег div к js-bar
    blockIdList.appendChild(div1);
  }
  // рисуем третий блок
  {
    // создаем div
    let div2 = document.createElement('div');
    // добавляем класс
    div2.classList.add('col-1-4');

    let button = document.createElement('button');
    button.classList.add('button');
    button.classList.add('button--clear');
    button.setAttribute('id', 'js-clear-completed');
    button.innerText = 'Clear Completed';

    // добавляем созданный тег button к тегу div
    div2.appendChild(button);
    // добавляем созданный тег div к js-bar
    blockIdList.appendChild(div2);
  }



  // 3 задание

  // ищем все ссылки
  let links = document.querySelectorAll('#js-filters li');

  // делаем цикл
  links.forEach(function (element) {

    // добавляем событыие клик
    element.addEventListener('click', function (event) {

      // ищет все a с классом selected
      let links = document.querySelectorAll('a.selected');

      // перебираем все найденные элементы
      links.forEach(function (element) {

        // удаляем класс selected у найденных элементах
        element.classList.remove('selected');
      });
      // ложим currentTarget в переменную
      let { currentTarget } = event;


      // ищем первего ребенка добавляем активный класс
      currentTarget.children[0].classList.add('selected');
      filter = currentTarget.children[0].dataset.status;



      //
      renderList();
    });

  });

}






// let newLi = document.createElement("li");

// newLi.innerText = `super first`

// parent.prepend(newLi)

// let superLast = document.createElement("li");

// superLast.innerText = `super last`

// parent.appendChild(superLast)


// let middleLast = document.createElement("li");

// middleLast.innerText = `middle last`

// // вставляем перед тегом

// parent.insertBefore(middleLast, parent.children[3])

// parent.nextElementSibling
// parent.previousElementSibling

// let coint = document.getElementById('js-bar')
// console.log(coint)
// // его брат выше
// console.log("previousElementSibling", coint.previousElementSibling)

// // его брат ниже
// console.log("nextElementSibling", coint.nextElementSibling)

// let p = document.createElement("p");
// p.innerText = "я выше";
// parent.insertAdjacentElement("beforeBegin", p);

// let p2 = document.createElement("p");
// p2.innerText = "я ниже";
// parent.insertAdjacentElement("afterEnd", p2);

// заполняем html тега
// parent.innerHTML += `<li data-id="${todo.id}">
//       ${todo.name}
//     </li>`;


// ищем тэг по аттр id
// let tag = document.getElementById('js-bar');

// ищем тэги по имени тега
// let tags = document.getElementsByTagName('div');

// ищем тэги по selector запросу
// const tagsWithClassRow = document.querySelectorAll(".row");


// ищем тэг по selector запросу
// const span = document.querySelector("span");

// меняем его HTML, todos.length = кол во элементов в массиве
// span.innerHTML = `${todos.length} items left`;

// ищем первый ul в документе
// const result = document.querySelector("body div ul");

// ищем первый ul с классом list в документе
// const result2 = document.querySelector("body div ul.list");

// ищем первый ul с классом list в документе, > означает у детей body
// const result3 = document.querySelector("body > div ul.list");

// ищем первый div с классом limiter в документе, nth-child - порядковый номер ребенка
// const result4 = document.querySelector("body div.limiter div:nth-child(4)");

const fon = document.getElementById("js-bar");
fon.style.background = "red";


const color = document.querySelector("h1");
color.style.color = "blue";




