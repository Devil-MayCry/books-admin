package plugin

type DownstreamInputConfig struct {
	Name             string   `json:"plugin_name"`
	ResponseDataKeys []string `json:"response_data_keys"`
}

type DownstreamInput struct {
	Type   string
	Config *DownstreamInputConfig
}

const PrefixDownstreamInput = "pl_downstream_"
const TypeDownstreamInput = "DownstreamInput"

func NewDownstreamInput(name string) *DownstreamInput {
	d := new(DownstreamInputConfig)
	d.Name = PrefixDownstreamInput + name
	d.ResponseDataKeys = []string{
		"MOCK_DATA_KEY",
		"HTTP_RESP_CODE",
		"HTTP_RESP_HEADER",
		"HTTP_RESP_BODY_IO",
		"RESPONSE_REMOTE",
		"RESPONSE_DURATION",
	}
	return &DownstreamInput{Type: TypeDownstreamInput, Config: d}
}

func (di *DownstreamInput) Name() string {
	return di.Config.Name
}
