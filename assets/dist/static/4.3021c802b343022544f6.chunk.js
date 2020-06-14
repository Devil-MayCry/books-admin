webpackJsonp([4],{

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(205),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/huteng/go_work/src/taskcenter-admin/assets/src/views/task/taskPush.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] taskPush.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b3c5aff", Component.options)
  } else {
    hotAPI.reload("data-v-1b3c5aff", Component.options)
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

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(177);



const URLs = {
    list: 'list',
    delete: 'delete',
    detail: 'detail',
    create: 'create',
    update: 'update',
    push: 'push'
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

task.createTask = function (params, success, error) {
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

task.updateTask = function (params, success, error) {
    instance.put(URLs.update, params).then(response => {
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

task.pushTask = function (params, success, error) {
    instance.post(URLs.push, params).then(response => {
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

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_task__ = __webpack_require__(178);
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
                method: '',
                format: '',
                data: ''
            },
            ruleValidate: {
                method: [{ required: true, message: '请输入', trigger: 'blur' }],
                format: [{ required: true, message: '请输入', trigger: 'blur' }],
                data: [{ required: true, message: '请输入', trigger: 'blur' }]
            }
        };
    },
    methods: {
        formHandle: function (format, data) {
            let keys = format.split(",");
            let rows = data.split('\n');
            let params = [];
            rows.forEach(function (row) {
                let items = row.split(',');;
                let p = new Object();
                for (let i = 0; i < keys.length; i++) {
                    p[keys[i]] = items[i];
                }
                params.push(p);
            });
            return JSON.stringify(params);
        },
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

                let args = this.formHandle(this.formValidate.format, this.formValidate.data);

                __WEBPACK_IMPORTED_MODULE_0__client_task__["a" /* default */].pushTask({ args: args, name: name }, body => {
                    this.$emit('on-success', body);
                    this.$Message.success("创建成功");
                    reset();
                }, error);
            });
        }
    }
});

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
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
      "label": "执行方法:",
      "prop": "taskMethod"
    }
  }, [_c('Input', {
    model: {
      value: (_vm.formValidate.method),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "method", $$v)
      },
      expression: "formValidate.method"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "参数格式:",
      "prop": "taskFormat"
    }
  }, [_c('Input', {
    model: {
      value: (_vm.formValidate.format),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "format", $$v)
      },
      expression: "formValidate.format"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "参数数据:",
      "prop": "taskData"
    }
  }, [_c('Input', {
    attrs: {
      "type": "textarea",
      "autosize": {
        minRows: 3,
        maxRows: 5
      }
    },
    model: {
      value: (_vm.formValidate.data),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "data", $$v)
      },
      expression: "formValidate.data"
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1b3c5aff", module.exports)
  }
}

/***/ })

});