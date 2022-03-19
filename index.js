const wbm = require("./wbm");
const reader = require('xlsx')
var fs = require('fs');
 
// delete file named 'sample.txt'

// Reading our test file
const file = reader.readFile('./test.xlsx')
  
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}
console.log(data);
let phones=[];
let message=[];
for(let i = 0; i <data.length; i++){
    phones[i]=data[i].phones
    message[i]=data[i].message
}
  console.log(message)
// Printing data
// console.log(data[0].phones)
console.log(phones)
let r=false

wbm.start({ session: false, showBrowser: false }).then(async () => {
    // const phones = ['919354723868','917004346065','917004346065'];
    // const message = ["this is 1","this is 2","this is 3"];
    // const i=0;
    // console.log(i++);
    // await wbm.send(data[0].phones, data[0].message);
    //  data.map(d=>  async(  wbm.send(d.phones, d.message)))
    // i=0;
     await wbm.send(phones, message);
    await wbm.end();
    fs.unlink('test.xlsx', function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}).catch(err => console.log(err));