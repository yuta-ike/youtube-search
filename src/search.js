const data = {
  videos:[
    {
      name: 'Apple',
      url: 'https://sample.com',
      'competition-name': 'SampleComp',
    },
    {
      name: 'Banana',
      url: 'https://sample2.com',
      'competition-name': 'SampleComp',
    },
    {
      name: 'GrapeFruit',
      url: 'https://sample3.com',
      'competition-name': 'SampleComp',
    },
    {
      name: 'Grape',
      url: 'https://sample4.com',
      'competition-name': 'SampleComp2nd',
    }
  ]
}

export default function search(word, k, p){
  return data.videos.filter(({name}) => name.includes(word))
}







;
