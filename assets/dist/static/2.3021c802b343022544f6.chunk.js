webpackJsonp([2],{

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(211),
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

/***/ 177:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(177);



const URLs = {
    list: 'list',
    stop: 'stop',
    start: 'start',
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

worker.stopWorker = function (id, success, error) {
    instance.put(URLs.stop, { id: id }).then(response => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch(e => {
        if (e !== undefined) {
            error(e);
        } else {
            __WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message(e);
        }
    });
};

worker.startWorker = function (id, success, error) {
    instance.put(URLs.start, { id: id }).then(response => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch(e => {
        if (e !== undefined) {
            error(e);
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

worker.createWorker = function (params, success, error) {
    instance.post(URLs.create, params).then(response => {
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_worker__ = __webpack_require__(179);
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
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        title: String
    },
    data() {
        return {
            show: false,
            loading: false,
            formValidate: {
                topic: '',
                num: 0,
                intro: ''
            },
            ruleValidate: {
                topic: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                intro: [{ required: true, message: '请填写描述', trigger: 'blur' }, { type: 'string', max: 2000, message: '描述不能超过2000个字符', trigger: 'blur' }]
            }
        };
    },
    mounted() {},
    methods: {
        open: function () {
            this.show = true;
        },
        submit: function (name) {
            this.$refs[name].validate(valid => {
                if (!valid) {
                    return;
                }

                let reset = () => {
                    this.formValidate = {};
                    this.loading = false;
                    this.show = false;
                };
                let error = error => {
                    this.loading = false;
                    this.$Modal.error({
                        title: '提交失败',
                        content: error.response.data.status_msg
                    });
                };

                this.loading = true;

                this.formValidate.num = this.formValidate.num.toString();
                __WEBPACK_IMPORTED_MODULE_0__client_worker__["a" /* default */].createWorker(this.formValidate, body => {
                    this.$emit('on-success', body.data.id);
                    this.$Message.success("创建成功");
                    reset();
                }, error);
            });
        }
    }
});

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_worker__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_creationModal__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_creationModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_creationModal__);
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
    components: {
        ModalCreation: __WEBPACK_IMPORTED_MODULE_1__components_creationModal___default.a
    },
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
                                if (params.row.state == 1) {
                                    this.stopWorker(params.row.id);
                                } else if (params.row.state == 2) {
                                    this.startWorker(params.row.id);
                                }
                            }
                        }
                    }, '暂停/开始'), h('Button', {
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
                if (body.data.list != null) {
                    this.datas = body.data.list;
                } else {
                    this.datas = [];
                }
            });
        },
        stopWorker(id) {
            __WEBPACK_IMPORTED_MODULE_0__client_worker__["a" /* default */].stopWorker(id, () => {
                this.refreshList();
            });
        },
        startWorker(id) {
            __WEBPACK_IMPORTED_MODULE_0__client_worker__["a" /* default */].startWorker(id, () => {
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

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(203),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/huteng/go_work/src/taskcenter-admin/assets/src/views/worker/components/creationModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] creationModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a3fcabc", Component.options)
  } else {
    hotAPI.reload("data-v-0a3fcabc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('Modal', {
    model: {
      value: (_vm.show),
      callback: function($$v) {
        _vm.show = $$v
      },
      expression: "show"
    }
  }, [_c('p', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('Icon', {
    attrs: {
      "type": "information-circled"
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "400px"
    }
  }, [_c('Form', {
    ref: "formValidate",
    staticClass: "form",
    attrs: {
      "model": _vm.formValidate,
      "rules": _vm.ruleValidate,
      "label-width": 120
    }
  }, [_c('FormItem', {
    attrs: {
      "label": "Topic:",
      "prop": "topic"
    }
  }, [_c('Input', {
    model: {
      value: (_vm.formValidate.topic),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "topic", $$v)
      },
      expression: "formValidate.topic"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "数量:",
      "prop": "num"
    }
  }, [_c('Input', {
    model: {
      value: (_vm.formValidate.num),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "num", $$v)
      },
      expression: "formValidate.num"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "描述",
      "prop": "intro"
    }
  }, [_c('Input', {
    attrs: {
      "type": "textarea",
      "autosize": {
        minRows: 3,
        maxRows: 5
      },
      "placeholder": "必填，不超过2000个字符"
    },
    model: {
      value: (_vm.formValidate.intro),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "intro", $$v)
      },
      expression: "formValidate.intro"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('Button', {
    attrs: {
      "type": "primary",
      "loading": _vm.loading
    },
    on: {
      "click": function($event) {
        _vm.submit('formValidate')
      }
    }
  }, [_vm._v("创建")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0a3fcabc", module.exports)
  }
}

/***/ }),

/***/ 211:
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
  }, [_c('ModalCreation', {
    ref: "modalCreation",
    attrs: {
      "title": "添加worker"
    },
    on: {
      "on-success": _vm.refreshList
    }
  }), _vm._v(" "), _c('Button', {
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