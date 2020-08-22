{
    "id": "ssoFormLinksMain",
    "type": "Scene",
    "title": "Связи клиента",
    "subtitle": "Получение ссылки на рабочий стол клиента из связи",
    "children": [{
        "id": "ssoFormLinks",
        "type": "Form",
        "onSubmit": {
            "action": "https://msb-nodered-test.amazon.loc/bots/ssoform/desktop/step1/",
            "defaultModel": {
                "list": [{
                    "val": "МІТЯГІНА НАТАЛІЯ ОЛЕКСІЇВНА | РОДИТЕЛЬСКАЯ | MAIN",
                    "key": "49793947"
                }, {
                    "val": "КОЛОМОЙЦЕВ АНТОН ІГОРОВИЧ | РОДИТЕЛЬСКАЯ | MAIN",
                    "key": "1000263483"
                }]
            }
        },
        "children": [{
            "id": "text1",
            "type": "TextView",
            "value": "Рабочий стол клиента из диалога",
            "marginBottom": "xSmall"
        }, {
            "id": "desktop",
            "type": "Button",
            "value": "Основной клиент",
            "mode": "raised",
            "skin": "regular",
            "onClick": [{
                "type": "link",
                "url": "https://inc-start.privatbank.ua/DesktopGUI/callcentredesktop.html?clid=15843647&phone=%2B380503105552"
            }]
        }, {
            "id": "separator",
            "type": "Separator"
        }, {
            "id": "text2",
            "type": "TextView",
            "value": "Для получения доступа к рабочему столу к клиенту из связей, выберите его из списка и нажмите 'Получить'.\nMAIN-основной в связи\nSUB-подчиненный в связи",
            "valueSize": "xSmall",
            "marginBottom": "xSmall"
        }, {
            "id": "choice",
            "type": "List",
            "label": "Клиенты из связей:",
            "value": "49793947",
            "list": [{
                "val": "МІТЯГІНА НАТАЛІЯ ОЛЕКСІЇВНА | РОДИТЕЛЬСКАЯ | MAIN",
                "key": "49793947"
            }, {
                "val": "КОЛОМОЙЦЕВ АНТОН ІГОРОВИЧ | РОДИТЕЛЬСКАЯ | MAIN",
                "key": "1000263483"
            }]
        }, {
            "type": "Div",
            "direction": "row",
            "id": "divBt",
            "children": [{
                "id": "submit",
                "type": "Button",
                "value": "Получить"
            }]
        }]
    }]
}