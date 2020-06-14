package conf

import (
	"fmt"

	"gitlab.luojilab.com/shzf/gof/conf"
)

const KeyGatewayAddr = "gateway."
const KeyMongodbAddr = "mongo.addr"
const KeyMongodbName = "mongo.dbName"
const KeySystemAdmins = "SYSTEM_ADMINS"
const KeyLdapAddr = "LDAP_ADDR"
const TaskCenterHost = "TASK_CENTER_HOST"

var Tree conf.TreeBase

func init() {
	Tree = *conf.Tree
	//isValidConfig()
}

func isValidConfig() bool {
	assertTomlHasOwnProperty(Tree, "ENVIRONMENT")
	assertTomlHasOwnProperty(Tree, "SYS_LOG_PATH")
	return true
}

/**
 * 判断toml配置文件中是否存在某个值
 */
func assertTomlHasOwnProperty(Tree conf.TreeBase, key string) {
	if !Tree.Has(key) {
		panic(fmt.Sprintf("Key %s is not found in config file,"+
			"please check conf/template/conf.toml for more details", key))
	}
}

func GetTaskCenterHost() string {
	return Tree.Get(TaskCenterHost).(string)
}

func GetGatewayAddr(env string) string {
	return Tree.Get(KeyGatewayAddr + env).(string)
}

func GetMongodbAddr() string {
	return Tree.Get(KeyMongodbAddr).(string)
}

func GetMongodbName() string {
	return Tree.Get(KeyMongodbName).(string)
}

func GetLdapAddr() string {
	return Tree.Get(KeyLdapAddr).(string)
}

func GetUsers() string {
	return Tree.Get(KeySystemAdmins).(string)
}
