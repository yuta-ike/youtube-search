import { getStructures, updateStructures } from './firebase/folderManager.js'

export default getStructures()

const time = (date) => {
  date.setHours(0,0,0,0)
  return date
}

const folders = [
  {
    displayName: "大会その1",
    restriction: {},
    children: [
      {
        displayName:"We Love Double Dutch",
        restriction: {category:"wldd",},
        children: [
          {
            displayName:"2017",
            restriction: {year:2017,},
            children: [
              {
                displayName:"OPEN",
                restriction: {department:"OPEN",},
                children:null,
              },
              {
                displayName:"NOVICE",
                restriction: {department:"NOVICE",},
                children:null,
              },
              {
                displayName:"ADVANCE",
                restriction: {department:"ADVANCE",},
                children:null,
              },
            ]
          },
          {
            displayName:"2016",
            restriction: {year:2016,},
            children: [
              {
                displayName:"OPEN",
                restriction: {department:"OPEN",},
                children:null,
              },
            ]
          },
        ]
      },
      {
        displayName:"Double Dutch Grand Prix",
        restriction: {category:'ddgp',},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children: [
              {
                displayName:"OPEN1",
                restriction: {department:"OPEN1",},
                children:null,
              },
              {
                displayName:"OPEN2",
                restriction: {department:"OPEN2",},
                children:null,
              },
              {
                displayName:"一回生",
                restriction: {department:"一回生",},
                children:null,
              },
              {
                displayName:"一般",
                restriction: {department:"一般",},
                children:null,
              },
              {
                displayName:"CHALLENGE",
                restriction: {department:'CHALLENGE',},
                children:null,
              },
              {
                displayName:"NOVICE",
                restriction: {department:'NOVICE',},
                children:null,
              },
              {
                displayName:"ADVANCED",
                restriction: {department:'ADVANCED',},
                children:null,
              },
              {
                displayName:"その他",
                restriction: {department:"その他",},
                children:null,
              },
            ]
          }
        ]
      },
      {
        displayName:"Double Dutch Delight West",
        restriction: {category:"ddd",},
        children: [
          {
            displayName: "2019",
            restriction: {year:2019,},
            children: [
              {
                displayName: "OPEN",
                restriction: {department:"OPEN",},
                children:null,
              },
              {
                displayName: "一般",
                restriction: {department:"一般",},
                children:null,
              },
              {
                displayName:"NOVICE",
                restriction: {department:"NOVICE",},
                children:null,
              },
              {
                displayName:"ADVANCED",
                restriction: {department:"ADVANCED",},
                children:null,
              },
              {
                displayName:"その他",
                restriction: {department:"その他",},
                children:null,
              },
            ]
          },
          {
            displayName: "2017",
            restriction: {year:2017,},
            children: [
              {
                displayName: "OPEN",
                restriction: {department:"OPEN",},
                children:null,
              },
              {
                displayName: "一般",
                restriction: {department:"一般",},
                children:null,
              },
              {
                displayName:"NOVICE",
                restriction: {department:"NOVICE",},
                children:null,
              },
              {
                displayName:"ADVANCE",
                restriction: {department:"ADVANCE",},
                children:null,
              },
            ]
          },
          {
            displayName:"2016",
            restriction: {year:2016,},
            children: [
              {
                displayName:"OPEN",
                restriction: {department:"OPEN",},
                children:null,
              },
              {
                displayName:"一般",
                restriction: {department:"一般",},
                children:null,
              },
              {
                displayName:"NOVICE",
                restriction: {department:"NOVICE",},
                children:null,
              },
              {
                displayName:"ADVANCED",
                restriction: {department:"ADVANCED",},
                children:null,
              },
            ]
          },
        ]
      },
      {
        displayName: "Accel Party",
        restriction: {category: "accelparty",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children:null
          },
          {
            displayName:"2017",
            restriction: {year:2017,},
            children:null
          },
          {
            displayName:"2016",
            restriction: {year:2016,},
            children:null
          },
        ]
      },
      {displayName:"Double Dutch Contest",
        restriction: {category:"ddcj",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children: [
              {
                displayName:"OPEN1",
                restriction: {department:"OPEN1",},
                children:null,
              },
              {
                displayName:"OPEN2",
                restriction: {department:"OPEN2",},
                children:null,
              },
              {
                displayName:"U-19",
                restriction: {department:"U-19",},
                children:null,
              },
              {
                displayName:"JUNIOR",
                restriction: {department:"JUNIOR",},
                children:null,
              },
              {
                displayName:"MTTR",
                restriction: {department:"MTTR",},
                children:null,
              },
              {
                displayName:"FINAL",
                restriction: {department:"FINAL",},
                children:null,
              },
            ]
          },
          {
            displayName:"2018",
            restriction: {year:2018,},
            children: [
              {
                displayName:"OPEN",
                restriction: {department:"OPEN",},
                children:null,
              },
            ]
          },
          {
            displayName:"2017",
            restriction: {year:2017,},
            children: [
              {displayName:"OPEN",
                restriction: {department:"OPEN",},
                children:null,
              },
            ]
          },
          {
            displayName:"2016",
            restriction: {year:2016,},
            children: [
              {
                displayName:"OPEN",
                restriction: {department:"OPEN",},
                children:null,
              },
              {
                displayName:"U-19",
                restriction: {department:"U-19",},
                children:null,
              },
              {
                displayName:"JUNIOR",
                restriction: {department:"JUNIOR",},
                children:null,
              },
            ]
          },
        ]
      },
      {
        displayName:"NF",
        restriction: {category:"nf",},
        children: [
          {
            displayName:"2018",
            restriction: {year:2018,},
            children: [
              {
                displayName:"ダブルダッチ",
                restriction: {department:"ダブルダッチ",},
                children: [
                  {
                    displayName:"1日目",
                    restriction: {day:1,},
                    children:null,
                  },
                  {
                    displayName:"2日目",
                    restriction: {day:2,},
                    children:null,
                  },
                  {
                    displayName:"3日目",
                    restriction: {day:3,},
                    children:null,
                  },
                  {
                    displayName:"4日目",
                    restriction: {day:4,},
                    children:null,
                  },
                ]
              },
              {
                displayName:"単縄",
                restriction: {department:"単縄",},
                children: [
                  {
                    displayName:"1日目",
                    restriction: {day:1,},
                    children:null,
                  },
                  {
                    displayName:"2日目",
                    restriction: {day:2,},
                    children:null,
                  },
                  {
                    displayName:"3日目",
                    restriction: {day:3,},
                    children:null,
                  },
                  {
                    displayName:"4日目",
                    restriction: {day:4,},
                    children:null,
                  },
                ]
              },
              {
                displayName:"Finale",
                restriction: {department:"Finale",},
                children:null,
              },
              {
                displayName:"ステージ",
                restriction: {department:"ステージ",},
                children:null,
              },
              {
                displayName:"SpecialMovie",
                restriction: {department:"Special Movie",},
                children: null,
              },
            ]
          },
          {
            displayName:"2017",
            restriction: {year:2017,},
            children: [
              {
                displayName: "ダブルダッチ",
                restriction: {department:"ダブルダッチ",},
                children: [
                  {
                    displayName:"1日目",
                    restriction: {day:1,},
                    children:null,
                  },
                  {
                    displayName:"2日目",
                    restriction: {day:2,},
                    children:null,
                  },
                  {
                    displayName:"3日目",
                    restriction: {day:3,},
                    children:null,
                  },
                  {
                    displayName:"4日目",
                    restriction: {day:4,},
                    children:null,
                  },
                ]
              },
              {
                displayName:"単縄",
                restriction: {department:"単縄",},
                children: [
                  {
                    displayName:"1日目",
                    restriction: {day:1,},
                    children:null,
                  },
                  {
                    displayName:"2日目",
                    restriction: {day:2,},
                    children:null,
                  },
                  {
                    displayName:"3日目",
                    restriction: {day:3,},
                    children:null,
                  },
                  {
                    displayName:"4日目",
                    restriction: {day:4,},
                    children:null,
                  },
                ]
              },
              {
                displayName:"Finale",
                restriction: {department:"Finale",},
                children:null,
              },
              {
                displayName:"ステージ",
                restriction: {department:"ステージ",},
                children:null,
              },
            ],
          },
          {
            displayName:"2016",
            restriction: {year:2016,},
            children: [
              {
                displayName:"1日目",
                restriction: {day:1,},
                children:null,
              },
              {
                displayName:"2日目",
                restriction: {day:2,},
                children:null,
              },
              {
                displayName:"3日目",
                restriction: {day:3,},
                children:null,
              },
              {
                displayName:"4日目",
                restriction: {day:4,},
                children:null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    displayName:"大会その2",
    restriction: {},
    children: [
      {
        displayName:"DDS",
        restriction: {category:"dds",},
        children:null,
      },
      {
        displayName:"World Jump Rope",
        restriction: {category:"wjr",},
        children: [
          {
            displayName:"MTTR",
            restriction: {department:"MTTR",},
            children:null,
          },
          {
            displayName:"シングルフリースタイル",
            restriction: {department:"シングルフリースタイル",},
            children:null,
          },
          {
            displayName:"スピード",
            restriction: {department:"スピード",},
            children:null,
          },
          {
            displayName:"ペアフリースタイル",
            restriction: {department:"ペアフリースタイル",},
            children:null,
          },
          {
            displayName:"その他",
            restriction: {department:"その他",},
            children:null,
          },
        ]
      },
      {
        displayName:"FDDF",
        restriction: {category:"fddf",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children:null,
          },
        ],
      },
      {
        displayName:"Japan Open",
        restriction: {category:"japanopen",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children:null,
          },
        ],
      },
      {
        displayName:"GOLD",
        restriction: {category:"gold",},
        children: [
          {
            displayName:"2017",
            restriction: {year:2017,},
            children: [
              {
                displayName: "Battle",
                restriction: {department:"BATTLE",},
                children:null,
              },
              {
                displayName:"ShowCase",
                restriction: {department:"SHOW CASE",},
                children:null,
              },
              {
                displayName:"その他",
                restriction: {department:"その他",},
                children:null,
              },
            ],
          }
        ]
      },
      {
        displayName:"JC",
        restriction: {category:"jc",},
        children: [
          {
            displayName:"個人フリースタイル",
            restriction: {department:"13JC 個人戦フリースタイル",},
            children:null,
          },
          {
            displayName:"団体フリースタイル",
            restriction: {department:"13JC 団体戦フリースタイル",},
            children:null,
          },
        ]
      },
    ]
  },
  {
    displayName: "サークル",
    restriction: {},
    children: [
      {
        displayName:"正規練",
        restriction: {category:"正規練",},
        children:null,
      },
      {
        displayName:"発表会",
        restriction: {category:"発表会",},
        children: [
          {
            displayName:"DDDW",
            restriction: {department:"ddd",},
            children: [
              {
                displayName:"2019/9/14",
                restriction: {originatedDate:time(new Date("2019-09-14")),},
                children:null,
              },
              {
                displayName:"2019/9/12",
                restriction: {originatedDate:time(new Date("2019-09-12")),},
                children:null,
              },
              {
                displayName:"2019/9/7",
                restriction: {originatedDate:time(new Date("2019-09-07")),},
                children:null,
              },
            ],
          },
          {
            displayName:"FDDF",
            restriction: {department:"fddf",},
            children: [
              {
                displayName:"2019/8/20",
                restriction: {originatedDate:time(new Date("2019-08-20")),},
                children:null,
              },
            ],
          },
          {
            displayName:"DDGP",
            restriction: {department:"ddgp",},
            children: [
              {
                displayName:"2019/8/17",
                restriction: {originatedDate:time(new Date("2019-08-17")),},
                children:null,
              },
              {
                displayName:"2019/8/13",
                restriction: {originatedDate:time(new Date("2019-08-13")),},
                children:null,
              },
            ],
          },
          {
            displayName:"WorldJumpRope & DDS",
            restriction: {department:"wjr",},
            children: [
              {
                displayName:"2019/6/29",
                restriction: {originatedDate:time(new Date("2019-06-29")),},
                children:null,
              },
              {
                displayName:"2019/6/26",
                restriction: {originatedDate:time(new Date("2019-06-26")),},
                children:null,
              },
              {
                displayName:"2019/6/22",
                restriction: {originatedDate:time(new Date("2019-06-22")),},
                children:null,
              },
            ],
          },
          {
            displayName:"NF",
            restriction: {department:"nf",},
            children:[
              {
                displayName:"2018/11/17",
                restriction: {originatedDate:time(new Date("2018-11-17")),},
                children:null,
              },
              {
                displayName:"2018/11/15",
                restriction: {originatedDate:time(new Date("2018-11-15")),},
                children:null,
              },
              {
                displayName:"2018/11/13",
                restriction: {originatedDate:time(new Date("2018-11-13")),},
                children:null,
              },
            ]
          },
        ],
      },
      {
        displayName:"夏合宿",
        restriction: {category:"夏合宿",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children:null,
          },
        ],
      },
      {
        displayName:"MTTR ONE\'S",
        restriction: {category:"mttrones",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children:null,
          },
          {
            displayName:"2018",
            restriction: {year:2018,},
            children:null,
          },
        ]
      },
    ]
  },
  {
    displayName:"学内のイベント",
    restriction: {},
    children: [
      {
        displayName:"NF",
        restriction: {category:"nf",},
        children: [
          {
            displayName:"2018",
            restriction: {year:2018,},
            children: [
              {
                displayName:"ダブルダッチ",
                restriction: {department:"ダブルダッチ",},
                children: [
                  {
                    displayName:"1日目",
                    restriction: {day:1,},
                    children:null,
                  },
                  {
                    displayName:"3日目",
                    restriction: {day:3,},
                    children:null,
                  },
                  {
                    displayName:"4日目",
                    restriction: {day:4,},
                    children:null,
                  },
                ]
              },
              {
                displayName:"単縄",
                restriction: {department:"単縄",},
                children: [
                  {
                    displayName:"1日目",
                    restriction: {day:1,},
                    children:null,
                  },
                  {
                    displayName:"2日目",
                    restriction: {day:2,},
                    children:null,
                  },
                  {
                    displayName:"3日目",
                    restriction: {day:3,},
                    children:null,
                  },
                  {
                    displayName:"4日目",
                    restriction: {day:4,},
                    children:null,
                  },
                ]
              },
              {
                displayName:"Finale",
                restriction: {department:"Finale",},
                children:null,
              },
              {
                displayName:"ステージ",
                restriction: {department:"ステージ",},
                children:null,
              },
              {
                displayName:"SpecialMovie",
                restriction: {department:"Special Movie",},
                children: null,
              },
            ]
          },
          {
            displayName:"2017",
            restriction: {year:2017,},
            children: [
              {
                displayName: "ダブルダッチ",
                restriction: {department:"ダブルダッチ",},
                children: [
                  {
                    displayName:"1日目",
                    restriction: {day:1,},
                    children:null,
                  },
                  {
                    displayName:"2日目",
                    restriction: {day:2,},
                    children:null,
                  },
                  {
                    displayName:"2日目",
                    restriction: {day:2,},
                    children:null,
                  },
                  {
                    displayName:"3日目",
                    restriction: {day:3,},
                    children:null,
                  },
                  {
                    displayName:"4日目",
                    restriction: {day:4,},
                    children:null,
                  },
                ]
              },
              {
                displayName:"単縄",
                restriction: {department:"単縄",},
                children: [
                  {
                    displayName:"1日目",
                    restriction: {day:1,},
                    children:null,
                  },
                  {
                    displayName:"2日目",
                    restriction: {day:2,},
                    children:null,
                  },
                  {
                    displayName:"3日目",
                    restriction: {day:3,},
                    children:null,
                  },
                  {
                    displayName:"4日目",
                    restriction: {day:4,},
                    children:null,
                  },
                ]
              },
              {
                displayName:"Finale",
                restriction: {department:"Finale",},
                children:null,
              },
              {
                displayName:"ステージ",
                restriction: {department:"ステージ",},
                children:null,
              },
            ],
          },
          {
            displayName:"2016",
            restriction: {year:2016,},
            children: [
              {
                displayName:"1日目",
                restriction: {day:1,},
                children:null,
              },
              {
                displayName:"2日目",
                restriction: {day:2,},
                children:null,
              },
              {
                displayName:"3日目",
                restriction: {day:3,},
                children:null,
              },
              {
                displayName:"4日目",
                restriction: {day:4,},
                children:null,
              },
            ],
          },
        ],
      },
      {
        displayName:"ルネ屋台",
        restriction: {category:"ルネ屋台",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children:null
          }
        ],
      },
      {
        displayName:"総人オープンキャンパス",
        restriction: {category:"opencampus",},
        children: [
          {displayName:"2019",
            restriction: {year:2019,},
            children:null,
          }
        ],
      },
      {
        displayName:"くすのき秋祭",
        restriction: {category:"くすのき秋祭",},
        children: [
          {displayName:"2018",
            restriction: {year:2018,},
            children:null
          }
        ],
      },
    ]
  },
  {
    displayName:"その他",
    restriction: {},
    children: [
      {
        displayName:"フリーロープ",
        restriction: {category:"その他", department:'フリーロープ',},
        children:null,
      },
      {
        displayName:"舞鶴合宿",
        restriction: {category:"舞鶴合宿",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children:null,
          }
        ],
      },
      {
        displayName:"D-act五月祭",
        restriction: {category:"五月祭",},
        children: [
          {
            displayName:"2019",
            restriction: {year:2019,},
            children:null,
          }
        ],
      },
    ],
  },
]
// setTimeout(() =>
// console.log(updateStructures(folders))
// ,10000)
