package logger

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"

	"github.com/sirupsen/logrus"

	"taskcenter-admin/api/library/conf"
)

type innerLogger struct {
	logrusLogger *logrus.Logger

	logFileName string
	logFile     *os.File
}

type loggerSet struct {
	v map[string][]*innerLogger
}

var loggers []*loggerSet

func newLoggerSet() *loggerSet {
	ret := &loggerSet{
		v: make(map[string][]*innerLogger, 0),
	}

	loggers = append(loggers, ret)

	return ret
}

func (l *loggerSet) _registerLogger(name string, out io.Writer,
	formatter logrus.Formatter, lvl logrus.Level) *innerLogger {

	ret := new(innerLogger)
	ret.logrusLogger = logrus.New()
	ret.logrusLogger.Out = out
	ret.logrusLogger.Formatter = formatter
	ret.logrusLogger.Level = lvl

	return ret
}

func (l *loggerSet) registerFileLogger(name string, out *os.File, fileName string,
	formatter logrus.Formatter, lvl logrus.Level) {

	il := l._registerLogger(name, out, formatter, lvl)
	il.logFileName = fileName
	il.logFile = out

	l.v[name] = append(l.v[name], il)
}

func (l *loggerSet) registerIOLogger(name string, out io.Writer, formatter logrus.Formatter, lvl logrus.Level) {
	il := l._registerLogger(name, out, formatter, lvl)
	l.v[name] = append(l.v[name], il)
}

func (l *loggerSet) getLoggers(typ string) []*logrus.Logger {
	ret := make([]*logrus.Logger, 0)

	innerLoggers := l.v[typ]
	if innerLoggers == nil {
		return ret
	}

	for _, il := range innerLoggers {
		ret = append(ret, il.logrusLogger)
	}

	return ret
}

func openLogFile(fileName string) (*os.File, error) {
	LogHome := conf.Tree.GetLogPath()
	if _, err := os.Stat(LogHome); os.IsNotExist(err) {
		err = os.MkdirAll(LogHome, 0750)
		if err != nil {
			return nil, err
		}
	}

	f, err := os.OpenFile(filepath.Join(LogHome, fileName), os.O_RDWR|os.O_CREATE|os.O_APPEND, 0640)
	if err != nil {
		return nil, err
	}

	return f, nil
}

func getSourceInfo() string {
	pc, file, line, _ := runtime.Caller(2)
	return fmt.Sprintf("%v#%v-%v", filepath.Base(file), line, runtime.FuncForPC(pc).Name())
}

func init() {
	initHTTP()
}
