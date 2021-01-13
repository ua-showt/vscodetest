// Время первого ответа клиенту
// Была авторизация в боте?

var checked = false;

for (var i = data.history.length - 1; i >= 0; i--) {

    if (!checked && data.history[i].action === "channelInvite") {

        data.first_adding_time = data.history[i].data.created;
        data.firstOperChannelId = data.history[i].data.users[0].id;
        data.companyId = data.history[i].data.companyId;
        data.channelId = data.history[i].data.channelId;
        checked = true;

    } else if (data.history[i].action === "msgView" && data.history[i].data && data.history[i].data.viewModel && data.history[i].data.viewModel.text && ~data.history[i].data.viewModel.text.search(/Результат робота авторизации/)) {

        // Авторизовался в боте ЦЭБ
        try {
            data.auth_id = data.history[i].data.view.children[0].children[1].children[4].children[1].value;
        } catch (error) {}

    }

}

// Авторизация в боте Руслана (ответы на вопросы)
if (!data.auth_id && data.own_auth_id) {
    data.auth_id = data.own_auth_id;
}