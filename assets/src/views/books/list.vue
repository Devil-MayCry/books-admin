<template>
    <div>
        <div style="font-size:16px; padding: 6px;">图书管理
            <span style="font-size:12px; padding-left:10px">管理部门所有图书</span>
        </div>
        <div style="height: 50px; ">
            <div style="font-size:16px; padding: 6px; float: left;">
                <Button type="warning" @click="refreshList">书 籍 列 表</Button>
            </div>
            <div style="padding: 6px; float: right;">
                <ModalEdit ref="modalEdit" @on-success="refreshList" title="编辑图书信息"></ModalEdit>
                <ModalCreation ref="modalCreation" @on-success="refreshList" title="添加图书"></ModalCreation>
                <ModalDetail ref="modalDetail" title="图书详情"></ModalDetail>
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
    import books from '../../client/books'
    import ModalCreation from './components/creationModal'
    import ModalDetail from './components/detailModal'
    import ModalEdit from './components/editModal'

    export default {
        components: {
            ModalCreation,
            ModalDetail,
            ModalEdit,
        },
        data() {
            return {
                pageNum: 1,
                pageSize:20,
                totalNum:0,
                columns: [
                    {
                        title: '序号',
                        key: 'id'
                    },
                    {
                        title: '图书名',
                        key: 'name'
                    },
                    {
                        title: '作者',
                        key: 'author'
                    },
                    {
                        title: '出版社',
                        key: 'publish'
                    },
                    {
                        title: '状态',
                        key: 'status',
                            render: (h, params) => {

                            const row = params.row;
                            const color = row.status === 1 ? 'green' : 'red';
                            const text = row.status === 1 ? '未借出' : '已借出';

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: 'ISBN',
                        key: 'isbn'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 260,
                        render: (h, params) => {
                            return h('div', [
                                 h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.modalDetail.open(params.row)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.modalEdit.open(params.row)
                                        }
                                    }
                                }, '编辑'),
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
                                                    this.deleteBook(params.row.id)
                                                }
                                            });
                                        }
                                    }
                                }, '删除'),
                                
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
             books.getlist({page_no: this.pageNum, page_size: this.pageSize}, (body) => {
                    if (body.list!=null) {
                        this.totalNum = body.total
                        this.datas = body.list
                    } else {
                        this.totalNum = 0
                        this.datas = []
                    }
                })
            },
            deleteBook(id) {
             books.deleteBook(id, () => {
                    this.refreshList()
                })
            },
            changePage: function(page) {
                this.pageNum = page
                this.refreshList()
            },
        },
        mounted: function () {
            this.refreshList()
        }
    }
</script>