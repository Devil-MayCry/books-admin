/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package plugin

type ThroughputRateLimiterConfig struct {
	Name        string `json:"plugin_name"`
	Tps         string `json:"tps,omitempty"` // zero means no request could be processed, -1 means no limitation
	TimeoutMSec int64  `json:"timeout_msec"`  // up to 9223372036854775807, zero means no queuing, -1 means no timeout
}

type ThroughputRateLimiter struct {
	typeName string
	Config   *ThroughputRateLimiterConfig
}

const PrefixRateLimiter = "pl_rate_limiter_"
const TypeThroughputRateLimiter = "ThroughputRateLimiter"

func NewThroughputRateLimiter(name string, tps string, timeout int64) *ThroughputRateLimiter {
	config := &ThroughputRateLimiterConfig{PrefixRateLimiter + name, tps, timeout}
	return &ThroughputRateLimiter{typeName: TypeThroughputRateLimiter, Config: config}
}

func (hi *ThroughputRateLimiter) Name() string {
	return hi.Config.Name
}

func (hi *ThroughputRateLimiter) Type() string {
	return hi.typeName
}
