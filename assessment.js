'use strict'
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDvided = document.getElementById("tweet-area");



/**
 * すでにある診断結果を削除
 * @param {HTMLelement} element HTMLの要素・中身（タグとか）
 */
function removeAllChildren(element) {
    while (element.firstChild) {  //result-area に firstChild がなくなるまでループ
        element.removeChild(element.firstChild);
    }
}




/**
 * 診断結果を表示するための準備・面倒くさいこと
 * @param {HTMLelement} element HTMLの要素・中身（タグとか）
 */
function appendAssessmentResult(element, result) {

      //"result-area"にh3タグで'診断結果'という文字を表示するために
      const h3 = document.createElement('h3');//まずh3タグがそもそもないから作る。
      h3.innerText = '診断結果';//h3タグに表示したい文字を入れ、
      element.appendChild(h3);//JavaScriptだけでなくhtmlの"result-area"にも表示できるようにした。
      
  
      //"result-area"にpタグで診断結果を表示するために
      const p = document.createElement('p');
      p.innerText = result;                     //以下同文
      element.appendChild(p);

}




/**
 * ツイートボタンを設置する
 * @param {HTMLelement} result 診断結果
 */
function appendTweetButton(element, result) {
    const a = document.createElement('a');
    const href = 'https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ') // 文字化けしないように
    +'&ref_src=twsrc%5Etfw'
    a.setAttribute('href', href);
    a.setAttribute('class', 'twitter-hashtag-button');
    a.setAttribute('date-text', result);
    a.innerText = 'tweet #あなたのいいところ';
    // aタグをHTMLとして追加する
    element.appendChild(a);
    
    // scriptタグをつくって属性を追加
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');

    // scriptタグをHTMLとして追加する
    element.appendChild(script);
}


assessmentButton.onclick = function () {    // クリックするとぉー

    let userName = userNameInput.value;// userNameを受け取って、

    if(!userName.length) {      // 名前の入力がなかったので処理を中断
        return　;
    }
    //診断結果の表示
    removeAllChildren(resultDivided);  
    const result = assessment(userName);
    appendAssessmentResult(resultDivided, result);    

    //ツイートボタンの表示
    removeAllChildren(tweetDvided);
    appendTweetButton(tweetDvided, result);
  
}

//EnterKeyを押した時に・・・
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
  };


const answers = [
        

    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName　ユーザーの名前
 * @return {string}　診断結果
 */
function assessment (userName){
    //太郎
    var userNameNumber = 0; //とりま
    for (let i = 0; i < userName.length; i++){
        //              　　　　　　↑太郎の場合は２
        userNameNumber += userName.charCodeAt(i);
        //   ↑まだ0　　　　　　　　　　　　　　　　 ↑0の時は22826+ 1の時は37070 = 59896
    }
    var answersNumber =  userNameNumber % answers.length;
    //8
    var result = answers[answersNumber];
    //{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。

    return result.replace(/\{userName\}/g, userName);//置換  （太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。）
}

console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '間違っとるで〜「assessment(太郎) === 太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。」になっとらん！　よく見直せい！'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なのになんで違う診断結果なんだ！？'
);
