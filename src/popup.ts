import './popup.scss';

//初期化・設定イベント登録
const afterPopupDOMLoaded = () => {
  //設定値の型
  type stateType = {
    view: boolean,
    detail: boolean
  };

  //設定値
  let state: stateType = {
    view: true,
    detail: false
  };

  //現在の state を view に描画する
  const render = () => {
    const viewIcon = document.getElementById('view-icon');
    if (viewIcon) {
      viewIcon.style.opacity = state.view ? '1' : '0';
    }

    const detailIcon = document.getElementById('detail-icon');
    if (detailIcon) {
      detailIcon.style.opacity = state.detail ? '1' : '0';
    }
  };

  //現在の状態をリストアする
  const restore = () => {
    //chrome からデータを取得する
    chrome.storage.sync.get({view: true, detail: false}, item => {
      state.view = item.view;
      state.detail = item.detail;
      render();
    });
  };

  //設定を更新する
  const save = (target: keyof stateType, value: boolean) => {
    chrome.storage.sync.set({[target]: value}, () => {
      //ローカルの変数を書き換え
      state[target] = value;

      //view を更新
      render();

      //メッセージパッシングで現在のタブにメッセージを送る
      chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
        for (let i = 0, max = tabs.length; i < max; i = (i + 1) | 0) {
          //id を一旦変数へ納める
          const id = tabs[i].id;

          //id が存在すればメッセージパッシングを行う
          if (id !== undefined) {
            chrome.tabs.sendMessage(id, {type: 'changeSetting'});
          }
        }
      });
    });
  };

  //描画
  restore();

  //view 更新イベントの登録
  const viewMenu = document.getElementById('view-menu');
  if (viewMenu) {
    viewMenu.addEventListener('click', () => {
      save('view', !state.view);
    });
  }

  //detail 更新イベントの登録
  const detailMenu = document.getElementById('detail-menu');
  if (detailMenu) {
    detailMenu.addEventListener('click', () => {
      save('detail', !state.detail);
    });
  }

  //view の文言を設定する
  const viewText = document.getElementById('view-text');
  if (viewText) {
    viewText.textContent = chrome.i18n.getMessage('msg_view');
  }

  //view の文言を設定する
  const detailText = document.getElementById('detail-text');
  if (detailText) {
    detailText.textContent = chrome.i18n.getMessage('msg_detail');
  }
};

//DOMContentLoaded イベントが既に発火している場合は即時に初期化関数を呼ぶ
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterPopupDOMLoaded);
}
else {
  afterPopupDOMLoaded();
}
