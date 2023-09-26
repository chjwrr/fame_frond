// @ts-ignore
const puppeteer_s = require('puppeteer');
// @ts-ignore
const assetsFSr_s = require('fs');
// @ts-ignore
const cheerio = require('cheerio')

// 循环翻译配置的语言
const toLanguager_s = [
  // {
  //   toFile:'en.json',
  //   toTrans:'en',
  //   name:'英语'
  // },
  {
    toFile:'fr.json',
    toTrans:'fr',
    name:'法语'
  },
  {
    toFile:'ja.json',
    toTrans:'ja',
    name:'日语'
  },
  {
    toFile:'ko.json',
    toTrans:'ko',
    name:'韩语'
  },
  {
    toFile:'pt.json',
    toTrans:'pt',
    name:'葡萄牙'
  },
  {
    toFile:'ru.json',
    toTrans:'ru',
    name:'俄语'
  },
  {
    toFile:'zhtw.json',
    toTrans:'zh-TW',
    name:'繁体'
  }
]

const fromFile_s = 'en.json'
const fromTrans_s = 'en'

const needReplace_s = '\n'
const specialKey_s = ' []'


let zhJsonStringr_s = assetsFSr_s.readFileSync(`public/diff/${fromFile_s}`,{ encoding: 'utf8', flag: 'r' });
const zhJsonr_s = JSON.parse(zhJsonStringr_s)
const fkeysr_s = Object.keys(zhJsonr_s)
const valuer_s = Object.values(zhJsonr_s)
console.log('需要翻译的文字：\n',valuer_s)

async function translation_s(transItem:any){
  // let toJsonString = assetsFS.readFileSync(`public/diff/${item.toFile}`,{ encoding: 'utf8', flag: 'r' });
  let transUrl = `https://translate.google.com/?sl=${fromTrans_s}&tl=${transItem.toTrans}&text=`

  valuer_s.map((item:any,index:number)=>{
    let temp = item.replaceAll(needReplace_s,specialKey_s)
    if (index == valuer_s.length - 1){
      transUrl += temp
    }else {
      transUrl += temp + '%0A'
    }
  })
  transUrl += '&op=translate'
  let codeUrl = encodeURI(transUrl)
  codeUrl = codeUrl.replaceAll('%25','%')

  const browser = await puppeteer_s.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  await page.goto(codeUrl);
  const constent = await page.content()
  const $ = cheerio.load(constent)
  const transResult = $('div .aJIq1d').last().attr('data-text')
  const texts = transResult.split('\n')
  if (fkeysr_s.length != texts.length){
    console.log(transItem.name,':翻译无法一一对应❌','应该翻译',fkeysr_s.length,'实际翻译',texts.length)
  }else {
    let str = ''
    // if (toJsonString.length > 0){
    //   toJsonString = toJsonString.substring(1,toJsonString.length)
    //   toJsonString = toJsonString.replaceAll('"\n}','"')
    //   str += ","
    // }
    fkeysr_s.map((item:any,index:number)=>{
      if (index == fkeysr_s.length - 1){
        str += "\"" + item + "\"" + ":" + "\"" + texts[index] + "\"\n"
      }else {
        str += "\"" + item + "\"" + ":" + "\"" + texts[index] + "\"" + ',\n  '
      }
    })
    let result = "{\n  " + str + "}"
    result = result.replaceAll('[','\\')
    result = result.replaceAll(']','n')
    assetsFSr_s.writeFileSync(`public/diff/${transItem.toFile}`,result)
    console.log(transItem.name,`翻译并写入完成✅`)
  }
}

toLanguager_s.map((item:any)=>{
  translation_s(item)
})

// ts-node sh/trans.ts