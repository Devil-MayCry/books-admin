/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package plugin

import (
	"encoding/json"
)

type HTTPRedirectConfig struct {
	Name              string `json:"plugin_name"`
	RequestHeaderKey  string `json:"request_header_key"`
	ResponseCodeKey   string `json:"response_code_key"`
	ResponseHeaderKey string `json:"response_header_key"`
}

type HTTPRedirect struct {
	Type   string
	Config *HTTPRedirectConfig
}

const PrefixHttpRedirect = "pl_http_redirect_"
const TypeHTTPRedirect = "HTTPRedirect"

func NewHTTPRedirect(name string) *HTTPRedirect {
	hi := new(HTTPRedirectConfig)
	hi.Name = PrefixHttpRedirect + name
	hi.RequestHeaderKey = "HTTP_REQUEST_HEADER"
	hi.ResponseCodeKey = "HTTP_RESP_CODE"
	hi.ResponseHeaderKey = "HTTP_RESP_HEADER"
	return &HTTPRedirect{Type: TypeHTTPRedirect, Config: hi}
}

func (hi *HTTPRedirect) Name() string {
	return hi.Config.Name
}

func (hi *HTTPRedirect) ConfigMap() map[string]interface{} {
	pluginHTTPInputJSON, _ := json.Marshal(hi.Config)
	pluginHTTPInputMap := make(map[string]interface{})
	json.Unmarshal(pluginHTTPInputJSON, &pluginHTTPInputMap)
	return pluginHTTPInputMap
}
