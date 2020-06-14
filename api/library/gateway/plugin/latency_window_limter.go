/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package plugin

type LatencyWindowLimiter struct {
	PluginsConcerned     []string `json:"plugins_concerned"`
	LatencyThresholdMSec uint32   `json:"latency_threshold_msec"` // up to 4294967295
	BackOffMSec          uint16   `json:"backoff_msec"`           // up to 65535
	WindowSizeMax        uint64   `json:"window_size_max"`        // up to 18446744073709551615
	WindowSizeInit       uint64   `json:"windows_size_init"`
}

func NewLatencyWindowLimiter(name string, uri string, method string) *LatencyWindowLimiter {
	hi := new(LatencyWindowLimiter)
	return hi
}
