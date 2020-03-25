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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7OztHQUdHO0FBQ0gsSUFBTSxjQUFjLEdBQUc7SUFFckIsV0FBVztJQUNYLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUMzQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxLQUFL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QUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUNuQixTQUFTO2lCQUNWO2dCQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN0QjtRQUNILENBQUMsQ0FBQztRQUNGLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRVQsaUJBQWlCO0lBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFDLE9BQU87UUFDM0MsUUFBUSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3BCLGdCQUFnQjtZQUNoQixLQUFLLGVBQWU7Z0JBQ2xCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUTtJQUNSLE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyxDQUFDO0FBRUYsOENBQThDO0FBQzlDLElBQUcsUUFBUSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7SUFDcEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQy9EO0tBQ0k7SUFDSCxjQUFjLEVBQUUsQ0FBQztDQUNsQiIsImZpbGUiOiJwYWdlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2UudHNcIik7XG4iLCIvKipcclxuICogRE9NQ29udGVudExvYWRlZCDlrozkuoblvozjgavlkbzjgbDjgozjgotcclxuICogQ2hyb21lIEV4dGVuc2lvbiDjga/ml6LjgatET01Db250ZW50TG9hZGVkIOOCpOODmeODs+ODiOOBjOeZuueBq+OBl+e1guOBiOOBn+W+jOOBq+WRvOOBsOOCjOOCi+WPr+iDveaAp+OBjOOBguOCi+OBn+OCgemWouaVsOWMllxyXG4gKi9cclxuY29uc3QgYWZ0ZXJET01Mb2FkZWQgPSAoKSA9PiB7XHJcblxyXG4gIC8v6KGo56S66aCY5Z+f44KS5L2c5oiQ44GZ44KLXHJcbiAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgYm94LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuICBib3guc3R5bGUuekluZGV4ID0gJzk5OTk5JztcclxuICBib3guc3R5bGUudG9wID0gJzAnO1xyXG4gIGJveC5zdHlsZS5yaWdodCA9ICcwJztcclxuICBib3guc3R5bGUuYm94U2hhZG93ID0gJzAgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgLjA1KSc7XHJcbiAgYm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChib3gpO1xyXG5cclxuICAvL+OCueOCv+OCpOODq+OCv+OCsOOBruS9nOaIkFxyXG4gIGNvbnN0IFNUWUxFID0gJy5kb20tc2l6ZS1jb25zb2xlX2hvdmVyX2JhY2tncm91bmR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDE1MCwgMTUwLCAyNTUsIC41KX0nO1xyXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgLy/jgrPjg7Pjgr3jg7zjg6vjgavooajnpLrjgZnjgosgRE9NXHJcbiAgbGV0IGRvbTogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLy/nj77lnKjjga4gaHRtbCDmg4XloLHjgpLlj5blvpfjgZfjgabooajnpLrjgZnjgotcclxuICBjb25zdCBzaG93U2ltcGxlQ29uc29sZSA9ICgpID0+IHtcclxuICAgIC8vYm94IOOCkuepuuOBq+OBmeOCi1xyXG4gICAgYm94LnRleHRDb250ZW50ID0gJyc7XHJcblxyXG4gICAgLy/ooajnpLogRE9NIOOBruS9nOaIkOODu+i/veWKoFxyXG4gICAgY29uc3QgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYXJlYS50ZXh0Q29udGVudCA9IHdpbmRvdy5pbm5lcldpZHRoKycgeCAnK3dpbmRvdy5pbm5lckhlaWdodDtcclxuICAgIGFyZWEuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcclxuICAgIGFyZWEuc3R5bGUuY29sb3IgPSAnIzFkMWQxZCc7XHJcbiAgICBhcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1MCwgMjUwLCAyNTAsIC44KSc7XHJcbiAgICBib3guYXBwZW5kQ2hpbGQoYXJlYSk7XHJcbiAgfTtcclxuXHJcbiAgLy/oqbPntLDjgpLooajnpLrjgZnjgotcclxuICBjb25zdCBzaG93RGV0YWlsQ29uc29sZSA9ICgpID0+IHtcclxuICAgIC8vYm94IOOCkuepuuOBq+OBmeOCi1xyXG4gICAgYm94LnRleHRDb250ZW50ID0gJyc7XHJcblxyXG4gICAgLy/ooajnpLrjgZnjgosgd2lkdGgsIGhlaWdodCDjgpLlhaXmiYtcclxuICAgIGNvbnN0IHdpZHRoID0gZG9tID09PSBudWxsID8gd2luZG93LmlubmVyV2lkdGggOiBkb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBkb20gPT09IG51bGwgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiBkb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuICAgIC8v6KGo56S6IERPTSDjga7kvZzmiJDjg7vov73liqBcclxuICAgIGNvbnN0IGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGFyZWEudGV4dENvbnRlbnQgPSB3aWR0aCsnIHggJytoZWlnaHQ7XHJcbiAgICBhcmVhLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XHJcbiAgICBhcmVhLnN0eWxlLmNvbG9yID0gJyMxZDFkMWQnO1xyXG4gICAgYXJlYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTAsIDI1MCwgMjUwLCAuOCknO1xyXG4gICAgYm94LmFwcGVuZENoaWxkKGFyZWEpO1xyXG4gIH07XHJcblxyXG4gIC8v54++5Zyo44Gu6Kit5a6a44KS6Kqt44G/6L6844G/44CB5o+P55S744KS6KGM44GGXHJcbiAgY29uc3QgcmVzdG9yZSA9ICgpID0+IHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHt2aWV3OiB0cnVlLCBkZXRhaWw6IGZhbHNlfSwgaXRlbSA9PiB7XHJcbiAgICAgIC8v6Z2e6KGo56S66Kit5a6a44Gq44KJ6KGo56S66aCY5Z+f44KS5raI44GZXHJcbiAgICAgIGlmICggISBpdGVtLnZpZXcpIHtcclxuICAgICAgICBib3guc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8v6KGo56S66aCY5Z+f44KS6KGo56S6XHJcbiAgICAgIGJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgIC8vZGV0YWlsIOioreWumuOBq+OCiOOBo+OBpuihqOekuuOBmeOCi+OCguOBruOCkuWkieOBiOOCi1xyXG4gICAgICBpZiAoaXRlbS5kZXRhaWwpIHtcclxuICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IFNUWUxFO1xyXG4gICAgICAgIHNob3dEZXRhaWxDb25zb2xlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICBzaG93U2ltcGxlQ29uc29sZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvL+ODquOCteOCpOOCuuOBq+OCiOOBo+OBpuaDheWgseOCkuWGjeaPj+eUu+OBmeOCi1xyXG4gIGxldCB0aW1lciA9IDA7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIC8v5pei44Gr44K/44Kk44Oe44O844GM44K744OD44OI44GV44KM44Gm44GE44Gf44KJ44Kt44Oj44Oz44K744Or44GZ44KLXHJcbiAgICBpZiAodGltZXIpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAwLjEg56eS5b6M44Gr55m76YyyXHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzdG9yZSwgMTAwKTtcclxuICB9KTtcclxuXHJcbiAgLy/lhajjgabjga4gRE9NIOOBq+ODm+ODkOODvOOCpOODmeODs+ODiOOCkueZu+mMslxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY29uc3QgZW50ZXIgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoZG9tICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBkb20uY2xhc3NMaXN0LnJlbW92ZSgnZG9tLXNpemUtY29uc29sZV9ob3Zlcl9iYWNrZ3JvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvbSA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdkb20tc2l6ZS1jb25zb2xlX2hvdmVyX2JhY2tncm91bmQnKTtcclxuICAgICAgICByZXN0b3JlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBmaW5kQ2hpbGRyZW4gPSAocGFyZW50OiBFbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xyXG4gICAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBjaGlsZHJlbi5pdGVtKGkpO1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlbnRlcik7XHJcbiAgICAgICAgZmluZENoaWxkcmVuKHRhcmdldCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBmaW5kQ2hpbGRyZW4oZG9jdW1lbnQuYm9keSk7XHJcbiAgfSwgMTAwMCk7XHJcblxyXG4gIC8v44Oh44OD44K744O844K444OR44OD44K344Oz44Kw44KS5Y+X44GR5Y+W44KLXHJcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0KSA9PiB7XHJcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xyXG4gICAgICAvL+ODneODg+ODl+OCouODg+ODl+OBq+OCiOOCi+ioreWumuOBruWkieabtFxyXG4gICAgICBjYXNlICdjaGFuZ2VTZXR0aW5nJzpcclxuICAgICAgICByZXN0b3JlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8v5o+P55S744Gu5Yid5pyf5YyWXHJcbiAgcmVzdG9yZSgpO1xyXG59O1xyXG5cclxuLy9ET01Db250ZW50TG9hZGVkIOOCpOODmeODs+ODiOOBjOaXouOBq+eZuueBq+OBl+OBpuOBhOOCi+WgtOWQiOOBr+WNs+aZguOBq+WIneacn+WMlumWouaVsOOCkuWRvOOBtlxyXG5pZihkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgYWZ0ZXJET01Mb2FkZWQpO1xyXG59XHJcbmVsc2Uge1xyXG4gIGFmdGVyRE9NTG9hZGVkKCk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==