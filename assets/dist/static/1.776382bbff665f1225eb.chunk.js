webpackJsonp([1],{

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(180)
__webpack_require__(179)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(177),
  /* template */
  __webpack_require__(186),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/huteng/go_work/src/taskcenter-admin/assets/src/views/login/login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44b0818e", Component.options)
  } else {
    hotAPI.reload("data-v-44b0818e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_js_cookie__);
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
            imgSrc: '/p/user/captcha',
            form: {
                username: '',
                password: '',
                captcha: ''
            },
            rules: {
                username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
                captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
            }
        };
    },
    methods: {
        captchaRefresh() {
            this.imgSrc = '/p/user/captcha?' + Math.random();
        },
        handleSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$http.post('/p/user/login', this.form).then(response => {
                        if (response.data.code != 0) {
                            this.$Message.error(response.data.message);
                            this.captchaRefresh();
                            return;
                        }

                        __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set('ltag', 1);
                        __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set('username', this.form.username);
                        localStorage.avatorImgPath = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg';
                        this.$router.push({
                            name: 'booksManagement'
                        });
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 179:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 180:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "layout login",
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "login-con"
  }, [_c('Card', {
    attrs: {
      "shadow": true
    }
  }, [_c('p', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_c('Icon', {
    attrs: {
      "type": "log-in"
    }
  }), _vm._v("\n                欢迎登录肥猪图书管理系统\n            ")], 1), _vm._v(" "), _c('div', {
    staticClass: "form-con"
  }, [_c('Form', {
    ref: "loginForm",
    attrs: {
      "model": _vm.form,
      "rules": _vm.rules
    }
  }, [_c('FormItem', {
    attrs: {
      "prop": "username"
    }
  }, [_c('Input', {
    attrs: {
      "id": "username",
      "placeholder": "请输入用户名"
    },
    model: {
      value: (_vm.form.username),
      callback: function($$v) {
        _vm.$set(_vm.form, "username", $$v)
      },
      expression: "form.username"
    }
  }, [_c('span', {
    attrs: {
      "slot": "prepend"
    },
    slot: "prepend"
  }, [_c('Icon', {
    attrs: {
      "size": 16,
      "type": "person"
    }
  })], 1)])], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "prop": "password"
    }
  }, [_c('Input', {
    attrs: {
      "id": "password",
      "type": "password",
      "placeholder": "请输入密码"
    },
    model: {
      value: (_vm.form.password),
      callback: function($$v) {
        _vm.$set(_vm.form, "password", $$v)
      },
      expression: "form.password"
    }
  }, [_c('span', {
    attrs: {
      "slot": "prepend"
    },
    slot: "prepend"
  }, [_c('Icon', {
    attrs: {
      "size": 14,
      "type": "locked"
    }
  })], 1)])], 1), _vm._v(" "), _c('FormItem', [_c('Button', {
    attrs: {
      "type": "primary",
      "long": ""
    },
    on: {
      "click": _vm.handleSubmit
    }
  }, [_vm._v("登录")])], 1)], 1)], 1)])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-44b0818e", module.exports)
  }
}

/***/ })

});