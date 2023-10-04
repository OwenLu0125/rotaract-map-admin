import * as React from 'react';
import { useEffect, useState } from 'react';
import * as authProtocol from '../Backend/StoreProtocol';
import { Store } from '../Backend/types/Store'
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { CompaniesAdd } from 'src/sections/companies/companies-add';

// FIXME: 串接的方式
const companies = [
  {
    "creatorId": null,
    "createdTime": null,
    "lastModifierId": null,
    "lastModifiedTime": null,
    "id": 1,
    "categoryId": "2",
    "name": "WN Baker Studio",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/w_n_baker_studio.jpg",
    "siteUrl": null,
    "address": "線上",
    "openingHours": "週一~週日 下午18:00-21:00",
    "closedHours": "無",
    "phone": "0982116183",
    "lineId": "wilsonlee83",
    "description": "以減糖蛋糕為開始，以吃的開心為結束，讓微笑一直都在。一顆蛋糕可以有無限的可能減糖讓你吃的開心又安心有一份小幸福，體重也減少一份小負擔-W N Baker StudioLess Sugar (*) Healthy Life",
    "discountInfo": "客製化生日蛋糕 9折巴斯克、巧克力、乳酪蛋糕系列 85折點心系列8折",
    "discountDescription": "訂購方式  兩週前預訂請洽IG或是官方LINE訂購配送方式自取",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": null,
    "longitude": null
  },
  {
    "creatorId": null,
    "createdTime": null,
    "lastModifierId": null,
    "lastModifiedTime": null,
    "id": 2,
    "categoryId": "4",
    "name": "摩拓旅程-ZOCHA",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/zocha.png",
    "siteUrl": "https://www.zocha.com.tw",
    "address": "ZOCHA 基隆站前店ZOCHA 台北西門店ZOCHA 台中站前店ZOCHA 台南文創店ZOCHA 高雄站前店ZOCHA 台東站前店",
    "openingHours": "各門店不同，須至官網查詢 https://www.zocha.com.tw/shop",
    "closedHours": "各門店不同，須至官網查詢 https://www.zocha.com.tw/shop",
    "phone": "0226559021",
    "lineId": "@ZOCHA",
    "description": "ZOCHA\"的諧音同於租車的台語(ㄗㄡ ㄑ一ㄚ)希望能展現出台灣在地化的精神。-我們成立於2017年由一群熱愛騎車旅行的年輕人成立的新創租機車平台透過現有的互聯網技術打造一個快速 安全 透明的租機車的平台。讓騎車旅行這間事情變得更簡單更有保障。",
    "discountInfo": "短租（平日8折、假日9折）長租（平假日95折）週五到週日屬於假日、週一到週四屬於平日",
    "discountDescription": "1.請於訂單備註內註明租借日期與時間，確切計時會以當日取車時間為準。2.完成訂單後，請先至系統完成註冊與證件上傳，可以大幅縮短當天的取車時間。3.本優惠不可與其他優惠一同使用4.非持有台灣駕照的外籍旅客請於下單前電話確認，依照台灣監理站公告互惠國持有國際駕照在台灣的使用狀況做判斷。",
    "discountStartTime": "2023-05-22T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": "",
    "longitude": null
  },
  {
    "creatorId": null,
    "createdTime": "2023-08-01T07:20:38",
    "lastModifierId": null,
    "lastModifiedTime": "2023-07-22T07:20:38",
    "id": 3,
    "categoryId": "1",
    "name": "采星企業有限公司",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/tsai_sing.png",
    "siteUrl": null,
    "address": "台北市萬華區西園路二段281巷10號1樓",
    "openingHours": "09:00-18:00",
    "closedHours": "依政府公布休假日",
    "phone": "",
    "lineId": "@258iamus",
    "description": "-海報-名片-貼紙-手冊-包裝盒-提袋-大圖輸出",
    "discountInfo": "全品項印刷品9折",
    "discountDescription": "出示APP憑證即可享有優惠",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": "25.0244591",
    "longitude": "121.489349"
  },
  {
    "creatorId": null,
    "createdTime": "2023-08-01T07:20:38",
    "lastModifierId": null,
    "lastModifiedTime": "2023-07-22T07:20:38",
    "id": 4,
    "categoryId": "1",
    "name": "佳德印刷有限公司",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/jiadeys.png",
    "siteUrl": null,
    "address": "新北市中和區立言街52號",
    "openingHours": "禮拜一~五 早上09:00~18:00",
    "closedHours": "六日",
    "phone": "0922788797",
    "lineId": "xd55555",
    "description": "-名片-喜帖,-彩盒-吊卡-說明書-海報-書籍…等等各類紙品印刷",
    "discountInfo": "全館九五折",
    "discountDescription": "來店銷費九五折,稅另計。",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": "25.0068018",
    "longitude": "121.485785"
  },
  {
    "creatorId": null,
    "createdTime": "2023-08-01T07:20:38",
    "lastModifierId": null,
    "lastModifiedTime": "2023-07-22T07:20:38",
    "id": 5,
    "categoryId": "3",
    "name": "舒芙亞-士林店",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/sofuya.jpg",
    "siteUrl": "https://www.sofuya.com.tw/",
    "address": "台北市士林區文林路562號1樓(近士林站)",
    "openingHours": "11:00～21:00",
    "closedHours": "每周日",
    "phone": "02-28342377",
    "lineId": "@ynt1693l",
    "description": "創辦人深信人天生就是愛美的，只是可能有些人找不到一個適合自己的方式 ，如果從小就開始懂得用適合自己的方式照顧自己的身、心、靈，那麼我們天生就 會散發自信跟光彩，『美』這件事就會陪著我們一起長大。-舒芙亞秉持專業和長期的經驗，帶給顧客最全面的肌膚呵護服務，堅持以最溫和的 方式、親切的服務，帶您感受深層的肌膚饗宴，讓您帶著微笑享受成為全新的自己 ，在自己的領域裡不論是，職場、校園、家庭都能發光發熱，萌芽茁壯。",
    "discountInfo": "體驗價1299 購買課程2萬10堂送2堂 購買課程3萬15堂送4堂",
    "discountDescription": "現場告知扶青或扶輪即可",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": "25.0977285",
    "longitude": "121.521486"
  },
  {
    "creatorId": null,
    "createdTime": "2023-08-01T07:20:38",
    "lastModifierId": null,
    "lastModifiedTime": "2023-07-22T07:20:38",
    "id": 6,
    "categoryId": "2",
    "name": "休憩Ramen&Bar",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/ramen_bar.jpg",
    "siteUrl": "https://instagram.com/xiuqi_4171?igshid=NTc4MTIwNjQ2YQ==",
    "address": "台北市大安區仁愛路四段417-1號1樓",
    "openingHours": "週日至週四：1900-0300 週五至週六：1900-0400",
    "closedHours": "無",
    "phone": "0227407600",
    "lineId": "",
    "description": "Hello 這裡是休憩Ramen&Bar-休憩在日語中為較短時間的休息例如....下班回家前吃碗拉麵喝個酒？-歡迎扶青的夥伴在任何時刻過來休憩一下不論是聚會或是一個人小酌填飽肚子我們都期望為你充飽電再前進",
    "discountInfo": "消費滿2000招待 莎莎脆餅一份 消費滿3000招待 松露薯條一份 消費滿4000招待 每人shot一杯 消費滿6000 可享95折 消費滿8000 可享9折 以上優惠為門檻制，達門檻即可獲得優惠喔，消費越多，優惠越多",
    "discountDescription": "優惠期間為自 2023 年 06 月 07 日 起至 2023 年 09 月 07 日，平假日皆可使用預約方式：不需預約，到店時請告知使用本優惠其他：1.本優惠僅供內用，2.外送、店內優惠活動恕不適用(併用)本優惠折抵3.商品內容依季節時令調整，實際商品、價目依現場提供為主",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": "25.038098",
    "longitude": "121.553548"
  },
  {
    "creatorId": null,
    "createdTime": "2023-08-01T07:20:38",
    "lastModifierId": null,
    "lastModifiedTime": "2023-07-22T07:20:38",
    "id": 7,
    "categoryId": "5",
    "name": "錦笙行珠寶",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/jin_sheng.jpg",
    "siteUrl": "https://www.facebook.com/jascojewelry",
    "address": "台北市大安區信義路四段258號12樓之3",
    "openingHours": "週一～週五 10:00～20:00 採預約制",
    "closedHours": "無",
    "phone": "",
    "lineId": "@idy8585c",
    "description": "錦笙行珠寶在批發業界已有30年經驗專營18K珠寶設計、訂製、批發零售✨我們的服務項目如下：1. 各式18K設計款珠寶2. 婚戒訂製、精選對戒3. 輕珠寶，預算$20,0004. 舊台翻新、裸石設計鑲台5. 非登記資產配置、傳家寶",
    "discountInfo": "訂30分鑽戒送精美拭金皮訂50分婚戒送珍珠項鍊訂1克拉婚戒送經典對戒",
    "discountDescription": "優惠期間為自 2023 年 07月 01日 起至 2024年 06 月 30 日。1. 凡訂30分鑽戒送精美拭金皮2. 凡訂50分婚戒送珍珠項鍊3. 凡訂1克拉婚戒送經典對戒注意事項：1.本優惠不限使用次數2.本優惠不可累贈3. 商品內容依時價調整，實際商品、價格依現場提供為主4. 優惠贈品由商家決定，珍珠項鍊、對戒款式等5. 若需到店鑑賞則需預約，請洽聯絡人6. 商家保有最終優惠權利",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": "25.0329863",
    "longitude": "121.551384"
  },
  {
    "creatorId": null,
    "createdTime": "2023-08-01T07:20:38",
    "lastModifierId": null,
    "lastModifiedTime": "2023-07-22T07:20:38",
    "id": 8,
    "categoryId": "3",
    "name": "舒芙亞-板橋店",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/sofuya.jpg",
    "siteUrl": "https://www.sofuya.com.tw/",
    "address": "新北市板橋區中山路一段50巷4號3樓(近府中站)",
    "openingHours": "11:00～21:00",
    "closedHours": "每周日",
    "phone": "02-89513318",
    "lineId": "@aif7470d",
    "description": "創辦人深信人天生就是愛美的，只是可能有些人找不到一個適合自己的方式 ，如果從小就開始懂得用適合自己的方式照顧自己的身、心、靈，那麼我們天生就 會散發自信跟光彩，『美』這件事就會陪著我們一起長大。-舒芙亞秉持專業和長期的經驗，帶給顧客最全面的肌膚呵護服務，堅持以最溫和的 方式、親切的服務，帶您感受深層的肌膚饗宴，讓您帶著微笑享受成為全新的自己 ，在自己的領域裡不論是，職場、校園、家庭都能發光發熱，萌芽茁壯。",
    "discountInfo": "體驗價1299 購買課程2萬10堂送2堂 購買課程3萬15堂送4堂",
    "discountDescription": "現場告知扶青或扶輪即可",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": "25.0085786",
    "longitude": "121.457862"
  },
  {
    "creatorId": null,
    "createdTime": "2023-08-01T07:20:38",
    "lastModifierId": null,
    "lastModifiedTime": "2023-07-22T07:20:38",
    "id": 9,
    "categoryId": "3",
    "name": "舒芙亞-西門店",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/sofuya.jpg",
    "siteUrl": "https://www.sofuya.com.tw/",
    "address": "台北市萬華區漢口街二段7號3樓(西門站6號出口)",
    "openingHours": "11:00～21:00",
    "closedHours": "每周日",
    "phone": "02-23120002",
    "lineId": "@sofuya2",
    "description": "創辦人深信人天生就是愛美的，只是可能有些人找不到一個適合自己的方式 ，如果從小就開始懂得用適合自己的方式照顧自己的身、心、靈，那麼我們天生就 會散發自信跟光彩，『美』這件事就會陪著我們一起長大。-舒芙亞秉持專業和長期的經驗，帶給顧客最全面的肌膚呵護服務，堅持以最溫和的 方式、親切的服務，帶您感受深層的肌膚饗宴，讓您帶著微笑享受成為全新的自己 ，在自己的領域裡不論是，職場、校園、家庭都能發光發熱，萌芽茁壯。",
    "discountInfo": "體驗價1299 購買課程2萬10堂送2堂 購買課程3萬15堂送4堂",
    "discountDescription": "現場告知扶青或扶輪即可",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-08-23T08:20:38",
    "latitude": "25.0434652",
    "longitude": "121.501425"
  },
  {
    "creatorId": null,
    "createdTime": "2023-08-01T07:20:38",
    "lastModifierId": null,
    "lastModifiedTime": "2023-07-31T23:31:53",
    "id": 10,
    "categoryId": "4",
    "name": "海人之島潛水俱樂部",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/ocean_kind_dive.png",
    "siteUrl": "https://oceankinddive.com/ FB:海人之島潛水俱樂部/ IG: oceankind_dive",
    "address": "台北市信義區永吉路278巷17號",
    "openingHours": "預約制",
    "closedHours": "預約制",
    "phone": null,
    "lineId": "@619dacoe",
    "description": "台灣四面環海，但大多數人卻懼怕著大海。有感於親海教育的不足，海人之島潛水俱樂部自2021年起開始經營水肺潛水的教學與活動，致力於讓潛水成為台灣人必備的技能。-海人之島結合台灣及國外潛水場域資源，擁有北部及南部雙據點，每年舉辦超過多次潛水旅遊，帶領潛水員們探索水面下的世界。-秉持著俱樂部共好的精神，從教學、潛水旅遊、到裝備挑選一條龍包辦，都是為了培育會員們持續親近大海的能力，深化在水域活動的發展。會員間透過每次潛水建立的深厚友誼，也歡迎你一起進入潛水的世界。",
    "discountInfo": "全店價目9折優惠",
    "discountDescription": "優惠期間至2023/12/31止請先加入官方Line並出示證明，方可享有優惠本店對優惠內容保有最終解釋權",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-12-31T23:59:59",
    "latitude": "25.0448446",
    "longitude": "121.571682"
  },
  {
    "creatorId": null,
    "createdTime": "2023-09-04T16:11:12",
    "lastModifierId": null,
    "lastModifiedTime": null,
    "id": 11,
    "categoryId": "5",
    "name": "耘物",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/yun_wu.jpg",
    "siteUrl": null,
    "address": "台北市中山區民生東路三段29號7樓",
    "openingHours": "週一至週五9:00-18:00",
    "closedHours": "假日及國定假日",
    "phone": "0914039199",
    "lineId": null,
    "description": "品牌名稱「耘物」，音同「雲霧」，蘊含了豐富的象徵意義。「耘」這個字源自於耕耘，象徵著種植和培養的過程。我們希望透過耘物的珠寶飾品，猶如種子一樣，在每個人的生命中撒下美麗和正面的種子，讓他們在生活中綻放光彩。我們的珠寶飾品由闆娘和闆闆純手工製作而成，展現出與他人不同的風格和獨特性。我們精心選取來自世界各地的優質水晶，並以巧妙的方式將它們結合在一起，創造出獨一無二的設計。項鏈、手鍊和戒指等各式珠寶飾品，都能為您的穿著增添一份獨特的魅力。耘物重視每位顧客的需求和品味，致力於設計與眾不同的飾品，迎合不同風格和場合的需求。無論您尋找一份特別的禮物，或是希望為自己增添一點光彩，耘物都能提供完美的選擇。我們相信，水晶不僅僅是一種裝飾品，更是表達個人風格和情感的方式。佩戴耘物飾品的人能感受到水晶所帶來的愉悅和能量，並在他們的生活中散發出獨特的光芒。謝謝您對耘物的關注。",
    "discountInfo": "1.IG私訊下單單件免運2.下單回傳通關密語:扶青扶輪3482，即可享有該筆訂單9折優惠",
    "discountDescription": "優惠期間為自 2023 年 07 月 01 日 起兌換至 2024 年 06 月 30 日，平假日皆可使用",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-12-31T23:59:59",
    "latitude": null,
    "longitude": null
  },
  {
    "creatorId": null,
    "createdTime": "2023-09-04T16:11:12",
    "lastModifierId": null,
    "lastModifiedTime": null,
    "id": 12,
    "categoryId": "6",
    "name": "明智攝影",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/kunzhi_ma.png",
    "siteUrl": null,
    "address": "線上",
    "openingHours": "24hr",
    "closedHours": "無",
    "phone": "0919472609",
    "lineId": "xavier0810",
    "description": "提供各式活動平面紀錄服務（例會、派對、研討會等等）Flickr照片參考(陸續更新中)https://flickr.com/photos/198372023@N06",
    "discountInfo": "6000/一個時段（約3hr）",
    "discountDescription": "透過Line聯繫本人",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-12-31T23:59:59",
    "latitude": null,
    "longitude": null
  },
  {
    "creatorId": null,
    "createdTime": "2023-09-04T16:11:12",
    "lastModifierId": null,
    "lastModifiedTime": null,
    "id": 13,
    "categoryId": "3",
    "name": "樂到家國際有限公司",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/masaki_le_tao_chia.jpeg",
    "siteUrl": null,
    "address": "線上",
    "openingHours": "預約制：10:00-20:00",
    "closedHours": "無",
    "phone": null,
    "lineId": "dtboy",
    "description": "我們自1991年起，深耕於中永和區，為美髮材料的批發，主要服務項目為美髮行業開店的用品及儀器，代理多項美髮材料品牌，使命在於為美髮行業提供優質的商品及服務，透過商品創新及市場洞見來快速解決美髮師們所遇到的問題，讓每位美髮師能夠專注於己身專業來服務顧客的需求，讓顧客在獨特的造型中展現自信和美麗。",
    "discountInfo": "優惠1.購買品牌JELIKA鉑金護髮40ml享三送一優惠優惠2.免費提供基礎頭皮檢測諮詢服務（採預約制）",
    "discountDescription": "優惠期間為自 2023 年 9 月 1日 起兌換至 2024年8月31日，平假日皆可使用預約方式：服務皆採Line私訊（預約制）說明：1.優惠1.僅供宅配/7-11店到店服務（運費另計）每人不限使用次數2.優惠2.採Line私訊預約制，每人每4個月免費次數1次（依服務人員安排時間為主）",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-12-31T23:59:59",
    "latitude": null,
    "longitude": null
  },
  {
    "creatorId": null,
    "createdTime": "2023-09-04T16:11:12",
    "lastModifierId": null,
    "lastModifiedTime": null,
    "id": 13,
    "categoryId": "3",
    "name": "樂到家國際有限公司",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/masaki_le_tao_chia.jpeg",
    "siteUrl": null,
    "address": "線上",
    "openingHours": "預約制：10:00-20:00",
    "closedHours": "無",
    "phone": null,
    "lineId": "dtboy",
    "description": "我們自1991年起，深耕於中永和區，為美髮材料的批發，主要服務項目為美髮行業開店的用品及儀器，代理多項美髮材料品牌，使命在於為美髮行業提供優質的商品及服務，透過商品創新及市場洞見來快速解決美髮師們所遇到的問題，讓每位美髮師能夠專注於己身專業來服務顧客的需求，讓顧客在獨特的造型中展現自信和美麗。",
    "discountInfo": "優惠1.購買品牌JELIKA鉑金護髮40ml享三送一優惠優惠2.免費提供基礎頭皮檢測諮詢服務（採預約制）",
    "discountDescription": "優惠期間為自 2023 年 9 月 1日 起兌換至 2024年8月31日，平假日皆可使用預約方式：服務皆採Line私訊（預約制）說明：1.優惠1.僅供宅配/7-11店到店服務（運費另計）每人不限使用次數2.優惠2.採Line私訊預約制，每人每4個月免費次數1次（依服務人員安排時間為主）",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-12-31T23:59:59",
    "latitude": null,
    "longitude": null
  },
  {
    "creatorId": null,
    "createdTime": "2023-09-04T16:11:12",
    "lastModifierId": null,
    "lastModifiedTime": null,
    "id": 13,
    "categoryId": "3",
    "name": "樂到家國際有限公司",
    "status": "opening",
    "logoImageUrl": "http://35.236.190.89/image/logo/masaki_le_tao_chia.jpeg",
    "siteUrl": null,
    "address": "線上",
    "openingHours": "預約制：10:00-20:00",
    "closedHours": "無",
    "phone": null,
    "lineId": "dtboy",
    "description": "我們自1991年起，深耕於中永和區，為美髮材料的批發，主要服務項目為美髮行業開店的用品及儀器，代理多項美髮材料品牌，使命在於為美髮行業提供優質的商品及服務，透過商品創新及市場洞見來快速解決美髮師們所遇到的問題，讓每位美髮師能夠專注於己身專業來服務顧客的需求，讓顧客在獨特的造型中展現自信和美麗。",
    "discountInfo": "優惠1.購買品牌JELIKA鉑金護髮40ml享三送一優惠優惠2.免費提供基礎頭皮檢測諮詢服務（採預約制）",
    "discountDescription": "優惠期間為自 2023 年 9 月 1日 起兌換至 2024年8月31日，平假日皆可使用預約方式：服務皆採Line私訊（預約制）說明：1.優惠1.僅供宅配/7-11店到店服務（運費另計）每人不限使用次數2.優惠2.採Line私訊預約制，每人每4個月免費次數1次（依服務人員安排時間為主）",
    "discountStartTime": "2023-07-23T07:20:38",
    "discountEndTime": "2023-12-31T23:59:59",
    "latitude": null,
    "longitude": null
  }
]

const Page = () => {
  const [companiesData, setCompaniesData] = useState([]);
// FIXME: 串接的寫法
  useEffect(() => {
    try {
      const data = authProtocol.getStore()
      console.log(data)
      setCompaniesData(data)
    } catch (error) {
      console.error(error)
    }
  }, []);

  useEffect(() => {
    console.log(companiesData)
  }, [companiesData])
  return (
    <>
      <Head>
        <title>
          Companies | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  已註冊店家
                </Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <CompaniesAdd />
            </Stack>
            <CompaniesSearch />
            <Grid
              container
              spacing={3}
            >
              {companies.map((company) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={company.id}
                >
                  <CompanyCard company={company} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
