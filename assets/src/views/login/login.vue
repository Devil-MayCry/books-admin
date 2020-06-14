<style lang="less">
    @import './login.less'; 
</style>

<template>
    <div class="layout login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :shadow="true">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录肥猪图书管理系统
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="username">
                            <Input id="username" v-model="form.username" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input id="password" type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            imgSrc: '/p/user/captcha',
            form: {
                username: '',
                password: '',
                captcha: ''
            },
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        captchaRefresh(){
            this.imgSrc='/p/user/captcha?'+ Math.random()
        },
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$http.post('/p/user/login', this.form).then((response)=>{
                        if(response.data.code != 0){
                            this.$Message.error(response.data.message);
                            this.captchaRefresh();
                            return;
                        }

                        Cookies.set('ltag', 1);
                        Cookies.set('username', this.form.username);
                        localStorage.avatorImgPath = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg';
                        this.$router.push({
                            name: 'booksManagement'
                        });
                    })
                }
            });
        }
    }
};
</script>

<style>

</style>
