(function() {

  'use strict';

  /**
   * 基底オブジェクト
   */
  const sim = {};

  // メッセージ表示用プロパティ
  sim.secFlag = false;
  sim.secDiv = [];

  // ボタンリスト用プロパティ
  sim.buttons = {};

  // シミュレーション結果保存用プロパティ
  sim.sum = 0;

  /**
   * コンソール表示メソッド
   */
  const dispConsole = () => {
    console.log(sim);
  };

  /**
   * 隠れているメッセージを表示する
   * @param {int} order セクションの番号
   */
  const dispMsg = (order) => {

    if(!sim.secFlag) {
      sim.secFlag = true;
      const sec = document.getElementById(('sec' + order).toString());
      sim.secDiv = Array.from(sec.children);
    }

    const target = sim.secDiv[0];

    target.style.display = 'block';

    sim.secDiv.shift();

    const timeoutID = setTimeout(() => {
      dispMsg(order);
    }, 1000);

    // メッセージを表示し終わった場合、初期状態へもどす
    if(sim.secDiv.length === 0) {
      sim.secFlag = false;
      clearTimeout(timeoutID);
      return;
    };

  };

  /**
   * 質問の答えをメッセージに挿入する
   * @param {int} order セクションの番号
   * @param {*} answer 答えのDOM
   */
  const insertMsg = (order, answer) => {
    const msg = answer.innerHTML;
    const target = document.getElementById(('sec' + order + 'Ans').toString());
    target.innerHTML = msg;
  };

  /**
   * 選択肢をクリックしたときのイベントをセットする
   * @param {int} order セクションの番号
   */
  const setButtonEvent = (order) => {

    sim.buttons = document.getElementById(('button' + order).toString());
    sim.buttons.addEventListener('click', function(event) {

      const children = Array.from(this.children);
      for(const child of children) {
        child.disabled = true;
      }
      const target = event.target;
      if(target.matches('button')) {
        insertMsg(order, target);
        // 合計金額の加算
        const targetPrice = Number(target.dataset.price);
        const priceSumDom = document.getElementById('priceSum');
        sim.sum += targetPrice;
        priceSumDom.innerHTML = sim.sum;

        dispConsole();
        dispMsg(order);
      }
    });

    sim.buttons = {};

  };

  // const resetSimulation = () => {

  //   // 内部データのリセット
  //   sim.buttons = {};
  //   sim.sum = 0;

  //   // 要素の初期化（テキスト）
  //   const secs = document.getElementsByClassName('sec').length;
  //   for(let i = 1; i <= secs; i++) {
  //     const sec = document.getElementById(('sec' + i).toString());
  //     sim.secDiv = Array.from(sec.children);

  //     for(const para of sim.secDiv) {
  //       para.style.display = 'none';
  //     }
  //   }

  //   const buttonWps = Array.from(document.getElementsByClassName('button'));
  //   for(let i = 0; i < buttonWps.length; i++) {
  //     const children = buttonWps[i].children;
  //     for(const child of children) {
  //       child.disabled = false;
  //     }
  //   }

  // };

  window.onload = () => {
    dispMsg(1);
    const qNum = document.getElementsByClassName('question').length;
    for(let i = 0; i < qNum; i++) {
      setButtonEvent(i + 2);
    }
  };

  /**
   * イベント設定
   * リセットボタンの挙動
   */
  // const reRun = document.getElementById('reRun');
  // reRun.addEventListener('click', () => {
  //   resetSimulation();
  //   dispMsg(1);
  //   const qNum = document.getElementsByClassName('question').length;
  //   for(let i = 0; i < qNum; i++) {
  //     setButtonEvent(i + 2);
  //   }
  // });

}());
