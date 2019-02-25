
var request = require('request-promise');
const cheerio = require('cheerio');
let keyWord = encodeURIComponent("韓国");
var options = {
  url: "https://www.instagram.com/explore/tags/"+keyWord,
  method: 'GET',
  headers: {
    "Accept-Language": "ja-JP",
  }
};

request(options)
  .then((body) => {
    let hashtags = Tags(body);
    console.log(CountTag(hashtags));
  })
  .catch((err) => {
      console.log(err);
  });
const Tags = (html) => {
  const regex = /(?:^|\s)(?:#)([a-zA-Z\d\\]+)/gm;
  let matches = [],match;
  while (match = regex.exec(html)){
    if(match[1].indexOf("\\")!==-1){
      let a =　match[1].replace(/\\u/g, '0x').split("0x").map((x)=>{
        x = x?String.fromCharCode('0x'+x):x;
        return x;
      });
      match[1] = a.join("");
    }
    matches.push(match[1]);
  }
  return matches;
} //Tags
const CountTag = (arr) => {
  let countHash = {};
  arr.forEach(ele => {
      ele = ele.toLowerCase();
      ele in countHash?countHash[ele]++:countHash[ele] = 1;
  })
  let arr3 = [];
  for(let i in countHash ){
    let arr2 = {};
    arr2.hash = i;
    arr2.cnt = countHash[i];
    arr3.push(arr2);
  }
  arr3.sort(function(a,b){
    if(a.cnt < b.cnt) return 1;
    if(a.cnt > b.cnt) return -1;
    return 0;
});
  return arr3;
}
