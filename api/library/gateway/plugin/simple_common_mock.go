/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package plugin

type SimpleCommonMockConfig struct {
	Name                    string   `json:"plugin_name"`
	PluginsConcerned        []string `json:"plugins_concerned"`
	PluginTypesConcerned    []string `json:"plugin_types_concerned"`
	TaskErrorCodesConcerned []string `json:"task_error_codes_concerned"`
	FinishTask              bool     `json:"finish_task"`
	MockTaskDataKey         string   `json:"mock_task_data_key"`
	MockTaskDataValue       string   `json:"mock_task_data_value"`
}

type SimpleCommonMock struct {
	Type   string
	Config *SimpleCommonMockConfig
}

const PrefixSimpleCommonMock = "pl_simple_common_mock_"
const TypeSimpleCommonMock = "SimpleCommonMock"

func NewSimpleCommonMock(name string, PluginConcernedType string, data string) *SimpleCommonMock {
	config := &SimpleCommonMockConfig{
		Name:                 PrefixSimpleCommonMock + name,
		PluginTypesConcerned: []string{PluginConcernedType},
		TaskErrorCodesConcerned: []string{
			"ResultInternalServerError", //500
			"ResultUnknownError",        //501
			"ResultTaskCancelled",       //502
			"ResultServiceUnavailable",  //503
			"ResultBadInput",            //400
			"ResultUnauthorized",        //401
			"ResultMissingInput",        //498
			"ResultFlowControl",         //429
			"ResultRequesterGone",       //499
		},
		FinishTask:        true,
		MockTaskDataKey:   "MOCK_DATA_KEY",
		MockTaskDataValue: data,
	}
	return &SimpleCommonMock{Type: TypeSimpleCommonMock, Config: config}
}

func (hi *SimpleCommonMock) Name() string {
	return hi.Config.Name
}
