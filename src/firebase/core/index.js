import firebase from 'firebase/app';
import 'firebase/functions';
import config from './config.js';

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp

export const functions = firebase.functions()

// const test = [
//   "02 luce ダブルダッチスクールクローバー",
//   "05 A'device SDDC島本ダブルダッチクラブ",
//   "12 S K T 一般",
//   "14 大猩々 京都大学 MTTR",
//   "20 Quartz 立命館大学BKC Fusion of Gambit",
//   "27 Voltter 京都産業大学 ダッチゃ",
//   "014 Why　not 麗澤大學",
//   "008 FEAST (中央区立有馬小学校　JumpJumpARIMA)",
//   "021 狛虹 狛江第二中学校ダブルダッチ部",
//   "025 minion 狛江ダブルダッチクラブ",
//   "028 Bveas 中央区立日本橋中学校",
//   "031 Fine Rock ふなばしダブルダッチクラブ（Ja☆p Steady Fam）",
//   "002 まめ☆狛 (狛江ダブルダッチクラブ)",
//   "008 FEAST (中央区立有馬小学校　JumpJumpARIMA)",
//   "1 Burn Out 20171126 舞台裏カメラ",
//   "6stepper'z",
//   "2 RuBatlO merS 神戸大学3回生",
//   "snow white 20181124",
//   "GAMU SHARA 20181125",
//   "31 琥珀",
//   "024 BLOOD JOKER",
//   "23 Skinny guineapig 追手門学院大学 Dutcher's616",
//   "b06 blockD1回戦第1試合",
//   "MTTR ONE'S 2019 SCENE1 3rd BATTLE 【Pann vs すえりょー】",
//   "ARASHIYAMA 2017/2/13",
//   "14 Blaze It 20171126",
//   "NNN 20181124 s",
//   "GAM SHARA 20181124s",
//   "３重耐久レース 2017 11 25",
//   "つかちゃん　単縄ソロ 2017/11/23",
//   "2 @pple π  20171124",
//   "staccato 2017 08 20",
//   "2019/1/29 フリーロープ2",
//   "2 a328",
//   "コッペパン20181113",
//   "明和高校 OB 20181122",
// ]
//
// test.forEach(rawTitle => {
// const result1 = rawTitle.match(/((?<index>\d+)\s)?(?<rest1>.*)/)
// // console.log(result1)
// const {index, rest1} = result1.groups
//
// const result2 = rest1.match(/(?<rest2>.*?)\s(?<affiliation>\S*(?:大学|大學|高校|中学校|小学校|ダブルダッチクラブ|ダブルダッチスクール)(?:\s?ダブルダッチ部)?.*\)?|一般)/) || {groups:{rest2: rest1}}
// let {affiliation, rest2} = result2.groups
//
// //(団体名)となっている場合にカッコを除去
// if(affiliation != null && (affiliation[0] == "(" || affiliation[0] == "（")){
//   affiliation = affiliation.slice(1, affiliation.length - 2)
// }
//
// const result3 = rest2.match(/(?<title>.*)\s(?:\s?(?<date>(\d{8}|(\d{4}(\/|\s)(\d{2}|\d{1})(\/|\s)(\d{2}|\d{1})))))(\s?s)?(?<title2>.*)/) || {groups:{title:rest2}}
// let {date, title, title2} = result3.groups
//
// //titleの前後の空白を除去
// title = title.trim()
// if(affiliation) affiliation = affiliation.trim()
//
// //dateが 2019/1/1 および 2019 1 1 となっている場合に対応
// if(date != null && !date.match(/\d{8}/)){
//   const result4 = date.match(/(?<year>\d{4})(\/|\s)(?<month>\d{2}|\d{1})(\/|\s)(?<day>\d{2}|\d{1})/)
//   date = result4.groups.year + ('0' + result4.groups.month).slice(-2) + ('0' + result4.groups.day).slice(-2)
// }
//
// console.log(index, affiliation, title + (title2 || ""), date)
// })
