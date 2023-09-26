// @ts-ignore
const fs = require('fs');
const path = 'src/'
let files = fs.readdirSync(path);

function isTsx(filename:string):boolean {
    return ["tsx"].includes(filename.slice(-3))
}
let texts:any[] = []
let wkeys:any[] = []

const writeToFile = 'public/locales/language.json'

function resetFileContent(path:string,files:any){
    for (let i=0,len=files.length;i<len;i++){
        const data = files[i]
        if(fs.statSync(path+data).isDirectory()){
            resetFileContent(path+data+'/',fs.readdirSync(path+data+'/'))
        }else if(isTsx(data)){
          const patharr = (path+data).split('/')
          let key = patharr[patharr.length - 2]+'_'+patharr[patharr.length - 1]
          key = key.replace('.tsx','')
          key = key.replace('_index','')
          key = key.replace('_page','')

          let content = fs.readFileSync(path+data).toString()
          let result = content.match(/(?<=>).+(?=<\/)/g);
          console.log(path+data,result)
          if (result && result.length > 0){
            result = result.filter((item:string)=>item.substring(0,1) != '{' && item.substring(item.length - 1) != '}')
            let count = 1
            result.map((it:any)=>{
              texts.push(it)
              wkeys.push(key+'_'+count)
              content = content.replace(it,`{t("${key+'_'+count}")}`)
              count++
            })
            fs.writeFileSync(path+data,content)

          }
        }
    }
}
resetFileContent(path,files)

if (texts.length != wkeys.length){
  console.log(`提取的文本与key值不对应❌`)
}else {
  let content = ''
  texts.map((item:any,index:number)=>{
    if (index == texts.length - 1){
      content += '"' +  wkeys[index] + '"' + ':' + '"' + item + '"' + '\n'
    }else {
      content += '"' +  wkeys[index] + '"' + ':' + '"' + item + '"' + ',\n  '
    }
  })
  content = '{\n  ' + content
  content += '}'
  console.log('content==\n',content)

  fs.writeFileSync(writeToFile,content)
  console.log(`文字提取及设置key完成✅`)
}