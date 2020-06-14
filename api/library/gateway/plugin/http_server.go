/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package plugin

import (
	"strconv"
)

type HTTPServerConfig struct {
	Name             string `json:"plugin_name"`
	Host             string `json:"host"`
	Port             uint16 `json:"port"` // up to 65535
	CertFile         string `json:"cert_file"`
	KeyFile          string `json:"key_file"`
	ConnKeepAlive    bool   `json:"keepalive"`
	ConnKeepAliveSec uint16 `json:"keepalive_sec"` // up to 65535
	// TODO: Adds keepalive_requests support
	MaxSimulConns uint32 `json:"max_connections,omitempty"` // up to 4294967295

	certFilePath, keyFilePath string
	https                     bool
}

type HTTPServer struct {
	Type   string
	Config *HTTPServerConfig
}

const PrefixHttpServer = "pl_http_server_"
const TypeHttpServer = "HTTPServer"

func NewHTTPServer(port uint16) *HTTPServer {
	return &HTTPServer{
		Type: TypeHttpServer,
		Config: &HTTPServerConfig{
			Name:             PrefixHttpServer + strconv.Itoa(int(port)),
			Host:             "0.0.0.0",
			Port:             port,
			ConnKeepAliveSec: 30,
			MaxSimulConns:    1024,
		},
	}
}

func (h *HTTPServer) Name() string {
	return h.Config.Name
}