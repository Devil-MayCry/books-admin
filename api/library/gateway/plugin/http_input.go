/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package plugin

import (
	"encoding/json"
)

type HTTPInputConfig struct {
	Name             string              `json:"plugin_name"`
	ServerPluginName string              `json:"server_name"`
	MuxType          string              `json:"mux_type,omitempty"`
	Scheme           string              `json:"scheme,omitempty"`
	Host             string              `json:"host,omitempty"`
	Port             string              `json:"port,omitempty"`
	Path             string              `json:"path"`
	Query            string              `json:"query,omitempty"`
	Fragment         string              `json:"fragment,omitempty"`
	Priority         uint32              `json:"priority"`
	Methods          []string            `json:"methods,omitempty"`
	HeadersEnum      map[string][]string `json:"headers_enum,omitempty"`
	Unzip            bool                `json:"unzip,omitempty"`
	RespondErr       bool                `json:"respond_error,omitempty"`
	FastClose        bool                `json:"fast_close,omitempty"`
	DumpRequest      string              `json:"dump_request,omitempty"`

	RequestHeaderNamesKey string `json:"request_header_names_key"`
	RequestBodyIOKey      string `json:"request_body_io_key"`
	RequestHeaderKey      string `json:"request_header_key"`
	ResponseCodeKey       string `json:"response_code_key"`
	ResponseBodyIOKey     string `json:"response_body_io_key"`
	ResponseBodyBufferKey string `json:"response_body_buffer_key"`
	ResponseRemoteKey     string `json:"response_remote_key"`
	ResponseDurationKey   string `json:"response_duration_key"`
	ResponseHeaderKey     string `json:"response_header_key"`
}

type HTTPInput struct {
	Type   string
	Config *HTTPInputConfig
}

const PrefixHttpInput = "pl_http_input_"
const TypeHTTPInput = "HTTPInput"

func NewHTTPInput(serverName string, name string, uri string, methods []string, priority uint32) *HTTPInput {
	hi := new(HTTPInputConfig)
	hi.Name = PrefixHttpInput + name
	hi.ServerPluginName = serverName
	hi.Path = uri
	hi.Methods = methods
	hi.Priority = priority
	hi.Unzip = true
	hi.RespondErr = true
	hi.ResponseBodyBufferKey = "MOCK_DATA_KEY"
	hi.RequestHeaderKey = "HTTP_REQUEST_HEADER"
	hi.RequestBodyIOKey = "HTTP_REQUEST_BODY_IO"
	hi.ResponseCodeKey = "HTTP_RESP_CODE"
	hi.ResponseHeaderKey = "HTTP_RESP_HEADER"
	hi.ResponseBodyIOKey = "HTTP_RESP_BODY_IO"
	hi.ResponseRemoteKey = "RESPONSE_REMOTE"
	hi.ResponseDurationKey = "RESPONSE_DURATION"
	return &HTTPInput{Type: TypeHTTPInput, Config: hi}
}

func (hi *HTTPInput) Name() string {
	return hi.Config.Name
}

func (hi *HTTPInput) ConfigMap() map[string]interface{} {
	pluginHTTPInputJSON, _ := json.Marshal(hi.Config)
	pluginHTTPInputMap := make(map[string]interface{})
	json.Unmarshal(pluginHTTPInputJSON, &pluginHTTPInputMap)
	return pluginHTTPInputMap
}
