import firebase from 'firebase/app';
import { videodb, configdb } from './core/database.js'
import axios from 'axios'
import user from './user.js'

export const searchVideoWithIndividualData = async (size=24, startIndex=0) => {
  console.log("SEARCH-VIDEO-WITH-INDIVIDUAL-DATA")
  console.log(size)
  if(!user.loggedIn){
    return []
  }
  const result = []
  await Promise.all(
    user.favorites.slice(startIndex, startIndex + size).map(async favoriteVid => {
      const document = await videodb.doc(favoriteVid).get()
      result.push(Object.assign(document.data(), {vid:favoriteVid}))
    })
  )
  return result
}

export const searchVideoWithVid = async (id) => {
  console.log("SEARCH-VIDEO-WITH-VID")
  const document = await videodb.doc(id).get()
  return Object.assign(document.data(), {vid:document.id})
}

export const searchVideoWithCategory = async (conditions, size, startIndex) => {
  console.log("SEARCH-VIDEO-WITH-CATEGORY")
  const query = await Object.entries(conditions)
                            .reduce((videodb, [dbtype, dbname]) => videodb.where(dbtype, '==', dbname), videodb)
                            .orderBy('index')
                            .startAt(startIndex)
                            .limit(size)
                            .get()
  const res = query.docs.map(document => Object.assign(document.data(), {vid:document.id}))
  console.log(res)
  return res
}

const categories = ["ACCEL PARTY", "Double Dutch Contest Japan", "WLDD", "DDGP", "Double Dutch Delight","FDDF",
                    "NF", "JC", "World Jump Rope & Championship", "DDGP", "オーキャン",
                    "GOLD","ルネ屋台","MTTR ONE\'S", "舞鶴合宿", "DDS", "五月祭", "発表会"]
const categoriesTable = {
  'ACCEL PARTY'                : 'accelparty',
  'Double Dutch Contest Japan' : 'ddcj',
  'WLDD'                       : 'wldd',
  'DDGP'                       : 'ddgp',
  'Double Dutch Delight'       : 'ddd',
  'FDDF'                       : 'fddf',
  'NF'                         : 'nf',
  'JC'                         : 'jc',
  'World Jump Rope & Championship' : 'worldjumprope',
  'DDGP'         : 'ddgp',
  'GOLD'         : 'gold',
  'MTTR ONE\'S'  : 'mttrones',
  'DDS'          : 'dds',
  '舞鶴合宿'      : '舞鶴合宿',
  'ルネ屋台'      : 'ルネ屋台',
  'オーキャン'     : 'opencampus',
  '五月祭'        : '五月祭',
  '発表会'        : '発表会',
}

export const inverseCategoriesTable = Object.entries(categoriesTable).reduce((acc, [k, v]) => Object.assign(acc, {[v]:k}), {})

let str = ""
let count = 0

