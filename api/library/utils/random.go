/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package utils

import (
	"math/rand"
	"strings"
	"time"
)

//生成随机字符串
func RandomString(length int) string {
	randStr := "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789"
	randLen := len(randStr)

	result := make([]byte, length)
	rand.Seed(time.Now().UnixNano())

	for i := 0; i < length; i++ {
		idx := rand.Intn(randLen)
		result[i] = byte(randStr[idx])
	}

	return strings.ToLower(string(result))
}
