<template>
    <Card>
        <p slot="title">
            <Icon style="vertical-align: -2px" type="md-add"/>
            添加任务
        </p>
        <div>
            <Form :model="formItem" :label-width="150" :rules="ruleValidate">
                <FormItem label="任务名称" prop="jobName">
                    <Input v-model="formItem.jobName"/>
                </FormItem>
                <FormItem label="任务说明" prop="jobDesc">
                    <Input v-model="formItem.jobDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
                </FormItem>
                <FormItem label="分组" prop="group">
                    <Select v-if="!groupVisible" v-model="formItem.group">
                        <Option v-for="item in groups" :key="item" :value="item">{{item}}</Option>
                    </Select>
                    <Input v-if="groupVisible" v-model="formItem.group"/>
                    <Button v-if="!groupVisible" @click="groupVisible=true" style="margin-top: 10px" type="success">
                        新的组
                    </Button>
                    <Button v-if="groupVisible" @click="groupVisible=false" style="margin-top: 10px" type="success">
                        选择组
                    </Button>
                </FormItem>
                <FormItem label="是否只允许一个实例">
                    <RadioGroup v-model="formItem.concurrentAllowed">
                        <Radio label=false>是</Radio>
                        <Radio label=true>否</Radio>
                    </RadioGroup>
                    <br>设为“是”的话，如果该任务在上一个时间点还没执行完，则略过不执行
                </FormItem>
                <FormItem label="触发类型">
                    <RadioGroup @on-change="triggerTypeChange" v-model="formItem.triggerType">
                        <Radio label='0'>简单触发</Radio>
                        <Radio label='1'>cron表达式触发</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-if="simpleVisible" label="执行周期(单位：秒)">
                    <InputNumber v-model="formItem.period" min="0"></InputNumber>
                </FormItem>
                <FormItem v-if="simpleVisible" label="执行次数">
                    <InputNumber v-model="formItem.count" min="0"></InputNumber>
                </FormItem>
                <FormItem v-if="!simpleVisible" label="cron表达式">
                    <Input v-model="formItem.cron"/>
                    <Crontab style="z-index: 100000" v-model="formItem.cron" v-show='showCrontab' @hide='changeShow' @fill='crontabFill'></Crontab>
                    <Button @click="showCrontab=true" type="success">
                        生成表达式
                    </Button>
                    <a style="margin-left: 10px" href="#/help">参见使用帮助</a>
                </FormItem>
                <FormItem label="任务类型">
                    <RadioGroup @on-change="jobTypeVisible=!jobTypeVisible" v-model="formItem.jobType">
                        <Radio label='0'>脚本调用</Radio>
                        <Radio label='1'>远程请求</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-if="jobTypeVisible" label="命令脚本">
                    <Input v-model="formItem.script" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
                </FormItem>
                <FormItem v-if="!jobTypeVisible" label="请求地址">
                    <Input v-model="formItem.url"/>
                </FormItem>
                <FormItem v-if="!jobTypeVisible" label="请求内容(JSON格式)">
                    <Input v-model="formItem.body" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
                    <Button @click="formatJson" style="margin-top: 10px" type="success">
                        格式化
                    </Button>
                </FormItem>
                <FormItem>
                    <Button @click="save" type="primary">保存</Button>
                    <Button @click="back" style="margin-left: 8px">返回</Button>
                </FormItem>
            </Form>
        </div>
    </Card>
</template>

<script>
    import Crontab from '../components/Crontab.vue';

    let beautify = require('js-beautify');

    export default {
        name: "TaskInput",
        components: {Crontab},
        data() {
            return {
                crontabValue:'',
                showCrontab:false,
                formItem: {
                    jobName: '',
                    jobDesc: '',
                    group: '',
                    concurrentAllowed: 'false',
                    jobType: '0',
                    triggerType: '0',
                    period: 0,
                    count: 0,
                    script: '',
                    url: '',
                    body: ''
                },
                groups: [],
                groupVisible: false,
                simpleVisible: true,
                jobTypeVisible: true,
                ruleValidate: {
                    jobName: [
                        {required: true, message: '任务名称不能为空', trigger: 'blur'}
                    ],
                    jobDesc: [
                        {required: true, message: '任务说明不能为空', trigger: 'blur'}
                    ],
                    group: [
                        {required: true, message: '分组不能为空', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            triggerTypeChange() {
                this.simpleVisible = !this.simpleVisible;
            },
            back() {
                this.$router.push("/task")
            },
            save() {
                this.$axios.post("/job", this.formItem).then((res) => {
                    if (res.data.success) {
                        this.$Message.info("保存任务成功");
                        this.$router.push("/task")
                    } else {
                        this.$Message.error("保存任务失败")
                    }
                })
            },
            formatJson() {
                this.formItem.body = beautify(this.formItem.body);
            },
            // 切换显示
            changeShow(){
                this.showCrontab = !this.showCrontab;
            },
            // 填充表达式
            crontabFill(value){
                this.formItem.cron = value;
            }
        },
        created() {
            this.$axios.get("/group").then((res) => {
                if (res.data.success) {
                    this.groups = res.data.data;
                } else {
                    this.$Message.warn("查询组失败")
                }
            })
        }
    }
</script>

<style scoped>

</style>