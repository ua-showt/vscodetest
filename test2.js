{
    "id": "changecrlimResultMain",
    "type": "Scene",
    "title": "Зміна кредитного ліміту",
    "children": [{
        "id": "changecrlimResult",
        "type": "Form",
        "onSubmit": {
            "action": "https://msb-nodered-test.amazon.loc/bots/changecrlim/step2/",
            "defaultModel": {
                "text1": "Приносимо свої вибачення, в даний момент система не може обробити Ваш запит. Будь ласка, спробуйте ще раз через 5-10 хвилин.",
                "lang": "ua",
                "result": "findResultError",
                "botVersion": "changecrlim"
            }
        },
        "children": [{
            "id": "text1",
            "type": "TextView",
            "alignment": "justify",
            "value": "Приносимо свої вибачення, в даний момент система не може обробити Ваш запит. Будь ласка, спробуйте ще раз через 5-10 хвилин."
        }, {
            "id": "separator1",
            "type": "Separator",
            "visibility": "gone"
        }, {
            "id": "text2",
            "type": "TextView",
            "value": "{{text2}}",
            "visibility": "gone",
            "alignment": "center",
            "valueFont": "bold"
        }, {
            "id": "div3",
            "type": "Div",
            "direction": "row",
            "visibility": "{{vis}}",
            "marginTop": "xxSmall",
            "marginBottom": "none",
            "children": [{
                "id": "cancel",
                "type": "Button",
                "mode": "raised",
                "skin": "regular",
                "value": "Ні"
            }, {
                "id": "submit",
                "type": "Button",
                "value": "Так"
            }]
        }]
    }]
},