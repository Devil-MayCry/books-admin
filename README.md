# 概述

Gateway管理后台,本项目后端采用Neo路由框架，前端采用iView组件库。

本项目为SPA应用，前端路由采用vue-router，但是实际开发及线上运行中均由后端代理前端路由。

# Clone 源代码

克隆本项目到GOPATH的src下

```Shell
git clone git@gitlab.luojilab.com:shzf/gwapi.git $GOPATH/src/gwapi
```

# 后端相关

## 安装依赖项

项目依赖使用 govendor 工具进行依赖管理，需要先安装 govendor 

```Shell
go get -u github.com/kardianos/govendor
```
然后使用 govendor 命令将项目相关依赖进行拉取

```Shell
govendor sync -v
```

# 前端相关

前端通过后端代理对外提供服务，前端代码在assets下。

## 安装依赖
```bush
// install dependencies
cd assets
npm install
```
## 运行
### 开发环境
```bush
// For the first time, run init to create index.html
npm run init
npm run dev
```
### 线上环境(Build)
```bush
npm run build
```

# 开发依赖
* [Neo](http://ivpusic.github.io/neo)
* [iView开发文档](https://www.iviewui.com/overview)




