package logger

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/sirupsen/logrus"
)

var (
	LOG_HTTP_FILE  = "http_access.log"
	LOG_HTTP_LEVEL = logrus.DebugLevel

	httpstd = newLoggerSet()
)

func initHTTP() {
	httpstd.registerIOLogger("http", os.Stdout, &httpFormatter{}, LOG_HTTP_LEVEL)

	f, err := openLogFile(LOG_HTTP_FILE)
	if err != nil {
		log.Printf("[open log file %s failed: %v]", LOG_HTTP_FILE, err)
	} else {
		httpstd.registerFileLogger("http", f, LOG_HTTP_FILE, &httpFormatter{}, LOG_HTTP_LEVEL)
	}
}

type httpFormatter struct{}

func (f *httpFormatter) Format(entry *logrus.Entry) ([]byte, error) {
	return []byte(fmt.Sprintln(entry.Message)), nil
}

func HTTPAccess(req *http.Request, code int, bodyBytesSent int,
	requestTime time.Duration,
	upstreamResponseTime time.Duration) {
	// mock nginx log_format:
	// '$remote_addr - $remote_user [$time_local] "$request" '
	// '$status $body_bytes_sent "$http_referer" '
	// '"$http_user_agent" "$http_x_forwarded_for" '
	// '$request_time $upstream_response_time $pipe';

	referer := req.Header.Get("Referer")
	if referer == "" {
		referer = "-"
	}
	agent := req.Header.Get("User-Agent")
	if agent == "" {
		agent = "-"
	}
	realIP := req.Header.Get("X-Forwarded-For")
	if realIP == "" {
		realIP = "-"
	}

	for _, logger := range httpstd.getLoggers("http") {
		l := logrus.Fields{
			"Level":         LOG_HTTP_LEVEL,
			"time":          fmt.Sprintf("%d", time.Now().Unix()),
			"traceid":       "",
			"pGet":          req.URL.Query(),
			"pPost":         req.PostForm,
			"text":          "ok",
			"Uri":           req.URL.Path,
			"RequestMethod": req.Method,
		}
		info, _ := json.Marshal(l)
		logger.Debugf(string(info))
	}
}
