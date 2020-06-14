<template>
    <!--创建服务对话框-->
    <Modal v-model="show">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>{{title}}</span>
        </p>
        <div style="width: 400px">
            <Form class="form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="书名:" prop="name">
                    <Input v-model="formValidate.name"></Input>
                </FormItem>
                <FormItem label="作者:" prop="author">
                    <Input v-model="formValidate.author"></Input>
                </FormItem>
                <FormItem label="出版社:" prop="publish">
                    <Input v-model="formValidate.publish"></Input>
                </FormItem>                
                <FormItem label="ISBN:" prop="isbn">
                    <Input v-model="formValidate.isbn"></Input>
                </FormItem>
                <FormItem label="出版日期:" prop="year">
                    <Input v-model="formValidate.year"></Input>
                </FormItem>
                <FormItem label="购入日期:" prop="storage_time">
                    <Input v-model="formValidate.storage_time"></Input>
                </FormItem>
                <FormItem label="借阅状态" prop="retry_model" type="button">
                    <Radio-group v-model="borrowStatus"@on-change="borrowOnChange">
                        <Radio label="未借出"></Radio>
                        <Radio label="已借出"></Radio>
                    </Radio-group>
                </FormItem>    
                <FormItem disabled label="借阅人:">
                    <Input v-model="formValidate.borrow"></Input>
                </FormItem>
                <FormItem disabled label="借阅时间:">
                    <Input v-model="formValidate.borrow_time"></Input>
                </FormItem>   
                <FormItem label="备注" prop="intro">
                    <Input v-model="formValidate.intro" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                           placeholder="不超过2000个字">
                    </Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <div style="margin:0 auto;width:70px;">
                <Button type="primary" :loading="loading" @click="submit('formValidate')">确认修改</Button>
            </div>
        </div>
    </Modal>
</template>


<script>
    import books from '../../../client/books'

    export default {
        props: {
            title: String
        },
        data() {
            return {
                show: false,
                loading: false,
                borrowStatus:"",
                formValidate: {
                    id: 0,
                    name: '',
                    author: '',
                    publish: '',
                    isbn: '',
                    status: 0,
                    year: '',
                    borrow: '',
                    borrow_time: '',
                    storage_time: '',
                    comment: '',
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '请填写名称', trigger: 'blur'}
                    ],
                    isbn: [
                        {required: true, message: '请填写书籍ISBN编号', trigger: 'blur'}
                    ]
                },
            }
        },
        mounted() {
        },
        methods: {
            open: function (data) {
                this.formValidate.id = data.id;
                this.formValidate.name = data.name;
                this.formValidate.author = data.author;
                this.formValidate.publish = data.publish;
                this.formValidate.isbn = data.isbn;
                this.formValidate.year = data.year;
                this.formValidate.status = data.status;
                this.formValidate.borrow = data.borrow;
                this.formValidate.borrow_time = data.borrow_time;
                this.formValidate.storage_time = data.storage_time;
                this.formValidate.comment = data.comment;
                this.show = true;
                if ( this.formValidate.status == 1 ){
                    this.borrowStatus = "未借出"
                } else{
                    this.borrowStatus = "已借出"
                }
            },
            borrowOnChange: function () {
                if ( this.borrowStatus == "未借出" ){
                    this.formValidate.status = 1
                } else{
                    this.formValidate.status = 2
                }
            },
            submit: function (name) {
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    let reset = () => {
                        this.formValidate = {};
                        this.loading = false;
                        this.show = false;
                    };
                    let error = (error) => {
                        this.loading = false;
                        this.$Modal.error({
                            title: '提交失败'
                        })
                    };
                    this.loading = true;
                    console.log("borrow status:",this.formValidate.status )
                    books.updateBook(this.formValidate, (body) => {
                        this.$emit('on-success');
                        this.$Message.success("修改成功");
                        reset()
                    }, error)
                })
            },
        }
    }
</script>