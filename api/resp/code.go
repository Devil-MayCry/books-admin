package resp

const (
	ERROR_SUCCESS = 0

	ERROR_AUTH_FAIL           = 10001 //认证失败
	ERROR_AUHT_SIGN_FAIL      = 10002 //签名验证失败
	ERROR_SYSTEM_FAIL         = 10004 //系统异常
	ERROR_API_ERROR           = 10005 //错误的API调用
	ERROR_PARAM_INVALID       = 10006 //参数不符合要求
	ERROR_PARAM_MISS          = 10007 //必填参数缺失
	ERROR_DB_EXCEPTION        = 10008 //数据库查询异常
	ERROR_AUTH_SOURCE_FAIL    = 10009 //来源id验证失败
	ERROR_AUTH_TIMESTAMP_FAIL = 10010 //时间戳验证失败
	ERROR_ILLEGAL_OPRATION    = 10011 //非法操作

	ERROR_WORKER_STATE_ERROR = 20001 //Worker状态错误
	ERROR_WORKER_TOPIC_EXIST = 20002 //Topic已存在

	ERROR_TASK_NOT_EXIST = 30001 //任务不存在
	ERROR_TASK_HAS_EXIST = 30002 //任务已存在

	ERROR_EVENT_NOT_EXIST = 40001 //任务不存在
	ERROR_EVENT_HAS_EXIST = 40002 //任务已存在
)

func GetMessage(errCode int) (errMsg string) {
	switch errCode {
	case ERROR_SUCCESS:
		errMsg = "ok"
	case ERROR_AUTH_FAIL:
		errMsg = "auth fail."
	case ERROR_AUHT_SIGN_FAIL:
		errMsg = "sign auth fail."
	case ERROR_AUTH_SOURCE_FAIL:
		errMsg = "source auth fail."
	case ERROR_AUTH_TIMESTAMP_FAIL:
		errMsg = "timestamp auth fail."
	case ERROR_SYSTEM_FAIL:
		errMsg = "system exception."
	case ERROR_API_ERROR:
		errMsg = "api uri error."
	case ERROR_PARAM_INVALID:
		errMsg = "param illegal."
	case ERROR_PARAM_MISS:
		errMsg = "param miss."
	case ERROR_DB_EXCEPTION:
		errMsg = "db query error."
	case ERROR_ILLEGAL_OPRATION:
		errMsg = "operation illegal."

	case ERROR_WORKER_STATE_ERROR:
		errMsg = "worker state illegal."
	case ERROR_WORKER_TOPIC_EXIST:
		errMsg = "worker topic exist."

	case ERROR_TASK_NOT_EXIST:
		errMsg = "task not exist."
	case ERROR_TASK_HAS_EXIST:
		errMsg = "task has exist."

	case ERROR_EVENT_NOT_EXIST:
		errMsg = "event not exist."
	case ERROR_EVENT_HAS_EXIST:
		errMsg = "event has exist."
	default:
		errMsg = "[" + string(errCode) + "] unknown error."
	}

	return errMsg
}
