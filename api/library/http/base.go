package http

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

type Client struct {
	request  *http.Request
	respBody []byte

	LastError error
}

func New() *Client {
	return &Client{}
}

func (c *Client) Prepare(method string, url string, args url.Values) *Client {
	reqString := ""
	switch method {
	case "GET":
		url += "?" + args.Encode()
		break
	case "POST":
		reqString = args.Encode()
		break
	case "PUT":
		reqString = args.Encode()
		break
	}
	c.request, _ = http.NewRequest(method, url, strings.NewReader(reqString))
	c.request.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	return c
}

func (c *Client) SetHeader(headers map[string]string) {
	for key, val := range headers {
		c.request.Header.Set(key, val)
	}
}

func (c *Client) Request() error {
	resp, err := http.DefaultClient.Do(c.request)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	c.respBody, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	return nil
}

func (c *Client) Scan(resObject interface{}) error {
	err := json.Unmarshal(c.respBody, &resObject)
	if err != nil {
		return err
	}

	return nil
}

func (c *Client) GetBody() (resObject interface{}, err error) {
	err = json.Unmarshal(c.respBody, &resObject)
	return resObject, err
}
