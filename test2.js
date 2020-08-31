let msg = {
    data: {

    },
    payload: {
        "r": [{
            "BLN_BYCLIENTID": [{
                "BLN_BYCLIENTID": {
                    "TYPES": [{
                        "BlackType2": 21,
                        "BlackType1": 1
                    }],
                    "EditorLogin": "BLACKLISTS",
                    "BlackTable": "C",
                    "BlackId": 1017221875,
                    "CtoBDTM": "2018-12-07 03:35:10.91",
                    "BlackCountry": "UA",
                    "SrcID": 76,
                    "CtoBCode": "D",
                    "CtoBRemark": "REDEFINE",
                    "CtoBSt": "A"
                }
            }, {
                "BLN_BYCLIENTID": {
                    "TYPES": [{
                        "BlackType2": 21,
                        "BlackType1": 1
                    }],
                    "EditorLogin": "BLACKLISTS",
                    "BlackTable": "C",
                    "BlackId": 1017221875,
                    "CtoBDTM": "2018-12-07 03:35:10.91",
                    "BlackCountry": "UA",
                    "SrcID": 76,
                    "CtoBCode": "A",
                    "CtoBRemark": "REDEFINE",
                    "CtoBSt": "A"
                }
            }, {
                "BLN_BYCLIENTID": {
                    "TYPES": [{
                        "BlackType2": 41,
                        "BlackType1": 1
                    }],
                    "EditorLogin": "BLACKLISTS",
                    "BlackTable": "C",
                    "BlackId": 1022179558,
                    "CtoBDTM": "2020-08-27 09:52:07.733",
                    "BlackCountry": "UA",
                    "SrcID": 46,
                    "CtoBCode": "E",
                    "CtoBRemark": "REDEFINE",
                    "CtoBSt": "A"
                }
            }, {
                "BLN_BYCLIENTID": {
                    "TYPES": [{
                        "BlackType2": 41,
                        "BlackType1": 1
                    }],
                    "EditorLogin": "BLACKLISTS",
                    "BlackTable": "C",
                    "BlackId": 1022179558,
                    "CtoBDTM": "2020-08-27 09:52:07.733",
                    "BlackCountry": "UA",
                    "SrcID": 46,
                    "CtoBCode": "D",
                    "CtoBRemark": "REDEFINE",
                    "CtoBSt": "A"
                }
            }, {
                "BLN_BYCLIENTID": {
                    "TYPES": [{
                        "BlackType2": 41,
                        "BlackType1": 1
                    }],
                    "EditorLogin": "BLACKLISTS",
                    "BlackTable": "C",
                    "BlackId": 1022179558,
                    "CtoBDTM": "2020-08-27 09:52:07.733",
                    "BlackCountry": "UA",
                    "SrcID": 46,
                    "CtoBCode": "A",
                    "CtoBRemark": "REDEFINE",
                    "CtoBSt": "A"
                }
            }, {
                "BLN_BYCLIENTID": {
                    "TYPES": [{
                        "BlackType2": 41,
                        "BlackType1": 1
                    }],
                    "EditorLogin": "BLACKLISTS",
                    "BlackTable": "C",
                    "BlackId": 1022179558,
                    "CtoBDTM": "2020-08-27 09:52:07.733",
                    "BlackCountry": "UA",
                    "SrcID": 46,
                    "CtoBCode": "B",
                    "CtoBRemark": "REDEFINE",
                    "CtoBSt": "A"
                }
            }, {
                "BLN_BYCLIENTID": {
                    "TYPES": [{
                        "BlackType2": 21,
                        "BlackType1": 1
                    }],
                    "EditorLogin": "BLACKLISTS",
                    "BlackTable": "C",
                    "BlackId": 1014784466,
                    "CtoBDTM": "2018-02-06 00:03:46.683",
                    "BlackCountry": "UA",
                    "SrcID": 69,
                    "CtoBCode": "D",
                    "CtoBRemark": "REDEFINE",
                    "CtoBSt": "A"
                }
            }, {
                "BLN_BYCLIENTID": {
                    "TYPES": [{
                        "BlackType2": 21,
                        "BlackType1": 1
                    }],
                    "EditorLogin": "BLACKLISTS",
                    "BlackTable": "C",
                    "BlackId": 1014784466,
                    "CtoBDTM": "2018-02-06 00:03:46.683",
                    "BlackCountry": "UA",
                    "SrcID": 69,
                    "CtoBCode": "A",
                    "CtoBRemark": "REDEFINE",
                    "CtoBSt": "A"
                }
            }]
        }]
    }
}



