webpackJsonp([4],{

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(226),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/huteng/go_work/src/taskcenter-admin/assets/src/views/tag/list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a653ca26", Component.options)
  } else {
    hotAPI.reload("data-v-a653ca26", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 178:
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

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(178);



const URLs = {
    list: 'list',
    delete: 'delete',
    create: 'create'
};

let tag = {};

var instance = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
    baseURL: '/api/tag',
    timeout: 3000
});

tag.getlist = function (params, success) {
    instance.get(URLs.list, { params: params }).then(response => {
        if (success !== undefined) {
            success(response.data.data);
        }
    }).catch(__WEBPACK_IMPORTED_MODULE_1__client__["a" /* default */].message);
};

tag.deleteTag = function (id, success) {
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

tag.createTag = function (params, success, error) {
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

/* harmony default export */ __webpack_exports__["a"] = (tag);

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_tag__ = __webpack_require__(182);
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
                name: '',
                intro: ''
            },
            ruleValidate: {
                name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
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
                __WEBPACK_IMPORTED_MODULE_0__client_tag__["a" /* default */].createTag(this.formValidate, body => {
                    this.$emit('on-success', body.data.id);
                    this.$Message.success("创建成功");
                    reset();
                }, error);
            });
        }
    }
});

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_tag__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_creationModal__ = __webpack_require__(206);
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
            pageNum: 1,
            pageSize: 20,
            totalNum: 1,
            columns: [{
                title: '序号',
                key: 'id'
            }, {
                title: '标签名',
                key: 'name'
            }, {
                title: '描述',
                key: 'intro'
            }, {
                title: '操作',
                key: 'action',
                width: 260,
                render: (h, params) => {
                    return h('div', [h('Button', {
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
                                        this.deleteTag(params.row.id);
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
            __WEBPACK_IMPORTED_MODULE_0__client_tag__["a" /* default */].getlist({ page_no: this.pageNum, page_size: this.pageSize }, body => {
                if (body.data.list != null) {
                    this.datas = body.data.list;
                } else {
                    this.datas = [];
                }
            });
        },
        changePage: function (page) {
            this.pageNum = page;
            this.refreshList();
        },
        deleteTag(id) {
            __WEBPACK_IMPORTED_MODULE_0__client_tag__["a" /* default */].deleteTag(id, () => {
                this.refreshList();
            });
        }
    },
    mounted: function () {
        this.refreshList();
    }
});

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(188),
  /* template */
  __webpack_require__(224),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/huteng/go_work/src/taskcenter-admin/assets/src/views/tag/components/creationModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] creationModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6882ed24", Component.options)
  } else {
    hotAPI.reload("data-v-6882ed24", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 224:
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
      "label": "名称:",
      "prop": "name"
    }
  }, [_c('Input', {
    model: {
      value: (_vm.formValidate.name),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "name", $$v)
      },
      expression: "formValidate.name"
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
  }, [_c('div', {
    staticStyle: {
      "margin": "0 auto",
      "width": "70px"
    }
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
  }, [_vm._v("创建")])], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6882ed24", module.exports)
  }
}

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "50px"
    }
  }, [_c('div', {
    staticStyle: {
      "font-size": "16px",
      "padding": "6px",
      "float": "left"
    }
  }, [_c('Button', {
    attrs: {
      "type": "warning"
    },
    on: {
      "click": _vm.refreshList
    }
  }, [_vm._v("标 签 列 表")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding": "6px",
      "float": "right"
    }
  }, [_c('ModalCreation', {
    ref: "modalCreation",
    attrs: {
      "title": "添加标签"
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
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin": "10px",
      "overflow": "hidden"
    }
  }, [_c('div', {
    staticStyle: {
      "float": "right"
    }
  }, [_c('Page', {
    ref: "page",
    attrs: {
      "total": _vm.totalNum,
      "page-size": _vm.pageSize,
      "current": _vm.pageNum
    },
    on: {
      "on-change": _vm.changePage
    }
  })], 1)])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "font-size": "16px",
      "padding": "6px"
    }
  }, [_vm._v("标签管理\n        "), _c('span', {
    staticStyle: {
      "font-size": "12px",
      "padding-left": "10px"
    }
  }, [_vm._v("管理任务所有的标签")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a653ca26", module.exports)
  }
}

/***/ })

});