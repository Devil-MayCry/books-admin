<template>
    <!--创建服务对话框-->
    <Modal v-model="show">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>{{title}}</span>
        </p>
        <div style="width: 400px">
            <Form class="form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="名称:" prop="name">
                    <Input v-model="formValidate.name"></Input>
                </FormItem>
                <FormItem label="描述" prop="intro">
                    <Input v-model="formValidate.intro" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                           placeholder="必填，不超过2000个字符"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <div style="margin:0 auto;width:70px;">
                <Button type="primary" :loading="loading" @click="submit('formValidate')">创建</Button>
            </div>
        </div>
    </Modal>
</template>


<script>
    import tag from '../../../client/tag'

    export default {
        props: {
            title: String
        },
        data() {
            return {
                show: false,
                loading: false,
                formValidate: {
                    name: '',
                    intro: '',
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '请填写名称', trigger: 'blur'}
                    ],
                    intro: [
                        {required: true, message: '请填写描述', trigger: 'blur'},
                        {type: 'string', max: 2000, message: '描述不能超过2000个字符', trigger: 'blur'}
                    ],
                },
            }
        },
        mounted() {
        },
        methods: {
            open: function () {
                this.show = true;
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
                            title: '提交失败',
                            content: error.response.data.status_msg
                        })
                    };

                    this.loading = true;
                    tag.createTag(this.formValidate, (body) => {
                        this.$emit('on-success', body.data.id);
                        this.$Message.success("创建成功");
                        reset()
                    }, error)
                })
            },
        }
    }
</script>