if (msg.payload && msg.payload.r && msg.payload.r.length && msg.payload.r[0].BLN_BYCLIENTID && msg.payload.r[0].BLN_BYCLIENTID.length) {

    msg.data.blackList = msg.payload.r[0].BLN_BYCLIENTID;
    msg.data.blackListArr = [];
    msg.data.blackList.forEach(function (obj) {
        if (obj.BLN_BYCLIENTID.CtoBSt == "A" && obj.BLN_BYCLIENTID.CtoBCode == "A" || obj.BLN_BYCLIENTID.CtoBCode == "B") {
            msg.data.findBlackList = true;

            let isRepeat = msg.data.blackListArr.some(nObj => nObj.BlackId == obj.BlackId);
            console.log(isRepeat, msg.data.blackListArr);
            if (isRepeat === false) {
                msg.data.blackListName = obj.BLN_BYCLIENTID.TYPES[0].BlackType1 + "." + obj.BLN_BYCLIENTID.TYPES[0].BlackType2;
                msg.data.blackListName += ` - ${getBlackListName(msg.data.blackListName)}`;
                msg.data.blackListArr.push(msg.data.blackListName);
            }

        }
    })


}

function getBlackListName(code) {
    let r = ""
    if (code == "1.1") r = "ШАХРАЇ";
    else if (code == "1.2") r = "РАНІШЕ СУДИМІ";
    else if (code == "1.3") r = "НАРКОМАНИ";
    else if (code == "1.4") r = "АЛКОГОЛІКИ";
    else if (code == "1.5") r = "ОСОБИ, ЩО ЗНАХОДИЛИСЯ У РОЗШУКУ";
    else if (code == "1.6") r = "ПСИХІЧНО ХВОРІ - НЕ ДІЄЗДАТНІ";
    else if (code == "1.7") r = "ПОМЕРЛІ";
    else if (code == "1.8") r = "АЛІМЕНТИ";
    else if (code == "1.9") r = "ЗНИКЛІ БЕЗВІСТІ";
    else if (code == "1.10") r = "НЕБЛАГОПОЛУЧНІ СІМ'Ї";
    else if (code == "1.11") r = "НЕПОВНОЛІТНІ (Неповнолітні злодії)";
    else if (code == "1.12") r = "БОРЖНИКИ КОМУНАЛЬНИХ ПЛАТЕЖІВ";
    else if (code == "1.13") r = "ФІКТИВНІ ДОВІДКИ ПРО ДОХОДИ (ЮР. ОСОБИ)";
    else if (code == "1.14") r = "ОСОБИ, ЩО ЗДІЙСНЮТЬ ПЕРЕВАЖНО КОЧОВИЙ СПОСІБ ЖИТТЯ";
    else if (code == "1.15") r = "ІНШЕ";
    else if (code == "1.16") r = "ТЕРОРИСТИ";
    else if (code == "1.17") r = "ЛІКВІДАЦІЯ ПІДПРИЄМЦЯ";
    else if (code == "1.18") r = "ПІДПРИЄМСТВА-БАНКРУТИ (ЮР. ОСОБА)";
    else if (code == "1.19") r = "ПРОБЛЕМНІСТЬ ПІДПРИЄМСТВА-РОБОТОДАВЦЯ (ЮР.ОСОБА)";
    else if (code == "1.20") r = "НЕГАТИВНА ІНФОРМАЦІЯ ПРО КЕРІВНИКА ПІДПРИЄМСТВА (ЮР. ОСОБИ)";
    else if (code == "1.21") r = "БОРЖНИКИ";
    else if (code == "1.22") r = "СПІВРОБІТНИКИ- ШАХРАЇ";
    else if (code == "1.23") r = "КРЕДИТ СПИСАНИЙ ЗА РАХУНОК СТРАХОВОГО РЕЗЕРВУ";
    else if (code == "1.24") r = "ЗАСНОВНИК / КЕРІВНИК ПІДПРИЄМСТВА, КРЕДИТ ЯКОГО СПИСАНО ЗА РАХУНОК СТРАХОВОГО РЕЗЕРВУ";
    else if (code == "1.25") r = "ВЛАСНИК/КЕРІВНИК ЛІКВІДОВАНОГО ПІДПРИЄМСТВА";
    else if (code == "1.26") r = "НАДАННЯ НЕДОСТОВІРНИХ ВІДОМОСТЕЙ ПРО НАСТАННЯ СТРАХОВОГО ВИПАДКУ";
    else if (code == "1.27") r = "НЕЛОЯЛЬНІСТЬ ДО БАНКУ, ЩО МЕЖУЄ ІЗ ШАХРАЙСТВОМ";
    else if (code == "1.28") r = "СУБОРДИНОВАНІЙ БОРГ";
    else if (code == "1.29") r = "КЛІЄНТИ, ЗА ЯКИМИ ПРОВОДИЛАСЯ ПРЕТЕНЗІЙНО-ПОЗОВНА РОБОТА";
    else if (code == "1.30") r = "ЗАСНОВНИКИ ЮРИДИЧНИХ ОСІБ, ЩО МАЮТЬ ПРОБЛЕМНУ ЗАБОРГОВАНІСТЬ ПЕРЕД БАНКОМ";
    else if (code == "1.31") r = "ДОКУМЕНТИ ТЕРОРИСТІВ";
    else if (code == "1.32") r = "ЗАБОРОНА ВИЇЗДУ БОРЖНИКА ЗА КОРДОН";
    else if (code == "1.33") r = "БОРЖНИК, ПОВНА ВІДСУТНІСТЬ ПОГАШЕННЯ ЗА КРЕДИТОМ (МОЖЛИВО ШАХРАЙСТВО)";
    else if (code == "1.34") r = "ПОЗИВАЧІ, ЩО ПОДАЛИ ПОЗОВ ДО БАНКУ У СУД, А ТАКОЖ АДВОКАТИ/ПРЕДСТАВНИКИ ПОЗИВАЧІВ ПРОТИ БАНКУ";
    else if (code == "1.35") r = "ЮИРСТИ, ЩО ПРОВОДЯТЬ ПОЗОВНУ РОБОТУ У ВІДНОШЕННІ БАНКУ";
    else if (code == "1.36") r = "ПОРУШЕННЯ СПРАВИ ПРО БАНКРУТСТВО";
    else if (code == "1.37") r = "ЛІКВІДАЦІЯ ПІДПРИЄМСТВА (ЮР. ОСОБИ)";
    else if (code == "1.38") r = "НЕГАТИВНІ РЕЗУЛЬТАТИ ТЕСТУВАННЯ НА ПОЛІГРАФІ";
    else if (code == "1.39") r = "РИЗИК ПРОВЕДЕННЯ ЗЕД ОПЕРАЦІЙ";
    else if (code == "1.40") r = "ОПЕРАЦІЇ КЛІЄНТІВ, ЩО ПОТРАПЛЯЮТЬ ПІД ФІНАНСОВИЙ МОНІТОРИНГ";
    else if (code == "1.41") r = "ШАХРАЇ В ЕЛЕКТРОННИХ ОПЕРАЦІЯХ";
    else if (code == "1.42") r = "СТЯГНЕННЯ ЗАБОРГОВАНОСТІ НЕМОЖЛИВО, У ЗВ'ЯЗКУ  ІЗ ФОРС-МАЖОРНИМИ ОБСТАВИНАМИ";
    else if (code == "1.43") r = "ОСОБИ, ЗА ЯКИМИ ПОРУШЕНІ КРИМІНАЛЬНІ СПРАВИ";
    else if (code == "1.44") r = "ПОГАШЕННЯ КРЕДИТУ ТРЕТЬОЮ ОСОБОЮ";
    else if (code == "1.45") r = "ЗОВНІШНІЙ АРЕШТ";
    else if (code == "1.99") r = "ДОСТРОКОВЕ РОЗІРВАННЯ ДЕПОЗИТУ";
    else r = "Не найдено"
    return r;
}