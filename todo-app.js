(function () {
  // Создаём и возвращаем загодовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  // Создаём и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // Создаём и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  // Создание функции для DOM-element, которая будет создавать дело.
  function createTodoItem(name) {
    let item = document.createElement("li");
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button"); // отметить дело как сделано
    let deleteButton = document.createElement("button"); // удалить дело из списка

    // устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью Flex
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-centr"
    );
    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    // вкладываем в кнопки в отдельный элемент, чтобы они объединильсь в один блок

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }



//   let container = document.getElementById("todo-app");




  // Выносим содержимое обработчика DOMContentLoaded в отдельную функцию
  function createTodoApp(container, title = "Список дел") {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // Теперь зделаем так, что бы по отправке формы создавался новый элемент списка, для это
    // есть обработчик события submit - это специальное событие которое свойственно элементу формы,
    // оно автоматически сгенерируется когда пользователь нажмёт на кнопку внутри формы.

    // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener("submit", function (e) {
      // эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы хотим чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента если пользователь ничего не вёл в поле
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      // Добавим обработчики на кнопки
      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
      });
      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();
        }
      });

      // создаём и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);

      // обнуляем значение в поле, чтобы не пришлось стирать его вручную.
      todoItemForm.input.value = "";
    });
  }

  window.createTodoApp = createTodoApp;
})();

// // Создаём обработчик события(DOMContentLoaded) для доступа к DOM
// document.addEventListener('DOMContentLoaded', function() {
//     createTodoApp(document.getElementById('my-todos'), 'Мои дела');
//     createTodoApp(document.getElementById('wife-todos'), 'Дела для жены');
//     createTodoApp(document.getElementById('son-todos'), 'Дела для сына');
// });
