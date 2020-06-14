webpackJsonp([0],{

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(183)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(178),
  /* template */
  __webpack_require__(187),
  /* scopeId */
  "data-v-03906c44",
  /* cssModules */
  null
)
Component.options.__file = "/Users/huteng/go_work/src/taskcenter-admin/assets/src/views/task/list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03906c44", Component.options)
  } else {
    hotAPI.reload("data-v-03906c44", Component.options)
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

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_task__ = __webpack_require__(181);
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
            confirm: false,
            loading: true,
            searchItem: {
                serviceId: '',
                name: ''
            },
            serviceItems: [],
            serviceMaps: [],
            page: {
                total: 0,
                size: 10,
                current: 1
            },
            columns: [{
                title: '序号',
                key: 'id'
            }, {
                title: '分类',
                key: 'topic'
            }, {
                title: '名称',
                key: 'name'
            }, {
                title: '描述',
                key: 'intro'
            }, {
                title: 'API',
                key: 'api_url'
            }, {
                title: '延迟时间',
                key: 'delayed'
            }, {
                title: '超时时间',
                key: 'deleted'
            }, {
                title: '创建时间',
                key: 'create_time'
            }, {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    let btnEdit = h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {}
                        }
                    }, '编辑');
                    let btnDel = h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.$Modal.confirm({
                                    title: '确认删除',
                                    content: '确定要删除吗？',
                                    onOk: () => {
                                        this.deleteTask(params.row.id);
                                    }
                                });
                            }
                        }
                    }, '删除');
                    return [h('Row', { style: { margin: '5px 0' } }, [btnEdit, btnDel])];
                }
            }],
            datas: []
        };
    },
    methods: {
        refreshList() {
            __WEBPACK_IMPORTED_MODULE_0__client_task__["a" /* default */].getlist({}, body => {
                this.datas = body.data.list;
            });
        },
        deleteTask(id) {
            __WEBPACK_IMPORTED_MODULE_0__client_task__["a" /* default */].deleteTask(id, () => {
                this.refreshList();
            });
        }
    },
    beforeMount: function () {},
    mounted: function () {
        __WEBPACK_IMPORTED_MODULE_0__client_task__["a" /* default */].getlist({}, body => {
            this.datas = body.data.list;
        });
    }
});

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(175);



const URLs = {
    list: 'list',
    delete: 'delete',
    detail: 'detail',
    create: 'create',
    update: 'update'
};

let task = {};

var instance = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
    baseURL: '/api/task',
    timeout: 3000
});

task.getlist = function (params, success) {
    instance.get(URLs.list, { params: params }).then(response => {
        if (success !== undefined) {
            success(response.data.data);
        }
    }).catch(__WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message);
};

task.deleteTask = function (id, success) {
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

/* harmony default export */ __webpack_exports__["a"] = (task);

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 187:
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
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.goPage('/api/create?serviceid=' + _vm.searchItem.serviceId)
      }
    }
  }, [_vm._v("添加")])], 1)]), _vm._v(" "), _c('div', [_c('div', [_c('Button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.goPage('/api/create?serviceid=' + _vm.searchItem.serviceId)
      }
    }
  }, [_vm._v("选择分类")]), _vm._v(" "), _c('Button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.goPage('/api/create?serviceid=' + _vm.searchItem.serviceId)
      }
    }
  }, [_vm._v("筛选")])], 1), _vm._v(" "), _c('Table', {
    attrs: {
      "border": "",
      "columns": _vm.columns,
      "data": _vm.datas
    },
    on: {
      "on-selection-change": _vm.onSelectChange
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "padding": "6px",
      "float": "left"
    }
  }, [_c('p', [_vm._v("任务管理 管理系统所有的任务")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-03906c44", module.exports)
  }
}

/***/ })

});