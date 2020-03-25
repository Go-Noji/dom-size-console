/**
 * DOMContentLoaded 完了後に呼ばれる
 * Chrome Extension は既にDOMContentLoaded イベントが発火し終えた後に呼ばれる可能性があるため関数化
 */
const afterDOMLoaded = () => {

  //表示領域を作成する
  const box = document.createElement('div');
  box.style.position = 'fixed';
  box.style.zIndex = '99999';
  box.style.top = '0';
  box.style.right = '0';
  box.style.boxShadow = '0 0 1px 2px rgba(0, 0, 0, .05)';
  box.style.display = 'none';
  document.body.appendChild(box);

  //スタイルタグの作成
  const STYLE = '.dom-size-console_hover_background{background-color:rgba(150, 150, 255, .5)}';
  const style = document.createElement('style');
  document.head.appendChild(style);

  //コンソールに表示する DOM
  let dom: HTMLElement | null = null;

  //現在の html 情報を取得して表示する
  const showSimpleConsole = () => {
    //box を空にする
    box.textContent = '';

    //表示 DOM の作成・追加
    const area = document.createElement('div');
    area.textContent = window.innerWidth+' x '+window.innerHeight;
    area.style.padding = '10px';
    area.style.color = '#1d1d1d';
    area.style.backgroundColor = 'rgba(250, 250, 250, .8)';
    box.appendChild(area);
  };

  //詳細を表示する
  const showDetailConsole = () => {
    //box を空にする
    box.textContent = '';

    //表示する width, height を入手
    const width = dom === null ? window.innerWidth : dom.getBoundingClientRect().width;
    const height = dom === null ? window.innerHeight : dom.getBoundingClientRect().height;

    //表示 DOM の作成・追加
    const area = document.createElement('div');
    area.textContent = width+' x '+height;
    area.style.padding = '10px';
    area.style.color = '#1d1d1d';
    area.style.backgroundColor = 'rgba(250, 250, 250, .8)';
    box.appendChild(area);
  };

  //現在の設定を読み込み、描画を行う
  const restore = () => {
    chrome.storage.sync.get({view: true, detail: false}, item => {
      //非表示設定なら表示領域を消す
      if ( ! item.view) {
        box.style.display = 'none';
        return;
      }

      //表示領域を表示
      box.style.display = 'block';

      //detail 設定によって表示するものを変える
      if (item.detail) {
        style.textContent = STYLE;
        showDetailConsole();
      }
      else {
        style.textContent = '';
        showSimpleConsole();
      }
    });
  };

  //リサイズによって情報を再描画する
  let timer = 0;
  window.addEventListener('resize', () => {
    //既にタイマーがセットされていたらキャンセルする
    if (timer) {
      clearTimeout(timer);
    }

    // 0.1 秒後に登録
    timer = setTimeout(restore, 100);
  });

  //全ての DOM にホバーイベントを登録
  setTimeout(() => {
    const enter = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (dom !== null) {
          dom.classList.remove('dom-size-console_hover_background');
        }
        dom = e.target;
        dom.classList.add('dom-size-console_hover_background');
        restore();
      }
    };
    const findChildren = (parent: Element) => {
      const children = parent.children;
      for (let i = 0, max = children.length; i < max; i = (i + 1) | 0) {
        const target = children.item(i);
        if (target === null) {
          continue;
        }

        target.addEventListener('mouseenter', enter);
        findChildren(target);
      }
    };
    findChildren(document.body);
  }, 1000);

  //メッセージパッシングを受け取る
  chrome.runtime.onMessage.addListener((request) => {
    switch (request.type) {
      //ポップアップによる設定の変更
      case 'changeSetting':
        restore();
        break;
    }
  });

  //描画の初期化
  restore();
};

//DOMContentLoaded イベントが既に発火している場合は即時に初期化関数を呼ぶ
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
}
else {
  afterDOMLoaded();
}
