msg.payload = {
    "data": {
        "companyId": msg.data.companyId,
        "view": view,
        "channelId": msg.data.channelId,
        "baseMsgId": msg.data.baseMsgId,
        "viewModel": {
            text2: text2,
            vis: vis,
            btAddVis: btAddVis,
            ds: "step1"
        }
    },
    "action": "msgView"
};
msg.headers = {
    "X-Auth-Token": global.get(msg.data.companyId)
};