export const updateDb = async (updateAll = false) => {
  const dbConfigDocref = configdb.doc('lastUpload')
  const dbLastUpdate = (await dbConfigDocref.get()).data().timestamp.toDate()
  const nowTimestamp = firebase.firestore.FieldValue.serverTimestamp()
  const apiSectionResponse = await axios.get('https://www.googleapis.com/youtube/v3/channelSections', {
    params: {
      part: 'snippet,contentDetails',
      channelId: 'UCZG2tzKfBIhQb0Cn9xPul9w',
      maxResults: 50,
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    },
  }).catch(e => console.error(`SECTION ERROR`))

  //1. セクションから取得
  apiSectionResponse.data.items.filter(section => section.contentDetails != null).forEach(section => {
    const playlistIds = section.contentDetails.playlists

    playlistIds.forEach(async playlistId => {
      const apiPlaylistResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
        params: {
          part: 'snippet',
          id: playlistId,
          maxResults: 50,
        },
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      }).catch(_ => console.log(`PLAYLIST ERROR: ${section.snippet.title} ${apiPlaylistResponse.data.items[0].snippet.title}(${playlistId})`))
      const sectionTitle = section.snippet.title
      const playlistTitle = apiPlaylistResponse.data.items[0].snippet.title

      const category = (() => {
        if(categories.includes(sectionTitle)) return categoriesTable[sectionTitle]
        //発表会が入っていれば発表会
        if(playlistTitle.includes("発表会")) return "発表会"
        const result = playlistTitle.match(new RegExp(categories.join("|")))
        if(result != null){
          return categoriesTable[result[0]]
        }
        return "その他"
      })()
      let year = playlistTitle.match(/\d{4}/) != null ? parseInt(playlistTitle.match(/\d{4}/)[0]) : null
      const day = (() => {
        if(category == "nf"){
          const result1 = playlistTitle.match(/(\d+)日目/)
          if(result1 != null) return parseInt(result1[1])
          const result2 = playlistTitle.match(/([０-９]+)日目/)
          if(result2 != null) return parseInt(result2[1].replace(/./, s => String.fromCharCode(s.charCodeAt(0) - 65248)))
          const result3 = playlistTitle.match(/([一二三四五六七八九十〇]+)日目/)
          if(result3 != null){
            if(result3 >= 11) console.error("Unsupported Kansuji (over 10)")
            switch(result3[1]){
              case '一': return 1;case '二': return 2;case '三': return 3;case '四': return 4;case '五': return 5;
              case '六': return 6;case '七': return 7;case '八': return 8;case '九': return 9;case '十': return 10;
            }
          }
        }
        return null
      })()
      let department = (() => {
        if(category === "nf"){
          const result1 = playlistTitle.match(/ステージ|Finale/)
          if(result1 != null) return result1[0]
          const result2 = playlistTitle.match(/ダブルダッチ|単縄/)
          if(result2 != null) return result2[0]
          const result3 = playlistTitle.match(/Special Movie/)
          if(result3 != null) return result3[0]
          return null
        }
        if(category === '発表会'){
          //大会名をdepartmentとして登録
          const result = playlistTitle.match(new RegExp(categories.filter(x => x !== '発表会').join("|")))
          if(result != null){
            return categoriesTable[result[0]]
          }
          return "その他"
        }
        if(category === 'ddcj' && year === 2019){
          const result = playlistTitle.match(/OPEN①|OPEN②|DDCJF/i)
          if(result != null){
            return result[0] === 'OPEN①' ? 'OPEN1' : result[0] === 'OPEN②' ? 'OPEN2' : 'FINAL'
          }
        }
        const departmentMatchResult = playlistTitle.match(/OPEN|JUNIOR|U-19|MTTR|NOVICE|ADVANCE|CHALLENGE|一回生|一般|13JC 個人戦フリースタイル|13JC 団体戦フリースタイル|シングルフリースタイル|スピード|ペアフリースタイル|BATTLE|SHOW CASE|フリーロープ|その他/i)
        return departmentMatchResult != null ? departmentMatchResult[0].toUpperCase() : null
      })()

      let nextPageToken = null;
      do{
        const apiItemlistResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
          params: {
            part: 'snippet',
            playlistId: playlistId,
            maxResults: 50,
            pageToken: nextPageToken,
          },
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        }).catch(_ => console.error(`PLAYLIST ERROR: ${section.snippet.title} ${apiPlaylistResponse.data.items[0].snippet.title}(${playlistId})`))
        nextPageToken = apiItemlistResponse.data.nextPageToken
        apiItemlistResponse.data.items.forEach(async (item, autoIndex) => {
            const rawTitle = item.snippet.title.trim()
            const {title, affiliation=null, index=null, originatedDate1=null} = (() => {
              const result1 = (() => {
                if(category === 'gold'){
                  return rawTitle.match(/((s|b)?(?<index>\d+)\s)?(?<rest1>.*)/)
                }else{
                  return rawTitle.match(/((?<index>\d+)\s)?(?<rest1>.*)/)
                }
              })()
              let {index, rest1} = result1.groups
              if(index == null || isNaN(index)){
                index = autoIndex + 1
              }else{
                index = parseInt(index)
              }

              const result2 = rest1.match(/(?<rest2>.*?)\s(?<affiliation>\S*(?:大学|大學|高校|中学校|小学校|ダブルダッチクラブ|ダブルダッチスクール)(?:\s?ダブルダッチ部)?.*\)?|一般)/) || {groups:{rest2: rest1}}
              let {affiliation, rest2} = result2.groups

              //(団体名)となっている場合にカッコを除去
              if(affiliation != null && (affiliation.trim()[0] == "(")){
                affiliation = affiliation.slice(1, affiliation.length - 1)
              }

              const result3 = rest2.match(/(?<title>.*)\s(?:\s?(?<date>(\d{8}|(\d{4}(\/|\s)(\d{2}|\d{1})(\/|\s)(\d{2}|\d{1})))))(\s?s)?(?<title2>.*)/) || {groups:{title:rest2}}
              let {date, title, title2} = result3.groups

              //titleの前後の空白を除去
              title = title.trim()
              if(affiliation) affiliation = affiliation.trim()

              //dateをDateオブジェクト化
              if(date != null){
                if(!date.match(/\d{8}/)){
              	  const result4 = date.match(/(?<year>\d{4})(\/|\s)(?<month>\d{2}|\d{1})(\/|\s)(?<day>\d{2}|\d{1})/)
                  date = new Date(`${result4.groups.year}-${result4.groups.month}-${result4.groups.day}`)
                }else{
                	date = new Date(`${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`)
                }
                //dateがInvalid Dateだった場合
                if(isNaN(date.getTime())){
                  date = null
                }
              }

              return {index, affiliation, title: title + (title2 || ""), originatedDate1:date}
            })()
            const rawDescription = item.snippet.description
            const originatedDate2 = (() => {
              const dateArr = rawDescription.match(/(\d{4})\/(\d{2}|\d{1})\/(\d{2}|\d{1})/)
              if(dateArr != null) return new Date(`${dateArr[1]}-${dateArr[2]}-${dateArr[3]}`)
              return null
            })()
            const originatedDate = originatedDate1 != null ? originatedDate1 : originatedDate2 != null ? originatedDate2 : null

            if(category !== 'ddcj' && category !== 'nf' && category !== 'mttrones' && category !== '発表会'){
              const departmentMatchResult = rawDescription.match(/(?<year>\d{4})\/(?<month>\d{2}|\d{1})\/(?<day>\d{2}|\d{1})\s?「.*」\s?(?<department>OPEN|JUNIOR|U-19|MTTR|NOVICE|ADVANCE|CHALLENGE|一回生|一般|13JC 個人戦フリースタイル|13JC 団体戦フリースタイル|シングルフリースタイル|スピード|ペアフリースタイル|BATTLE|SHOW CASE|フリーロープ|その他)部門/i)
              department = departmentMatchResult != null ? departmentMatchResult.groups.department.toUpperCase() : null
              year = departmentMatchResult != null ? parseInt(departmentMatchResult.groups.year) : null
            }

            const description = (() => {
              const startIndex = rawDescription.indexOf("」")
              return rawDescription.slice(startIndex+1).trim()
            })()

            const vId = item.snippet.resourceId.videoId
            const apiVideoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
              params: {
                part: 'snippet,contentDetails',
                id: vId,
              },
              headers: {
                Authorization: `Bearer ${user.token}`
              },
            }).catch(_ => console.error(`VIDEO ERROR: ${section.snippet.title} ${apiPlaylistResponse.data.items[0].snippet.title}(${playlistId}) ${title} (${vId})`))
            const uploadDate = new Date(apiVideoResponse.data.items[0].snippet.publishedAt)
            const thumbnailURL = apiVideoResponse.data.items[0].snippet.thumbnails.default.url
            const duration = apiVideoResponse.data.items[0].contentDetails.duration

            str += `{vid:${vId}, title:${title}, rawTitle:${rawTitle}, description:${description}, rawDescription:${rawDescription}, uploadDate:${uploadDate}, thumbnailURL:${thumbnailURL}, duration:${duration}, vId:${vId}, category:${category}, department:${department}, year:${year}, day:${day}, originatedDate:${originatedDate}, affiliation:${affiliation}, index:${index}, timestamp${nowTimestamp}}\n`
            count += 1
            if(count >= 100){
              console.log(str)
              str = ""
              count = 0
            }

            if(uploadDate.getTime() > dbLastUpdate.getTime() || updateAll){
              videodb.doc(vId).set({
                title,
                rawTitle,
                description,
                rawDescription,
                uploadDate,
                thumbnailURL,
                duration,
                category,
                department,
                year,
                day,
                originatedDate,
                affiliation,
                index,
                provider:'Youtube',
                timestamp: nowTimestamp,
              })
            }
          })
        }while(nextPageToken != null)
    })
  })
  dbConfigDocref.set({timestamp: nowTimestamp})
}
