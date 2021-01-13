//считаем КПИ


// Убираем события до момента подключения первого оператора
data.history = data.history.filter(function (elem) {
  return elem.created >= data.first_adding_time;
});

// Переменные для расчета среднего времени ответа
var sum = 0;
var count = 0;

//актуальный флаг сообщения
data.message_type = false;

//продолжительность диалога
data.duration = Math.round((data.history[0].created - data.first_adding_time) / 1000);

// Считаем количество сообщение клиента и оператора(1)
data.oper_messages_count = 0;
data.client_messages_count = 0;

for (var i = data.history.length - 1; i >= 0; i--) {

  // Считаем количество сообщение клиента и оператора(2)
  if (data.history[i].action === "msg" && data.history[i].user.type === "o") {
    data.oper_messages_count++;
  } else if (data.history[i].action === "msg") {
    data.client_messages_count++;
  }

  //время первого ответа клиенту
  if (!data.first_answer_waiting && data.history[i].action === "msg" && data.history[i].user.type === "o") {
    data.first_answer_waiting = Math.round((data.history[i].created - data.first_adding_time) / 1000);

    //первый ответивший оператор
    data.firstAnsweredOperChannelId = data.history[i].user.id;

    //первоначальная инициализация максимальной тишины
    data.max_waiting = data.first_answer_waiting;

    //для расчета среднего времени ответа
    sum += data.first_answer_waiting;
    count++;
  }

  //сообщение клиента, от которого замеряем время до ответа
  else if (data.max_waiting && data.history[i].action === "msg" && (data.history[i].user.type === "g" || data.history[i].user.type === "u") && !start_waiting) {
    var start_waiting = data.history[i].created;
  }

  //сообщение оператора после сообщения(й) клиента
  else if (start_waiting && data.history[i].action === "msg" && data.history[i].user.type === "o") {
    var stop_waiting = data.history[i].created;
    var result = Math.round((stop_waiting - start_waiting) / 1000);
    if (data.max_waiting < result) {
      data.max_waiting = result;
    }

    //для расчета среднего времени ответа
    sum += result;
    count++;

    //сбрасываем флаг
    start_waiting = 0;
  }

  //актуальный флаг последнего(их) сообщения(й) перед завершением диалога
  if (data.history[i].action === "msg" && data.message_type != "client" && (data.history[i].user.type === "g" || data.history[i].user.type === "u")) {

    data.message_type = "client";
    data.message_time = data.history[i].created;

  } else if (data.history[i].action === "msg" && data.message_type == "client" && data.history[i].user.type === "o") {

    data.message_type = "operator";
    data.message_time = data.history[i].created;

  }

  //закончился цикл для расчета максимального времени ожидания
}

//первым ответил первый подключенный оператор?
if (data.firstOperChannelId != data.firstAnsweredOperChannelId) {
  data.transferWithoutAnswer = true;
}

//считаем среднее время ответа
if (sum && count) {
  data.middle_waiting = Math.round(sum / count);
}

//проверяем, посчитались ли данные
if (!data.first_answer_waiting || !data.max_waiting) {
  data.empty = true;
  data.first_answer_waiting = data.max_waiting = data.duration;
}