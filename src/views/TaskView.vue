<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-list-box-outline"/>
                查看任务详情
            </p>
            <div>
                <h3>{{job.jobName}}</h3>
                <br>
                <div v-if="job.jobType===1">
                    <code>
                        请求地址: {{job.url}} <br>
                        请求内容: {{job.body}}
                    </code>
                </div>
                <div v-if="job.jobType===0">
                    执行脚本: {{job.script}}
                </div>
            </div>
            <Divider/>
            <div>
                <h3>执行日志</h3>
                <div class="record" v-for="record in job.jobRecords" :key="record.id">
                    <code>执行时间: {{record.runTime}}</code> <br>
                    <code>执行输出: {{record.result}}</code>
                </div>
            </div>
        </Card>
        <BackTop :height="100" :bottom="200">
            <div class="top">返回顶端</div>
        </BackTop>
    </div>

</template>

<script>
    export default {
        name: "TaskView",
        data() {
            return {
                job: {}
            }
        },
        created() {
            let job = this.$route.query.job;
            this.$axios.get('/jobView/' + job).then((res) => {
                this.job = res.data.data
            })
        }
    }
</script>

<style scoped>
    .record {
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
    }

    .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>