/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/page.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/page.ts":
/*!*********************!*\
  !*** ./src/page.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * DOMContentLoaded 完了後に呼ばれる
 * Chrome Extension は既にDOMContentLoaded イベントが発火し終えた後に呼ばれる可能性があるため関数化
 */
var afterDOMLoaded = function () {
    //表示領域を作成する
    var box = document.createElement('div');
    box.style.position = 'fixed';
    box.style.zIndex = '99999';
    box.style.top = '0';
    box.style.right = '0';
    box.style.boxShadow = '0 0 1px 2px rgba(0, 0, 0, .05)';
    box.style.display = 'none';
    document.body.appendChild(box);
    //スタイルタグの作成
    var STYLE = '.dom-size-console_hover_background{background-color:rgba(150, 150, 255, .5)}';
    var style = document.createElement('style');
    document.head.appendChild(style);
    //コンソールに表示する DOM
    var dom = null;
    //現在の html 情報を取得して表示する
    var showSimpleConsole = function () {
        //box を空にする
        box.textContent = '';
        //表示 DOM の作成・追加
        var area = document.createElement('div');
        area.textContent = window.innerWidth + ' x ' + window.innerHeight;
        area.style.padding = '10px';
        area.style.color = '#1d1d1d';
        area.style.backgroundColor = '#FFF9C4';
        box.appendChild(area);
    };
    //詳細を表示する
    var showDetailConsole = function () {
        //box を空にする
        box.textContent = '';
        //表示する width, height を入手
        var width = dom === null ? window.innerWidth : dom.getBoundingClientRect().width;
        var height = dom === null ? window.innerHeight : dom.getBoundingClientRect().height;
        //表示 DOM の作成・追加
        var area = document.createElement('div');
        area.textContent = width + ' x ' + height;
        area.style.padding = '10px';
        area.style.color = '#1d1d1d';
        area.style.backgroundColor = '#FFF9C4';
        box.appendChild(area);
    };
    //現在の設定を読み込み、描画を行う
    var restore = function () {
        chrome.storage.sync.get({ view: true, detail: false }, function (item) {
            //非表示設定なら表示領域を消す
            if (!item.view) {
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
    var timer = 0;
    window.addEventListener('resize', function () {
        //既にタイマーがセットされていたらキャンセルする
        if (timer) {
            clearTimeout(timer);
        }
        // 0.1 秒後に登録
        timer = setTimeout(restore, 100);
    });
    //全ての DOM にホバーイベントを登録
    setTimeout(function () {
        var enter = function (e) {
            if (e.target instanceof HTMLElement) {
                if (dom !== null) {
                    dom.classList.remove('dom-size-console_hover_background');
                }
                dom = e.target;
                dom.classList.add('dom-size-console_hover_background');
                restore();
            }
        };
        var findChildren = function (parent) {
            var children = parent.children;
            for (var i = 0, max = children.length; i < max; i = (i + 1) | 0) {
                var target = children.item(i);
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
    chrome.runtime.onMessage.addListener(function (request) {
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterDOMLoaded);
}
else {
    afterDOMLoaded();
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7OztHQUdHO0FBQ0gsSUFBTSxjQUFjLEdBQUc7SUFFckIsV0FBVztJQUNYLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUMzQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxLQUFL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QUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQ25CLFNBQVM7aUJBQ1Y7Z0JBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDN0MsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFVCxpQkFBaUI7SUFDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQUMsT0FBTztRQUMzQyxRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDcEIsZ0JBQWdCO1lBQ2hCLEtBQUssZUFBZTtnQkFDbEIsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRO0lBQ1IsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDLENBQUM7QUFFRiw4Q0FBOEM7QUFDOUMsSUFBRyxRQUFRLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtJQUNwQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLENBQUM7Q0FDL0Q7S0FDSTtJQUNILGNBQWMsRUFBRSxDQUFDO0NBQ2xCIiwiZmlsZSI6InBhZ2UuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGFnZS50c1wiKTtcbiIsIi8qKlxyXG4gKiBET01Db250ZW50TG9hZGVkIOWujOS6huW+jOOBq+WRvOOBsOOCjOOCi1xyXG4gKiBDaHJvbWUgRXh0ZW5zaW9uIOOBr+aXouOBq0RPTUNvbnRlbnRMb2FkZWQg44Kk44OZ44Oz44OI44GM55m654Gr44GX57WC44GI44Gf5b6M44Gr5ZG844Gw44KM44KL5Y+v6IO95oCn44GM44GC44KL44Gf44KB6Zai5pWw5YyWXHJcbiAqL1xyXG5jb25zdCBhZnRlckRPTUxvYWRlZCA9ICgpID0+IHtcclxuXHJcbiAgLy/ooajnpLrpoJjln5/jgpLkvZzmiJDjgZnjgotcclxuICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBib3guc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gIGJveC5zdHlsZS56SW5kZXggPSAnOTk5OTknO1xyXG4gIGJveC5zdHlsZS50b3AgPSAnMCc7XHJcbiAgYm94LnN0eWxlLnJpZ2h0ID0gJzAnO1xyXG4gIGJveC5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAuMDUpJztcclxuICBib3guc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJveCk7XHJcblxyXG4gIC8v44K544K/44Kk44Or44K/44Kw44Gu5L2c5oiQXHJcbiAgY29uc3QgU1RZTEUgPSAnLmRvbS1zaXplLWNvbnNvbGVfaG92ZXJfYmFja2dyb3VuZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTUwLCAxNTAsIDI1NSwgLjUpfSc7XHJcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxuICAvL+OCs+ODs+OCveODvOODq+OBq+ihqOekuuOBmeOCiyBET01cclxuICBsZXQgZG9tOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvL+ePvuWcqOOBriBodG1sIOaDheWgseOCkuWPluW+l+OBl+OBpuihqOekuuOBmeOCi1xyXG4gIGNvbnN0IHNob3dTaW1wbGVDb25zb2xlID0gKCkgPT4ge1xyXG4gICAgLy9ib3gg44KS56m644Gr44GZ44KLXHJcbiAgICBib3gudGV4dENvbnRlbnQgPSAnJztcclxuXHJcbiAgICAvL+ihqOekuiBET00g44Gu5L2c5oiQ44O76L+95YqgXHJcbiAgICBjb25zdCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBhcmVhLnRleHRDb250ZW50ID0gd2luZG93LmlubmVyV2lkdGgrJyB4ICcrd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgYXJlYS5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xyXG4gICAgYXJlYS5zdHlsZS5jb2xvciA9ICcjMWQxZDFkJztcclxuICAgIGFyZWEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNGRkY5QzQnO1xyXG4gICAgYm94LmFwcGVuZENoaWxkKGFyZWEpO1xyXG4gIH07XHJcblxyXG4gIC8v6Kmz57Sw44KS6KGo56S644GZ44KLXHJcbiAgY29uc3Qgc2hvd0RldGFpbENvbnNvbGUgPSAoKSA9PiB7XHJcbiAgICAvL2JveCDjgpLnqbrjgavjgZnjgotcclxuICAgIGJveC50ZXh0Q29udGVudCA9ICcnO1xyXG5cclxuICAgIC8v6KGo56S644GZ44KLIHdpZHRoLCBoZWlnaHQg44KS5YWl5omLXHJcbiAgICBjb25zdCB3aWR0aCA9IGRvbSA9PT0gbnVsbCA/IHdpbmRvdy5pbm5lcldpZHRoIDogZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gZG9tID09PSBudWxsID8gd2luZG93LmlubmVySGVpZ2h0IDogZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcbiAgICAvL+ihqOekuiBET00g44Gu5L2c5oiQ44O76L+95YqgXHJcbiAgICBjb25zdCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBhcmVhLnRleHRDb250ZW50ID0gd2lkdGgrJyB4ICcraGVpZ2h0O1xyXG4gICAgYXJlYS5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xyXG4gICAgYXJlYS5zdHlsZS5jb2xvciA9ICcjMWQxZDFkJztcclxuICAgIGFyZWEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNGRkY5QzQnO1xyXG4gICAgYm94LmFwcGVuZENoaWxkKGFyZWEpO1xyXG4gIH07XHJcblxyXG4gIC8v54++5Zyo44Gu6Kit5a6a44KS6Kqt44G/6L6844G/44CB5o+P55S744KS6KGM44GGXHJcbiAgY29uc3QgcmVzdG9yZSA9ICgpID0+IHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHt2aWV3OiB0cnVlLCBkZXRhaWw6IGZhbHNlfSwgaXRlbSA9PiB7XHJcbiAgICAgIC8v6Z2e6KGo56S66Kit5a6a44Gq44KJ6KGo56S66aCY5Z+f44KS5raI44GZXHJcbiAgICAgIGlmICggISBpdGVtLnZpZXcpIHtcclxuICAgICAgICBib3guc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8v6KGo56S66aCY5Z+f44KS6KGo56S6XHJcbiAgICAgIGJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgIC8vZGV0YWlsIOioreWumuOBq+OCiOOBo+OBpuihqOekuuOBmeOCi+OCguOBruOCkuWkieOBiOOCi1xyXG4gICAgICBpZiAoaXRlbS5kZXRhaWwpIHtcclxuICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IFNUWUxFO1xyXG4gICAgICAgIHNob3dEZXRhaWxDb25zb2xlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICBzaG93U2ltcGxlQ29uc29sZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvL+ODquOCteOCpOOCuuOBq+OCiOOBo+OBpuaDheWgseOCkuWGjeaPj+eUu+OBmeOCi1xyXG4gIGxldCB0aW1lciA9IDA7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIC8v5pei44Gr44K/44Kk44Oe44O844GM44K744OD44OI44GV44KM44Gm44GE44Gf44KJ44Kt44Oj44Oz44K744Or44GZ44KLXHJcbiAgICBpZiAodGltZXIpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAwLjEg56eS5b6M44Gr55m76YyyXHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzdG9yZSwgMTAwKTtcclxuICB9KTtcclxuXHJcbiAgLy/lhajjgabjga4gRE9NIOOBq+ODm+ODkOODvOOCpOODmeODs+ODiOOCkueZu+mMslxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY29uc3QgZW50ZXIgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoZG9tICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBkb20uY2xhc3NMaXN0LnJlbW92ZSgnZG9tLXNpemUtY29uc29sZV9ob3Zlcl9iYWNrZ3JvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvbSA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdkb20tc2l6ZS1jb25zb2xlX2hvdmVyX2JhY2tncm91bmQnKTtcclxuICAgICAgICByZXN0b3JlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBmaW5kQ2hpbGRyZW4gPSAocGFyZW50OiBFbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xyXG4gICAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBjaGlsZHJlbi5pdGVtKGkpO1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlbnRlcik7XHJcbiAgICAgICAgZmluZENoaWxkcmVuKHRhcmdldCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBmaW5kQ2hpbGRyZW4oZG9jdW1lbnQuYm9keSk7XHJcbiAgfSwgMTAwMCk7XHJcblxyXG4gIC8v44Oh44OD44K744O844K444OR44OD44K344Oz44Kw44KS5Y+X44GR5Y+W44KLXHJcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0KSA9PiB7XHJcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xyXG4gICAgICAvL+ODneODg+ODl+OCouODg+ODl+OBq+OCiOOCi+ioreWumuOBruWkieabtFxyXG4gICAgICBjYXNlICdjaGFuZ2VTZXR0aW5nJzpcclxuICAgICAgICByZXN0b3JlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8v5o+P55S744Gu5Yid5pyf5YyWXHJcbiAgcmVzdG9yZSgpO1xyXG59O1xyXG5cclxuLy9ET01Db250ZW50TG9hZGVkIOOCpOODmeODs+ODiOOBjOaXouOBq+eZuueBq+OBl+OBpuOBhOOCi+WgtOWQiOOBr+WNs+aZguOBq+WIneacn+WMlumWouaVsOOCkuWRvOOBtlxyXG5pZihkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgYWZ0ZXJET01Mb2FkZWQpO1xyXG59XHJcbmVsc2Uge1xyXG4gIGFmdGVyRE9NTG9hZGVkKCk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==