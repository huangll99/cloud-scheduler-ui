<template>
    <Card>
        <p slot="title">
            <Icon type="ios-list-box-outline"/>
            任务列表
        </p>
        <div>
            <div>
                <Dropdown @on-click="operate" trigger="click">
                    <Button type="default" size="large">
                        批量操作
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="activate">
                            <Icon type="md-play"/>
                            激活
                        </DropdownItem>
                        <DropdownItem name="pause">
                            <Icon type="md-pause"/>
                            暂停
                        </DropdownItem>
                        <div class="line"></div>
                        <DropdownItem name="delete">
                            <Icon type="md-trash"/>
                            删除
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button @click="add" type="primary" size="large" style="margin-left: 20px;">
                    新建任务
                    <Icon type="md-add"/>
                </Button>
                <Select @on-change="changeGroup" v-model="group" style="width:120px;float:right" placeholder="请选择分组">
                    <Option value="">全部</Option>
                    <Option v-for="group in groups" :value="group" :key="group">{{ group }}</Option>
                </Select>
            </div>
            <div style="margin-top: 20px;">
                <Table border ref="selection" :columns="columns" :data="data"></Table>
            </div>
        </div>
    </Card>
</template>

<script lang="text/ecmascript-6">
    export default {
        name: "Task",
        data() {
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '组名称',
                        key: 'group'
                    },
                    {
                        title: '任务名称',
                        key: 'jobName'
                    },
                    {
                        title: '任务类型',
                        width: 100,
                        key: 'jobType',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.jobType === 0 ? '脚本调用' : '远程请求')
                            ]);
                        }
                    },
                    {
                        title: '触发类型',
                        width: 100,
                        key: 'triggerType',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.triggerType === 0 ? '简单触发' : 'cron触发')
                            ]);
                        }
                    },
                    {
                        title: '执行规则',
                        key: 'cron',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.triggerType === 0 ? '执行周期:' + params.row.period + ',执行次数:' + params.row.count : params.row.cron)
                            ]);
                        }
                    },
                    {
                        title: '执行状态',
                        key: 'triggerState',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', this.getState(params.row.triggerState))
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row.group + '_' + params.row.jobName)
                                        }
                                    }
                                }, ['查看', h('Icon', {
                                    props: {
                                        type: 'ios-paper-plane',
                                        size: 18
                                    },
                                    style: {
                                        verticalAlign: '-3px'
                                    }
                                })])
                            ]);
                        }
                    }
                ],
                data: [],
                groups: [],
                group: ''
            }
        },
        methods: {
            add() {
                this.$router.push("/taskAdd")
            },
            getState(state) {
                if (state === 0) {
                    return "正常";
                } else if (state === 1) {
                    return "暂停";
                } else if (state === 2) {
                    return "完成";
                } else if (state === 3) {
                    return "错误";
                } else if (state === 4) {
                    return "阻塞";
                } else {
                    return "已终结";
                }
            },
            operate(item) {
                switch (item) {
                    case "pause":
                        this.$Modal.confirm({
                            title: '确认框',
                            content: '<p>是否暂停任务</p>',
                            onOk: () => {
                                this.$axios.post("/pause", {'jobList': this.$refs.selection.getSelection()}).then(() => {
                                    this.refresh();
                                    this.$Message.info('暂停任务成功');
                                });
                            }
                        });
                        break;
                    case "activate":
                        this.$Modal.confirm({
                            title: '确认框',
                            content: '<p>是否激活任务</p>',
                            onOk: () => {
                                this.$axios.post("/activate", {'jobList': this.$refs.selection.getSelection()}).then(() => {
                                    this.refresh()
                                    this.$Message.info('激活任务成功');
                                });
                            }
                        });
                        break;
                    case "delete":
                        this.$Modal.confirm({
                            title: '确认框',
                            content: '<p>是否删除任务</p>',
                            onOk: () => {
                                this.$axios.post("/delete", {'jobList': this.$refs.selection.getSelection()}).then(() => {
                                    this.refresh()
                                    this.$Message.info('删除任务成功');
                                });
                            }
                        });
                        break;
                }
            },
            refresh() {
                this.$axios.get("/jobs?group=" + this.group).then((res) => {
                    this.data = res.data.data
                });
            },
            loadGroups() {
                this.$axios.get("/group").then((res) => {
                    if (res.data.success) {
                        this.groups = res.data.data;
                    } else {
                        this.$Message.warn("查询组失败")
                    }
                })
            },
            changeGroup() {
                this.$axios.get("/jobs?group=" + this.group).then((res) => {
                    this.data = res.data.data
                });
            },
            show(job) {
                this.$router.push("/taskView?job="+job)
            }
        },
        created() {
            this.$axios.get("/jobs").then((res) => {
                this.data = res.data.data
            });
            this.loadGroups()
        }
    }
</script>

<style scoped>
    .line {
        height: 1px;
        background-color: #ccc;
    }
</style>