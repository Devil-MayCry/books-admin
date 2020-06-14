<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-content {
        min-height: 1200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-menu-left {
        background: #464c5b;
    }

    .layout-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <Col span="5" class="layout-menu-left">
                <Menu :active-name="currentNav" theme="dark" width="auto" :open-names="['api', 'setting']" @on-select="onSelect">
                    <div class="layout-logo-left"></div>
                    <Submenu name="api">
                        <template slot="title">
                            <Icon type="ios-infinite-outline"></Icon>
                        任务管理
                        </template>
                        <MenuItem name="booksManagement">图书管理</MenuItem>
                    </Submenu>
                    <Submenu name="setting">
                        <template slot="title">
                            <Icon type="ios-gear-outline"></Icon>
                        面板设置
                        </template>
                        <MenuItem name="tagManagement">标签管理</MenuItem>
                        <MenuItem>权限管理</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="19">
                <div class="layout-header">
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)">
                                <span class="main-user-name">{{ userName }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                    </Row>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2012-2017 &copy; Luojilab
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                userName: ''
            }
        },
        computed: {
            currentNav: function () {
                return this.$route.path.substr(1)
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            }
        },
        mounted: function(){
            this.userName = Cookies.get("username")
        },
        methods: {
            onSelect(name) {
                this.$router.push({name : name})
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    // util.openNewPage(this, 'ownspace_index');
                    // this.$router.push({
                    //     name: 'ownspace_index'
                    // });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$http.post('/p/user/logout', {}).then((response)=>{
                        if(response.data.code != 0){
                            this.$Message.error(response.data.message)
                            return
                        }

                        Cookies.remove('ltag');
                        localStorage.clear();
                        this.$router.push({
                            name: 'login'
                        });
                    })

                    
                }
            }
        }
    }
</script>
