package http

import (
	"fmt"
	"net/url"
)

func Get(url string, args url.Values) *Client {
	return New().Prepare("GET", url, args)
}

func Post(url string, args url.Values) *Client {
	return New().Prepare("POST", url, args)
}

func Put(url string, args url.Values) *Client {
	return New().Prepare("PUT", url, args)
}

func AppendArgs(args url.Values, options map[string]interface{}) url.Values {
	for k, v := range options {
		args.Set(k, fmt.Sprint(v))
	}
	return args
}
