package output

import "fmt"

const (
	ErrorSuccess = 0

	ErrorSystemFail   = 10001 //系统异常
	ErrorParamInvalid = 10003 //参数不符合要求
	ErrorParamMiss    = 10004 //必填参数缺失

	ErrorUserNotExist   = 20001 //用户不存在
	ErrorPassWdInvalid  = 20002 //密码错误
	ErrorCaptchaInvalid = 20003 //验证码错误

)

func GetMessage(errCode int) (errMsg string) {
	switch errCode {
	case ErrorSuccess:
		errMsg = "ok"
	case ErrorSystemFail:
		errMsg = "system exception."
	case ErrorParamInvalid:
		errMsg = "param illegal."
	case ErrorParamMiss:
		errMsg = "param miss."

	case ErrorUserNotExist:
		errMsg = "user not exist."
	case ErrorPassWdInvalid:
		errMsg = "invalid passwd."
	case ErrorCaptchaInvalid:
		errMsg = "invalid captcha."

	default:
		errMsg = fmt.Sprintf("[%d] unexpected error.", errCode)
	}

	return errMsg
}
