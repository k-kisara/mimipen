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
      dispMsg();
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
        const targetPrice = Number(target.dataset.price);
        sim.sum += targetPrice;
        dispConsole();
        dispMsg(order);
      }
    });

  };

  window.onload = () => {
    dispMsg(1);
    const qNum = document.getElementsByClassName('question').length;
    for(let i = 0; i < qNum; i++) {
      setButtonEvent(i + 2);
    }
  };

}());