<template>
    <!--创建服务对话框-->
    <Modal v-model="show">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>{{title}}</span>
        </p>
        <div style="width: 400px">
            <Form class="form" :label-width="120">
                <FormItem disabled label="序号:">
                    <span style="font-size:13px">{{booksInfo.id}}</span>
                </FormItem>
                <FormItem disabled label="书名:">
                    <span style="font-size:13px">{{booksInfo.name}}</span>
                </FormItem>
                <FormItem disabled label="作者:">
                    <span style="font-size:13px">{{booksInfo.author}}</span>
                </FormItem>
                <FormItem disabled label="出版社:">
                    <span style="font-size:13px">{{booksInfo.publish}}</span>
                </FormItem>
                <FormItem disabled label="ISBN号:">
                    <span style="font-size:13px">{{booksInfo.isbn}}</span>
                </FormItem>
                <FormItem disabled label="出版年份:">
                    <span style="font-size:13px">{{booksInfo.year}}</span>
                </FormItem>
                <FormItem disabled label="借阅状态:">
                    <span style="font-size:13px">{{booksInfo.status}}</span>
                </FormItem>
                <FormItem disabled label="借阅人:">
                    <span style="font-size:13px">{{booksInfo.borrow}}</span>
                </FormItem>
                <FormItem disabled label="借阅时间:">
                    <span style="font-size:13px">{{booksInfo.borrow_time}}</span>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="booksInfo.comment" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <div style="margin:0 auto;width:70px;">
                <Button type="primary" @click="reset()">关闭</Button>
            </div>
        </div>
    </Modal>
</template>


<script>
    import books from '../../../client/books'

    export default {
        props: {
            title: String,
        },
        data() {
            return {
                show: false,
                loading: false,
                booksInfo: {
                  id:0,
                  name:"",
                  author:"",
                  publish:"",
                  isbn:"",
                  year:"",
                  status:"",
                  borrower:"",
                  borrowTime:"",
                  storageTime:"",
                  comment:""
                }
            }
        },
        methods: {
           reset: function (){
                this.booksInfo = {};
                this.loading = false;
                this.show = false;
            },
            open: function (data) {
                console.log(data)
                this.show = true;
                this.booksInfo.id = data.id
                this.booksInfo.name = data.name
                this.booksInfo.author = data.author
                this.booksInfo.publish = data.publish
                this.booksInfo.isbn = data.isbn
                this.booksInfo.year = data.year
                this.booksInfo.status = data.status === 1 ? '未借出' : '已借出'
                this.booksInfo.borrow = data.borrow
                this.booksInfo.borrowTime = data.borrowTime
                this.booksInfo.storageTime = data.storageTime
                this.booksInfo.comment = data.comment
            },
        }
    }
</script>