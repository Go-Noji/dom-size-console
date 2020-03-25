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
        area.style.backgroundColor = 'rgba(250, 250, 250, .8)';
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
        area.style.backgroundColor = 'rgba(250, 250, 250, .8)';
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
        timer = window.setTimeout(restore, 100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7OztHQUdHO0FBQ0gsSUFBTSxjQUFjLEdBQUc7SUFFckIsV0FBVztJQUNYLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUMzQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxLQUFL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QVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDbkIsU0FBUztpQkFDVjtnQkFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUM7UUFDRixZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVULGlCQUFpQjtJQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBQyxPQUFPO1FBQzNDLFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNwQixnQkFBZ0I7WUFDaEIsS0FBSyxlQUFlO2dCQUNsQixPQUFPLEVBQUUsQ0FBQztnQkFDVixNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVE7SUFDUixPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGLDhDQUE4QztBQUM5QyxJQUFHLFFBQVEsQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO0lBQ3BDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztDQUMvRDtLQUNJO0lBQ0gsY0FBYyxFQUFFLENBQUM7Q0FDbEIiLCJmaWxlIjoicGFnZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlLnRzXCIpO1xuIiwiLyoqXHJcbiAqIERPTUNvbnRlbnRMb2FkZWQg5a6M5LqG5b6M44Gr5ZG844Gw44KM44KLXHJcbiAqIENocm9tZSBFeHRlbnNpb24g44Gv5pei44GrRE9NQ29udGVudExvYWRlZCDjgqTjg5njg7Pjg4jjgYznmbrngavjgZfntYLjgYjjgZ/lvozjgavlkbzjgbDjgozjgovlj6/og73mgKfjgYzjgYLjgovjgZ/jgoHplqLmlbDljJZcclxuICovXHJcbmNvbnN0IGFmdGVyRE9NTG9hZGVkID0gKCkgPT4ge1xyXG5cclxuICAvL+ihqOekuumgmOWfn+OCkuS9nOaIkOOBmeOCi1xyXG4gIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGJveC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgYm94LnN0eWxlLnpJbmRleCA9ICc5OTk5OSc7XHJcbiAgYm94LnN0eWxlLnRvcCA9ICcwJztcclxuICBib3guc3R5bGUucmlnaHQgPSAnMCc7XHJcbiAgYm94LnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIC4wNSknO1xyXG4gIGJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYm94KTtcclxuXHJcbiAgLy/jgrnjgr/jgqTjg6vjgr/jgrDjga7kvZzmiJBcclxuICBjb25zdCBTVFlMRSA9ICcuZG9tLXNpemUtY29uc29sZV9ob3Zlcl9iYWNrZ3JvdW5ke2JhY2tncm91bmQtY29sb3I6cmdiYSgxNTAsIDE1MCwgMjU1LCAuNSl9JztcclxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gIC8v44Kz44Oz44K944O844Or44Gr6KGo56S644GZ44KLIERPTVxyXG4gIGxldCBkb206IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIC8v54++5Zyo44GuIGh0bWwg5oOF5aCx44KS5Y+W5b6X44GX44Gm6KGo56S644GZ44KLXHJcbiAgY29uc3Qgc2hvd1NpbXBsZUNvbnNvbGUgPSAoKSA9PiB7XHJcbiAgICAvL2JveCDjgpLnqbrjgavjgZnjgotcclxuICAgIGJveC50ZXh0Q29udGVudCA9ICcnO1xyXG5cclxuICAgIC8v6KGo56S6IERPTSDjga7kvZzmiJDjg7vov73liqBcclxuICAgIGNvbnN0IGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGFyZWEudGV4dENvbnRlbnQgPSB3aW5kb3cuaW5uZXJXaWR0aCsnIHggJyt3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICBhcmVhLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XHJcbiAgICBhcmVhLnN0eWxlLmNvbG9yID0gJyMxZDFkMWQnO1xyXG4gICAgYXJlYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTAsIDI1MCwgMjUwLCAuOCknO1xyXG4gICAgYm94LmFwcGVuZENoaWxkKGFyZWEpO1xyXG4gIH07XHJcblxyXG4gIC8v6Kmz57Sw44KS6KGo56S644GZ44KLXHJcbiAgY29uc3Qgc2hvd0RldGFpbENvbnNvbGUgPSAoKSA9PiB7XHJcbiAgICAvL2JveCDjgpLnqbrjgavjgZnjgotcclxuICAgIGJveC50ZXh0Q29udGVudCA9ICcnO1xyXG5cclxuICAgIC8v6KGo56S644GZ44KLIHdpZHRoLCBoZWlnaHQg44KS5YWl5omLXHJcbiAgICBjb25zdCB3aWR0aCA9IGRvbSA9PT0gbnVsbCA/IHdpbmRvdy5pbm5lcldpZHRoIDogZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gZG9tID09PSBudWxsID8gd2luZG93LmlubmVySGVpZ2h0IDogZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcbiAgICAvL+ihqOekuiBET00g44Gu5L2c5oiQ44O76L+95YqgXHJcbiAgICBjb25zdCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBhcmVhLnRleHRDb250ZW50ID0gd2lkdGgrJyB4ICcraGVpZ2h0O1xyXG4gICAgYXJlYS5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xyXG4gICAgYXJlYS5zdHlsZS5jb2xvciA9ICcjMWQxZDFkJztcclxuICAgIGFyZWEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjUwLCAyNTAsIDI1MCwgLjgpJztcclxuICAgIGJveC5hcHBlbmRDaGlsZChhcmVhKTtcclxuICB9O1xyXG5cclxuICAvL+ePvuWcqOOBruioreWumuOCkuiqreOBv+i+vOOBv+OAgeaPj+eUu+OCkuihjOOBhlxyXG4gIGNvbnN0IHJlc3RvcmUgPSAoKSA9PiB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCh7dmlldzogdHJ1ZSwgZGV0YWlsOiBmYWxzZX0sIGl0ZW0gPT4ge1xyXG4gICAgICAvL+mdnuihqOekuuioreWumuOBquOCieihqOekuumgmOWfn+OCkua2iOOBmVxyXG4gICAgICBpZiAoICEgaXRlbS52aWV3KSB7XHJcbiAgICAgICAgYm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+ihqOekuumgmOWfn+OCkuihqOekulxyXG4gICAgICBib3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAvL2RldGFpbCDoqK3lrprjgavjgojjgaPjgabooajnpLrjgZnjgovjgoLjga7jgpLlpInjgYjjgotcclxuICAgICAgaWYgKGl0ZW0uZGV0YWlsKSB7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBTVFlMRTtcclxuICAgICAgICBzaG93RGV0YWlsQ29uc29sZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgc2hvd1NpbXBsZUNvbnNvbGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy/jg6rjgrXjgqTjgrrjgavjgojjgaPjgabmg4XloLHjgpLlho3mj4/nlLvjgZnjgotcclxuICBsZXQgdGltZXIgPSAwO1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAvL+aXouOBq+OCv+OCpOODnuODvOOBjOOCu+ODg+ODiOOBleOCjOOBpuOBhOOBn+OCieOCreODo+ODs+OCu+ODq+OBmeOCi1xyXG4gICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMC4xIOenkuW+jOOBq+eZu+mMslxyXG4gICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChyZXN0b3JlLCAxMDApO1xyXG4gIH0pO1xyXG5cclxuICAvL+WFqOOBpuOBriBET00g44Gr44Ob44OQ44O844Kk44OZ44Oz44OI44KS55m76YyyXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbnRlciA9IChlOiBFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGlmIChkb20gIT09IG51bGwpIHtcclxuICAgICAgICAgIGRvbS5jbGFzc0xpc3QucmVtb3ZlKCdkb20tc2l6ZS1jb25zb2xlX2hvdmVyX2JhY2tncm91bmQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9tID0gZS50YXJnZXQ7XHJcbiAgICAgICAgZG9tLmNsYXNzTGlzdC5hZGQoJ2RvbS1zaXplLWNvbnNvbGVfaG92ZXJfYmFja2dyb3VuZCcpO1xyXG4gICAgICAgIHJlc3RvcmUoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGZpbmRDaGlsZHJlbiA9IChwYXJlbnQ6IEVsZW1lbnQpID0+IHtcclxuICAgICAgY29uc3QgY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW47XHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGNoaWxkcmVuLml0ZW0oaSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGVudGVyKTtcclxuICAgICAgICBmaW5kQ2hpbGRyZW4odGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZpbmRDaGlsZHJlbihkb2N1bWVudC5ib2R5KTtcclxuICB9LCAxMDAwKTtcclxuXHJcbiAgLy/jg6Hjg4Pjgrvjg7zjgrjjg5Hjg4Pjgrfjg7PjgrDjgpLlj5fjgZHlj5bjgotcclxuICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QpID0+IHtcclxuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XHJcbiAgICAgIC8v44Od44OD44OX44Ki44OD44OX44Gr44KI44KL6Kit5a6a44Gu5aSJ5pu0XHJcbiAgICAgIGNhc2UgJ2NoYW5nZVNldHRpbmcnOlxyXG4gICAgICAgIHJlc3RvcmUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy/mj4/nlLvjga7liJ3mnJ/ljJZcclxuICByZXN0b3JlKCk7XHJcbn07XHJcblxyXG4vL0RPTUNvbnRlbnRMb2FkZWQg44Kk44OZ44Oz44OI44GM5pei44Gr55m654Gr44GX44Gm44GE44KL5aC05ZCI44Gv5Y2z5pmC44Gr5Yid5pyf5YyW6Zai5pWw44KS5ZG844G2XHJcbmlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhZnRlckRPTUxvYWRlZCk7XHJcbn1cclxuZWxzZSB7XHJcbiAgYWZ0ZXJET01Mb2FkZWQoKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9