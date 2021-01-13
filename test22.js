//Мапим историю

// Есть ВИП КЦ в диалоге?
vipOperMas = ["vipCorp", "currency", "swift", "vip", "vipAdmin", "concierge"];
for (var y = 0; y < data.operators.length; y++) {
    if (~vipOperMas.indexOf(data.operators[y].role)) {
        data.needSentToVIP = "1";
        break;
    }
}

// Убираем скрытый текст
data.history = data.history.filter(function (elem) {
    return !(elem.action == "msg" && elem.data.user.type == "o" && elem.data.to);
});

// Банкир что-то писал в диалоге?
data.isbankerwrite = "N";
if (data.operators.length) {
    for (var b = 0; b < data.operators.length; b++) {
        if (data.operators[b].role == "banker" || data.operators[b].role == "manager") {
            data.isbankerwrite = "Y";
            data.firstbankerid = data.operators[b].id;
            break;
        }
    }
}

// Если банкир ответил, считаем количество символов
if (data.isbankerwrite == "Y") {

    data.symbolCount = 0;
    for (var g = 0; g < data.history.length; g++) {
        if (data.history[g].action === "msg" && data.history[g].data.user && data.history[g].data.user.id == data.firstbankerid) {
            data.symbolCount += data.history[g].data.text.length;
        }
    }

    // Банкир что-то написал после оператора?
    var operFlag = false;
    for (var t = data.history.length - 1; t >= 0; t--) {
        if (data.history[t].action === "msg" && data.history[t].data.user && data.history[t].data.user.type == "o" && data.history[t].data.user.id != data.firstbankerid) {
            operFlag = true;
        } else if (operFlag && data.history[t].action === "msg" && data.history[t].data.user && data.history[t].data.user.type == "o" && data.history[t].data.user.id == data.firstbankerid && data.history[t].data.text.length >= 80) {
            data.testCheckBanker = "1";
            break;
        }
    }

} else {

    //банкир ничего не писал в диалоге
    data.symbolCount = 0;

}

// Вызов бота = сообщение, если диалог был принят
// И вызвал оператор, который отвечал в диалоге

// Все ид операторов, которые писали в диалоге
data.opers_id = data.operators.map(function (elem) {
    return elem.id;
});

var botToMsg = false;

// Список ботов для приравнивания к сообщению
/*
var bot_list = ["fastAnswers", "fastAnswersNew", "formtransl", "cardadd", "whitelist", "dcc", "DCC", "moneybox", "carddel", "percentcc", "checkout", "bankirinfo", "partpaym", "fastcredit", "blockam", "callback", "deeplink", "blockcards", "cashlim", "formauthmsb", "addPhone", "formcurr", "mainformcurr", "sendtickets", "activecorpcards", "cashlimcorp", "checklimcorp", "depositinfo", "formverif", "formverifmsb", "formlongverif", "formverifliqpay", "formpaym", "reqmsb", "paymentref", "authjur", "pay", "auth", "requisites", "internetlimit", "credlim"];
*/

//новый список ботов после 13.07.2020 Руслан
var bot_list = ["fastAnswersNew", "formtransl", "cardadd", "whitelist", "dcc", "moneybox", "carddel", "percentcc", "checkout", "bankirinfo", "partpaym", "fastcredit", "blockam", "callback", "deeplink", "blockcards", "cashlim", "formauthmsb", "addPhone", "formcurr", "mainformcurr", "sendtickets", "activecorpcards", "cashlimcorp", "checklimcorp", "depositinfo", "formverif", "formverifmsb", "formlongverif", "formverifliqpay", "formpaym", "reqmsb", "paymentref", "authjur", "pay", "auth", "requisites", "internetlimit", "credlim", "cashmsb", "pbcredit", "canceltickets", "changepin", "changecrlim", "unblockcards", "checkfinphone", "depositcalc", "cardtariff", "declaration", "checkbalance", "newformverif", "moneyreturn", "checksms", "checkcashorder", "formvideoinstr"];


//апдейт 09.07.2020 Руслан, добавляем условие по тегу fake, приравниваем к сообщению

var lastMsg = ""; //последнее сообщ
var lastTag = ""; //последний тег fake
for (var q = data.history.length - 1; q >= 0; q--) {
    // Вызов бота = сообщение, если диалог УЖЕ принят
    if (data.history[q].action === "msg" && data.history[q].data.user.type === "o") {
        botToMsg = true;
        lastMsg = data.history[q]; //запишем последнее сообщение
    }
    if (botToMsg && data.history[q].action == "channelBotCall" && ~bot_list.indexOf(data.history[q].data.tag) && ~data.opers_id.indexOf(data.history[q].data.user.id)) {
        data.history[q].action = "msg";
        //подменим событие тега fake на сообщение и тип оператор и добавим флаг
    } else if (botToMsg && data.history[q].action == "channelTag" && data.history[q].data.tag == "fake") {
        data.history[q].action = "msg";
        data.history[q].data.user.type = "o";
        data.history[q].isTag = true;
        lastTag = data.history[q]; //запишем последний тег fake
        lastTag.posNum = q; //запишем позицию тега в массиве
    }
}


//возвращаем событию тега параметры бота. если тег последнее событие
if (lastTag && lastMsg) {
    data.lastTag = lastTag;
    data.lastMsg = lastMsg;
    if (lastTag.data.created > lastMsg.data.created) {
        data.history[lastTag.posNum].action = "channelTag";
        data.history[lastTag.posNum].data.user.type = "b";
        data.history[lastTag.posNum].isTag = false;
    }
}


data.history = data.history.map(function (elem) {
    return {
        action: elem.action,
        user: elem.data.user,
        created: elem.data.created,
        isTag: elem.isTag || undefined //флаг что тут channelTag и юзер бот
    };
});

// Ищем уникальных операторов
data.unique_operators = [];
for (var i = data.history.length - 1; i >= 0; i--) {

    if (data.history[i].action === "msg" && data.history[i].user.type === "o" && !~data.unique_operators.indexOf(data.history[i].user.id) && !data.history[i].isTag) {
        data.unique_operators.push(data.history[i].user.id);
    }

}

data.oper_count = data.unique_operators.length;
//будет нужен потом для получения данных по каждому
data.index = 0;
data.oper_info = [];

//был трасфер?
data.transfer = (data.unique_operators.length > 1) ? true : false;