webpackJsonp([4],{

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(198)

var Component = __webpack_require__(9)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(221),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/huteng/go_work/src/taskcenter-admin/assets/src/views/event/filterList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] filterList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e49dec76", Component.options)
  } else {
    hotAPI.reload("data-v-e49dec76", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iview__ = __webpack_require__(4);
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

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(177);



const URLs = {
    list: 'list',
    register: 'register',
    addTask: 'add-task',
    refresh: 'refresh',
    deleteEvent: 'delete-event',
    deleteTask: 'delete-task',
    taskList: 'task-list',
    eventListByTask: 'event-by-task-list'
};

let event = {};

var instance = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
    baseURL: '/api/event',
    timeout: 3000
});

event.getlist = function (params, success) {
    instance.get(URLs.list, { params: params }).then(response => {
        if (success !== undefined) {
            success(response.data.data);
        }
    }).catch(__WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message);
};

event.deleteEvent = function (id, success) {
    instance.put(URLs.deleteEvent, { id: id }).then(response => {
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

event.refreshEvent = function (id, success) {
    instance.put(URLs.refresh, { id: id }).then(response => {
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

event.registerEvent = function (params, success, error) {
    instance.post(URLs.register, params).then(response => {
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

event.addTask = function (params, success, error) {
    instance.post(URLs.addTask, params).then(response => {
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

event.getEventTaskList = function (params, success) {
    instance.get(URLs.taskList, { params: params }).then(response => {
        if (success !== undefined) {
            success(response.data.data);
        }
    }).catch(__WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message);
};

event.deleteTask = function (id, success) {
    instance.put(URLs.deleteTask, { id: id }).then(response => {
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

event.getEventByTask = function (params, success) {
    instance.get(URLs.eventListByTask, { params: params }).then(response => {
        if (success !== undefined) {
            success(response.data.data);
        }
    }).catch(__WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message);
};

/* harmony default export */ __webpack_exports__["a"] = (event);

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_event__ = __webpack_require__(180);
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
            columns: [{
                title: '序号',
                key: 'id'
            }, {
                title: '事件',
                key: 'event'
            }, {
                title: '任务',
                key: 'name'
            }, {
                title: '创建时间',
                key: 'create_time'
            }, {
                title: '操作',
                key: 'action',
                width: 300,
                align: 'center',
                render: (h, params) => {
                    return h('div', [h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.$Modal.confirm({
                                    title: '删除确认',
                                    content: '您确认进行删除操作吗？',
                                    onOk: () => {
                                        this.deleteTask(params.row.id, body => {
                                            this.$Message.success('删除成功');
                                        });
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
        refreshList: function (event_name) {
            __WEBPACK_IMPORTED_MODULE_0__client_event__["a" /* default */].getEventTaskList({ event_name: event_name }, body => {
                if (body.data.list != null) {
                    this.datas = body.data.list;
                } else {
                    this.datas = [];
                }
            });
        },
        deleteTask(id) {
            __WEBPACK_IMPORTED_MODULE_0__client_event__["a" /* default */].deleteTask(id, () => {
                this.refreshList();
            });
        }
    },
    mounted: function () {
        let searchEvent = this.$route.query.event_name;
        this.refreshList(searchEvent);
    }
});

/***/ }),

/***/ 198:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _vm._v(" "), _c('Table', {
    attrs: {
      "border": "",
      "columns": _vm.columns,
      "data": _vm.datas
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "height": "50px"
    }
  }, [_c('div', {
    staticStyle: {
      "font-size": "16px",
      "padding": "6px",
      "float": "left"
    }
  }, [_vm._v("事件管理\n          "), _c('span', {
    staticStyle: {
      "font-size": "12px",
      "padding-left": "10px"
    }
  }, [_vm._v("管理系统所有的事件")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-e49dec76", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=4.chunk.js.map