//	Подготовить запрос к postreSQL

// ИО менеджер?
data.acting = (~data.tags.indexOf("vipmanAct")) ? "Y" : "N";

data.keys = "dialog_started,dialog_finished,sessionid,origin,page,last_channels_id,last_channel_id_sector,first_channel_id,first_channel_id_sector,mark,theme,rep_clid,middle_time_answer,time_first_answer,max_silence,duration,is_missed,is_transfer,channelId,transferWithoutAnswer,firsr_ldap,last_ldap,queue_waiting_time,count_dialogs_now,entery_point,first_added_ldap,first_added_sector,isbankerwrite,isbankerinchat,firstbankerldap,checkbankermessages,bankersymbolcount,country,product,themeName,istimeout,isnosearch,queue,auth_rep_clid,model_sector_type,corp_info,p24_version".split(",");

data.values = [];
//время старта (подключения первого оператора в диалог)
data.values[0] = new Date(data.history[data.history.length - 1].created);
data.values[0] = new Date(data.values[0].setHours(data.values[0].getHours() + 2));
//время завершения диалога
data.values[1] = new Date(data.history[0].created);
data.values[1] = new Date(data.values[1].setHours(data.values[1].getHours() + 2));
//ид диалога
data.values[2] = data.sessionId;
//ид компании
data.values[3] = data.companyId;
//страница обращения в чат
data.values[4] = "any url";

if (data.core == "multichat" || data.alias == "multichat") {
  data.values[4] = "multichat";
}

//ченнелс ид последнего оператора
data.values[5] = data.unique_operators[data.unique_operators.length - 1];
//сектор по последнему ченнелс ид
data.values[6] = "any last operaor sector";
//ченнелс ид первого ответившего оператора
data.values[7] = data.unique_operators[0];
//сектор по первому ответившему ченнелс ид
data.values[8] = "any first operaor sector";
//оценка
data.values[9] = "any mark";

if (~data.tags.indexOf("yes")) {
  data.values[9] = "yes";
} else if (~data.tags.indexOf("no")) {
  data.values[9] = "no";
  // Новая оценки CES
} else if (~data.tags.indexOf("1")) {
  data.values[9] = "1";
} else if (~data.tags.indexOf("2")) {
  data.values[9] = "2";
} else if (~data.tags.indexOf("3")) {
  data.values[9] = "3";
} else if (~data.tags.indexOf("4")) {
  data.values[9] = "4";
} else if (~data.tags.indexOf("5")) {
  data.values[9] = "5";
} else if (~data.tags.indexOf("6")) {
  data.values[9] = "6";
} else if (~data.tags.indexOf("7")) {
  data.values[9] = "7";
} else if (~data.tags.indexOf("8")) {
  data.values[9] = "8";
} else if (~data.tags.indexOf("9")) {
  data.values[9] = "9";
} else if (~data.tags.indexOf("10")) {
  data.values[9] = "10";
}

data.mark = (data.values[9] == "any mark") ? "" : data.values[9];

//тематика
data.values[10] = "any theme";

var themes = data.tags.filter(function (elem) {
  return ~elem.search(/^\d{15}$/);
});

if (themes.length) {
  data.values[10] = themes[themes.length - 1];
  data.themeTag = themes[themes.length - 1];
} else {
  data.themeTag = "";
}

//новое от 18.09, проверка одна ли тематика в диалоге?
if (themes.length == 1) data.machine_learning = "1";

//ид екб клиента
data.ekbId = (data.auth_id) ? data.auth_id : data.ekbId;
data.values[11] = (data.ekbId) ? +data.ekbId : null;
//среднее время ответа
data.values[12] = data.middle_waiting;
//время первого ответа
data.values[13] = data.first_answer_waiting;
//максимальная тишина
data.values[14] = data.max_waiting;
//длительность диалога
data.values[15] = data.duration;
//диалог пропущен?
data.values[16] = (data.empty) ? "Y" : "N";
//трансфер?
data.values[17] = (data.transfer) ? "Y" : "N";
//channelId
data.values[18] = data.channelId;
//трансфр без принятия диалога?
data.values[19] = (data.transferWithoutAnswer) ? "Y" : "N";

data.values[22] = (data.queue_waiting_time) ? data.queue_waiting_time : null;
data.values[23] = (data.channel_counter) ? data.channel_counter : null;
if (data.origin) data.origin = data.origin.slice(0, 98);
data.values[24] = (data.origin) ? data.origin : null;

data.values[25] = "not_found";
data.values[26] = "not_found";

data.all_ldaps_in_dialogue = [];

//новое от 14.09, писал ли банкир в диалоге?
data.values[27] = data.isbankerwrite;
//был ли банкир в чате?
data.values[28] = (data.bankers && data.bankers.length) ? "Y" : "N";
data.isbankerinchat = (data.bankers && data.bankers.length) ? "Y" : "N";

//лдап банкира, если он был в чате
data.values[29] = (data.bankers && data.bankers.length) ? data.bankers[0].ldap : "empty";

//нужно ли проверять диалог (банир ответил, но оператор также отвечал)
data.values[30] = (data.isbankerwrite == "Y" && data.transfer) ? "Y" : "N";

//новое от 24.09, сколько символов написал банкир?
data.values[31] = data.symbolCount;

//новое от 03.10, какая страна обращения?
data.values[32] = (data.country) ? data.country : "unknown";
//новое от 23.10, добавить продукт по тематике
data.values[33] = "unknown";
// новое от 25.10, добавить описание тематики
data.values[34] = "empty";
// новое от 28.02 закрыт по тайм-ауту?
data.values[35] = (data.reason == "timeout") ? "Y" : "N";
// новое от 28.02 прямое подключение?
data.values[36] = (data.just_oper) ? "Y" : "N";
// Прямое подключение FCR? Для удаления с дашборда % бота или VIP
if (data.just_oper_type && data.just_oper_type == "fcr") {
  data.values[36] = "F";
} else if (data.just_oper_type && data.just_oper_type == "vip") {
  data.values[36] = "V";
}
data.values[37] = (data.queue_type) ? (data.queue_type[0].toUpperCase() + data.queue_type.slice(1)) : "unknown";
data.values[38] = (data.auth_id) ? "Y" : "N";
data.values[39] = (data.routing_type) ? data.routing_type : "unknown";
data.values[40] = (data.corp_info) ? data.corp_info : "empty";
// beta mob app?

//апдейт Руслан 27.07.2020
data.values[41] = (data.appAgent && (~data.appAgent.search(/privat24\/6\.\d{2}\.\d{2}/i) || ~data.appAgent.search(/privat24\/\d{1}\.\d{1}\.\d{1}/i) || ~data.appAgent.search(/privat24\/(6.\d{2}.\d{2}|0\.2\.[0-9]|19\d{4}|2\.[0-9])/i))) ? "beta" : "null";

// Кастомная оценка чата
data.otherBye = (data.tags.indexOf("otherBye") != -1) ? "Y" : "N";

// Новое от 20.03, пишем все теги кроме оценок
data.tag_list = data.tags.filter(function (elem) {
  return !~elem.trim().search(/^\d/) && elem != "yes" && elem != "no";
}).join(" ");

//delete data.history;