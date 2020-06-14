<style scoped>
    .expand-row {
        margin-bottom: 20px;
    }

    .expand-key {
        display: inline-block;
        width: 100px;
        text-align: right;
    }
</style>

<template>
    <Modal v-model="show" width="500" :title="title">
        <Alert v-if="context2 !== ''" type="warning">
            {{context2}}
        </Alert>
        <div slot="footer">
            <Button @click="ok" :disabled="context2 !== ''">确认</Button>
            <Button @click="cancel">取消</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props: {
            title: '',
            model: Array,
            context: '',
            goTitle: '',
            goURL: ''
        },
        data() {
            return {
                show: false,
                context2: ''
            }
        },
        watch: {
            context: function (val) {
                this.context2 = val
            },
            show: function (val) {
                if (val === false) {
                    this.context2 = ''
                }
            }
        },
        methods: {
            open() {
                this.show = true
            },
            ok() {
                this.$emit('on-conform')
                this.show = false
            },
            cancel() {
                this.show = false
            }
        }
    }
</script>
