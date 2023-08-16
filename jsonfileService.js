import json from 'jsonfile'

const obj = {'users': [1,2,3,4,5,6,7]}

json.writeFile('file.json', obj, function (err) {
    if (err) console.error(err)
  })
  