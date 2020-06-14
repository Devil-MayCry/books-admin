package resp

import (
	"github.com/ivpusic/neo"
)

type O struct {
	StatusCode int         `json:"status_code"`
	StatusMsg  string      `json:"status_msg"`
	Data       interface{} `json:"data"`
}

/**
 * 输出成功结果
 */
func Success(c *neo.Ctx, body interface{}) (int, error) {
	return 200, c.Res.Json(O{
		StatusCode: ERROR_SUCCESS,
		StatusMsg:  GetMessage(ERROR_SUCCESS),
		Data:       body,
	})
}

/**
 * 输出错误信息
 */
func Error(c *neo.Ctx, err_code int) (int, error) {
	return 500, c.Res.Json(O{
		StatusCode: err_code,
		StatusMsg:  GetMessage(err_code),
		Data:       "",
	})
}
