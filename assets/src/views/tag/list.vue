<template>
    <div>
        <div style="font-size:16px; padding: 6px;">标签管理
            <span style="font-size:12px; padding-left:10px">管理任务所有的标签</span>
        </div>
        <div style="height: 50px; ">
            <div style="font-size:16px; padding: 6px; float: left;">
                <Button type="warning" @click="refreshList">标 签 列 表</Button>
            </div>
            <div style="padding: 6px; float: right;">
                <ModalCreation ref="modalCreation" @on-success="refreshList" title="添加标签"></ModalCreation>
                <Button type="primary" @click="$refs.modalCreation.open()">添加</Button>
            </div>
        </div>

        <Table border :columns="columns" :data="datas"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page  ref="page" :total="totalNum" :page-size="pageSize" :current="pageNum" @on-change="changePage" ></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import tag from '../../client/tag'
    import ModalCreation from './components/creationModal'

    export default {
        components: {
            ModalCreation,
        },
        data() {
            return {
                pageNum: 1,
                pageSize:20,
                totalNum:1,
                columns: [
                    {
                        title: '序号',
                        key: 'id'
                    },
                    {
                        title: '标签名',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'intro'
                    },            
                    {
                        title: '操作',
                        key: 'action',
                        width: 260,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
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
                                                  this.deleteTag(params.row.id)
                                                }
                                            });
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                datas: [
                ]
            }
        },
        methods: {
            refreshList() {
                tag.getlist({page_no: this.pageNum, page_size: this.pageSize}, (body) => {
                    if (body.data.list!=null) {
                        this.datas = body.data.list
                    } else {
                        this.datas = []
                    }
                })
            },
            changePage: function(page) {
                this.pageNum = page
                this.refreshList()
            },
            deleteTag(id) {
                tag.deleteTag(id, () => {
                    this.refreshList()
                })
            },
        },
        mounted: function () {
            this.refreshList()
        }
    }
</script>