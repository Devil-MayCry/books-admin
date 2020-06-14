/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package plugin

import (
	"fmt"
	"regexp"
	"strings"
)

type HTTPOutputConfig struct {
	Name                     string            `json:"plugin_name"`
	URLPattern               string            `json:"url_pattern"`
	HeaderPatterns           map[string]string `json:"header_patterns"`
	Close                    bool              `json:"close_body_after_pipeline"`
	RequestBodyBufferPattern string            `json:"request_body_buffer_pattern"`
	Method                   string            `json:"method"`
	ExpectedResponseCodes    []int             `json:"expected_response_codes"`
	TimeoutSec               uint16            `json:"timeout_sec"` // up to 65535, zero means no timeout
	CertFile                 string            `json:"cert_file"`
	KeyFile                  string            `json:"key_file"`
	CAFile                   string            `json:"ca_file"`
	Insecure                 bool              `json:"insecure_tls"`
	ConnKeepAlive            string            `json:"keepalive,omitempty"`
	ConnKeepAliveSec         uint16            `json:"keepalive_sec,omitempty"` // up to 65535
	DumpRequest              string            `json:"dump_request,omitempty"`
	DumpResponse             string            `json:"dump_response,omitempty"`

	RequestHeaderKey    string `json:"request_header_key"`
	RequestBodyIOKey    string `json:"request_body_io_key"`
	ResponseCodeKey     string `json:"response_code_key"`
	ResponseBodyIOKey   string `json:"response_body_io_key"`
	ResponseHeaderKey   string `json:"response_header_key"`
	ResponseRemoteKey   string `json:"response_remote_key"`
	ResponseDurationKey string `json:"response_duration_key"`
}
type HTTPOutput struct {
	Type   string
	Config *HTTPOutputConfig
}

const PrefixHttpOutput = "pl_http_output_"
const TypeHTTPOutput = "HTTPOutput"
const IPPattern = `(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)`

func NewHTTPOutput(name string, host string, method string) *HTTPOutput {
	urlPattern := fmt.Sprintf("http://%s/%s?%s", host, "{PATH_INFO}", "{QUERY_STRING}")
	headerPatterns := make(map[string]string)
	index := strings.Index(host, ":")
	if index == -1 {
		index = len(host)
	}
	if ok, _ := regexp.MatchString(IPPattern, host[:index]); ok {
		headerPatterns["Host"] = "{SERVER_NAME}"
	}

	ho := new(HTTPOutputConfig)
	ho.Name = PrefixHttpOutput + name
	ho.URLPattern = urlPattern
	ho.HeaderPatterns = headerPatterns
	ho.Method = method
	ho.TimeoutSec = 10
	ho.ConnKeepAliveSec = 12
	ho.RequestHeaderKey = "HTTP_REQUEST_HEADER"
	ho.RequestBodyIOKey = "HTTP_REQUEST_BODY_IO"
	ho.ResponseCodeKey = "HTTP_RESP_CODE"
	ho.ResponseHeaderKey = "HTTP_RESP_HEADER"
	ho.ResponseBodyIOKey = "HTTP_RESP_BODY_IO"
	ho.ResponseRemoteKey = "RESPONSE_REMOTE"
	ho.ResponseDurationKey = "RESPONSE_DURATION"
	ho.Close = false
	return &HTTPOutput{Type: TypeHTTPOutput, Config: ho}
}

func (hi *HTTPOutput) Name() string {
	return hi.Config.Name
}
