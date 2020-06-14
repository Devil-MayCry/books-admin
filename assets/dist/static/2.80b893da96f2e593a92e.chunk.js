webpackJsonp([2],{

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(190),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/huteng/go_work/src/taskcenter-admin/assets/src/views/worker/list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8f096f6", Component.options)
  } else {
    hotAPI.reload("data-v-a8f096f6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iview__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_iview__);


let func = {};

func.message = function (error) {
    if (error.response === undefined) {
        console.error(error);
        return;
    }

    __WEBPACK_IMPORTED_MODULE_0_iview___default.a.Message.error(error.response.data.status_msg);
};

/* harmony default export */ __webpack_exports__["a"] = (func);

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_worker__ = __webpack_require__(182);
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            columns: [{
                title: '序号',
                key: 'id'
            }, {
                title: 'Topic',
                key: 'topic'
            }, {
                title: '数量',
                key: 'num'
            }, {
                title: '状态',
                key: 'state'
            }, {
                title: '描述',
                key: 'intro'
            }, {
                title: '创建时间',
                key: 'ctime'
            }, {
                title: '启动时间',
                key: 'update_time'
            }, {
                title: '操作',
                key: 'action',
                width: 260,
                render: (h, params) => {
                    return h('div', [h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.stopWorker(params.row.id);
                            }
                        }
                    }, '暂停'), h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.$Modal.confirm({
                                    title: '确认删除',
                                    content: '确定要删除吗？',
                                    onOk: () => {
                                        this.deleteWorker(params.row.id);
                                    }
                                });
                            }
                        }
                    }, '删除')]);
                }
            }],
            datas: []
        };
    },
    methods: {
        refreshList() {
            __WEBPACK_IMPORTED_MODULE_0__client_worker__["a" /* default */].getlist({}, body => {
                this.datas = body.data.list;
            });
        },
        stopWorker(id) {
            __WEBPACK_IMPORTED_MODULE_0__client_worker__["a" /* default */].stopWorker(id, () => {
                this.refreshList();
            });
        },
        deleteWorker(id) {
            __WEBPACK_IMPORTED_MODULE_0__client_worker__["a" /* default */].deleteWorker(id, () => {
                this.refreshList();
            });
        }
    },
    mounted: function () {
        this.refreshList();
    }
});

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(175);



const URLs = {
    list: 'list',
    stop: 'stop',
    create: 'create',
    delete: 'delete'
};

let worker = {};

var instance = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
    baseURL: '/api/worker',
    timeout: 3000
});

worker.getlist = function (params, success) {
    instance.get(URLs.list, { params: params }).then(response => {
        if (success !== undefined) {
            success(response.data.data);
        }
    }).catch(__WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message);
};

worker.stopWorker = function (id, success) {
    instance.put(URLs.stop, { id: id }).then(response => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch(e => {
        if (e !== undefined) {
            console.log(e);
        } else {
            __WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message(e);
        }
    });
};

worker.deleteWorker = function (id, success) {
    instance.put(URLs.delete, { id: id }).then(response => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch(e => {
        if (error !== undefined) {
            error(e);
        } else {
            __WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message(e);
        }
    });
};
/* harmony default export */ __webpack_exports__["a"] = (worker);

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticStyle: {
      "height": "50px"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding": "6px",
      "float": "right"
    }
  }, [_c('Button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.$refs.modalCreation.open()
      }
    }
  }, [_vm._v("添加")])], 1)]), _vm._v(" "), _c('Table', {
    attrs: {
      "border": "",
      "columns": _vm.columns,
      "data": _vm.datas
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "padding": "6px",
      "float": "left"
    }
  }, [_c('p', [_vm._v("Worker管理 管理系统所有的worker")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a8f096f6", module.exports)
  }
}

/***/ })

});