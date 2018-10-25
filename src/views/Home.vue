<template>
    <div id="app">
        <div class="container">
            <div class="nav">
                <a class="brand" href="/">
                    <Icon style="vertical-align: -2px" type="ios-time-outline"/>
                    辰安任务调度系统
                </a>
                <div class="profile">
                    <Dropdown @on-click="logout">
                        <span>
                            <Icon type="ios-person-outline" style="vertical-align: -2px"/>
                            huangll
                            <Icon type="md-arrow-dropdown"></Icon>
                        </span>
                        <DropdownMenu slot="list">
                            <DropdownItem  style="text-align: center">
                                退出
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <Menu style="padding-left: 50px;" mode="horizontal" active-name="1">
                <MenuItem to="task" name="1">
                    <Icon type="md-calendar"/>
                    任务管理
                </MenuItem>
                <MenuItem to="help" name="2">
                    <Icon type="md-help-circle"/>
                    使用帮助
                </MenuItem>
            </Menu>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>
<script>

    export default {
        methods: {
            logout() {
                this.$router.push("/login")
            }
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .nav {
        width: 100%;
        height: 54px;
        background-color: #00ba8b;
        padding: 7px 50px;
        position: relative;
    }

    .container {
        height: 40px;
    }

    .nav .brand {
        float: left;
        display: block;
        font-size: 20px;
        color: #ffffff;
        font-weight: 600;
        margin: 8px 0 12px;
        line-height: 20px;
        height: 20px;
    }

    .profile {
        float: right;
        font-size: 20px;
        color: #ffffff;
    }

    .content {
        padding: 20px 50px;
        background-color: #f9f6f1;
    }

    .container .ivu-menu {
        z-index: 100;
    }
</style>
